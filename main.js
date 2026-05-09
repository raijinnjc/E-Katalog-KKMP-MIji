/* ============================================================
   main.js — E-Katalog KKMP Miji
   Versi: Showcase Mode (konfirmasi stok via WhatsApp)
   ============================================================ */


// ──────────────────────────────────────────────────────────────
// KONFIGURASI — Ganti nomor WA dengan nomor aktif koperasi
// Format: 62 + nomor tanpa 0 di depan
// Contoh: 081234567890 → 6281234567890
// ──────────────────────────────────────────────────────────────
const WA_NUMBER = "628XXXXXXXXXX"; // ← Ganti ini

// Template pesan tanya stok (akan dilanjutkan dengan info produk)
const WA_INTRO   = "Halo KKMP Miji, saya ingin menanyakan ketersediaan produk berikut:";
const WA_CLOSING = "Mohon informasi stok dan harga terbaru. Terima kasih 🙏";


// ──────────────────────────────────────────────────────────────
// DATA PRODUK — const products
// Struktur tiap item:
//   id        : number (unik)
//   name      : string (nama produk)
//   subtitle  : string (ukuran / varian)
//   price     : number (harga dalam Rupiah, tanpa titik)
//   category  : "Sembako" | "ATK" | "Kebutuhan Rumah Tangga"
//   image     : string (URL gambar; ganti placehold.co dengan foto asli)
// ──────────────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    name: "Beras Premium",
    subtitle: "5 Kg / Karung",
    price: 72000,
    category: "Sembako",
    image: "https://placehold.co/400x300/FEF2F2/B91C1C?text=Beras+5+Kg",
  },
  {
    id: 2,
    name: "Minyak Goreng",
    subtitle: "2 Liter / Botol",
    price: 34000,
    category: "Sembako",
    image: "https://placehold.co/400x300/FEF2F2/B91C1C?text=Minyak+2L",
  },
  {
    id: 3,
    name: "Gula Pasir",
    subtitle: "1 Kg / Kemasan",
    price: 16500,
    category: "Sembako",
    image: "https://placehold.co/400x300/FEF2F2/B91C1C?text=Gula+Pasir",
  },
  {
    id: 4,
    name: "Mi Instan",
    subtitle: "1 Karton (40 bungkus)",
    price: 110000,
    category: "Sembako",
    image: "https://placehold.co/400x300/FEF2F2/B91C1C?text=Mi+Instan",
  },
  {
    id: 5,
    name: "Kopi Bubuk",
    subtitle: "250 gr / Kemasan",
    price: 22000,
    category: "Sembako",
    image: "https://placehold.co/400x300/FEF2F2/B91C1C?text=Kopi+250gr",
  },
  {
    id: 6,
    name: "Paket ATK Lengkap",
    subtitle: "Buku Tulis 10 pcs + Pulpen 3 pcs",
    price: 25000,
    category: "ATK",
    image: "https://placehold.co/400x300/EFF6FF/1D4ED8?text=Paket+ATK",
  },
  {
    id: 7,
    name: "Seragam Sekolah",
    subtitle: "Atasan + Bawahan (lengkap)",
    price: 185000,
    category: "Kebutuhan Rumah Tangga",
    image: "https://placehold.co/400x300/F0FDF4/15803D?text=Seragam+Sekolah",
  },
  {
    id: 8,
    name: "Deterjen Bubuk",
    subtitle: "1 Kg / Kemasan",
    price: 19000,
    category: "Kebutuhan Rumah Tangga",
    image: "https://placehold.co/400x300/F0FDF4/15803D?text=Deterjen+1Kg",
  },
];


// ──────────────────────────────────────────────────────────────
// UTILITAS
// ──────────────────────────────────────────────────────────────

