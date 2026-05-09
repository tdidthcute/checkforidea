/* ========================================
   PAWCONNECT — app.js
   All interactivity, data, and logic
   Version: MVP with QR, Pet Therapy, Donation Tracking
======================================== */

// ===== DATA =====
// Key localStorage
const STORAGE_KEYS = {
  PETS: "pawlink_pets",
  PENDING: "pawlink_pending",
  USERS: "pawlink_users",
  DONATIONS: "pawlink_donations",
  FOSTER_REQUESTS: "pawlink_foster_requests",
  RESCUE_REPORTS: "pawlink_rescue_reports",
  VOLUNTEERS_LOCATION: "pawlink_volunteers_location",
  THERAPY_BOOKINGS: "pawlink_therapy_bookings"
};

const PETS_DATA = [
  { id: 1, name: "Mochi", type: "cat", emoji: "🐱", age: "~2 tháng", location: "ĐH Bách Khoa, Q.10", gender: "Cái", status: "urgent", vaccinated: false, neutered: false, fosterDays: 3, desc: "Mochi được phát hiện tại cổng trường trong tình trạng bị thương nhẹ ở chân. Hiện đã được sơ cứu và cần người nuôi tạm gấp. Rất thân thiện và không cắn.", tags: ["Mèo con", "Cần gấp", "Đang điều trị"], bgColor: "#FFF0E8", costs: "320,000 VNĐ", qrCode: "" },
  { id: 2, name: "Bông", type: "dog", emoji: "🐶", age: "~6 tháng", location: "Hẻm Nguyễn Trãi, Q.5", gender: "Đực", status: "safe", vaccinated: true, neutered: false, fosterDays: 14, desc: "Bông là chú chó lai rất năng động và thân thiện. Đã được tiêm vaccine đầy đủ. Hòa đồng với trẻ em và mèo.", tags: ["Chó con", "Đã vaccine", "Thân thiện"], bgColor: "#E8F0FF", costs: "750,000 VNĐ", qrCode: "" },
  { id: 3, name: "Pudding", type: "cat", emoji: "🐱", age: "~1 năm", location: "Ký túc xá ĐHQG, Thủ Đức", gender: "Cái", status: "watch", vaccinated: true, neutered: true, fosterDays: 7, desc: "Pudding là một cô mèo trắng rất hiền lành. Đã triệt sản và tiêm đủ vaccine.", tags: ["Đã vaccine", "Đã triệt sản", "Dễ nuôi"], bgColor: "#F0FFE8", costs: "1,100,000 VNĐ", qrCode: "" },
  { id: 4, name: "Caramel", type: "dog", emoji: "🐕", age: "~3 tháng", location: "Công viên Tao Đàn, Q.1", gender: "Cái", status: "safe", vaccinated: false, neutered: false, fosterDays: 5, desc: "Caramel được tìm thấy một mình tại công viên. Tình trạng sức khỏe tốt.", tags: ["Chó con", "Sức khỏe tốt", "Năng động"], bgColor: "#FFF8E0", costs: "150,000 VNĐ", qrCode: "" },
  { id: 5, name: "Tàu Hũ", type: "cat", emoji: "😺", age: "~4 tháng", location: "Chợ Bến Thành, Q.1", gender: "Đực", status: "safe", vaccinated: true, neutered: false, fosterDays: 20, desc: "Tàu Hũ là chú mèo vô cùng nghịch ngợm. Đã được tiêm vaccine mũi đầu.", tags: ["Đã vaccine 1 mũi", "Nghịch ngợm"], bgColor: "#FFF0E8", costs: "450,000 VNĐ", qrCode: "" },
  { id: 6, name: "Luna", type: "cat", emoji: "🐈", age: "~8 tháng", location: "ĐH Kinh tế TP.HCM", gender: "Cái", status: "urgent", vaccinated: false, neutered: false, fosterDays: 1, desc: "Luna mới được báo cáo hôm nay. Đang bị sốt và cần đưa đến phòng khám ngay.", tags: ["Cần cứu gấp", "Đang ốm", "Khẩn cấp"], bgColor: "#FFEAEA", costs: "0 VNĐ", qrCode: "" },
  { id: 7, name: "Đậu Phộng", type: "dog", emoji: "🐩", age: "~2 năm", location: "Bình Dương", gender: "Đực", status: "safe", vaccinated: true, neutered: true, fosterDays: 30, desc: "Đậu Phộng là chú chó trưởng thành rất điềm tĩnh.", tags: ["Đã vaccine", "Đã triệt sản", "Điềm tĩnh"], bgColor: "#E8FFF0", costs: "1,500,000 VNĐ", qrCode: "" },
  { id: 8, name: "Oreo", type: "cat", emoji: "🐱", age: "~6 tháng", location: "ĐH Sư Phạm, Q.5", gender: "Đực", status: "watch", vaccinated: true, neutered: false, fosterDays: 10, desc: "Oreo có bộ lông đen trắng giống bánh Oreo.", tags: ["Đã vaccine", "Chờ triệt sản", "Vui vẻ"], bgColor: "#F5E8FF", costs: "600,000 VNĐ", qrCode: "" },
];

