/* ========================================
   PAWLINK — app.js
   All interactivity, data, and logic
======================================== */

// ===== DATA =====

const PETS_DATA = [
  { id: 1, name: "Mochi", type: "cat", emoji: "🐱", age: "~2 tháng", location: "ĐH Bách Khoa, Q.10", gender: "Cái", status: "urgent", vaccinated: false, neutered: false, fosterDays: 3, desc: "Mochi được phát hiện tại cổng trường trong tình trạng bị thương nhẹ ở chân. Hiện đã được sơ cứu và cần người nuôi tạm gấp. Rất thân thiện và không cắn.", tags: ["Mèo con", "Cần gấp", "Đang điều trị"], bgColor: "#FFF0E8", costs: "320,000 VNĐ" },
  { id: 2, name: "Bông", type: "dog", emoji: "🐶", age: "~6 tháng", location: "Hẻm Nguyễn Trãi, Q.5", gender: "Đực", status: "safe", vaccinated: true, neutered: false, fosterDays: 14, desc: "Bông là chú chó lai rất năng động và thân thiện. Đã được tiêm vaccine đầy đủ. Hòa đồng với trẻ em và mèo. Tìm gia đình có không gian rộng.", tags: ["Chó con", "Đã vaccine", "Thân thiện"], bgColor: "#E8F0FF", costs: "750,000 VNĐ" },
  { id: 3, name: "Pudding", type: "cat", emoji: "🐱", age: "~1 năm", location: "Ký túc xá ĐHQG, Thủ Đức", gender: "Cái", status: "watch", vaccinated: true, neutered: true, fosterDays: 7, desc: "Pudding là một cô mèo trắng rất hiền lành. Đã triệt sản và tiêm đủ vaccine. Thích nằm và chơi đùa nhẹ nhàng. Phù hợp với người sống trong căn hộ nhỏ.", tags: ["Đã vaccine", "Đã triệt sản", "Dễ nuôi"], bgColor: "#F0FFE8", costs: "1,100,000 VNĐ" },
  { id: 4, name: "Caramel", type: "dog", emoji: "🐕", age: "~3 tháng", location: "Công viên Tao Đàn, Q.1", gender: "Cái", status: "safe", vaccinated: false, neutered: false, fosterDays: 5, desc: "Caramel được tìm thấy một mình tại công viên. Tình trạng sức khỏe tốt, chỉ cần người yêu thương và chăm sóc. Rất hiếu động và ham chơi.", tags: ["Chó con", "Sức khỏe tốt", "Năng động"], bgColor: "#FFF8E0", costs: "150,000 VNĐ" },
  { id: 5, name: "Tàu Hũ", type: "cat", emoji: "😺", age: "~4 tháng", location: "Chợ Bến Thành, Q.1", gender: "Đực", status: "safe", vaccinated: true, neutered: false, fosterDays: 20, desc: "Tàu Hũ (vì màu vàng nhạt như tàu hũ) là chú mèo vô cùng nghịch ngợm. Đã được tiêm vaccine mũi đầu. Cần nhà nuôi có kinh nghiệm với mèo.", tags: ["Đã vaccine 1 mũi", "Nghịch ngợm", "Mèo đực"], bgColor: "#FFF0E8", costs: "450,000 VNĐ" },
  { id: 6, name: "Luna", type: "cat", emoji: "🐈", age: "~8 tháng", location: "ĐH Kinh tế TP.HCM", gender: "Cái", status: "urgent", vaccinated: false, neutered: false, fosterDays: 1, desc: "Luna mới được báo cáo hôm nay. Đang bị sốt và cần đưa đến phòng khám ngay. Cần người tình nguyện vận chuyển và nuôi tạm gấp.", tags: ["Cần cứu gấp", "Đang ốm", "Khẩn cấp"], bgColor: "#FFEAEA", costs: "0 VNĐ (mới)" },
  { id: 7, name: "Đậu Phộng", type: "dog", emoji: "🐩", age: "~2 năm", location: "Bình Dương (gần HCM)", gender: "Đực", status: "safe", vaccinated: true, neutered: true, fosterDays: 30, desc: "Đậu Phộng là chú chó trưởng thành rất điềm tĩnh. Đã triệt sản và tiêm đủ vaccine. Không sủa nhiều, thích ngủ và ăn. Phù hợp với người bận rộn.", tags: ["Đã vaccine", "Đã triệt sản", "Điềm tĩnh"], bgColor: "#E8FFF0", costs: "1,500,000 VNĐ" },
  { id: 8, name: "Oreo", type: "cat", emoji: "🐱", age: "~6 tháng", location: "ĐH Sư Phạm, Q.5", gender: "Đực", status: "watch", vaccinated: true, neutered: false, fosterDays: 10, desc: "Oreo có bộ lông đen trắng giống bánh Oreo. Tính cách vui vẻ, hay kêu meo meo. Đang chờ làm triệt sản. Người nhận nuôi cần ký cam kết triệt sản.", tags: ["Đã vaccine", "Chờ triệt sản", "Vui vẻ"], bgColor: "#F5E8FF", costs: "600,000 VNĐ" },
];

