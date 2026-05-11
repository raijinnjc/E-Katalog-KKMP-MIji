/* ============================================================
   main.js — E-Katalog KKMP Miji
   Versi: Showcase Mode — konfirmasi stok via WhatsApp
   Kontak Stok: Asrul +62 896-2796-0520
   ============================================================ */

// ── Konfigurasi WhatsApp ──
// Nomor Asrul (kontak stok): +62 896-2796-0520
const WA_NUMBER  = "6289627960520";
const WA_INTRO   = "Halo Kak Asrul, saya ingin menanyakan ketersediaan produk KKMP Miji berikut:";
const WA_CLOSING = "Mohon info stok dan harga terbaru. Terima kasih 🙏";

// ══════════════════════════════════════════════════════════════
// DATA PRODUK — 71 item
// Kategori: "Sembako" | "Minuman" | "Kebutuhan RT" | "Rokok" | "Lainnya"
// image: nama file foto lokal (taruh di folder sama dengan index.html)
// ══════════════════════════════════════════════════════════════
const products = [
  // ── A: BERAS ──────────────────────────────────────────────
  { id:  1, kode:"A1",  name:"Beras SPHP",                subtitle:"Per Karung",          price: 58000, category:"Sembako",       image:"foto-1-katalog.jpg"  },
  { id:  2, kode:"A2",  name:"Beras Alami Bramu",         subtitle:"5 Kg",                price: 80000, category:"Sembako",       image:"foto-2-katalog.jpg"  },
  { id:  3, kode:"A3",  name:"Beras Alami 64",            subtitle:"5 Kg",                price: 75000, category:"Sembako",       image:"foto-3-katalog.jpg"  },
  { id:  4, kode:"A4",  name:"Beras Ramos",               subtitle:"5 Kg",                price: 73500, category:"Sembako",       image:"foto-4-katalog.jpg"  },
  { id:  5, kode:"A5",  name:"Beras Zakat",               subtitle:"3 Kg",                price: 44000, category:"Sembako",       image:"foto-5-katalog.jpg"  },

  // ── B: MINYAK ─────────────────────────────────────────────
  { id:  6, kode:"B1",  name:"Minyak Kita",               subtitle:"1 Liter Refill",      price: 17500, category:"Sembako",       image:"foto-6-katalog.jpg"  },
  { id:  7, kode:"B2",  name:"Minyak Kita",               subtitle:"1 Liter Botol",       price: 17500, category:"Sembako",       image:"foto-7-katalog.jpg"  },
  { id:  8, kode:"B3",  name:"Minyak Kita",               subtitle:"2 Liter Refill",      price: 33000, category:"Sembako",       image:"foto-8-katalog.jpg"  },
  { id:  9, kode:"B4",  name:"Minyak Sunco",              subtitle:"2 Liter Refill",      price: 42000, category:"Sembako",       image:"foto-9-katalog.jpg"  },
  { id: 10, kode:"B5",  name:"Minyak Sunco",              subtitle:"1 Liter Refill",      price: 21000, category:"Sembako",       image:"foto-10-katalog.jpg" },
  { id: 11, kode:"B6",  name:"Minyak Sania",              subtitle:"1 Liter Refill",      price: 20000, category:"Sembako",       image:"foto-11-katalog.jpg" },

  // ── C: GULA ───────────────────────────────────────────────
  { id: 12, kode:"C1",  name:"Gula Pasir",                subtitle:"1 Kg",                price: 17500, category:"Sembako",       image:"foto-12-katalog.jpg" },
  { id: 13, kode:"C3",  name:"Gula Rose Brand",           subtitle:"1 Kg",                price: 17500, category:"Sembako",       image:"foto-13-katalog.jpg" },

  // ── D: MIE ────────────────────────────────────────────────
  { id: 14, kode:"D1",  name:"Indomie Goreng",            subtitle:"Per bungkus",         price:  3000, category:"Sembako",       image:"foto-14-katalog.jpg" },
  { id: 15, kode:"D2",  name:"Indomie Soto",              subtitle:"Per bungkus",         price:  3000, category:"Sembako",       image:"foto-15-katalog.jpg" },
  { id: 16, kode:"D3",  name:"Indomie Ayam Bawang",       subtitle:"Per bungkus",         price:  3000, category:"Sembako",       image:"foto-16-katalog.jpg" },
  { id: 17, kode:"D4",  name:"Indomie Rendang",           subtitle:"Per bungkus",         price:  3000, category:"Sembako",       image:"foto-17-katalog.jpg" },
  { id: 18, kode:"D5",  name:"Mie Sedaap Goreng",         subtitle:"Per bungkus",         price:  3000, category:"Sembako",       image:"foto-18-katalog.jpg" },
  { id: 19, kode:"D6",  name:"Mie Sedaap Soto",           subtitle:"Per bungkus",         price:  3000, category:"Sembako",       image:"foto-19-katalog.jpg" },
  { id: 20, kode:"D7",  name:"Mie Sedaap Ayam Bawang",    subtitle:"Per bungkus",         price:  3000, category:"Sembako",       image:"foto-20-katalog.jpg" },
  { id: 21, kode:"D8",  name:"Mie Sedaap Bakso",          subtitle:"Per bungkus",         price:  3000, category:"Sembako",       image:"foto-21-katalog.jpg" },
  { id: 22, kode:"D9",  name:"Mie Sedaap Cup Goreng",     subtitle:"Per cup",             price:  5000, category:"Sembako",       image:"foto-22-katalog.jpg" },
  { id: 23, kode:"D10", name:"Mie Sedaap Cup Kuah",       subtitle:"Per cup",             price:  5000, category:"Sembako",       image:"foto-23-katalog.jpg" },

  // ── F: KOPI ───────────────────────────────────────────────
  { id: 24, kode:"F1",  name:"Kopi Satu-Satu",            subtitle:"Renteng",             price:  9500, category:"Sembako",       image:"foto-24-katalog.jpg" },
  { id: 25, kode:"F2",  name:"Kopi Satu-Satu",            subtitle:"250 Gr",              price: 31000, category:"Sembako",       image:"foto-25-katalog.jpg" },
  { id: 26, kode:"F3",  name:"Kopi Luwak White Original", subtitle:"Renteng",             price: 15000, category:"Sembako",       image:"foto-26-katalog.jpg" },
  { id: 27, kode:"F4",  name:"Kopi Top Cappuccino",       subtitle:"25 Gr",               price: 20000, category:"Sembako",       image:"foto-27-katalog.jpg" },
  { id: 28, kode:"F5",  name:"Kopi Top Gula Aren",        subtitle:"Per renteng",         price: 15000, category:"Sembako",       image:"foto-28-katalog.jpg" },

  // ── G: TELUR ──────────────────────────────────────────────
  { id: 29, kode:"G",   name:"Telur Ayam",                subtitle:"Per Kg",              price: 26000, category:"Sembako",       image:"foto-29-katalog.jpg" },

  // ── N: BUMBU MASAK ────────────────────────────────────────
  { id: 57, kode:"N1",  name:"Masako Sapi",               subtitle:"Renteng 8,5 Gr",      price:    500, category:"Sembako",      image:"foto-57-katalog.jpg" },
  { id: 58, kode:"N2",  name:"Royco Sapi",                subtitle:"Renteng 8 Gr",        price:    500, category:"Sembako",      image:"foto-58-katalog.jpg" },
  { id: 59, kode:"Q",   name:"Kecap Sedap",               subtitle:"2 Rbu-an",            price:  4500, category:"Sembako",       image:"foto-59-katalog.jpg" },
  { id: 60, kode:"Q1",  name:"Kecap Bango",               subtitle:"265 Ml",              price:  9500, category:"Sembako",       image:"foto-60-katalog.jpg" },
  { id: 61, kode:"Q2",  name:"Kecap Bango",               subtitle:"720 Ml",              price: 26000, category:"Sembako",       image:"foto-61-katalog.jpg" },

  // ── M: MINUMAN ────────────────────────────────────────────
  { id: 49, kode:"M",   name:"Aquviva",                   subtitle:"Air Mineral",         price:  2500, category:"Minuman",       image:"foto-49-katalog.jpg" },
  { id: 50, kode:"M1",  name:"Golda Coffee",              subtitle:"200 Ml",              price:  3500, category:"Minuman",       image:"foto-50-katalog.jpg" },
  { id: 51, kode:"M2",  name:"Tras",                      subtitle:"220 Ml Btl Mini",     price:  1000, category:"Minuman",       image:"foto-51-katalog.jpg" },
  { id: 52, kode:"M3",  name:"Pocari Sweat",              subtitle:"350 Ml Botol",        price:  6000, category:"Minuman",       image:"foto-52-katalog.jpg" },
  { id: 53, kode:"M4",  name:"Pocari Sweat",              subtitle:"330 Ml Kaleng",       price:  5500, category:"Minuman",       image:"foto-53-katalog.jpg" },
  { id: 54, kode:"M5",  name:"Ion Water",                 subtitle:"350 Ml Botol",        price:  6000, category:"Minuman",       image:"foto-54-katalog.jpg" },
  { id: 55, kode:"M9",  name:"Jus Madu Bunga",            subtitle:"200 Ml Botol",        price:  6500, category:"Minuman",       image:"foto-55-katalog.jpg" },
  { id: 56, kode:"M6",  name:"Floridina",                 subtitle:"350 Ml Botol",        price:  3500, category:"Minuman",       image:"foto-56-katalog.jpg" },

  // ── H: SABUN CUCI ─────────────────────────────────────────
  { id: 30, kode:"H1",  name:"Sunlight",                  subtitle:"640 Ml",              price: 10500, category:"Kebutuhan RT",  image:"foto-30-katalog.jpg" },
  { id: 31, kode:"H2",  name:"Sabun Ekonomi",             subtitle:"122 Ml",              price:  4000, category:"Kebutuhan RT",  image:"foto-31-katalog.jpg" },
  { id: 32, kode:"H3",  name:"Sabun Ekonomi",             subtitle:"650 Ml",              price:  8000, category:"Kebutuhan RT",  image:"foto-32-katalog.jpg" },

  // ── I: DETERJEN & SOFTENER ────────────────────────────────
  { id: 33, kode:"I1",  name:"So Klin Softergent",        subtitle:"455 Gr",              price:  9500, category:"Kebutuhan RT",  image:"foto-33-katalog.jpg" },
  { id: 34, kode:"I2",  name:"So Klin Softergent",        subtitle:"43 Gr Renteng",       price:  5500, category:"Kebutuhan RT",  image:"foto-34-katalog.jpg" },
  { id: 35, kode:"I3",  name:"So Klin Softener",          subtitle:"65 Ml",               price:  5500, category:"Kebutuhan RT",  image:"foto-35-katalog.jpg" },
  { id: 36, kode:"I4",  name:"So Klin Liquid Jumbo",      subtitle:"Per botol",           price:  5500, category:"Kebutuhan RT",  image:"foto-36-katalog.jpg" },
  { id: 37, kode:"I5",  name:"So Klin Liquid",            subtitle:"Renteng 22 Ml",       price:  5500, category:"Kebutuhan RT",  image:"foto-37-katalog.jpg" },
  { id: 38, kode:"I6",  name:"Daia",                      subtitle:"46 Gr Renteng",       price:  5500, category:"Kebutuhan RT",  image:"foto-38-katalog.jpg" },
  { id: 39, kode:"I7",  name:"Royale",                    subtitle:"13 Ml Renteng",       price:  5500, category:"Kebutuhan RT",  image:"foto-39-katalog.jpg" },
  { id: 40, kode:"I8",  name:"Royale Pouch Hijab",        subtitle:"650 Ml",              price: 19500, category:"Kebutuhan RT",  image:"foto-40-katalog.jpg" },
  { id: 41, kode:"I9",  name:"Royale Pouch",              subtitle:"680 Ml",              price: 18500, category:"Kebutuhan RT",  image:"foto-41-katalog.jpg" },

  // ── K: TISU ───────────────────────────────────────────────
  { id: 42, kode:"K1",  name:"Tisu Jolly",                subtitle:"Per pack",            price:  7000, category:"Kebutuhan RT",  image:"foto-42-katalog.jpg" },
  { id: 43, kode:"K2",  name:"Tisu Tessa",                subtitle:"Per pack",            price: 10500, category:"Kebutuhan RT",  image:"foto-43-katalog.jpg" },
  { id: 44, kode:"K3",  name:"Tisu Dapur Nature",         subtitle:"Per roll",            price:  7000, category:"Kebutuhan RT",  image:"foto-44-katalog.jpg" },
  { id: 45, kode:"K4",  name:"Tisu Paseo",                subtitle:"Per pack",            price:  8500, category:"Kebutuhan RT",  image:"foto-45-katalog.jpg" },

  // ── L: PERAWATAN DIRI ────────────────────────────────────
  { id: 46, kode:"L",   name:"Sabun Mandi Nuvo",          subtitle:"Banded",              price: 10000, category:"Kebutuhan RT",  image:"foto-46-katalog.jpg" },
  { id: 47, kode:"L1",  name:"Ciptadent",                 subtitle:"75 Gr",               price:  4500, category:"Kebutuhan RT",  image:"foto-47-katalog.jpg" },
  { id: 48, kode:"L3",  name:"Sampo Zinc",                subtitle:"10 Ml",               price:  2500, category:"Kebutuhan RT",  image:"foto-48-katalog.jpg" },

  // ── W: LPG ────────────────────────────────────────────────
  { id: 70, kode:"W",   name:"LPG 3 Kg Refill",           subtitle:"Isi ulang",           price: 19000, category:"Kebutuhan RT",  image:"foto-70-katalog.jpg" },
  { id: 71, kode:"W1",  name:"Tabung LPG 3 Kg",           subtitle:"Termasuk tabung",     price:180000, category:"Kebutuhan RT",  image:"foto-71-katalog.jpg" },

  // ── U: ROKOK ──────────────────────────────────────────────
  { id: 64, kode:"U1",  name:"Rokok Magnum",              subtitle:"Per bungkus",         price: 27000, category:"Rokok",         image:"foto-64-katalog.jpg" },
  { id: 65, kode:"U2",  name:"Rokok Surya 12",            subtitle:"Per bungkus",         price: 27000, category:"Rokok",         image:"foto-65-katalog.jpg" },
  { id: 66, kode:"U3",  name:"Rokok 76 Apel",             subtitle:"Per bungkus",         price: 15000, category:"Rokok",         image:"foto-66-katalog.jpg" },
  { id: 67, kode:"U4",  name:"Rokok AGA",                 subtitle:"Per bungkus",         price: 16500, category:"Rokok",         image:"foto-67-katalog.jpg" },
  { id: 68, kode:"U5",  name:"Rokok Warung Kopi",         subtitle:"Per bungkus",         price: 11000, category:"Rokok",         image:"foto-68-katalog.jpg" },
  { id: 69, kode:"U6",  name:"Rokok Andalan Filter",      subtitle:"Merah, per bungkus",  price: 17000, category:"Rokok",         image:"foto-69-katalog.jpg" },

  // ── LAINNYA ───────────────────────────────────────────────
  { id: 62, kode:"S1",  name:"Soyjoy",                    subtitle:"30 Gr",               price:  8500, category:"Lainnya",       image:"foto-62-katalog.jpg" },
  { id: 63, kode:"T",   name:"Materai",                   subtitle:"Per lembar",          price: 12000, category:"Lainnya",       image:"foto-63-katalog.jpg" },
];


