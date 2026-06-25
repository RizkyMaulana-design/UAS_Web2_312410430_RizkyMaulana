const Barang = {
    template: `
        <div class="p-6">
            <div class="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl relative z-10 mb-6">
                <h2 class="text-2xl font-bold text-white mb-6">Manajemen Data Barang</h2>
                
                <!-- Form Tambah -->
                <form @submit.prevent="simpanBarang" class="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input v-model="form.nama_barang" type="text" placeholder="Nama Barang" required class="px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500">
                    
                    <select v-model="form.kategori_id" required class="px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 text-slate-300">
                        <option value="" disabled>-- Pilih Kategori --</option>
                        <option v-for="kat in daftarKategori" :key="kat.id" :value="kat.id">{{ kat.nama_kategori }}</option>
                    </select>
                    
                    <input v-model="form.harga" type="number" placeholder="Harga Barang (Rp)" required class="px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500">
                    
                    <input v-model="form.stok" type="number" placeholder="Jumlah Stok" required class="px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500">
                    
                    <input @change="handleFileUpload" type="file" accept="image/*" class="col-span-1 md:col-span-2 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 transition-colors">
                    
                    <div class="col-span-1 md:col-span-2 flex justify-end mt-2">
                        <button type="submit" class="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-colors">Simpan Data Barang</button>
                    </div>
                </form>
            </div>

            <!-- Tabel Data -->
            <div class="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden relative z-10">
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-slate-300">
                        <thead class="bg-slate-900/80 text-slate-400 border-b border-slate-700/50">
                            <tr>
                                <th class="p-4">Foto</th>
                                <th class="p-4">Nama Barang</th>
                                <th class="p-4">Kategori</th>
                                <th class="p-4">Harga</th>
                                <th class="p-4">Stok</th>
                                <th class="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in barang" :key="item.id" class="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                <td class="p-4">
                                    <img v-if="item.gambar" :src="'http://rizky-inventory.rf.gd/api/public/uploads/' + item.gambar" class="w-16 h-16 object-cover rounded-xl shadow-md border border-slate-600">
                                    <div v-else class="w-16 h-16 bg-slate-800 border border-slate-600 rounded-xl flex items-center justify-center text-xs text-slate-500 italic">No Img</div>
                                </td>
                                <td class="p-4 font-semibold text-white">{{ item.nama_barang }}</td>
                                <td class="p-4"><span class="bg-slate-700/50 px-3 py-1 rounded-full text-xs">{{ item.nama_kategori }}</span></td>
                                <td class="p-4">Rp {{ item.harga }}</td>
                                <td class="p-4">{{ item.stok }}</td>
                                <td class="p-4 text-center">
                                    <button @click="hapusBarang(item.id)" class="bg-red-500/20 text-red-400 hover:bg-red-500/40 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">Hapus</button>
                                </td>
                            </tr>
                            <tr v-if="barang.length === 0">
                                <td colspan="6" class="p-6 text-center text-slate-500 italic">Belum ada data barang.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            barang: [],
            daftarKategori: [],
            form: { nama_barang: '', kategori_id: '', harga: '', stok: '' },
            fileGambar: null,
            apiUrlBarang: 'http://rizky-inventory.rf.gd/api/public/barang',
            apiUrlKategori: 'http://rizky-inventory.rf.gd/api/public/kategori'
        }
    },
    mounted() {
        this.fetchKategori();
        this.fetchBarang();
    },
    methods: {
        getAuthHeader() {
            return { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } };
        },
        async fetchKategori() {
            try {
                const res = await axios.get(this.apiUrlKategori, this.getAuthHeader());
                this.daftarKategori = res.data.data || res.data;
            } catch (err) { console.error('Gagal muat kategori', err); }
        },
        async fetchBarang() {
            try {
                const res = await axios.get(this.apiUrlBarang, this.getAuthHeader());
                this.barang = res.data.data || res.data;
            } catch (err) { console.error('Gagal muat barang', err); }
        },
        handleFileUpload(event) {
            this.fileGambar = event.target.files[0];
        },
        async simpanBarang() {
            try {
                let formData = new FormData();
                formData.append('nama_barang', this.form.nama_barang);
                formData.append('kategori_id', this.form.kategori_id);
                formData.append('harga', this.form.harga);
                formData.append('stok', this.form.stok);
                
                if (this.fileGambar) {
                    formData.append('gambar', this.fileGambar);
                }

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                };

                await axios.post(this.apiUrlBarang, formData, config);
                
                // Reset form setelah sukses simpan
                this.form = { nama_barang: '', kategori_id: '', harga: '', stok: '' };
                this.fileGambar = null;
                document.querySelector('input[type="file"]').value = '';
                
                this.fetchBarang();
            } catch (err) {
                alert('Gagal menyimpan barang');
            }
        },
        async hapusBarang(id) {
            if (confirm('Yakin ingin menghapus barang ini?')) {
                try {
                    await axios.delete(`${this.apiUrlBarang}/${id}`, this.getAuthHeader());
                    this.fetchBarang();
                } catch (err) {
                    alert('Gagal menghapus data');
                }
            }
        }
    }
};