const MERCH_DATA = [
  { id: 1, name: "Áo Phông PAWGEN Classic", type: "apparel", emoji: "👕", price: 250000, desc: "Unisex, cotton 100%, in lưới cao cấp. Màu kem & xanh rừng.", badge: "Bán chạy nhất", bgColor: "#E8F0FF" },
  { id: 2, name: "Hoodie Cứu Hộ Hero", type: "apparel", emoji: "🧥", price: 480000, desc: "Nỉ ấm, có túi kangaroo. In slogan 'Rescue. Foster. Adopt.'", badge: "New", bgColor: "#FFF0E8" },
  { id: 3, name: "Tote Bag PawPrint", type: "accessory", emoji: "👜", price: 150000, desc: "Canvas dày, 2 quai chắc. In dấu chân thú cưng nghệ thuật.", badge: "Eco", bgColor: "#E8FFE8" },
  { id: 4, name: "Bộ Sticker PAWGEN Vol.1", type: "sticker", emoji: "🎨", price: 45000, desc: "12 sticker chống nước. Thiết kế chibi mèo chó cute.", badge: "45K", bgColor: "#FFF8E0" },
  { id: 5, name: "Mug Terracotta Cat", type: "homeware", emoji: "☕", price: 180000, desc: "Sứ cao cấp 350ml. Họa tiết mèo thủ công trên nền đất nung.", badge: null, bgColor: "#FFE8E8" },
  { id: 6, name: "Nón Bucket PAWGEN", type: "apparel", emoji: "🧢", price: 220000, desc: "Chất liệu chống nắng tốt. Thêu logo PAWGEN 3D.", badge: "Limited", bgColor: "#E8F5FF" },
  { id: 7, name: "Keychain Paw Charm", type: "accessory", emoji: "🔑", price: 65000, desc: "Hợp kim kẽm mạ vàng. Dấu chân thú cưng siêu cute.", badge: null, bgColor: "#F5E8FF" },
  { id: 8, name: "Gối Tựa Lưng Mochi", type: "homeware", emoji: "🛋️", price: 320000, desc: "Gối bông cao su non. In hình Mochi — mèo được cứu hộ đầu tiên của PAWGEN.", badge: "Story", bgColor: "#E8FFF5" },
  { id: 9, name: "Poster Art 'Every Life Counts'", type: "sticker", emoji: "🖼️", price: 95000, desc: "A3, in decal cao cấp không thấm nước. Thiết kế tranh nghệ thuật.", badge: null, bgColor: "#FFF0F5" },
];

const DONORS_DATA = [
  { name: "Minh Anh N.", avatar: "🌸", case: "Quỹ thú y chung", amount: "500,000đ", time: "5 phút trước" },
  { name: "Trường H.", avatar: "🌟", case: "Cứu hộ Luna", amount: "200,000đ", time: "12 phút trước" },
  { name: "Phương L.", avatar: "🎀", case: "Quỹ thức ăn", amount: "100,000đ", time: "28 phút trước" },
  { name: "Anonymous", avatar: "🐾", case: "Bất kỳ case cần nhất", amount: "1,000,000đ", time: "1 giờ trước" },
  { name: "Khoa B.", avatar: "⭐", case: "Cứu hộ Mochi", amount: "150,000đ", time: "2 giờ trước" },
];

