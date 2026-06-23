<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Config\Services;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // 1. Izinkan metode GET agar pengunjung publik/Landing Page bisa melihat data
        // Izinkan OPTIONS untuk keperluan CORS dari VueJS
        $method = strtoupper((string) $request->getMethod());
        if ($method === 'OPTIONS' || $method === 'GET') {
            return;
        }

        // 2. Cegat request manipulasi data (POST, PUT, DELETE) jika tidak ada Token
        $header = $request->getServer('HTTP_AUTHORIZATION');
        if (!$header) {
            return Services::response()
                ->setJSON([
                    'status' => 401,
                    'error' => 401,
                    'messages' => 'Akses ditolak! Authorization Bearer Token tidak ditemukan pada HTTP Header.'
                ])
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }

        // 3. Ekstrak token dari string 'Bearer [token_kode]'
        $token = explode(' ', $header)[1] ?? '';

        try {
            // 4. Verifikasi keaslian Token JWT
            $key = "KunciRahasiaRizkyMaulanaUntukUASWeb2SangatAman123!!";
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
        } catch (\Exception $e) {
            // Jika token palsu atau sudah kadaluarsa (Error 401)
            return Services::response()
                ->setJSON([
                    'status' => 401,
                    'error' => 401,
                    'messages' => 'Akses ditolak! Token tidak valid atau sudah kadaluarsa.'
                ])
                ->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak ada yang perlu diubah di sini
    }
}