const MERCH_DATA = [
  { id: 1, name: "Áo Phông PAWCONNECT Classic", type: "apparel", emoji: "👕", price: 250000, desc: "Unisex, cotton 100%, in lưới cao cấp.", badge: "Bán chạy nhất", bgColor: "#E8F0FF", campus: "all" },
  { id: 2, name: "Hoodie Bách Khoa Edition", type: "apparel", emoji: "🧥", price: 480000, desc: "Nỉ ấm, có in logo ĐH Bách Khoa.", badge: "Campus", bgColor: "#FFF0E8", campus: "bachkhoa" },
  { id: 3, name: "Tote Bag Kinh Tế Edition", type: "accessory", emoji: "👜", price: 150000, desc: "Canvas dày, in logo ĐH Kinh tế.", badge: "Campus", bgColor: "#E8FFE8", campus: "kinhte" },
  { id: 4, name: "Bộ Sticker PAWCONNECT Vol.1", type: "sticker", emoji: "🎨", price: 45000, desc: "12 sticker chống nước. Thiết kế chibi mèo chó cute.", badge: "45K", bgColor: "#FFF8E0", campus: "all" },
  { id: 5, name: "Blindbox Mèo Bí Ẩn", type: "blindbox", emoji: "📦", price: 89000, desc: "Mở hộp bất ngờ! Sưu tầm 6 loại mèo khác nhau.", badge: "Hot", bgColor: "#FFE8E8", campus: "all" },
  { id: 6, name: "Nón Sư Phạm Edition", type: "apparel", emoji: "🧢", price: 220000, desc: "Chất liệu chống nắng tốt. Thêu logo ĐH Sư Phạm.", badge: "Campus", bgColor: "#E8F5FF", campus: "supham" },
  { id: 7, name: "Keychain KHTN Edition", type: "accessory", emoji: "🔑", price: 65000, desc: "Hợp kim kẽm mạ vàng. Logo ĐH KHTN.", badge: "Campus", bgColor: "#F5E8FF", campus: "khhtn" },
  { id: 8, name: "Blindbox Chó Siêu Quậy", type: "blindbox", emoji: "📦", price: 89000, desc: "Sưu tầm 6 loại chó cute.", badge: "New", bgColor: "#E8FFF5", campus: "all" },
  { id: 9, name: "Ốp Điện Thoại Bách Khoa", type: "accessory", emoji: "📱", price: 120000, desc: "Ốp silicon, in hình trường Bách Khoa.", badge: "Campus", bgColor: "#FFF0F5", campus: "bachkhoa" },
];

