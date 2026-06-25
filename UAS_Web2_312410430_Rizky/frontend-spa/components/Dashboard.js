const Dashboard = {
    template: `
        <div class="p-8 h-full relative">
            <!-- Efek cahaya dekoratif yang elegan -->
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>

            <!-- Header Dashboard -->
            <div class="flex justify-between items-center mb-8 relative z-10">
                <div>
                    <h2 class="text-3xl font-extrabold text-white tracking-wide">Dashboard Overview</h2>
                    <p class="text-slate-400 text-sm mt-1">Selamat datang di Panel Administrator E-Inventory</p>
                </div>
                <div class="bg-slate-800/80 backdrop-blur-md border border-slate-700 px-5 py-2.5 rounded-xl text-slate-300 shadow-sm text-sm font-medium">
                    Halo, {{ namaUser }}! 👋
                </div>
            </div>

            <!-- Grid Menu Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                
                <!-- Card Kategori -->
                <div class="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-lg hover:bg-slate-800/60 transition-all duration-300">
                    <h3 class="text-2xl font-bold text-white mb-2">Menu Kategori</h3>
                    <p class="text-slate-400 mb-6 text-sm">Kelola data master pengelompokan barang inventaris Anda di sini.</p>
                    <router-link to="/kategori" class="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center">
                        Kelola Kategori <span class="ml-2">&rarr;</span>
                    </router-link>
                </div>

                <!-- Card Barang -->
                <div class="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-lg hover:bg-slate-800/60 transition-all duration-300">
                    <h3 class="text-2xl font-bold text-white mb-2">Menu Barang</h3>
                    <p class="text-slate-400 mb-6 text-sm">Kelola data stok, harga, dan nama barang inventaris Anda di sini.</p>
                    <router-link to="/barang" class="text-purple-400 hover:text-purple-300 font-semibold text-sm flex items-center">
                        Kelola Barang <span class="ml-2">&rarr;</span>
                    </router-link>
                </div>

            </div>
        </div>
    `,
    data() {
        return {
            namaUser: 'Rizky Maulana'
        }
    },
    mounted() {
        // Mengambil nama user dari sistem login
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.nama) {
            this.namaUser = user.nama;
        }
    }
};