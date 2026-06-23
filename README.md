# 📦 E-Inventory SPA (Single Page Application)

> **Tugas Akhir Semester (UAS) Pemrograman Web 2**  
> Disusun oleh:
> Nama : Rizky Maulana
> Nim : 312410430
> Kelas : I241C
> Dosen Pengampu: Agung Nugroho, S.Kom., M.Kom., S.Kom., M. Kom.

E-Inventory adalah sebuah aplikasi manajemen inventaris barang berbasis *Single Page Application* (SPA) yang dirancang dengan antarmuka *Glassmorphism* yang modern, elegan, dan sangat responsif. Aplikasi ini memisahkan secara penuh antara sistem *Frontend* dan *Backend* (RESTful API), serta dilengkapi dengan sistem autentikasi keamanan tingkat tinggi menggunakan JWT (JSON Web Token).

---

## 📸 Cuplikan Layar (Screenshots) & Penjelasan

### 1. Halaman Login (Autentikasi JWT)
![Halaman Login]

<img width="1920" height="974" alt="halaman login" src="https://github.com/user-attachments/assets/0c8bb595-8c8b-4f5f-9a7f-b44638b44520" />

> **Penjelasan:** Pintu masuk utama aplikasi. Dilengkapi dengan sistem keamanan yang akan memvalidasi kredensial pengguna. Jika berhasil, *Backend* akan menerbitkan Token JWT yang disimpan di *Local Storage browser* untuk menjaga sesi *login* pengguna.

### 2. Dashboard Utama (Glassmorphism UI)
![Dashboard Utama]

<img width="1920" height="879" alt="dashboardd utamaa" src="https://github.com/user-attachments/assets/aeadfc34-c7ab-47c4-8c38-f7857fded3dd" />

> **Penjelasan:** Pusat kendali aplikasi. Dirancang dengan gaya *Glassmorphism* (efek kaca tembus pandang) yang bersih. Sistem *routing* menggunakan Vue Router memastikan perpindahan antarmenu terjadi seketika (*real-time*) tanpa perlu *loading/refresh* halaman.

### 3. Manajemen Data Kategori (Master Data)
![Data Kategori]

<img width="1920" height="1036" alt="kategori barang" src="https://github.com/user-attachments/assets/5061acec-d4a6-42d7-a0e5-86e22e97dab0" />

> **Penjelasan:** Fitur CRUD (Create, Read, Update, Delete) untuk mengelola kelompok barang. Data kategori ini bertindak sebagai basis referensi (*Foreign Key*) yang akan diikatkan pada Data Barang.

### 4. Manajemen Data Barang (Relasi & Upload File)
![Data Barang]

<img width="1920" height="775" alt="data barangg" src="https://github.com/user-attachments/assets/ad5edcef-7987-42c3-8c03-4b097476730e" />

> **Penjelasan:** Fitur pengelolaan inventaris inti. Selain melakukan CRUD dasar, form ini terintegrasi langsung dengan Data Kategori (berupa *dropdown* pilihan). Fitur ini juga mendukung **Upload File (Multipart Form-Data)** untuk menyimpan dan menampilkan foto fisik setiap barang secara rapi di dalam tabel.

---

## ✨ Fitur Utama (Highlight)

1. **RESTful API & SPA Architecture:** Komunikasi data asinkron menggunakan Axios. Perpindahan halaman sangat mulus berkat Vue Router.
2. **Keamanan JWT (JSON Web Token):** Setiap *endpoint* API dan halaman *Frontend* dilindungi. Pengguna yang belum *login* atau tidak memiliki token valid akan ditendang kembali ke halaman Login (Navigation Guards).
3. **Database Relasional:** Implementasi *Foreign Key* yang ketat antara tabel `kategori` dan `barang` untuk menjaga integritas data (MySQL).
4. **File Upload System:** Kemampuan untuk mengunggah, menyimpan, dan menampilkan *file* foto barang dengan validasi dari sisi server.
5. **Modern UI/UX:** Tampilan gelap (*Dark Mode*) dengan elemen *Glassmorphism* menggunakan *framework* Tailwind CSS, memprioritaskan antarmuka yang *clean* dan profesional.

---

## 🛠️ Teknologi yang Digunakan

**Bagian Frontend (Klien):**
* HTML5 & CSS3
* [Vue.js 3](https://vuejs.org/) (via CDN) - Inti *framework* reaktivitas.
* [Vue Router 4](https://router.vuejs.org/) - Pengatur navigasi SPA.
* [Tailwind CSS](https://tailwindcss.com/) (via CDN) - *Styling* dan desain *Glassmorphism*.
* [Axios](https://axios-http.com/) - HTTP Client untuk komunikasi dengan API.

**Bagian Backend (Server & API):**
* [CodeIgniter 4](https://codeigniter.com/) - *Framework* PHP (REST API Controller).
* PHP 8.x
* MySQL / MariaDB - *Database* relasional.

---

## ⚙️ Cara Instalasi & Menjalankan Aplikasi

### Tahap 1: Persiapan Database
1. Pastikan XAMPP (Apache & MySQL) sudah berjalan.
2. Buka phpMyAdmin (`http://localhost/phpmyadmin`).
3. Buat *database* baru dengan nama `inventory_db` (atau sesuai nama yang digunakan di file `.env`).
4. *Import* file SQL yang telah disediakan (misal: `database.sql`) ke dalam *database* tersebut.

### Tahap 2: Menjalankan Backend (CodeIgniter 4 API)
1. Buka terminal/CMD, arahkan ke dalam folder `backend-api`.
2. Jika baru pertama kali, jalankan perintah: `composer install`
3. Salin file `env` menjadi `.env`, lalu atur koneksi *database* (username, password, nama database).
4. Pastikan sudah ada folder `uploads` di dalam `public/uploads` untuk menampung gambar.
5. Jalankan *server* backend dengan perintah:
```bash
   php spark serve
