import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        login: resolve(import.meta.dirname, 'ui/login.html'),
        uiHome: resolve(import.meta.dirname, 'ui/index.html'),
        register: resolve(import.meta.dirname, 'ui/register.html'),
        batches: resolve(import.meta.dirname, 'ui/batches.html'),
        verify: resolve(import.meta.dirname, 'ui/verify.html'),
        audit: resolve(import.meta.dirname, 'ui/audit.html'),
        holderDashboard: resolve(import.meta.dirname, 'ui/holder-dashboard.html'),
        issuerDashboard: resolve(import.meta.dirname, 'ui/issuer-dashboard.html'),
        verifierMailbox: resolve(import.meta.dirname, 'ui/verifier-mailbox.html')
      }
    }
  },
  server: {
    port: 3000,
    open: '/ui/login.html'
  }
});