const DONORS_DATA = [
  { name: "Minh Anh N.", avatar: "🌸", case: "Quỹ thú y chung", amount: "500,000đ", time: "5 phút trước" },
  { name: "Trường H.", avatar: "🌟", case: "Cứu hộ Luna", amount: "200,000đ", time: "12 phút trước" },
  { name: "Phương L.", avatar: "🎀", case: "Quỹ thức ăn", amount: "100,000đ", time: "28 phút trước" },
  { name: "Anonymous", avatar: "🐾", case: "Bất kỳ case cần nhất", amount: "1,000,000đ", time: "1 giờ trước" },
  { name: "Khoa B.", avatar: "⭐", case: "Cứu hộ Mochi", amount: "150,000đ", time: "2 giờ trước" },
];

// Cart state
let cart = [];
let currentFilter = "all";
let currentMerchFilter = "all";
let currentCampusFilter = "all";
let currentDashTab = "overview";

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initFloatingPaws();
  initCounters();
  initPetsGrid();
  initQRGrid();
  initMerchGrid();
  initDonors();
  initDashboard();
  initForms();
  initFilterBtns();
  initCampusFilterBtns();
  initMerchFilterBtns();
  initDashTabs();
  initDonateAmounts();
  initUploadZone();
  initMobileMenu();
  loadDonationHistory();
  updateTotalFund();
});

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

    const sections = ["hero", "adopt", "qr-profile", "pet-therapy", "rescue", "foster", "volunteer", "dashboard", "donate", "merch"];
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

  if (hamburger) hamburger.addEventListener("click", () => mobileMenu.classList.add("open"));
  if (mobileClose) mobileClose.addEventListener("click", closeMobileMenu);
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
    if (container) container.appendChild(paw);
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

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ===== PETS GRID =====
function initPetsGrid() {
  try {
    const adminPets = JSON.parse(localStorage.getItem(STORAGE_KEYS.PETS) || "[]");
    if (adminPets.length > 0) {
      adminPets.forEach(p => {
        if (!PETS_DATA.find(existing => existing.id === p.id)) {
          PETS_DATA.push(p);
        }
      });
    }
  } catch (e) {}
  // Generate QR cho từng pet
  PETS_DATA.forEach(pet => {
    pet.qrCode = generateQRCode(pet.id, pet.name);
  });
  renderPets("all");
}

function generateQRCode(petId, petName) {
  const petUrl = `${window.location.origin}/pet.html?id=${petId}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(petUrl)}`;
}

function renderPets(filter) {
  const grid = document.getElementById("petsGrid");
  if (!grid) return;
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

// ===== QR GRID (THÊM MỚI) =====
function initQRGrid() {
  renderQRGrid();
}

function renderQRGrid() {
  const grid = document.getElementById("qrGrid");
  if (!grid) return;
  
  const topPets = PETS_DATA.slice(0, 6);
  grid.innerHTML = topPets.map(pet => `
    <div class="qr-card">
      <div class="qr-card-header" style="background:${pet.bgColor}">
        <span class="qr-emoji">${pet.emoji}</span>
        <h3 class="qr-name">${pet.name}</h3>
      </div>
      <div class="qr-card-body">
        <img src="${pet.qrCode}" alt="QR code for ${pet.name}" class="qr-image">
        <div class="qr-info">
          <p><strong>📍 ${pet.location}</strong></p>
          <p>📅 ${pet.age} · ${pet.gender}</p>
          <p>💉 ${pet.vaccinated ? "Đã vaccine" : "Chưa vaccine"}</p>
        </div>
        <button class="btn-outline" onclick="window.open('pet.html?id=${pet.id}', '_blank')">🔍 Xem hành trình</button>
      </div>
    </div>
  `).join("");
}

// ===== PET THERAPY EVENTS (THÊM MỚI) =====
function bookEvent(eventType) {
  const prices = {
    'coffee-cats': 50000,
    'puppy-therapy': 80000,
    'yoga-cats': 120000
  };
  
  const eventNames = {
    'coffee-cats': 'Coffee & Cats',
    'puppy-therapy': 'Puppy Therapy',
    'yoga-cats': 'Yoga with Cats'
  };
  
  // Lưu booking
  const bookings = JSON.parse(localStorage.getItem(STORAGE_KEYS.THERAPY_BOOKINGS) || '[]');
  bookings.push({
    id: Date.now(),
    event: eventType,
    eventName: eventNames[eventType],
    amount: prices[eventType],
    time: new Date().toISOString(),
    status: 'pending'
  });
  localStorage.setItem(STORAGE_KEYS.THERAPY_BOOKINGS, JSON.stringify(bookings));
  
  showToast(`🎉 Đặt vé ${eventNames[eventType]} thành công! Vui lòng chuyển khoản ${prices[eventType].toLocaleString()} VNĐ`);
}

// ===== FOSTER MATCHING =====
function requestFoster(petId) {
  const pet = PETS_DATA.find(p => p.id === petId);
  if (!pet) return;
  
  const fosterRequests = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOSTER_REQUESTS) || '[]');
  fosterRequests.push({
    id: Date.now(),
    petId: petId,
    petName: pet.name,
    userId: getCurrentUser()?.id || 'guest',
    status: 'pending',
    requestTime: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEYS.FOSTER_REQUESTS, JSON.stringify(fosterRequests));
  showToast(`✅ Đã gửi yêu cầu nuôi tạm cho bé ${pet.name}! Chúng tôi sẽ liên hệ sớm.`);
}