const CASES_DATA = [
  { id: "PL-001", pet: "🐱 Mochi", location: "ĐH Bách Khoa", reporter: "Sinh viên K20", status: "urgent", step: "Điều trị thú y", time: "2 giờ trước" },
  { id: "PL-002", pet: "🐶 Bông", location: "Nguyễn Trãi Q.5", reporter: "Linh T.", status: "green", step: "Chờ nhận nuôi", time: "1 ngày trước" },
  { id: "PL-003", pet: "🐱 Luna", location: "ĐH Kinh Tế", reporter: "Hùng P.", status: "urgent", step: "Chờ vận chuyển", time: "30 phút trước" },
  { id: "PL-004", pet: "🐕 Caramel", location: "Tao Đàn Q.1", reporter: "Mai N.", status: "yellow", step: "Nuôi tạm", time: "3 ngày trước" },
  { id: "PL-005", pet: "😺 Tàu Hũ", location: "Chợ Bến Thành", reporter: "Hà P.", status: "blue", step: "Đã có người nhận", time: "5 ngày trước" },
  { id: "PL-006", pet: "🐈 Pudding", location: "ĐHQG Thủ Đức", reporter: "Khoa B.", status: "yellow", step: "Nuôi tạm", time: "1 tuần trước" },
];

const FOSTERS_DATA = [
  { name: "Nguyễn Minh Anh", area: "Quận 10", type: "Mèo", rating: 5, current: 1, max: 2, avatar: "🌸" },
  { name: "Trần Hoàng Hùng", area: "Thủ Đức", type: "Chó + Mèo", rating: 5, current: 0, max: 1, avatar: "🌟" },
  { name: "Lê Phương Linh", area: "Quận 3", type: "Mèo", rating: 4, current: 2, max: 2, avatar: "🎀" },
  { name: "Phạm Văn Khoa", area: "Bình Thạnh", type: "Chó", rating: 5, current: 1, max: 3, avatar: "⭐" },
  { name: "Võ Thị Mai", area: "Quận 7", type: "Mèo", rating: 4, current: 0, max: 2, avatar: "🌺" },
];

