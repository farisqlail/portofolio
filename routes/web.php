<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Auth::routes();

Route::prefix('/blog')->group(function () {
    Route::get('/', [BlogController::class, 'index'])->name('blog.index');
});

Route::prefix('/portfolio')->group(function () {
    Route::get('/', [PortfolioController::class, 'index'])->name('porto.index');
});

Route::get('/kontak', function () {
    return view('contact');
});

Route::prefix('/faris/blog')->group(function () {
    Route::get('/', [BlogController::class, 'admin'])->name('blog.admin');
    Route::get('/faris/blog/create', [BlogController::class, 'create'])->name('blog.create');
    Route::post('/faris/blog/create', [BlogController::class, 'store'])->name('blog.store');
    Route::get('/faris/blog/edit/{id}', [BlogController::class, 'edit'])->name('blog.edit');
    Route::patch('/faris/blog/edit/{id}', [BlogController::class, 'update'])->name('blog.update');
    Route::get('/faris/blog/delete/{id}', [BlogController::class, 'destroy'])->name('blog.delete');
});

Route::prefix('/faris/portfolio')->group(function () {
    Route::get('/', [PortfolioController::class, 'admin'])->name('portfolio.admin');
    Route::get('/faris/portfolio/create', [PortfolioController::class, 'create'])->name('portfolio.create');
    Route::post('/faris/portfolio/create', [PortfolioController::class, 'store'])->name('portfolio.store');
    Route::get('/faris/portfolio/edit/{id}', [PortfolioController::class, 'edit'])->name('portfolio.edit');
    Route::patch('/faris/portfolio/edit/{id}', [PortfolioController::class, 'update'])->name('portfolio.update');
    Route::get('/faris/portfolio/delete/{id}', [PortfolioController::class, 'destroy'])->name('portfolio.delete');
});

Route::get('/faris', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