// ===== DONATION TRACKING =====
function initDonateAmounts() {
  const btns = document.querySelectorAll(".donate-amt");
  const impact = document.getElementById("donateImpact");
  const customInput = document.getElementById("customDonate");

  const impactMap = {
    20000: "1 bát thức ăn cho thú cưng",
    50000: "1 buổi khám thú y",
    100000: "1 liều vaccine cơ bản",
    200000: "Thức ăn cho 1 tuần nuôi tạm",
    500000: "1 ca phẫu thuật nhỏ"
  };

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (customInput) customInput.value = "";
      const amt = parseInt(btn.dataset.amt);
      if (impact) impact.innerHTML = `✨ ${formatPrice(amt)} = ${impactMap[amt] || "Hỗ trợ cứu hộ"}`;
    });
  });

  if (customInput) {
    customInput.addEventListener("input", () => {
      btns.forEach(b => b.classList.remove("active"));
      const val = parseInt(customInput.value) || 0;
      if (val > 0 && impact) {
        impact.innerHTML = `✨ ${formatPrice(val)} = Cảm ơn tấm lòng của bạn! 💝`;
      }
    });
  }

  const donateBtn = document.getElementById("donateBtn");
  if (donateBtn) {
    donateBtn.addEventListener("click", () => {
      const activeBtn = document.querySelector(".donate-amt.active");
      const customVal = customInput ? parseInt(customInput.value) : 0;
      const amt = customVal || (activeBtn ? parseInt(activeBtn.dataset.amt) : 0);
      const purpose = document.getElementById("donatePurpose")?.value || "Quỹ chung";

      if (!amt) { showToast("⚠️ Vui lòng chọn hoặc nhập số tiền donate!"); return; }

      addDonation(amt, null, purpose);
      showToast(`💝 Cảm ơn bạn đã donate ${formatPrice(amt)}! Đang chuyển đến cổng thanh toán...`);
    });
  }
}

function addDonation(amount, petId, purpose) {
  const donations = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS) || '[]');
  donations.push({
    id: Date.now(),
    amount: amount,
    petId: petId,
    purpose: purpose,
    donor: getCurrentUser()?.name || 'Anonymous',
    donorAvatar: getRandomAvatar(),
    time: new Date().toISOString(),
    status: 'completed'
  });
  localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(donations));
  updateDonationList();
  updateTotalFund();
}