// Cart state
let cart = [];
let currentFilter = "all";
let currentMerchFilter = "all";
let currentDashTab = "overview";

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initNavAuth();
  initFloatingPaws();
  initCounters();
  initPetsGrid();
  initMerchGrid();
  initDonors();
  initDashboard();
  initForms();
  initFilterBtns();
  initMerchFilterBtns();
  initDashTabs();
  initDonateAmounts();
  initUploadZone();
  initMobileMenu();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

    // Active link
    const sections = ["hero", "adopt", "rescue", "foster", "volunteer", "dashboard", "donate", "merch"];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        links.forEach(l => l.classList.remove("active"));
        const activeLink = document.querySelector(`[data-section="${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  hamburger.addEventListener("click", () => mobileMenu.classList.add("open"));
  mobileClose.addEventListener("click", closeMobileMenu);
}

function closeMobileMenu() {
  document.getElementById("mobileMenu").classList.remove("open");
}

// ===== FLOATING PAWS =====
function initFloatingPaws() {
  const container = document.getElementById("floatingPaws");
  const paws = ["🐾", "🐱", "🐶", "❤️", "🐾"];

  for (let i = 0; i < 12; i++) {
    const paw = document.createElement("div");
    paw.classList.add("floating-paw");
    paw.textContent = paws[Math.floor(Math.random() * paws.length)];
    paw.style.left = `${Math.random() * 100}%`;
    paw.style.animationDuration = `${8 + Math.random() * 12}s`;
    paw.style.animationDelay = `${Math.random() * 15}s`;
    paw.style.fontSize = `${1 + Math.random() * 1.5}rem`;
    container.appendChild(paw);
  }
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll(".stat-num[data-target]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const start = Date.now();

  const tick = () => {
    const progress = Math.min((Date.now() - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

// ===== SCROLL UTIL =====
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ===== PETS GRID =====
function initPetsGrid() {
  // Merge hardcoded pets with admin-approved pets from localStorage
  try {
    const adminPets = JSON.parse(localStorage.getItem("pawgen_pets") || "[]");
    if (adminPets.length > 0) {
      // Add admin pets that aren't already in the list
      adminPets.forEach(p => {
        if (!PETS_DATA.find(existing => existing.id === p.id)) {
          PETS_DATA.push(p);
        }
      });
    }
  } catch (e) {}
  renderPets("all");
}

function renderPets(filter) {
  const grid = document.getElementById("petsGrid");
  let pets = PETS_DATA;

  if (filter === "cat") pets = pets.filter(p => p.type === "cat");
  else if (filter === "dog") pets = pets.filter(p => p.type === "dog");
  else if (filter === "urgent") pets = pets.filter(p => p.status === "urgent");
  else if (filter === "vaccinated") pets = pets.filter(p => p.vaccinated);

  grid.innerHTML = pets.map(p => `
    <div class="pet-adopt-card" onclick="openPetModal(${p.id})">
      <div class="pet-adopt-img" style="background:${p.bgColor}">
        <span>${p.emoji}</span>
        <span class="tag tag-${p.status === 'urgent' ? 'urgent' : p.status === 'watch' ? 'watch' : 'safe'}" style="position:absolute;top:12px;left:12px">
          ${p.status === 'urgent' ? '🔴 Cần gấp' : p.status === 'watch' ? '🟡 Theo dõi' : '🟢 An toàn'}
        </span>
      </div>
      <div class="pet-adopt-body">
        <div class="pet-adopt-name">${p.name}</div>
        <div class="pet-adopt-meta">${p.gender} · ${p.age} · ${p.location}</div>
        <div class="pet-adopt-tags">
          ${p.tags.map(t => `<span class="pet-tag">${t}</span>`).join("")}
        </div>
        <div class="pet-adopt-footer">
          <span class="pet-foster-time">Nuôi tạm: ${p.fosterDays} ngày</span>
          <button class="btn-primary" style="padding:0.4rem 0.85rem;font-size:0.8rem" onclick="event.stopPropagation();openPetModal(${p.id})">Xem chi tiết</button>
        </div>
      </div>
    </div>
  `).join("");
}

function initFilterBtns() {
  document.querySelectorAll(".filter-btn[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn[data-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderPets(currentFilter);
    });
  });
}

function showMorePets() {
  showToast("🐾 Hiện đã hiển thị tất cả thú cưng đang cần nhận nuôi!");
}

// ===== PET MODAL =====
function openPetModal(id) {
  const pet = PETS_DATA.find(p => p.id === id);
  if (!pet) return;

  document.getElementById("petModalContent").innerHTML = `
    <div class="pet-modal-grid">
      <div>
        <div class="pet-modal-img" style="background:${pet.bgColor}">${pet.emoji}</div>
      </div>
      <div class="pet-modal-info">
        <div class="pet-modal-tags">
          <span class="tag tag-${pet.status === 'urgent' ? 'urgent' : pet.status === 'watch' ? 'watch' : 'safe'}">
            ${pet.status === 'urgent' ? '🔴 Cần gấp' : pet.status === 'watch' ? '🟡 Theo dõi' : '🟢 An toàn'}
          </span>
          ${pet.vaccinated ? '<span class="pet-tag">💉 Đã vaccine</span>' : '<span class="pet-tag">Chưa vaccine</span>'}
          ${pet.neutered ? '<span class="pet-tag">✂️ Đã triệt sản</span>' : ''}
        </div>
        <h2 class="pet-adopt-name" style="font-size:2rem">${pet.name}</h2>
        <div class="pet-adopt-meta" style="margin-bottom:1rem">${pet.gender} · ${pet.age} · ${pet.location}</div>
        <p class="pet-modal-desc">${pet.desc}</p>
        <div class="pet-modal-stats">
          <div class="pet-stat"><div class="pet-stat-label">Thời gian nuôi tạm</div><div class="pet-stat-val">${pet.fosterDays} ngày</div></div>
          <div class="pet-stat"><div class="pet-stat-label">Chi phí đã dùng</div><div class="pet-stat-val">${pet.costs}</div></div>
          <div class="pet-stat"><div class="pet-stat-label">Loài</div><div class="pet-stat-val">${pet.type === 'cat' ? '🐱 Mèo' : '🐶 Chó'}</div></div>
          <div class="pet-stat"><div class="pet-stat-label">Giới tính</div><div class="pet-stat-val">${pet.gender}</div></div>
        </div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
          <button class="btn-primary" onclick="handleAdopt('${pet.name}')">❤️ Đăng ký nhận nuôi</button>
          <button class="btn-outline" onclick="handleDonate('${pet.name}')">💝 Donate cho ${pet.name}</button>
        </div>
      </div>
    </div>
  `;

  openModal("petModal");
}

function handleAdopt(name) {
  closeModal("petModal");
  showToast(`✅ Đăng ký nhận nuôi ${name} thành công! Chúng mình sẽ liên hệ bạn trong 24h.`);
}

function handleDonate(name) {
  closeModal("petModal");
  scrollToSection("donate");
  showToast(`💝 Hãy donate để giúp ${name} nhé!`);
}

// ===== MERCH =====
function initMerchGrid() {
  renderMerch("all");
}

function renderMerch(filter) {
  const grid = document.getElementById("merchGrid");
  let items = MERCH_DATA;
  if (filter !== "all") items = items.filter(m => m.type === filter);

  grid.innerHTML = items.map(m => `
    <div class="merch-card">
      <div class="merch-img" style="background:${m.bgColor}">
        <span>${m.emoji}</span>
        ${m.badge ? `<span class="merch-badge">${m.badge}</span>` : ""}
      </div>
      <div class="merch-body">
        <div class="merch-name">${m.name}</div>
        <div class="merch-sub">${m.desc}</div>
        <div class="merch-footer">
          <span class="merch-price">${formatPrice(m.price)}</span>
          <button class="btn-add-cart" onclick="addToCart(${m.id})">🛒 Thêm</button>
        </div>
      </div>
    </div>
  `).join("");
}

function initMerchFilterBtns() {
  document.querySelectorAll(".filter-btn[data-mfilter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn[data-mfilter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentMerchFilter = btn.dataset.mfilter;
      renderMerch(currentMerchFilter);
    });
  });
}

// ===== CART =====
function addToCart(id) {
  const item = MERCH_DATA.find(m => m.id === id);
  if (!item) return;

  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });

  updateCartFloat();
  showToast(`🛒 Đã thêm "${item.name}" vào giỏ!`);
}

function updateCartFloat() {
  const cartFloat = document.getElementById("cartFloat");
  const cartCount = document.getElementById("cartCount");
  const total = cart.reduce((s, c) => s + c.qty, 0);

  if (total > 0) {
    cartFloat.style.display = "flex";
    cartCount.textContent = total;
  } else {
    cartFloat.style.display = "none";
  }
}

function openCart() {
  const content = document.getElementById("cartContent");
  const footer = document.getElementById("cartFooter");

  if (cart.length === 0) {
    content.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--mid-gray)">🛒 Giỏ hàng trống<br/>Hãy chọn một vài món từ Merch Shop nhé!</div>`;
    footer.innerHTML = "";
  } else {
    content.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatPrice(item.price)} / cái</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span style="font-family:var(--font-mono);font-weight:700">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
        </div>
        <div style="font-family:var(--font-mono);font-weight:700;color:var(--terracotta);min-width:80px;text-align:right">
          ${formatPrice(item.price * item.qty)}
        </div>
      </div>
    `).join("");

    const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
    const donate30 = Math.round(total * 0.3);

    footer.innerHTML = `
      <div class="cart-total">
        <span>Tổng cộng</span>
        <span>${formatPrice(total)}</span>
      </div>
      <div class="cart-note">🌿 ${formatPrice(donate30)} (30%) sẽ vào quỹ cứu hộ PAWGEN</div>
      <button class="btn-primary w-full" onclick="checkout()">Thanh toán ngay →</button>
      <button class="btn-outline w-full" style="margin-top:0.5rem" onclick="closeModal('cartModal')">Tiếp tục mua sắm</button>
    `;
  }

  openModal("cartModal");
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  updateCartFloat();
  openCart(); // re-render
}

function checkout() {
  cart = [];
  updateCartFloat();
  closeModal("cartModal");
  showToast("🎉 Đặt hàng thành công! Cảm ơn bạn đã ủng hộ PAWGEN!");
}

function formatPrice(n) {
  return n.toLocaleString("vi-VN") + " VNĐ";
}

// ===== DONORS =====
function initDonors() {
  const list = document.getElementById("donorList");
  list.innerHTML = DONORS_DATA.map(d => `
    <div class="donor-item">
      <div class="donor-avatar">${d.avatar}</div>
      <div class="donor-info">
        <div class="donor-name">${d.name}</div>
        <div class="donor-case">${d.case} · ${d.time}</div>
      </div>
      <div class="donor-amount">${d.amount}</div>
    </div>
  `).join("");
}

// ===== DONATE AMOUNTS =====
function initDonateAmounts() {
  const btns = document.querySelectorAll(".donate-amt");
  const impact = document.getElementById("donateImpact");
  const customInput = document.getElementById("customDonate");

  const impactMap = {
    2000:  "1 gói thức ăn nhỏ cho thú cưng 🐾",
    5000:  "1 bữa ăn no cho thú cưng 🍚",
    10000: "1 ngày chăm sóc cơ bản 🐱",
    20000: "1 bát thức ăn + snack 🥣",
    50000: "1 buổi khám thú y 🏥",
  };

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      customInput.value = "";
      const amt = parseInt(btn.dataset.amt);
      impact.innerHTML = `✨ ${formatPrice(amt)} = ${impactMap[amt] || "Hỗ trợ cứu hộ"}`;
    });
  });

  customInput.addEventListener("input", () => {
    btns.forEach(b => b.classList.remove("active"));
    const val = parseInt(customInput.value) || 0;
    if (val > 0) {
      impact.innerHTML = `✨ ${formatPrice(val)} = Cảm ơn tấm lòng của bạn! 💝`;
    }
  });

  document.getElementById("donateBtn").addEventListener("click", () => {
    const activeBtn = document.querySelector(".donate-amt.active");
    const customVal = parseInt(customInput.value);
    const amt = customVal || (activeBtn ? parseInt(activeBtn.dataset.amt) : 0);

    if (!amt) { showToast("⚠️ Vui lòng chọn hoặc nhập số tiền donate!"); return; }

    showToast(`💝 Cảm ơn bạn đã donate ${formatPrice(amt)}! Đang chuyển đến cổng thanh toán...`);
  });
}

// ===== DASHBOARD =====
function initDashboard() {
  renderDashboard("overview");
}

function initDashTabs() {
  document.querySelectorAll(".dash-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".dash-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentDashTab = tab.dataset.tab;
      renderDashboard(currentDashTab);
    });
  });
}

function renderDashboard(tab) {
  const content = document.getElementById("dashboardContent");

  if (tab === "overview") {
    content.innerHTML = `
      <div class="dash-overview-grid">
        <div class="dash-metric">
          <span class="dash-metric-val">23</span>
          <span class="dash-metric-label">Cases đang xử lý</span>
          <div class="dash-metric-change">↑ 5 case mới hôm nay</div>
        </div>
        <div class="dash-metric" style="border-left-color:var(--gold)">
          <span class="dash-metric-val" style="color:var(--gold)">47</span>
          <span class="dash-metric-label">Foster đang hoạt động</span>
          <div class="dash-metric-change">↑ 3 người mới tuần này</div>
        </div>
        <div class="dash-metric" style="border-left-color:var(--forest-light)">
          <span class="dash-metric-val" style="color:var(--forest-light)">312</span>
          <span class="dash-metric-label">Thú đã nhận nuôi (tháng)</span>
          <div class="dash-metric-change">↑ 18% so với tháng trước</div>
        </div>
        <div class="dash-metric" style="border-left-color:#4D96FF">
          <span class="dash-metric-val" style="color:#4D96FF">47.2M</span>
          <span class="dash-metric-label">Quỹ donate (VNĐ)</span>
          <div class="dash-metric-change">↑ 8.3M tuần này</div>
        </div>
      </div>
      <div class="dash-chart-area">
        <div class="dash-chart-box">
          <h4>📊 Số ca cứu hộ theo tháng</h4>
          <div class="bar-chart">
            ${[{m:"T1",v:28},{m:"T2",v:35},{m:"T3",v:42},{m:"T4",v:38},{m:"T5",v:55},{m:"T6",v:48},{m:"T7",v:62},{m:"T8",v:71},{m:"T9",v:59},{m:"T10",v:78},{m:"T11",v:84},{m:"T12",v:91}].map(b => `
              <div class="bar-group">
                <div class="bar" style="height:${(b.v/91)*100}%" title="${b.v} ca"></div>
                <span class="bar-label">${b.m}</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="dash-chart-box">
          <h4>🥧 Phân loại động vật</h4>
          <div class="donut-placeholder"></div>
          <div class="dash-legend">
            <div class="dash-legend-item"><span class="legend-dot" style="background:var(--terracotta)"></span>Mèo (45%)</div>
            <div class="dash-legend-item"><span class="legend-dot" style="background:var(--gold)"></span>Chó (25%)</div>
            <div class="dash-legend-item"><span class="legend-dot" style="background:var(--forest-light)"></span>Đã nhận nuôi (15%)</div>
            <div class="dash-legend-item"><span class="legend-dot" style="background:var(--light-gray)"></span>Khác (15%)</div>
          </div>
        </div>
      </div>
    `;
  }

  else if (tab === "cases") {
    content.innerHTML = `
      <div style="overflow-x:auto">
        <table class="cases-table">
          <thead>
            <tr>
              <th>Mã case</th>
              <th>Thú cưng</th>
              <th>Vị trí</th>
              <th>Người báo</th>
              <th>Trạng thái</th>
              <th>Bước hiện tại</th>
              <th>Thời gian</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            ${CASES_DATA.map(c => `
              <tr>
                <td><span style="font-family:var(--font-mono);font-size:0.8rem">${c.id}</span></td>
                <td>${c.pet}</td>
                <td style="font-size:0.82rem;color:var(--mid-gray)">${c.location}</td>
                <td style="font-size:0.82rem">${c.reporter}</td>
                <td>
                  <span class="status-badge status-${c.status === 'urgent' ? 'red' : c.status === 'yellow' ? 'yellow' : c.status === 'blue' ? 'blue' : 'green'}">
                    ${c.status === 'urgent' ? '🔴 Khẩn cấp' : c.status === 'yellow' ? '🟡 Theo dõi' : c.status === 'blue' ? '🔵 Hoàn tất' : '🟢 Ổn định'}
                  </span>
                </td>
                <td style="font-size:0.82rem">${c.step}</td>
                <td style="font-size:0.78rem;color:var(--mid-gray)">${c.time}</td>
                <td>
                  <button onclick="showToast('📋 Xem chi tiết case ${c.id}')" style="padding:0.3rem 0.7rem;background:var(--terracotta);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:0.75rem;font-family:var(--font-body)">Xem</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  else if (tab === "fosters") {
    content.innerHTML = `
      <div class="pets-grid">
        ${FOSTERS_DATA.map(f => `
          <div class="foster-card" style="text-align:left">
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
              <div style="width:48px;height:48px;border-radius:50%;background:var(--cream-2);display:flex;align-items:center;justify-content:center;font-size:1.5rem">${f.avatar}</div>
              <div>
                <div style="font-weight:700">${f.name}</div>
                <div style="font-size:0.78rem;color:var(--mid-gray)">${f.area} · Nuôi: ${f.type}</div>
              </div>
              <div style="margin-left:auto;font-family:var(--font-mono);font-size:0.75rem;color:var(--gold)">⭐ ${f.rating}/5</div>
            </div>
            <div style="background:var(--cream);border-radius:8px;padding:0.75rem;margin-bottom:1rem">
              <div style="font-size:0.78rem;color:var(--mid-gray);margin-bottom:0.25rem">Sức chứa hiện tại</div>
              <div style="display:flex;gap:0.35rem">
                ${Array.from({length:f.max}).map((_,i) => `<div style="width:24px;height:24px;border-radius:50%;background:${i<f.current?'var(--terracotta)':'var(--light-gray)'};display:flex;align-items:center;justify-content:center;font-size:0.8rem">${i<f.current?'🐾':''}</div>`).join("")}
              </div>
              <div style="font-size:0.78rem;margin-top:0.25rem">${f.current}/${f.max} chỗ đang dùng</div>
            </div>
            <button onclick="showToast('📞 Liên hệ ${f.name} để giao thú cưng!')" class="btn-outline" style="width:100%;justify-content:center;padding:0.5rem;font-size:0.82rem">Liên hệ foster</button>
          </div>
        `).join("")}
      </div>
    `;
  }

  else if (tab === "campus") {
    content.innerHTML = `
      <div style="background:var(--cream);border-radius:var(--radius-md);padding:3rem;text-align:center">
        <div style="font-size:4rem;margin-bottom:1rem">🗺️</div>
        <h3 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:0.75rem">Bản đồ Campus</h3>
        <p style="color:var(--mid-gray);margin-bottom:2rem">Hiển thị phân bổ động vật bị bỏ rơi tại các trường đại học đối tác.</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;max-width:600px;margin:0 auto">
          ${[
            { uni:"ĐH Bách Khoa", count:8, color:"var(--red-urgent)" },
            { uni:"ĐH KHTN", count:3, color:"var(--yellow-watch)" },
            { uni:"ĐH Kinh Tế", count:5, color:"var(--red-urgent)" },
            { uni:"ĐH Sư Phạm", count:2, color:"var(--green-safe)" },
            { uni:"ĐHQG Thủ Đức", count:11, color:"var(--red-urgent)" },
            { uni:"ĐH Văn Lang", count:1, color:"var(--green-safe)" },
          ].map(u => `
            <div style="background:var(--white);border-radius:var(--radius-sm);padding:1rem;border-left:4px solid ${u.color}">
              <div style="font-size:0.8rem;font-weight:700;margin-bottom:0.25rem">${u.uni}</div>
              <div style="font-size:1.5rem;font-weight:900;font-family:var(--font-display);color:${u.color}">${u.count}</div>
              <div style="font-size:0.7rem;color:var(--mid-gray)">case đang xử lý</div>
            </div>
          `).join("")}
        </div>
        <button onclick="showToast('🗺️ Tính năng bản đồ interactive đang phát triển!')" class="btn-primary" style="margin-top:2rem">Mở bản đồ đầy đủ</button>
      </div>
    `;
  }
}

// ===== FORMS =====
function initForms() {
  // Rescue form
  document.getElementById("rescueForm").addEventListener("submit", e => {
    e.preventDefault();
    closeModal("rescueModal");
    showToast("🚨 Báo cáo cứu hộ đã được gửi! Volunteer sẽ liên hệ bạn trong 15 phút.");
    e.target.reset();
  });

  // Foster form
  document.getElementById("fosterForm").addEventListener("submit", e => {
    e.preventDefault();
    showToast("🏠 Đăng ký nuôi tạm thành công! Chúng mình sẽ liên hệ trong 24h.");
    e.target.reset();
  });

  // Volunteer form
  document.getElementById("volunteerForm").addEventListener("submit", e => {
    e.preventDefault();
    closeModal("volunteerModal");
    showToast("✅ Đơn đăng ký tình nguyện đã được gửi! Cảm ơn bạn rất nhiều!");
    e.target.reset();
  });
}

// ===== UPLOAD ZONE =====
function initUploadZone() {
  const zone = document.getElementById("uploadZone");
  const fileInput = document.getElementById("fileInput");

  zone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", e => {
    if (e.target.files[0]) {
      zone.innerHTML = `<span>✅ Đã tải ảnh: ${e.target.files[0].name}</span>`;
      zone.style.borderColor = "var(--forest-light)";
      zone.style.color = "var(--forest-light)";
    }
  });

  zone.addEventListener("dragover", e => {
    e.preventDefault();
    zone.style.borderColor = "var(--terracotta)";
  });
  zone.addEventListener("dragleave", () => zone.style.borderColor = "var(--light-gray)");
  zone.addEventListener("drop", e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      zone.innerHTML = `<span>✅ Đã tải ảnh: ${file.name}</span>`;
      zone.style.borderColor = "var(--forest-light)";
      zone.style.color = "var(--forest-light)";
    }
  });
}

