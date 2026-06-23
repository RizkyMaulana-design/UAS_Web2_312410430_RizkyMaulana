<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

// ... (kode bawahnya biarkan saja)

class Barang extends ResourceController
{
    protected $modelName = 'App\Models\BarangModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    public function create()
    {
        // Gunakan getPost() untuk menangkap teks dari FormData
        $data = $this->request->getPost();

        // Tangkap file gambar
        $fileGambar = $this->request->getFile('gambar');

        // Jika ada gambar yang di-upload dan valid
        if ($fileGambar && $fileGambar->isValid() && !$fileGambar->hasMoved()) {
            $namaGambar = $fileGambar->getRandomName(); // Buat nama acak agar tidak bentrok
            $fileGambar->move('uploads', $namaGambar);  // Pindahkan ke public/uploads
            $data['gambar'] = $namaGambar;             // Simpan nama file ke database
        }

        if ($this->model->insert($data)) {
            return $this->respondCreated(['message' => 'Data barang berhasil disimpan']);
        }
        return $this->fail('Gagal menyimpan data barang');
    }

    public function update($id = null)
    {
        // Trick spoofing PUT request menggunakan POST untuk file upload
        $data = $this->request->getPost();
        $fileGambar = $this->request->getFile('gambar');

        if ($fileGambar && $fileGambar->isValid() && !$fileGambar->hasMoved()) {
            $namaGambar = $fileGambar->getRandomName();
            $fileGambar->move('uploads', $namaGambar);
            $data['gambar'] = $namaGambar;
        }

        if ($this->model->update($id, $data)) {
            return $this->respond(['message' => 'Data barang berhasil diubah']);
        }
        return $this->fail('Gagal mengubah data barang');
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['message' => 'Data barang berhasil dihapus']);
        }
        return $this->failNotFound('Data tidak ditemukan');
    }
}