/** Format angka ke Rupiah: 72000 → "Rp 72.000" */
function formatRupiah(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

/** Emoji per kategori */
function getCategoryIcon(category) {
  const map = {
    "Sembako":                "🌾",
    "ATK":                    "✏️",
    "Kebutuhan Rumah Tangga": "🏠",
  };
  return map[category] || "📦";
}

/**
 * Bangun URL WhatsApp untuk tanya stok — BUKAN langsung pesan.
 * Pesan yang dikirim berisi nama produk, ukuran, dan harga referensi
 * agar pengurus langsung mengerti produk yang ditanyakan.
 */
function buildWAUrl(product) {
  const pesan =
    `${WA_INTRO}\n\n` +
    `📦 *${product.name}*\n` +
    `   Ukuran/Varian : ${product.subtitle}\n` +
    `   Harga referensi: ${formatRupiah(product.price)}\n\n` +
    WA_CLOSING;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`;
}


// ──────────────────────────────────────────────────────────────
// RENDER KARTU PRODUK
// ──────────────────────────────────────────────────────────────
function renderProducts(list) {
  const grid       = document.getElementById("product-grid");
  const emptyState = document.getElementById("empty-state");
  const countNum   = document.getElementById("count-num");

  // Update jumlah produk yang tampil
  countNum.textContent = list.length;

  // Kosongkan grid
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }

  grid.classList.remove("hidden");
  emptyState.classList.add("hidden");

  list.forEach((product, index) => {
    const card = document.createElement("article");
    card.className = "product-card";
    // Stagger animasi: tiap kartu muncul sedikit lebih lambat
    card.style.animationDelay = `${index * 55}ms`;

    card.innerHTML = `
      <!-- Gambar produk -->
      <div class="product-image-wrap">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.src='https://placehold.co/400x300/F3F4F6/9CA3AF?text=Foto+Belum+Tersedia'"
        >
      </div>

      <!-- Isi kartu -->
      <div class="product-body">

        <!-- Badge kategori -->
        <div class="mb-2">
          <span class="category-badge">
            ${getCategoryIcon(product.category)} ${product.category}
          </span>
        </div>

        <!-- Nama & subtitle -->
        <p class="product-name">${product.name}</p>
        <p class="product-subtitle">${product.subtitle}</p>

        <!-- Harga referensi -->
        <p class="product-price">${formatRupiah(product.price)}</p>
        <span class="price-note">* harga referensi, konfirmasi via WA</span>

        <!-- Tombol tanya stok via WA -->
        <a
          href="${buildWAUrl(product)}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-tanya"
          aria-label="Tanya ketersediaan ${product.name} via WhatsApp"
        >
          <!-- Ikon WhatsApp -->
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Tanya via WhatsApp
        </a>

      </div>
    `;

    grid.appendChild(card);
  });
}


// ──────────────────────────────────────────────────────────────
// STATE FILTER & SEARCH
// ──────────────────────────────────────────────────────────────
let activeCategory = "semua";
let searchQuery    = "";

/** Gabungkan filter kategori + pencarian teks */
function getFilteredProducts() {
  return products.filter(p => {
    const matchCat    = activeCategory === "semua" || p.category === activeCategory;
    const q           = searchQuery.toLowerCase();
    const matchSearch = !q
      || p.name.toLowerCase().includes(q)
      || p.subtitle.toLowerCase().includes(q)
      || p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}


// ──────────────────────────────────────────────────────────────
// LIVE SEARCH
// ──────────────────────────────────────────────────────────────
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim();
  // Tampilkan / sembunyikan tombol X
  searchClear.classList.toggle("hidden", searchQuery === "");
  renderProducts(getFilteredProducts());
});

/** Reset: kosongkan pencarian & kembalikan ke "Semua" */
function resetSearch() {
  searchInput.value = "";
  searchQuery       = "";
  activeCategory    = "semua";
  searchClear.classList.add("hidden");

  // Reset pill aktif ke "Semua"
  document.querySelectorAll(".filter-pill").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === "semua");
  });

  renderProducts(products);
}


// ──────────────────────────────────────────────────────────────
// FILTER KATEGORI
// ──────────────────────────────────────────────────────────────
document.querySelectorAll(".filter-pill").forEach(btn => {
  btn.addEventListener("click", () => {
    // Update pill aktif
    document.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    activeCategory = btn.dataset.category;
    renderProducts(getFilteredProducts());
  });
});


// ──────────────────────────────────────────────────────────────
// STICKY HEADER — tambah shadow saat scroll
// ──────────────────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  document.getElementById("main-header")
    .classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });


// ──────────────────────────────────────────────────────────────
// MOBILE HAMBURGER MENU
// ──────────────────────────────────────────────────────────────
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu    = document.getElementById("mobile-menu");
const iconHamburger = document.getElementById("icon-hamburger");
const iconClose     = document.getElementById("icon-close");

mobileMenuBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden", isOpen);
  iconHamburger.classList.toggle("hidden", !isOpen);
  iconClose.classList.toggle("hidden", isOpen);
});

// Tutup menu mobile saat salah satu link diklik
mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    iconHamburger.classList.remove("hidden");
    iconClose.classList.add("hidden");
  });
});


// ──────────────────────────────────────────────────────────────
// INIT — render semua produk saat halaman pertama dibuka
// ──────────────────────────────────────────────────────────────
renderProducts(products);