// ===== MODALS =====
function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id).classList.remove("open");
  document.body.style.overflow = "";
}

// Close modal on overlay click
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", e => {
    if (e.target === overlay) {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
});

// Volunteer modal
function openVolunteerModal(role) {
  document.getElementById("volunteerRole").textContent = role;
  openModal("volunteerModal");
}

function openPartnerModal() {
  showToast("📧 Vui lòng liên hệ hello@pawgen.vn để hợp tác!");
}

// ===== TOAST =====
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3500);
}

// ===== KEYBOARD ESC =====
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach(m => {
      m.classList.remove("open");
      document.body.style.overflow = "";
    });
    closeMobileMenu();
  }
});

// ===== NAV AUTH =====
function initNavAuth() {
  const navAuth = document.getElementById("navAuth");
  if (!navAuth) return;

  const SESSION_KEY = "pawgen_session";
  let session = null;
  try { session = JSON.parse(localStorage.getItem(SESSION_KEY) || localStorage.getItem("pawlink_session")); } catch {}

  if (!session) {
    navAuth.innerHTML = `<a href="auth.html" class="btn-nav-login">👤 Đăng nhập</a>`;
  } else {
    const initial = session.name ? session.name.charAt(0).toUpperCase() : "U";
    const isAdmin = session.role === "admin";
    navAuth.innerHTML = `
      <div class="nav-user-pill">
        <div class="nav-avatar ${isAdmin ? 'admin-av' : ''}">${initial}</div>
        <span>${session.name.split(" ").slice(-1)[0]}</span>
        ${isAdmin ? '<span style="font-size:0.65rem;background:var(--forest);color:#fff;padding:0.1rem 0.4rem;border-radius:4px;margin-left:2px">Admin</span>' : ""}
        <div class="nav-dropdown">
          <div style="padding:0.75rem 1rem;border-bottom:1px solid var(--light-gray)">
            <div style="font-weight:700;font-size:0.85rem">${session.name}</div>
            <div style="font-size:0.72rem;color:var(--mid-gray)">${session.email || ""}</div>
          </div>
          ${isAdmin ? `<a href="admin.html" class="nav-dd-item">🛡️ Trang quản trị</a>` : ""}
          <a href="#rescue" class="nav-dd-item" onclick="scrollToSection('rescue')">🚨 Báo cứu hộ</a>
          <a href="#adopt" class="nav-dd-item" onclick="scrollToSection('adopt')">🐾 Tìm thú cưng</a>
          <div class="nav-dd-divider"></div>
          <button class="nav-dd-item danger" onclick="logoutUser()">⏻ Đăng xuất</button>
        </div>
      </div>
    `;
  }
}

function logoutUser() {
  localStorage.removeItem("pawgen_session");
  localStorage.removeItem("pawlink_session");
  window.location.reload();
}