function getRandomAvatar() {
  const avatars = ["🌸", "🌟", "🎀", "🐾", "⭐", "🌺", "🦋", "💫"];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

function updateDonationList() {
  const donations = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS) || '[]');
  const donorList = document.getElementById("donorList");
  if (!donorList) return;
  
  const recentDonations = donations.slice(-5).reverse();
  donorList.innerHTML = recentDonations.map(d => `
    <div class="donor-item">
      <div class="donor-avatar">${d.donorAvatar}</div>
      <div class="donor-info">
        <div class="donor-name">${d.donor}</div>
        <div class="donor-case">${d.purpose} · ${formatTimeAgo(d.time)}</div>
      </div>
      <div class="donor-amount">${formatPrice(d.amount)}</div>
    </div>
  `).join("");
  
  if (recentDonations.length === 0) {
    donorList.innerHTML = DONORS_DATA.map(d => `
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
}

function loadDonationHistory() {
  updateDonationList();
}

function updateTotalFund() {
  const donations = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS) || '[]');
  const total = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalElement = document.getElementById("totalFund");
  if (totalElement) {
    totalElement.textContent = formatPrice(total + 47230000);
  }
}

function formatTimeAgo(isoTime) {
  const seconds = Math.floor((new Date() - new Date(isoTime)) / 1000);
  if (seconds < 60) return `${seconds} giây trước`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  return `${Math.floor(hours / 24)} ngày trước`;
}

// ===== PET MODAL =====
function openPetModal(id) {
  const pet = PETS_DATA.find(p => p.id === id);
  if (!pet) return;

  const modalContent = document.getElementById("petModalContent");
  if (!modalContent) return;
  
  modalContent.innerHTML = `
    <div class="pet-modal-grid">
      <div>
        <div class="pet-modal-img" style="background:${pet.bgColor}">${pet.emoji}</div>
        <div style="margin-top:1rem; text-align:center">
          <img src="${pet.qrCode}" alt="QR code" style="width:120px; margin:0 auto">
          <p style="font-size:0.7rem; color:var(--mid-gray); margin-top:0.25rem">Quét QR để xem hành trình</p>
        </div>
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
          <button class="btn-outline" onclick="requestFoster(${pet.id})">🏠 Nhận nuôi tạm</button>
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
  renderMerch("all", "all");
}

function renderMerch(filter, campus) {
  const grid = document.getElementById("merchGrid");
  if (!grid) return;
  let items = MERCH_DATA;
  if (filter !== "all") items = items.filter(m => m.type === filter);
  if (campus !== "all") items = items.filter(m => m.campus === campus || m.campus === "all");

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

function initCampusFilterBtns() {
  const btns = document.querySelectorAll(".campus-btn");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCampusFilter = btn.dataset.campus;
      renderMerch(currentMerchFilter, currentCampusFilter);
    });
  });
}

function initMerchFilterBtns() {
  const btns = document.querySelectorAll("[data-mfilter]");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentMerchFilter = btn.dataset.mfilter;
      renderMerch(currentMerchFilter, currentCampusFilter);
    });
  });
}

function initFilterBtns() {
  const btns = document.querySelectorAll("[data-filter]");
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      renderPets(currentFilter);
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

  if (cartFloat) {
    if (total > 0) {
      cartFloat.style.display = "flex";
      if (cartCount) cartCount.textContent = total;
    } else {
      cartFloat.style.display = "none";
    }
  }
}

function openCart() {
  const content = document.getElementById("cartContent");
  const footer = document.getElementById("cartFooter");

  if (!content) return;
  
  if (cart.length === 0) {
    content.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--mid-gray)">🛒 Giỏ hàng trống<br/>Hãy chọn một vài món từ Merch Shop nhé!</div>`;
    if (footer) footer.innerHTML = "";
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

    if (footer) {
      footer.innerHTML = `
        <div class="cart-total">
          <span>Tổng cộng</span>
          <span>${formatPrice(total)}</span>
        </div>
        <div class="cart-note">🌿 ${formatPrice(donate30)} (30%) sẽ vào quỹ cứu hộ PAWCONNECT</div>
        <button class="btn-primary w-full" onclick="checkout()">Thanh toán ngay →</button>
        <button class="btn-outline w-full" style="margin-top:0.5rem" onclick="closeModal('cartModal')">Tiếp tục mua sắm</button>
      `;
    }
  }

  openModal("cartModal");
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  updateCartFloat();
  openCart();
}

