<?php

namespace App\Models;

use CodeIgniter\Model;

class KategoriModel extends Model
{
    protected $table = 'kategori';
    protected $primaryKey = 'id';
    protected $returnType = 'array';

    // INI YANG PALING PENTING: Buka gembok kolom agar bisa diisi
    protected $allowedFields = ['nama_kategori'];
}