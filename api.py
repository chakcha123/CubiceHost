import os
import docker
import socket
import shutil
import subprocess
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
user_ports = {}
client = docker.from_env()

def container_running(container_name):
    try:
        container = client.containers.get(container_name)
        return container.status == 'running'
    except docker.errors.NotFound:
        return False

def get_next_available_port(start_port=8000, end_port=8500):
    for port in range(start_port, end_port):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('0.0.0.0', port)) != 0:
                return port
    raise RuntimeError("No available ports found")

@app.route('/messages', methods=['GET'])
def handle_messages():
    container_name = request.args.get('container_name', 'minecraft-server')
    custom_message = f'The container is running!' if container_running(container_name) else f'The container is not running.'
    return jsonify({'status': custom_message})

@app.route('/Start', methods=['GET', 'POST'])
def start():
    container_name = request.args.get('container_name')
    username = request.args.get('username')

    if not container_name or not username:
        return jsonify({'error': 'Container name and username are required.'}), 400

    try:
        container = client.containers.get(container_name)
        container.start()

        # Get the next available port
        port = get_next_available_port()

        # Store the username and port association
        user_ports[username] = port

        # Create a new screen session and run the docker attach command
        screen_command = f'screen -S {username} -dm bash -c "ttyd -p {port} docker attach {container_name}"'
        os.system(screen_command)

        return jsonify({'status': f'Container {container_name} started successfully.', 'screen_port': port})
    except docker.errors.NotFound:
        return jsonify({'error': f'Container {container_name} not found.'}), 404

@app.route('/Stop', methods=['GET', 'POST'])
def stop():
    container_name = request.args.get('container_name')
    username = request.args.get('username')
    if not container_name or not username:
        return jsonify({'error': 'Container name and username are required.'}), 400

    try:
        # Stop the Docker container
        container = client.containers.get(container_name)
        container.stop()

        # Kill the screen session
        screen_command = f'screen -S {username} -X quit'
        os.system(screen_command)
        print(f"Screen session {username} killed successfully.")

        return jsonify({'status': f'Container {container_name} and screen session {username} stopped successfully.'})
    except docker.errors.NotFound:
        return jsonify({'error': f'Container {container_name} not found.'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_port_by_username', methods=['GET'])
def get_port_by_username():
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username is required.'}), 400

    port = user_ports.get(username)
    if port is None:
        return jsonify({'error': f'No screen session found for username {username}'}), 404

    return jsonify({'port': port})

def get_next_available_ports(client):
    containers = client.containers.list(all=True)
    used_ports = set()

    for container in containers:
        try:
            ports = container.attrs['NetworkSettings']['Ports']
            for port in ports:
                if ports[port] is not None:
                    host_port = ports[port][0]['HostPort']
                    used_ports.add(int(host_port))
        except (KeyError, IndexError):
            continue

    base_minecraft_port = 25565
    base_geyser_port = 19132

    while base_minecraft_port in used_ports:
        base_minecraft_port += 1

    while base_geyser_port in used_ports:
        base_geyser_port += 1

    return base_minecraft_port, base_geyser_port

def create_minecraft_container(username):
    client = docker.from_env()

    container_name = f"{username}"

    # Check if the container already exists
    try:
        container = client.containers.get(container_name)
        print(f"Container '{container_name}' already exists.")
        return f"Container '{container_name}' already exists."
    except docker.errors.NotFound:
        print(f"Container '{container_name}' does not exist. Creating a new one.")

    # Get the next available ports
    minecraft_port, geyser_port = get_next_available_ports(client)

    # Define the docker-compose content
    compose_content = f"""
    version: "3.5"
    services:
      minecraft:
        image: 05jchambers/legendary-minecraft-geyser-floodgate:latest
        restart: "unless-stopped"
        ports:
          - "{minecraft_port}:25565"
          - "{geyser_port}:19132"
          - "{geyser_port}:19132/udp"
        volumes:
          - ./minecraft-{username}:/minecraft
        stdin_open: true
        tty: true
        deploy:
          resources:
            limits:
              memory: 4g
        entrypoint: ["/bin/bash", "/scripts/start.sh"]
        environment:
          Port: "25565"
          BedrockPort: "19132"
          TZ: "America/Denver"
    """

    # Create a directory for the user if it doesn't exist
    user_dir = f"./{username}"
    if not os.path.exists(user_dir):
        os.makedirs(user_dir)

    # Write the docker-compose file
    compose_file = os.path.join(user_dir, 'docker-compose.yml')
    with open(compose_file, 'w') as f:
        f.write(compose_content)

    # Run docker compose create and capture output
    try:
        result = subprocess.run(['docker', 'compose', '-f', compose_file, 'create'], capture_output=True, text=True, check=True)
        print(f"Docker Compose Output: {result.stdout}")
        print(f"Docker Compose Error: {result.stderr}")
    except subprocess.CalledProcessError as e:
        print(f"Error running docker compose: {e.stderr}")
        return f"Error creating container '{container_name}': {e.stderr}"

    return f"Container '{container_name}' created but not started."
def get_ports_by_username(username):
    container_name = f"{username}-minecraft-1"
    try:
        container = client.containers.get(container_name)
        ports = container.attrs['NetworkSettings']['Ports']
        return {port: ports[port][0]['HostPort'] for port in ports if ports[port] is not None}
    except docker.errors.NotFound:
        return None

def remove_container_and_folder(username):
    container_name = f"{username}-minecraft-1"
    try:
        # Get the container
        container = client.containers.get(container_name)
        # Stop the container if running
        if container.status == 'running':
            container.stop()
        # Remove the container
        container.remove()
        print(f"Container '{container_name}' removed successfully.")
    except docker.errors.NotFound:
        return f"Container '{container_name}' not found."

    # Remove the user directory
    user_dir = f"./{username}"
    if os.path.exists(user_dir):
        try:
            result = subprocess.run(['sudo', 'rm', '-rf', user_dir], capture_output=True, text=True, check=True)
            print(f"Directory '{user_dir}' removed successfully.")
        except subprocess.CalledProcessError as e:
            print(f"Error removing directory '{user_dir}': {e.stderr}")
            return f"Error removing directory '{user_dir}': {e.stderr}"
    else:
        print(f"Directory '{user_dir}' not found.")

    return f"Container '{container_name}' and directory '{user_dir}' removed successfully."

@app.route('/remove_container', methods=['POST'])
def remove_container():
    data = request.get_json()
    username = data.get('username')

    if not username:
        return jsonify({'error': 'Username is required.'}), 400

    message = remove_container_and_folder(username)
    return jsonify({'message': message})

@app.route('/get_ports', methods=['GET'])
def get_ports():
    username = request.args.get('username')
    if not username:
        return jsonify({'error': 'Username is required.'}), 400

    ports = get_ports_by_username(username)
    if ports is None:
        return jsonify({'error': f'Container for username {username} not found.'}), 404

    return jsonify({'ports': ports})

@app.route('/create_container', methods=['POST'])
def create_container():
    data = request.get_json()
    username = data.get('username')

    if not username:
        return jsonify({'error': 'Username is required.'}), 400

    message = create_minecraft_container(username)
    return jsonify({'message': message})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