function checkout() {
  // Thêm donation từ merch vào quỹ
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const donate30 = Math.round(total * 0.3);
  if (donate30 > 0) {
    addDonation(donate30, null, "Từ Merch Shop (30% doanh thu)");
  }
  cart = [];
  updateCartFloat();
  closeModal("cartModal");
  showToast("🎉 Đặt hàng thành công! Cảm ơn bạn đã ủng hộ PAWCONNECT!");
}

function formatPrice(n) {
  return n.toLocaleString("vi-VN") + " VNĐ";
}

// ===== DONORS =====
function initDonors() {
  updateDonationList();
}

// ===== DASHBOARD =====
function initDashboard() {
  renderDashboard("overview");
}

function initDashTabs() {
  const tabs = document.querySelectorAll(".dash-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentDashTab = tab.dataset.tab;
      renderDashboard(currentDashTab);
    });
  });
}

function renderDashboard(tab) {
  const content = document.getElementById("dashboardContent");
  if (!content) return;

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
          <span class="dash-metric-label">Thú đã nhận nuôi</span>
          <div class="dash-metric-change">↑ 18% so với tháng trước</div>
        </div>
        <div class="dash-metric" style="border-left-color:#4D96FF">
          <span class="dash-metric-val" style="color:#4D96FF" id="dashTotalFund">0</span>
          <span class="dash-metric-label">Quỹ donate (VNĐ)</span>
          <div class="dash-metric-change">↑ Từ cộng đồng</div>
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
    const donations = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS) || '[]');
    const total = donations.reduce((sum, d) => sum + d.amount, 0) + 47230000;
    const dashTotal = document.getElementById("dashTotalFund");
    if (dashTotal) dashTotal.textContent = total.toLocaleString();
  } else if (tab === "cases") {
    const CASES_DATA = [
      { id: "PL-001", pet: "🐱 Mochi", location: "ĐH Bách Khoa", reporter: "Sinh viên K20", status: "urgent", step: "Điều trị thú y", time: "2 giờ trước" },
      { id: "PL-002", pet: "🐶 Bông", location: "Nguyễn Trãi Q.5", reporter: "Linh T.", status: "safe", step: "Chờ nhận nuôi", time: "1 ngày trước" },
      { id: "PL-003", pet: "🐱 Luna", location: "ĐH Kinh Tế", reporter: "Hùng P.", status: "urgent", step: "Chờ vận chuyển", time: "30 phút trước" },
    ];
    content.innerHTML = `
      <div style="overflow-x:auto">
        <table class="cases-table">
          <thead><tr><th>Mã case</th><th>Thú cưng</th><th>Vị trí</th><th>Người báo</th><th>Trạng thái</th><th>Bước hiện tại</th><th>Thời gian</th></tr></thead>
          <tbody>
            ${CASES_DATA.map(c => `
              <tr>
                <td>${c.id}</td><td>${c.pet}</td><td>${c.location}</td><td>${c.reporter}</td>
                <td><span class="status-badge status-${c.status === 'urgent' ? 'red' : 'green'}">${c.status === 'urgent' ? '🔴 Khẩn cấp' : '🟢 Ổn định'}</span></td>
                <td>${c.step}</td><td>${c.time}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  } else if (tab === "fosters") {
    const fosters = [
      { name: "Nguyễn Minh Anh", area: "Quận 10", type: "Mèo", rating: 5, current: 1, max: 2, avatar: "🌸" },
      { name: "Trần Hoàng Hùng", area: "Thủ Đức", type: "Chó + Mèo", rating: 5, current: 0, max: 1, avatar: "🌟" },
    ];
    content.innerHTML = `
      <div class="pets-grid">
        ${fosters.map(f => `
          <div class="foster-card" style="text-align:left">
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
              <div style="width:48px;height:48px;border-radius:50%;background:var(--cream-2);display:flex;align-items:center;justify-content:center;font-size:1.5rem">${f.avatar}</div>
              <div><div style="font-weight:700">${f.name}</div><div style="font-size:0.78rem;color:var(--mid-gray)">${f.area} · Nuôi: ${f.type}</div></div>
            </div>
            <div style="background:var(--cream);border-radius:8px;padding:0.75rem;margin-bottom:1rem">
              <div style="font-size:0.78rem;color:var(--mid-gray);margin-bottom:0.25rem">Sức chứa hiện tại</div>
              <div style="display:flex;gap:0.35rem">
                ${Array.from({length:f.max}).map((_,i) => `<div style="width:24px;height:24px;border-radius:50%;background:${i<f.current?'var(--terracotta)':'var(--light-gray)'};display:flex;align-items:center;justify-content:center;font-size:0.8rem">${i<f.current?'🐾':''}</div>`).join("")}
              </div>
            </div>
            <button onclick="showToast('📞 Liên hệ ${f.name} để giao thú cưng!')" class="btn-outline" style="width:100%">Liên hệ foster</button>
          </div>
        `).join("")}
      </div>
    `;
  } else if (tab === "campus") {
    content.innerHTML = `
      <div style="background:var(--cream);border-radius:var(--radius-md);padding:3rem;text-align:center">
        <div style="font-size:4rem;margin-bottom:1rem">🗺️</div>
        <h3 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:0.75rem">Bản đồ Campus</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;max-width:600px;margin:0 auto">
          ${[
            { uni:"ĐH Bách Khoa", count:8, color:"var(--red-urgent)" },
            { uni:"ĐH KHTN", count:3, color:"var(--yellow-watch)" },
            { uni:"ĐH Kinh Tế", count:5, color:"var(--red-urgent)" },
            { uni:"ĐH Sư Phạm", count:2, color:"var(--green-safe)" },
          ].map(u => `
            <div style="background:var(--white);border-radius:var(--radius-sm);padding:1rem;border-left:4px solid ${u.color}">
              <div style="font-size:0.8rem;font-weight:700">${u.uni}</div>
              <div style="font-size:1.5rem;font-weight:900;color:${u.color}">${u.count}</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }
}

