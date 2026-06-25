const Login = {
    template: `
        <div class="flex items-center justify-center h-screen w-full relative z-10">
            <!-- Form Login Box -->
            <div class="w-full max-w-md p-8 bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl relative overflow-hidden">
                <!-- Efek cahaya dekoratif -->
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
                
                <div class="text-center mb-8 relative z-10">
                    <h2 class="text-3xl font-black text-white tracking-wider">E-INVENTORY</h2>
                    <p class="text-slate-400 mt-2 text-sm">Silakan login untuk masuk ke Panel Admin</p>
                </div>
                
                <form @submit.prevent="handleLogin" class="space-y-6 relative z-10">
                    <div>
                        <label class="block text-slate-300 text-sm font-semibold mb-2">Username</label>
                        <input v-model="username" type="text" required class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors" placeholder="Masukkan username">
                    </div>
                    <div>
                        <label class="block text-slate-300 text-sm font-semibold mb-2">Password</label>
                        <input v-model="password" type="password" required class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:border-blue-500 text-white placeholder-slate-500 transition-colors" placeholder="Masukkan password">
                    </div>
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all duration-300">
                        Masuk ke Sistem
                    </button>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async handleLogin() {
            try {
                // Endpoint diubah ke hosting InfinityFree
                const response = await axios.post('http://rizky-inventory.rf.gd/api/public/login', {
                    username: this.username,
                    password: this.password
                });
                
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('isLoggedIn', 'true');
                    window.location.hash = '/dashboard';
                    window.location.reload();
                }
            } catch (error) {
                alert('Login gagal! Pastikan Username dan Password sudah benar.');
            }
        }
    }
};