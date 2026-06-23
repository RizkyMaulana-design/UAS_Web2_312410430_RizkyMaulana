<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
$routes->resource('kategori');
$routes->resource('barang');
$routes->post('login', 'Auth::login');
$routes->options('(:any)', 'Home::index');
$routes->get('buat-akun-baru', function () {
    $model = new \App\Models\UserModel();
    $data = [
        'nama' => 'Rizky Maulana',
        'email' => 'rizky@admin.com',
        'password' => password_hash('123456', PASSWORD_DEFAULT),
        'role' => 'admin'
    ];
    $model->insert($data);
    return 'Berhasil! Akun rizky@admin.com dengan password 123456 telah ditambahkan ke database.';
});