// ===== FORMS =====
function initForms() {
  const rescueForm = document.getElementById("rescueForm");
  if (rescueForm) {
    rescueForm.addEventListener("submit", e => {
      e.preventDefault();
      const location = document.getElementById("rescueLocation")?.value || "";
      const phone = document.getElementById("rescuePhone")?.value || "";
      const condition = document.getElementById("rescueCondition")?.value || "";
      const desc = document.getElementById("rescueDesc")?.value || "";
      
      const reports = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESCUE_REPORTS) || '[]');
      reports.push({
        id: Date.now(),
        location, phone, condition, desc,
        time: new Date().toISOString(),
        status: "pending"
      });
      localStorage.setItem(STORAGE_KEYS.RESCUE_REPORTS, JSON.stringify(reports));
      
      showToast("🚨 Báo cáo cứu hộ đã được gửi! Volunteer sẽ liên hệ bạn trong 15 phút.");
      rescueForm.reset();
    });
  }

  const fosterForm = document.getElementById("fosterForm");
  if (fosterForm) {
    fosterForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("fosterName")?.value || "";
      const phone = document.getElementById("fosterPhone")?.value || "";
      const address = document.getElementById("fosterAddress")?.value || "";
      const type = document.getElementById("fosterType")?.value || "";
      
      const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.FOSTER_REQUESTS) || '[]');
      requests.push({
        id: Date.now(),
        name, phone, address, type,
        time: new Date().toISOString(),
        status: "pending"
      });
      localStorage.setItem(STORAGE_KEYS.FOSTER_REQUESTS, JSON.stringify(requests));
      
      showToast("🏠 Đăng ký nuôi tạm thành công! Chúng mình sẽ liên hệ trong 24h.");
      fosterForm.reset();
    });
  }

  const volunteerForm = document.getElementById("volunteerForm");
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", e => {
      e.preventDefault();
      closeModal("volunteerModal");
      showToast("✅ Đơn đăng ký tình nguyện đã được gửi! Cảm ơn bạn rất nhiều!");
      volunteerForm.reset();
    });
  }
}

