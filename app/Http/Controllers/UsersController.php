<?php

namespace App\Http\Controllers;
use App\Http\Middleware\AdminMiddleware;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

use Illuminate\Routing\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;

class UsersController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->middleware(AdminMiddleware::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
    }

    public function index()
    {
        $usersCount = User::count();
        $hasServerCount = User::where('hasServer', true)->count();
        $adminCount = User::where('role', 'admin')->count();
        $users = User::paginate(6);
        return  Inertia::render('Admin/Users', [
            'users' => $users,
            'usersCount'=>$usersCount,
            'hasServerCount'=>$hasServerCount,
            'adminCount'=>$adminCount,

        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => strtolower($request->email),
            'password' => Hash::make($request->password),
        ]);


        return redirect()->route('users');
    }

    public function user()
    {
        return  Inertia::render('Admin/CreateUser');
    }


    //     public function edit($id)
    // {
    //     $editedUser = User::findOrFail($id);
    //     return  Inertia::render('Admin/EditUser', [
    //         'editedUser' => $editedUser,
    //     ]);

    // }


    // public function update(Request $request, $id)
    // {
    //     $user = User::findOrFail($id);

    //     $user->update($request->all());
    //     return redirect()->route('users');
    // }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('users');

    }



}