// ══════════════════════════════════════════════════════════════
// UTILITAS
// ══════════════════════════════════════════════════════════════

function formatRupiah(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

function getCategoryIcon(cat) {
  return { "Sembako":"🌾", "Minuman":"🥤", "Kebutuhan RT":"🏠", "Rokok":"🚬", "Lainnya":"📦" }[cat] || "📦";
}

function getCategoryColor(cat) {
  return {
    "Sembako":      "badge-sembako",
    "Minuman":      "badge-minuman",
    "Kebutuhan RT": "badge-rt",
    "Rokok":        "badge-rokok",
    "Lainnya":      "badge-lainnya",
  }[cat] || "";
}

/** Bangun URL WhatsApp — pesan tanya stok ke Asrul */
function buildWAUrl(product) {
  const msg =
    `${WA_INTRO}\n\n` +
    `📦 *${product.name}*\n` +
    `   Varian  : ${product.subtitle}\n` +
    `   Kode    : ${product.kode}\n` +
    `   Harga ref: ${formatRupiah(product.price)}\n\n` +
    WA_CLOSING;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}


// ══════════════════════════════════════════════════════════════
// RENDER KARTU PRODUK
// ══════════════════════════════════════════════════════════════
function renderProducts(list) {
  const grid       = document.getElementById("product-grid");
  const emptyState = document.getElementById("empty-state");
  const countNum   = document.getElementById("count-num");

  countNum.textContent = list.length;
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.classList.add("hidden");
    emptyState.classList.remove("hidden");
    return;
  }

  grid.classList.remove("hidden");
  emptyState.classList.add("hidden");

  list.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.style.animationDelay = `${i * 40}ms`;

    card.innerHTML = `
      <div class="product-image-wrap">
        <img
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
          onerror="this.onerror=null; this.src='https://placehold.co/400x300/F3F4F6/9CA3AF?text=Foto+Belum+Ada'"
        >
        <!-- Kode produk di sudut kiri atas -->
        <span class="kode-badge">${p.kode}</span>
      </div>
      <div class="product-body">
        <div class="mb-2">
          <span class="category-badge ${getCategoryColor(p.category)}">
            ${getCategoryIcon(p.category)} ${p.category}
          </span>
        </div>
        <p class="product-name">${p.name}</p>
        <p class="product-subtitle">${p.subtitle}</p>
        <p class="product-price">${formatRupiah(p.price)}</p>
        <span class="price-note">* harga referensi, konfirmasi via WA</span>
        <a
          href="${buildWAUrl(p)}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-tanya"
          aria-label="Tanya stok ${p.name} via WhatsApp"
        >
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Tanya via WhatsApp
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}


// ══════════════════════════════════════════════════════════════
// STATE & FILTER LOGIC
// ══════════════════════════════════════════════════════════════
let activeCategory = "semua";
let searchQuery    = "";

function getFilteredProducts() {
  return products.filter(p => {
    const matchCat    = activeCategory === "semua" || p.category === activeCategory;
    const q           = searchQuery.toLowerCase();
    const matchSearch = !q
      || p.name.toLowerCase().includes(q)
      || p.subtitle.toLowerCase().includes(q)
      || p.category.toLowerCase().includes(q)
      || p.kode.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}

// Live search
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim();
  searchClear.classList.toggle("hidden", searchQuery === "");
  renderProducts(getFilteredProducts());
});

function resetSearch() {
  searchInput.value = "";
  searchQuery       = "";
  activeCategory    = "semua";
  searchClear.classList.add("hidden");
  document.querySelectorAll(".filter-pill").forEach(b =>
    b.classList.toggle("active", b.dataset.category === "semua")
  );
  renderProducts(products);
}

// Filter pills
document.querySelectorAll(".filter-pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderProducts(getFilteredProducts());
  });
});


// ══════════════════════════════════════════════════════════════
// STICKY HEADER shadow on scroll
// ══════════════════════════════════════════════════════════════
window.addEventListener("scroll", () => {
  document.getElementById("main-header")
    .classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });


// ══════════════════════════════════════════════════════════════
// MOBILE MENU TOGGLE
// ══════════════════════════════════════════════════════════════
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

mobileMenu.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    iconHamburger.classList.remove("hidden");
    iconClose.classList.add("hidden");
  })
);


// ══════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════
renderProducts(products);
