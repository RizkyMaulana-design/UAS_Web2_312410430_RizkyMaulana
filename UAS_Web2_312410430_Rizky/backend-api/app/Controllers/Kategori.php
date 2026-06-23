<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Kategori extends ResourceController
{
    protected $modelName = 'App\Models\KategoriModel';
    protected $format = 'json';

    // Menampilkan semua data
    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    // Menyimpan data baru
    public function create()
    {
        // Tangkap data format JSON dari VueJS
        $data = $this->request->getJSON();

        if ($this->model->insert($data)) {
            return $this->respondCreated(['message' => 'Data berhasil disimpan']);
        }
        return $this->fail('Gagal menyimpan data');
    }

    // Mengubah data
    public function update($id = null)
    {
        $data = $this->request->getJSON();

        if ($this->model->update($id, $data)) {
            return $this->respond(['message' => 'Data berhasil diubah']);
        }
        return $this->fail('Gagal mengubah data');
    }

    // Menghapus data
    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['message' => 'Data berhasil dihapus']);
        }
        return $this->failNotFound('Data tidak ditemukan');
    }
}