<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;



Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/server/access', [ProfileController::class, 'updateServerAccess'])->name('server.access');
});




Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/console', function () {
    return Inertia::render('Console');
})->name('console');

Route::get('/server/info', function () {
    return Inertia::render('ServerInfo');
})->name('serverinfo');


Route::middleware(['auth', 'admin', 'verified'])->group(function () {

        Route::get('/users', [UsersController::class, 'index'])->name('users');

        Route::get('/user/create', [UsersController::class, 'user'])->name('user');
        Route::post('/user/create', [UsersController::class, 'store'])->name('user.create');

        // Route::get('/users/{user}/edit', [UsersController::class, 'edit'])->name('users.edit');
        // Route::put('/users/{user}', [UsersController::class, 'update'])->name('users.update');

        Route::delete('/users/{user}', [UsersController::class, 'destroy'])->name('users.destroy');

});

Route::get('/download', function () {

    return Storage::download('hh.txt');
});


require __DIR__.'/auth.php';
