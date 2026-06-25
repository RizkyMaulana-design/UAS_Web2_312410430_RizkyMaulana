const Kategori = {
    template: `
        <div class="p-6">
            <div class="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-xl relative z-10 overflow-hidden">
                <h2 class="text-2xl font-bold text-white mb-6">Manajemen Data Kategori</h2>
                
                <!-- Form Tambah -->
                <form @submit.prevent="simpanKategori" class="mb-8 flex gap-4">
                    <input v-model="form.nama_kategori" type="text" placeholder="Nama Kategori Baru" required class="flex-1 px-4 py-2.5 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500">
                    <button type="submit" class="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-lg">Simpan Data</button>
                </form>

                <!-- Tabel Data -->
                <div class="overflow-x-auto rounded-xl border border-slate-700/50">
                    <table class="w-full text-left text-slate-300">
                        <thead class="bg-slate-900/80 text-slate-400">
                            <tr>
                                <th class="p-4">ID</th>
                                <th class="p-4">Nama Kategori</th>
                                <th class="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in kategori" :key="item.id" class="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                <td class="p-4">{{ item.id }}</td>
                                <td class="p-4 font-medium text-white">{{ item.nama_kategori }}</td>
                                <td class="p-4 text-center">
                                    <button @click="hapusKategori(item.id)" class="bg-red-500/20 text-red-400 hover:bg-red-500/40 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">Hapus</button>
                                </td>
                            </tr>
                            <tr v-if="kategori.length === 0">
                                <td colspan="3" class="p-6 text-center text-slate-500 italic">Belum ada data kategori.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            kategori: [],
            form: { nama_kategori: '' },
            apiUrl: 'http://rizky-inventory.rf.gd/api/public/kategori'
        }
    },
    mounted() {
        this.fetchKategori();
    },
    methods: {
        getAuthHeader() {
            return { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } };
        },
        async fetchKategori() {
            try {
                const res = await axios.get(this.apiUrl, this.getAuthHeader());
                this.kategori = res.data.data || res.data;
            } catch (err) {
                console.error('Gagal mengambil data kategori', err);
            }
        },
        async simpanKategori() {
            try {
                await axios.post(this.apiUrl, this.form, this.getAuthHeader());
                this.form.nama_kategori = '';
                this.fetchKategori();
            } catch (err) {
                alert('Gagal menyimpan kategori');
            }
        },
        async hapusKategori(id) {
            if (confirm('Yakin ingin menghapus kategori ini?')) {
                try {
                    await axios.delete(`${this.apiUrl}/${id}`, this.getAuthHeader());
                    this.fetchKategori();
                } catch (err) {
                    alert('Gagal menghapus data. Pastikan tidak ada barang yang terhubung dengan kategori ini.');
                }
            }
        }
    }
};