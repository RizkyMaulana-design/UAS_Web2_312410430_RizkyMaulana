<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;

class Auth extends ResourceController
{
    public function login()
    {
        $model = new UserModel();
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        $user = $model->where('email', $email)->first();

        if (!$user) {
            return $this->failNotFound('Email tidak terdaftar.');
        }

        if (!password_verify($password, $user['password'])) {
            return $this->fail('Password salah.');
        }

        // KUNCI RAHASIA BARU YANG PANJANG (Minimal 32 karakter)
        $key = "KunciRahasiaRizkyMaulanaUntukUASWeb2SangatAman123!!";

        $payload = [
            "iss" => "IssuerName",
            "iat" => time(),
            "exp" => time() + 3600, // Token berlaku 1 jam
            "user_id" => $user['id'],
            "email" => $user['email']
        ];

        $token = JWT::encode($payload, $key, 'HS256');

        return $this->respond([
            'status' => 200,
            'messages' => 'Login berhasil!',
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'nama' => $user['nama'],
                'email' => $user['email']
            ]
        ]);
    }
}