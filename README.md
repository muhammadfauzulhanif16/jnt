# Menjalankan Proyek Laravel

1. **Clone repositori**
    ```
    git clone https://github.com/muhammadfauzulhanif16/jnt.git
    ```
2. **Navigasi ke direktori proyek**
    ```
    cd jnt
    ```
3. **Instalasi dependensi Composer**
    ```
    composer install
    ```
4. **Salin file .env.example untuk membuat file .env Anda sendiri**
    ```
    cp .env.example .env
    ```
5. **Hasilkan kunci enkripsi aplikasi**
    ```
    php artisan key:generate
    ```
6. **Buat database kosong untuk aplikasi**
    - Di sistem manajemen database Anda, buat database baru.

7. **Konfigurasi file .env Anda**
    - Buka file .env di editor Anda.
    - Atur opsi konfigurasi `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` untuk mencocokkan kredensial database yang baru saja Anda buat.

8. **Jalankan migrasi database**
    ```
    php artisan migrate:fresh --seed
    ```
9. **Instalasi dependensi Node.js**
    ```
    npm install --legacy-peer-deps
    ```
10. **Jalankan server pengembangan**
    ```
    npm run dev
    ```
11. **Mulai server pengembangan lokal**
    ```
    php artisan serve
    ```
12. **Kunjungi aplikasi Laravel Anda**
    - Buka browser web Anda dan kunjungi `http://localhost:8000`.