// ===== UPLOAD ZONE =====
function initUploadZone() {
  const zone = document.getElementById("uploadZone");
  const fileInput = document.getElementById("fileInput");
  if (!zone || !fileInput) return;

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

// ===== MODALS & HELPERS =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", e => {
    if (e.target === overlay) {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach(m => {
      m.classList.remove("open");
      document.body.style.overflow = "";
    });
    closeMobileMenu();
  }
});

function openVolunteerModal(role) {
  const roleSpan = document.getElementById("volunteerRole");
  if (roleSpan) roleSpan.textContent = role;
  openModal("volunteerModal");
}

function openPartnerModal() {
  showToast("📧 Vui lòng liên hệ hello@pawconnect.vn để hợp tác!");
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem("pawlink_session"));
  } catch {
    return null;
  }
}

function showMorePets() {
  showToast("🐾 Hiện đã hiển thị tất cả thú cưng đang cần nhận nuôi!");
}

let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3500);
}
// ===== AUTO REFRESH REAL-TIME =====
let lastPetsCount = 0;
let lastDonationsCount = 0;

function checkAndRefresh() {
  // Lấy dữ liệu mới nhất từ localStorage
  const currentPets = JSON.parse(localStorage.getItem(STORAGE_KEYS.PETS) || '[]');
  const currentDonations = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS) || '[]');
  
  const currentPetsCount = currentPets.length;
  const currentDonationsCount = currentDonations.length;
  
  // Kiểm tra có thay đổi không
  if (currentPetsCount !== lastPetsCount) {
    console.log(`🔄 Phát hiện thay đổi: Thú cưng (${lastPetsCount} → ${currentPetsCount})`);
    refreshAllData();
    showToast('📢 Danh sách thú cưng đã được cập nhật!');
  }
  
  if (currentDonationsCount !== lastDonationsCount) {
    console.log(`🔄 Phát hiện thay đổi: Donate (${lastDonationsCount} → ${currentDonationsCount})`);
    refreshAllData();
    showToast('💝 Có donate mới! Cảm ơn nhà hảo tâm!');
  }
  
  lastPetsCount = currentPetsCount;
  lastDonationsCount = currentDonationsCount;
}

function refreshAllData() {
  // Cập nhật tất cả các component
  if (typeof initPetsGrid === 'function') initPetsGrid();
  if (typeof initQRGrid === 'function') initQRGrid();
  if (typeof initMerchGrid === 'function') initMerchGrid();
  if (typeof initDonors === 'function') initDonors();
  if (typeof updateTotalFund === 'function') updateTotalFund();
  if (typeof renderDashboard === 'function' && currentDashTab) renderDashboard(currentDashTab);
}

// Khởi tạo giá trị ban đầu
function initAutoRefresh() {
  const currentPets = JSON.parse(localStorage.getItem(STORAGE_KEYS.PETS) || '[]');
  const currentDonations = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS) || '[]');
  lastPetsCount = currentPets.length;
  lastDonationsCount = currentDonations.length;
  
  // Chạy kiểm tra mỗi 3 giây
  setInterval(() => {
    // Chỉ chạy khi đang ở trang chủ
    const isHomePage = window.location.pathname === '/' || 
                       window.location.pathname.includes('index.html') ||
                       window.location.pathname.endsWith('/');
    if (isHomePage) {
      checkAndRefresh();
    }
  }, 3000);
  
  console.log('✅ Auto refresh đã được kích hoạt (kiểm tra mỗi 3 giây)');
}

// Gọi hàm khởi tạo sau khi trang đã load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAutoRefresh);
} else {
  initAutoRefresh();
}
