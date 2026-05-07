/* ========================================
   PAWCONNECT — admin.js
   Admin panel logic: login, CRUD, approve/reject
   Version: Add edit pet feature
======================================== */

// ===== STATE =====
// Shared storage key with main site
const STORAGE_KEY = "pawlink_pets";
const PENDING_KEY = "pawlink_pending";
const MERCH_KEY = "pawlink_merch";

// Seed pending reports (simulated incoming reports from public users)
const SEED_PENDING = [
  {
    id: "RPT-001", submitTime: "2 phút trước", reporter: "Nguyễn Thị Lan", phone: "0901234567",
    name: "Kem", type: "cat", emoji: "🐱", age: "~1 tháng", gender: "Không rõ",
    location: "Cổng sau ĐH Bách Khoa, Q.10", condition: "urgent",
    desc: "Mèo con rất nhỏ, đang kêu liên tục, có vẻ bị bỏ rơi từ tối qua. Chân phải hơi khập khiễng.",
    tags: ["Mèo con", "Cần cứu gấp"], bgColor: "#FFF0E8", vaccinated: false, neutered: false,
    status: "pending", fosterDays: 0, costs: "0 VNĐ"
  },
  {
    id: "RPT-002", submitTime: "15 phút trước", reporter: "Trần Văn Minh", phone: "0912345678",
    name: "Bí", type: "dog", emoji: "🐕", age: "~4 tháng", gender: "Đực",
    location: "Hẻm 12 Lê Văn Sỹ, Q.3", condition: "watch",
    desc: "Chó con lông vàng, có vẻ lạc. Đang ngồi trước cửa nhà tôi từ sáng, không thấy chủ tìm.",
    tags: ["Chó con", "Lạc chủ?"], bgColor: "#FFF8E0", vaccinated: false, neutered: false,
    status: "pending", fosterDays: 0, costs: "0 VNĐ"
  },
  {
    id: "RPT-003", submitTime: "1 giờ trước", reporter: "Lê Phương Anh", phone: "0987654321",
    name: "Sữa", type: "cat", emoji: "😸", age: "~6 tháng", gender: "Cái",
    location: "Sân ký túc xá ĐHQG, Thủ Đức", condition: "safe",
    desc: "Mèo trắng sống lang thang trong KTX đã 2 tuần, sinh viên cho ăn nhưng không có ai nuôi hẳn. Sức khỏe tốt.",
    tags: ["Mèo trẻ", "Sức khỏe tốt"], bgColor: "#F0F8FF", vaccinated: false, neutered: false,
    status: "pending", fosterDays: 0, costs: "0 VNĐ"
  },
  {
    id: "RPT-004", submitTime: "3 giờ trước", reporter: "Phạm Quốc Hùng", phone: "0978123456",
    name: "Than", type: "cat", emoji: "🐈‍⬛", age: "~3 năm", gender: "Đực",
    location: "Chợ Phạm Văn Hai, Tân Bình", condition: "urgent",
    desc: "Mèo đen bị thương ở mắt phải, có thể bị người đánh hoặc tai nạn. Đang trú dưới gầm xe máy, rất sợ người.",
    tags: ["Cần cứu gấp", "Bị thương"], bgColor: "#FFEAEA", vaccinated: false, neutered: false,
    status: "pending", fosterDays: 0, costs: "0 VNĐ"
  },
  {
    id: "RPT-005", submitTime: "5 giờ trước", reporter: "Võ Thị Hoa", phone: "0965432187",
    name: "Cà Phê", type: "dog", emoji: "🐶", age: "~1 năm", gender: "Cái",
    location: "Công viên Hoàng Văn Thụ, Tân Bình", condition: "watch",
    desc: "Chó nâu vừa, lang thang công viên, có vẻ đã quen người. Gần đây thấy có bầu, lo cho sức khỏe mẹ và con.",
    tags: ["Đang mang thai?", "Cần theo dõi"], bgColor: "#E8FFF0", vaccinated: false, neutered: false,
    status: "pending", fosterDays: 0, costs: "0 VNĐ"
  }
];

// Seed merch data (default)
const DEFAULT_MERCH = [
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

// Get or initialize state
function getApproved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function getPending() {
  try {
    const stored = JSON.parse(localStorage.getItem(PENDING_KEY) || "null");
    if (!stored) {
      localStorage.setItem(PENDING_KEY, JSON.stringify(SEED_PENDING));
      return SEED_PENDING;
    }
    return stored;
  } catch { return SEED_PENDING; }
}
function getMerch() {
  try {
    const stored = JSON.parse(localStorage.getItem(MERCH_KEY) || "null");
    if (!stored) {
      localStorage.setItem(MERCH_KEY, JSON.stringify(DEFAULT_MERCH));
      return DEFAULT_MERCH;
    }
    return stored;
  } catch { return DEFAULT_MERCH; }
}
function savePending(data) { localStorage.setItem(PENDING_KEY, JSON.stringify(data)); }
function saveApproved(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function saveMerch(data) { localStorage.setItem(MERCH_KEY, JSON.stringify(data)); }

let currentPage = "overview";
let pendingList = [];
let approvedList = [];
let merchList = [];
let selectedEmoji = "🐱";
let currentTags = [];
let editingId = null;
let editingMerchId = null;

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initLogin();
  initSidebar();
  initModal();

  pendingList = getPending();
  approvedList = getApproved();
  merchList = getMerch();
  updatePendingBadge();
});

// ===== LOGIN =====
function initLogin() {
  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    if (user === "admin" && pass === "pawlink123") {
      document.getElementById("loginScreen").style.display = "none";
      document.getElementById("adminApp").style.display = "flex";
      navigateTo("overview");
    } else {
      document.getElementById("loginError").classList.add("show");
      setTimeout(() => document.getElementById("loginError").classList.remove("show"), 3000);
    }
  });
}

function logout() {
  document.getElementById("adminApp").style.display = "none";
  document.getElementById("loginScreen").style.display = "flex";
  document.getElementById("loginUser").value = "";
  document.getElementById("loginPass").value = "";
}

// ===== SIDEBAR =====
function initSidebar() {
  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", () => {
      const page = link.dataset.page;
      if (page) navigateTo(page);
      document.getElementById("sidebar").classList.remove("mobile-open");
    });
  });

  document.getElementById("sidebarToggle").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("adminApp").querySelector(".admin-main");

    if (window.innerWidth <= 900) {
      sidebar.classList.toggle("mobile-open");
    } else {
      sidebar.classList.toggle("collapsed");
      main.classList.toggle("expanded");
    }
  });
}

function navigateTo(page) {
  currentPage = page;

  document.querySelectorAll(".sidebar-link").forEach(l => {
    l.classList.toggle("active", l.dataset.page === page);
  });

  const titles = {
    overview: "Dashboard Tổng quan",
    pending: "Duyệt báo cáo cứu hộ",
    approved: "Thú cưng đã duyệt",
    rejected: "Báo cáo đã từ chối",
    add: "Thêm thú cưng mới",
    fosters: "Danh sách người nuôi tạm",
    volunteers: "Danh sách tình nguyện viên",
    merch: "Quản lý Merch"
  };
  document.getElementById("topbarTitle").textContent = titles[page] || page;

  const content = document.getElementById("pageContent");
  pendingList = getPending();
  approvedList = getApproved();
  merchList = getMerch();

  switch (page) {
    case "overview": renderOverview(); break;
    case "pending": renderPending(); break;
    case "approved": renderApproved(); break;
    case "rejected": renderRejected(); break;
    case "add": renderAddForm(); break;
    case "fosters": renderFosters(); break;
    case "volunteers": renderVolunteers(); break;
    case "merch": renderMerchManagement(); break;
  }
}

function updatePendingBadge() {
  const pending = getPending().filter(p => p.status === "pending");
  const badge = document.getElementById("pendingCount");
  if (badge) {
    badge.textContent = pending.length;
    badge.style.display = pending.length > 0 ? "inline-block" : "none";
  }
}

// ===== OVERVIEW =====
function renderOverview() {
  pendingList = getPending();
  approvedList = getApproved();
  const pendingCount = pendingList.filter(p => p.status === "pending").length;
  const rejectedCount = pendingList.filter(p => p.status === "rejected").length;
  const totalPets = approvedList.length;

  document.getElementById("pageContent").innerHTML = `
    <div class="metrics-row">
      <div class="metric-card" style="border-top-color:var(--yellow)">
        <div class="metric-icon">⏳</div>
        <span class="metric-val" style="color:var(--yellow)">${pendingCount}</span>
        <div class="metric-label">Chờ duyệt</div>
        <div class="metric-change" style="color:var(--yellow)">Cần xử lý sớm</div>
      </div>
      <div class="metric-card">
        <div class="metric-icon">✅</div>
        <span class="metric-val">${totalPets}</span>
        <div class="metric-label">Thú cưng đã duyệt</div>
        <div class="metric-change">Hiện trên trang chủ</div>
      </div>
      <div class="metric-card" style="border-top-color:var(--red)">
        <div class="metric-icon">❌</div>
        <span class="metric-val" style="color:var(--red)">${rejectedCount}</span>
        <div class="metric-label">Đã từ chối</div>
        <div class="metric-change" style="color:var(--mid-gray)">Không hiện trang chủ</div>
      </div>
      <div class="metric-card" style="border-top-color:var(--forest-light)">
        <div class="metric-icon">📊</div>
        <span class="metric-val" style="color:var(--forest-light)">${pendingList.length}</span>
        <div class="metric-label">Tổng báo cáo nhận</div>
        <div class="metric-change">Từ cộng đồng</div>
      </div>
    </div>

    <div class="table-card">
      <div class="table-header">
        <span class="table-title">⏳ Báo cáo mới nhất cần xử lý</span>
        <button class="btn-submit" style="padding:0.4rem 1rem;font-size:0.8rem" onclick="navigateTo('pending')">Xem tất cả →</button>
      </div>
      ${renderPendingTable(pendingList.filter(p => p.status === "pending").slice(0, 4), true)}
    </div>
  `;
}

// ===== PENDING =====
function renderPending(searchVal = "") {
  pendingList = getPending();
  let items = pendingList.filter(p => p.status === "pending");
  if (searchVal) items = items.filter(p =>
    p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
    p.location.toLowerCase().includes(searchVal.toLowerCase()) ||
    p.reporter.toLowerCase().includes(searchVal.toLowerCase())
  );

  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">Báo cáo chờ duyệt (${items.length})</span>
        <div class="table-actions">
          <input class="search-input" placeholder="🔍 Tìm theo tên, địa điểm..." value="${searchVal}"
            oninput="renderPendingSearch(this.value)"/>
          <select class="select-filter" onchange="filterPendingCondition(this.value)">
            <option value="">Tất cả mức độ</option>
            <option value="urgent">🔴 Khẩn cấp</option>
            <option value="watch">🟡 Theo dõi</option>
            <option value="safe">🟢 An toàn</option>
          </select>
        </div>
      </div>
      ${items.length === 0
        ? `<div class="empty-state"><div class="empty-state-icon">🎉</div><h3>Không có báo cáo nào chờ duyệt!</h3><p>Tất cả đã được xử lý.</p></div>`
        : renderPendingTable(items, false)
      }
    </div>
  `;
}

function renderPendingTable(items, mini) {
  if (items.length === 0) return `<div class="empty-state"><div class="empty-state-icon">✅</div><h3>Không có báo cáo nào!</h3></div>`;
  return `
    <div style="overflow-x:auto">
      <table class="tbl">
        <thead>
          <tr>
            <th>Thú cưng</th>
            <th>Người báo</th>
            <th>Địa điểm</th>
            <th>Mức độ</th>
            <th>Thời gian</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td>
                <div class="pet-cell">
                  <div class="pet-emoji-sm" style="background:${item.bgColor}">${item.emoji}</div>
                  <div>
                    <div class="pet-cell-name">${item.name}</div>
                    <div class="pet-cell-sub">${item.type === "cat" ? "🐱 Mèo" : "🐶 Chó"} · ${item.age} · ${item.gender}</div>
                  </div>
                </div>
              </td>
              <td>
                <div style="font-weight:500">${item.reporter}</div>
                <div style="font-size:0.72rem;color:var(--mid-gray)">${item.phone}</div>
              </td>
              <td style="max-width:180px;font-size:0.82rem">${item.location}</td>
              <td>
                <span class="sbadge sbadge-${item.condition}">
                  ${item.condition === "urgent" ? "🔴 Khẩn cấp" : item.condition === "watch" ? "🟡 Theo dõi" : "🟢 An toàn"}
                </span>
              </td>
              <td style="font-size:0.78rem;color:var(--mid-gray)">${item.submitTime}</td>
              <td>
                <div class="action-btns">
                  <button class="btn-view" onclick="viewPet('${item.id}', 'pending')">👁 Xem</button>
                  <button class="btn-approve" onclick="approvePet('${item.id}')">✅ Duyệt</button>
                  <button class="btn-reject" onclick="openRejectModal('${item.id}')">❌ Từ chối</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderPendingSearch(val) { renderPending(val); }

function filterPendingCondition(val) {
  pendingList = getPending();
  let items = pendingList.filter(p => p.status === "pending");
  if (val) items = items.filter(p => p.condition === val);
  const content = document.getElementById("pageContent");
  const tableWrap = content.querySelector("[style*='overflow-x']");
  if (tableWrap) tableWrap.outerHTML = `<div style="overflow-x:auto">${renderPendingTable(items, false)}</div>`;
}

// ===== APPROVE =====
function approvePet(id) {
  pendingList = getPending();
  approvedList = getApproved();

  const idx = pendingList.findIndex(p => p.id === id);
  if (idx === -1) return;

  const pet = { ...pendingList[idx] };
  pet.status = "approved";
  pet.approvedTime = new Date().toLocaleString("vi-VN");
  pet.id = Date.now();
  pet.fosterDays = 0;

  approvedList.push(pet);
  pendingList[idx].status = "approved";

  savePending(pendingList);
  saveApproved(approvedList);
  updatePendingBadge();

  closeModal();
  showToast(`✅ Đã duyệt "${pet.name}"! Thú cưng sẽ xuất hiện trên trang nhận nuôi.`);
  navigateTo("pending");
}

// ===== REJECT =====
function openRejectModal(id) {
  const pendingList = getPending();
  const pet = pendingList.find(p => p.id === id);
  if (!pet) return;

  document.getElementById("modalContent").innerHTML = `
    <h3 style="font-family:var(--font-display);margin-bottom:1rem">❌ Từ chối báo cáo</h3>
    <div class="modal-pet-header">
      <div class="pet-emoji-sm" style="background:${pet.bgColor};width:60px;height:60px;font-size:2.5rem">${pet.emoji}</div>
      <div>
        <div class="modal-pet-name">${pet.name}</div>
        <div style="font-size:0.82rem;color:var(--mid-gray)">${pet.location}</div>
        <div style="font-size:0.8rem;color:var(--mid-gray)">Báo bởi: ${pet.reporter}</div>
      </div>
    </div>
    <label style="font-size:0.82rem;font-weight:600;display:block;margin-bottom:0.4rem">Lý do từ chối (bắt buộc)</label>
    <textarea class="reject-reason" id="rejectReason" placeholder="VD: Thông tin không đủ, địa chỉ không rõ, ảnh không phù hợp..." rows="3"></textarea>
    <div style="display:flex;gap:0.75rem">
      <button class="btn-reject" style="flex:1;padding:0.75rem" onclick="confirmReject('${id}')">❌ Xác nhận từ chối</button>
      <button class="btn-reset" style="flex:1;padding:0.75rem" onclick="closeModal()">Huỷ</button>
    </div>
  `;
  openModal();
}

function confirmReject(id) {
  const reason = document.getElementById("rejectReason")?.value?.trim();
  if (!reason) { showToast("⚠️ Vui lòng nhập lý do từ chối!"); return; }

  pendingList = getPending();
  const idx = pendingList.findIndex(p => p.id === id);
  if (idx === -1) return;

  pendingList[idx].status = "rejected";
  pendingList[idx].rejectReason = reason;
  pendingList[idx].rejectedTime = new Date().toLocaleString("vi-VN");

  savePending(pendingList);
  updatePendingBadge();
  closeModal();
  showToast(`❌ Đã từ chối báo cáo "${pendingList[idx].name}".`);
  navigateTo("pending");
}

// ===== VIEW DETAIL =====
function viewPet(id, source) {
  let list = source === "pending" ? getPending() : getApproved();
  const pet = list.find(p => String(p.id) === String(id));
  if (!pet) return;

  const condLabel = { urgent: "🔴 Khẩn cấp", watch: "🟡 Theo dõi", safe: "🟢 An toàn" };

  document.getElementById("modalContent").innerHTML = `
    <div class="modal-pet-header">
      <div class="modal-pet-emoji" style="background:${pet.bgColor}">${pet.emoji}</div>
      <div>
        <div class="modal-pet-name">${pet.name}</div>
        <span class="sbadge sbadge-${pet.condition}">${condLabel[pet.condition] || pet.condition}</span>
        ${pet.status === "pending" ? '<span class="sbadge sbadge-pending" style="margin-left:0.5rem">⏳ Chờ duyệt</span>' : ""}
        ${pet.status === "approved" ? '<span class="sbadge sbadge-approved" style="margin-left:0.5rem">✅ Đã duyệt</span>' : ""}
        ${pet.status === "rejected" ? '<span class="sbadge sbadge-rejected" style="margin-left:0.5rem">❌ Từ chối</span>' : ""}
      </div>
    </div>
    <div class="modal-info-grid">
      <div class="modal-info-item"><div class="modal-info-label">Loài</div><div class="modal-info-val">${pet.type === "cat" ? "🐱 Mèo" : "🐶 Chó"}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Giới tính</div><div class="modal-info-val">${pet.gender}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Tuổi ước tính</div><div class="modal-info-val">${pet.age}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Vaccine</div><div class="modal-info-val">${pet.vaccinated ? "✅ Đã tiêm" : "❌ Chưa tiêm"}</div></div>
      <div class="modal-info-item" style="grid-column:1/-1"><div class="modal-info-label">Địa điểm phát hiện</div><div class="modal-info-val">${pet.location}</div></div>
      ${pet.reporter ? `<div class="modal-info-item"><div class="modal-info-label">Người báo cáo</div><div class="modal-info-val">${pet.reporter}</div></div>` : ""}
      ${pet.phone ? `<div class="modal-info-item"><div class="modal-info-label">Số điện thoại</div><div class="modal-info-val">${pet.phone}</div></div>` : ""}
      ${pet.rejectReason ? `<div class="modal-info-item" style="grid-column:1/-1;border-left:3px solid var(--red)"><div class="modal-info-label">Lý do từ chối</div><div class="modal-info-val" style="color:var(--red)">${pet.rejectReason}</div></div>` : ""}
    </div>
    <p class="modal-desc">${pet.desc}</p>
    <div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:1.25rem">
      ${(pet.tags || []).map(t => `<span class="tag-chip">${t}</span>`).join("")}
    </div>
    ${pet.status === "pending" ? `
      <div class="modal-actions">
        <button class="btn-approve" onclick="approvePet('${pet.id}')">✅ Duyệt ngay</button>
        <button class="btn-reject" onclick="closeModal();openRejectModal('${pet.id}')">❌ Từ chối</button>
        <button class="btn-view" onclick="closeModal()">Đóng</button>
      </div>
    ` : `<button class="btn-view" onclick="closeModal()">Đóng</button>`}
  `;
  openModal();
}

// ===== APPROVED (with Edit button) =====
function renderApproved() {
  approvedList = getApproved();

  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">✅ Thú cưng đã duyệt — hiện trên trang nhận nuôi (${approvedList.length})</span>
        <div class="table-actions">
          <input class="search-input" placeholder="🔍 Tìm kiếm..." oninput="searchApproved(this.value)"/>
        </div>
      </div>
      <div id="approvedTableWrap">
        ${renderApprovedTable(approvedList)}
      </div>
    </div>
  `;
}

function searchApproved(val) {
  approvedList = getApproved();
  const filtered = approvedList.filter(p =>
    p.name.toLowerCase().includes(val.toLowerCase()) ||
    (p.location || "").toLowerCase().includes(val.toLowerCase())
  );
  document.getElementById("approvedTableWrap").innerHTML = renderApprovedTable(filtered);
}

function renderApprovedTable(items) {
  if (items.length === 0) return `<div class="empty-state"><div class="empty-state-icon">📭</div><h3>Chưa có thú cưng nào được duyệt</h3><p>Hãy duyệt các báo cáo hoặc thêm thú cưng thủ công.</p></div>`;
  return `
    <div style="overflow-x:auto">
      <table class="tbl">
        <thead>
          <tr>
            <th>Thú cưng</th>
            <th>Địa điểm</th>
            <th>Tình trạng</th>
            <th>Thời gian duyệt</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(pet => `
            <tr>
              <td>
                <div class="pet-cell">
                  <div class="pet-emoji-sm" style="background:${pet.bgColor || "#FFF0E8"}">${pet.emoji}</div>
                  <div>
                    <div class="pet-cell-name">${pet.name}</div>
                    <div class="pet-cell-sub">${pet.type === "cat" ? "🐱 Mèo" : "🐶 Chó"} · ${pet.age} · ${pet.gender}</div>
                  </div>
                </div>
              </td>
              <td style="font-size:0.82rem;max-width:200px">${pet.location}</td>
              <td>
                <span class="sbadge sbadge-${pet.condition}">
                  ${pet.condition === "urgent" ? "🔴 Khẩn cấp" : pet.condition === "watch" ? "🟡 Theo dõi" : "🟢 An toàn"}
                </span>
              </td>
              <td style="font-size:0.78rem;color:var(--mid-gray)">${pet.approvedTime || "—"}</td>
              <td>
                <div class="action-btns">
                  <button class="btn-view" onclick="viewPet('${pet.id}', 'approved')">👁 Xem</button>
                  <button class="btn-edit" onclick="editPet(${pet.id})">✏️ Sửa</button>
                  <button class="btn-delete" onclick="removePet(${pet.id})" title="Gỡ khỏi danh sách">🗑 Xóa</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// ===== EDIT PET (THÊM MỚI) =====
function editPet(id) {
  const pet = getApproved().find(p => p.id === id);
  if (!pet) return;
  
  // Chuyển về form thêm với dữ liệu đã có
  renderAddForm({
    id: pet.id,
    name: pet.name,
    type: pet.type,
    gender: pet.gender,
    age: pet.age,
    location: pet.location,
    condition: pet.condition,
    desc: pet.desc,
    vaccinated: pet.vaccinated,
    neutered: pet.neutered,
    emoji: pet.emoji,
    bgColorHex: pet.bgColor,
    tags: pet.tags,
    costs: pet.costs,
    fosterDays: pet.fosterDays
  });
  
  // Chuyển tab sang "Thêm thú cưng"
  navigateTo("add");
}

function removePet(id) {
  if (!confirm("Bạn có chắc muốn gỡ thú cưng này khỏi trang nhận nuôi?")) return;
  approvedList = getApproved().filter(p => p.id !== id);
  saveApproved(approvedList);
  showToast("🗑 Đã gỡ thú cưng khỏi danh sách nhận nuôi.");
  renderApproved();
}

// ===== REJECTED =====
function renderRejected() {
  pendingList = getPending();
  const rejected = pendingList.filter(p => p.status === "rejected");

  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">❌ Báo cáo đã từ chối (${rejected.length})</span>
      </div>
      ${rejected.length === 0
        ? `<div class="empty-state"><div class="empty-state-icon">📋</div><h3>Chưa có báo cáo nào bị từ chối</h3></div>`
        : `<div style="overflow-x:auto">
          <table class="tbl">
            <thead><tr><th>Thú cưng</th><th>Người báo</th><th>Lý do từ chối</th><th>Thời gian</th><th>Hành động</th></tr></thead>
            <tbody>
              ${rejected.map(pet => `
                <tr>
                  <td>
                    <div class="pet-cell">
                      <div class="pet-emoji-sm" style="background:${pet.bgColor}">${pet.emoji}</div>
                      <div><div class="pet-cell-name">${pet.name}</div><div class="pet-cell-sub">${pet.location}</div></div>
                    </div>
                   </td>
                  <td>${pet.reporter}<br/><span style="font-size:0.72rem;color:var(--mid-gray)">${pet.phone}</span></td>
                  <td style="font-size:0.82rem;color:var(--red);max-width:200px">${pet.rejectReason || "—"}</td>
                  <td style="font-size:0.78rem;color:var(--mid-gray)">${pet.rejectedTime || "—"}</td>
                  <td>
                    <button class="btn-approve" style="font-size:0.72rem" onclick="reApprove('${pet.id}')">↩ Duyệt lại</button>
                   </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>`
      }
    </div>
  `;
}

function reApprove(id) {
  pendingList = getPending();
  approvedList = getApproved();
  const idx = pendingList.findIndex(p => p.id === id);
  if (idx === -1) return;

  const pet = { ...pendingList[idx] };
  pet.status = "approved";
  pet.approvedTime = new Date().toLocaleString("vi-VN");
  delete pet.rejectReason;
  delete pet.rejectedTime;
  pet.id = Date.now();

  pendingList[idx].status = "approved";
  approvedList.push(pet);

  savePending(pendingList);
  saveApproved(approvedList);
  updatePendingBadge();
  showToast(`✅ Đã duyệt lại "${pet.name}"!`);
  navigateTo("rejected");
}

// ===== ADD PET FORM (with edit support) =====
function renderAddForm(prefill = {}) {
  currentTags = prefill.tags || [];
  selectedEmoji = prefill.emoji || "🐱";
  editingId = prefill.id || null;

  const emojis = ["🐱","😺","😸","🐈","🐈‍⬛","🐶","🐕","🐩","🦮","🐕‍🦺"];

  document.getElementById("pageContent").innerHTML = `
    <div class="add-form-card">
      <h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:1.75rem">
        ${editingId ? "✏️ Chỉnh sửa thú cưng" : "➕ Thêm thú cưng mới"}
      </h2>

      <form id="addPetForm">
        <div class="form-grid">
          <div class="fgroup">
            <label>Tên thú cưng *</label>
            <input type="text" id="petName" placeholder="VD: Mochi, Bông, Pudding..." value="${prefill.name || ""}" required/>
          </div>
          <div class="fgroup">
            <label>Loài *</label>
            <select id="petType" required>
              <option value="cat" ${prefill.type === "cat" ? "selected" : ""}>🐱 Mèo</option>
              <option value="dog" ${prefill.type === "dog" ? "selected" : ""}>🐶 Chó</option>
            </select>
          </div>
          <div class="fgroup">
            <label>Giới tính</label>
            <select id="petGender">
              <option ${prefill.gender === "Cái" ? "selected" : ""}>Cái</option>
              <option ${prefill.gender === "Đực" ? "selected" : ""}>Đực</option>
              <option ${prefill.gender === "Không rõ" ? "selected" : ""}>Không rõ</option>
            </select>
          </div>
          <div class="fgroup">
            <label>Tuổi ước tính</label>
            <input type="text" id="petAge" placeholder="VD: ~2 tháng, ~1 năm" value="${prefill.age || ""}"/>
          </div>
          <div class="fgroup form-full">
            <label>Địa điểm phát hiện *</label>
            <input type="text" id="petLocation" placeholder="VD: Cổng ĐH Bách Khoa, Q.10, TP.HCM" value="${prefill.location || ""}" required/>
          </div>
          <div class="fgroup">
            <label>Mức độ khẩn cấp *</label>
            <select id="petCondition" required>
              <option value="safe" ${prefill.condition === "safe" ? "selected" : ""}>🟢 An toàn</option>
              <option value="watch" ${prefill.condition === "watch" ? "selected" : ""}>🟡 Theo dõi</option>
              <option value="urgent" ${prefill.condition === "urgent" ? "selected" : ""}>🔴 Khẩn cấp</option>
            </select>
          </div>
          <div class="fgroup">
            <label>Màu nền card</label>
            <input type="color" id="petBgColor" value="${prefill.bgColorHex || "#FFF0E8"}" style="height:42px;cursor:pointer"/>
          </div>
          <div class="fgroup">
            <label>Đã tiêm vaccine?</label>
            <select id="petVaccine">
              <option value="false" ${!prefill.vaccinated ? "selected" : ""}>❌ Chưa</option>
              <option value="true" ${prefill.vaccinated ? "selected" : ""}>✅ Đã tiêm</option>
            </select>
          </div>
          <div class="fgroup">
            <label>Đã triệt sản?</label>
            <select id="petNeutered">
              <option value="false" ${!prefill.neutered ? "selected" : ""}>❌ Chưa</option>
              <option value="true" ${prefill.neutered ? "selected" : ""}>✅ Đã triệt sản</option>
            </select>
          </div>
          <div class="fgroup form-full">
            <label>Chọn emoji đại diện</label>
            <div class="emoji-picker" id="emojiPicker">
              ${emojis.map(e => `<button type="button" class="emoji-opt ${e === selectedEmoji ? "selected" : ""}" onclick="selectEmoji('${e}')">${e}</button>`).join("")}
            </div>
          </div>
          <div class="fgroup form-full">
            <label>Mô tả *</label>
            <textarea id="petDesc" rows="4" placeholder="Mô tả tình trạng, tính cách, đặc điểm nổi bật... Càng chi tiết càng dễ tìm người nhận nuôi!" required>${prefill.desc || ""}</textarea>
          </div>
          <div class="fgroup form-full">
            <label>Tags (nhãn)</label>
            <div class="tag-input-wrap">
              <input type="text" id="tagInput" placeholder="VD: Mèo con, Cần gấp, Đã vaccine..." />
              <button type="button" class="btn-submit" style="padding:0.5rem 1rem;font-size:0.82rem;flex-shrink:0" onclick="addTag()">+ Thêm</button>
            </div>
            <div class="tags-preview" id="tagsPreview">
              ${currentTags.map((t, i) => tagChip(t, i)).join("")}
            </div>
          </div>
          <div class="fgroup">
            <label>Chi phí đã dùng</label>
            <input type="text" id="petCosts" placeholder="VD: 320,000 VNĐ" value="${prefill.costs || "0 VNĐ"}"/>
          </div>
          <div class="fgroup">
            <label>Số ngày nuôi tạm</label>
            <input type="number" id="petFosterDays" placeholder="0" value="${prefill.fosterDays || 0}" min="0"/>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">
            ${editingId ? "💾 Lưu thay đổi" : "✅ Thêm & Duyệt ngay"}
          </button>
          <button type="button" class="btn-reset" onclick="resetAddForm()">🔄 Làm mới</button>
          <button type="button" class="btn-view" onclick="navigateTo('approved')">← Quay lại</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("tagInput").addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); addTag(); }
  });

  document.getElementById("addPetForm").addEventListener("submit", e => {
    e.preventDefault();
    submitAddPet();
  });
}

function selectEmoji(emoji) {
  selectedEmoji = emoji;
  document.querySelectorAll(".emoji-opt").forEach(el => {
    el.classList.toggle("selected", el.textContent === emoji);
  });
}

function tagChip(tag, idx) {
  return `<span class="tag-chip">${tag}<button type="button" onclick="removeTag(${idx})">✕</button></span>`;
}

function addTag() {
  const input = document.getElementById("tagInput");
  const val = input.value.trim();
  if (!val || currentTags.includes(val)) return;
  currentTags.push(val);
  input.value = "";
  document.getElementById("tagsPreview").innerHTML = currentTags.map((t, i) => tagChip(t, i)).join("");
}

function removeTag(idx) {
  currentTags.splice(idx, 1);
  document.getElementById("tagsPreview").innerHTML = currentTags.map((t, i) => tagChip(t, i)).join("");
}

function resetAddForm() {
  document.getElementById("addPetForm").reset();
  currentTags = [];
  selectedEmoji = "🐱";
  editingId = null;
  document.querySelectorAll(".emoji-opt").forEach((el, i) => el.classList.toggle("selected", i === 0));
  document.getElementById("tagsPreview").innerHTML = "";
}

function submitAddPet() {
  const name = document.getElementById("petName").value.trim();
  const type = document.getElementById("petType").value;
  const gender = document.getElementById("petGender").value;
  const age = document.getElementById("petAge").value.trim() || "Không rõ";
  const location = document.getElementById("petLocation").value.trim();
  const condition = document.getElementById("petCondition").value;
  const desc = document.getElementById("petDesc").value.trim();
  const vaccinated = document.getElementById("petVaccine").value === "true";
  const neutered = document.getElementById("petNeutered").value === "true";
  const bgColorHex = document.getElementById("petBgColor").value;
  const costs = document.getElementById("petCosts").value.trim() || "0 VNĐ";
  const fosterDays = parseInt(document.getElementById("petFosterDays").value) || 0;

  approvedList = getApproved();

  if (editingId) {
    // Cập nhật thú cưng hiện có
    const idx = approvedList.findIndex(p => p.id === editingId);
    if (idx !== -1) {
      approvedList[idx] = { 
        ...approvedList[idx], 
        name, type, gender, age, location, condition, desc, 
        vaccinated, neutered, 
        bgColor: bgColorHex, 
        costs, fosterDays, 
        emoji: selectedEmoji, 
        tags: [...currentTags] 
      };
    }
    saveApproved(approvedList);
    showToast(`✏️ Đã cập nhật thông tin "${name}"!`);
    editingId = null;
  } else {
    // Thêm mới thú cưng
    const newPet = {
      id: Date.now(),
      name, type, gender, age, location, condition, desc,
      vaccinated, neutered,
      emoji: selectedEmoji,
      bgColor: bgColorHex,
      tags: [...currentTags],
      costs, fosterDays,
      status: "approved",
      approvedTime: new Date().toLocaleString("vi-VN"),
      reporter: "Admin",
    };
    approvedList.push(newPet);
    saveApproved(approvedList);
    showToast(`✅ Đã thêm "${name}" vào danh sách nhận nuôi!`);
  }

  navigateTo("approved");
}

// ===== MERCH MANAGEMENT (THÊM MỚI) =====
function renderMerchManagement() {
  merchList = getMerch();
  
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">🛍️ Quản lý sản phẩm Merch (${merchList.length})</span>
        <button class="btn-submit" onclick="showAddMerchForm()">+ Thêm sản phẩm</button>
      </div>
      <div style="overflow-x:auto">
        <table class="tbl">
          <thead>
            <tr>
              <th>ID</th>
              <th>Sản phẩm</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Loại</th>
              <th>Campus</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody id="merchTableBody">
            ${renderMerchTable(merchList)}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderMerchTable(items) {
  if (items.length === 0) {
    return `<tr><td colspan="7" style="text-align:center;padding:2rem">Chưa có sản phẩm nào</td></tr>`;
  }
  return items.map(item => `
    <tr>
      <td style="font-family:var(--font-mono);font-size:0.8rem">${item.id}</td>
      <td><span style="font-size:1.5rem">${item.emoji}</span></td>
      <td style="font-weight:600">${item.name}</td>
      <td style="font-family:var(--font-mono);color:var(--terracotta)">${item.price.toLocaleString()}₫</td>
      <td><span class="sbadge sbadge-approved">${item.type}</span></td>
      <td><span class="sbadge sbadge-watch">${item.campus === 'all' ? 'Tất cả' : item.campus}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-edit" onclick="editMerch(${item.id})">✏️ Sửa</button>
          <button class="btn-delete" onclick="deleteMerch(${item.id})">🗑 Xóa</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function showAddMerchForm() {
  editingMerchId = null;
  document.getElementById("pageContent").innerHTML = `
    <div class="add-form-card">
      <h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:1.75rem">
        ➕ Thêm sản phẩm Merch mới
      </h2>
      <form id="addMerchForm">
        <div class="form-grid">
          <div class="fgroup">
            <label>Tên sản phẩm *</label>
            <input type="text" id="merchName" placeholder="VD: Áo Phông PAWCONNECT" required/>
          </div>
          <div class="fgroup">
            <label>Emoji *</label>
            <input type="text" id="merchEmoji" placeholder="VD: 👕, 🧥, 👜" value="👕" required/>
          </div>
          <div class="fgroup">
            <label>Giá (VNĐ) *</label>
            <input type="number" id="merchPrice" placeholder="250000" required/>
          </div>
          <div class="fgroup">
            <label>Loại</label>
            <select id="merchType">
              <option value="apparel">👕 Áo quần</option>
              <option value="accessory">🎒 Phụ kiện</option>
              <option value="sticker">🎨 Sticker</option>
              <option value="blindbox">📦 Blindbox</option>
            </select>
          </div>
          <div class="fgroup">
            <label>Campus Edition</label>
            <select id="merchCampus">
              <option value="all">🎓 Tất cả trường</option>
              <option value="bachkhoa">🏫 ĐH Bách Khoa</option>
              <option value="kinhte">📈 ĐH Kinh tế</option>
              <option value="supham">📚 ĐH Sư Phạm</option>
              <option value="khhtn">🔬 ĐH KHTN</option>
            </select>
          </div>
          <div class="fgroup">
            <label>Badge (nổi bật)</label>
            <input type="text" id="merchBadge" placeholder="VD: Bán chạy nhất, Campus, Hot... (để trống nếu không có)"/>
          </div>
          <div class="fgroup form-full">
            <label>Mô tả *</label>
            <textarea id="merchDesc" rows="3" placeholder="Mô tả sản phẩm..." required></textarea>
          </div>
          <div class="fgroup">
            <label>Màu nền</label>
            <input type="color" id="merchBgColor" value="#E8F0FF" style="height:42px;cursor:pointer"/>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-submit">💾 Lưu sản phẩm</button>
          <button type="button" class="btn-reset" onclick="cancelMerchForm()">❌ Hủy</button>
        </div>
      </form>
    </div>
  `;
  
  document.getElementById("addMerchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    submitAddMerch();
  });
}

function submitAddMerch() {
  const name = document.getElementById("merchName").value.trim();
  const emoji = document.getElementById("merchEmoji").value.trim();
  const price = parseInt(document.getElementById("merchPrice").value);
  const type = document.getElementById("merchType").value;
  const campus = document.getElementById("merchCampus").value;
  const badge = document.getElementById("merchBadge").value.trim();
  const desc = document.getElementById("merchDesc").value.trim();
  const bgColor = document.getElementById("merchBgColor").value;
  
  if (!name || !emoji || !price || !desc) {
    showToast("⚠️ Vui lòng điền đầy đủ thông tin!");
    return;
  }
  
  merchList = getMerch();
  const newId = Math.max(...merchList.map(m => m.id), 0) + 1;
  
  const newMerch = {
    id: newId,
    name, emoji, price, type, campus, desc, bgColor,
    badge: badge || null
  };
  
  merchList.push(newMerch);
  saveMerch(merchList);
  showToast(`✅ Đã thêm sản phẩm "${name}"!`);
  navigateTo("merch");
}

function editMerch(id) {
  merchList = getMerch();
  const item = merchList.find(m => m.id === id);
  if (!item) return;
  
  editingMerchId = id;
  
  document.getElementById("pageContent").innerHTML = `
    <div class="add-form-card">
      <h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:1.75rem">
        ✏️ Chỉnh sửa sản phẩm: ${item.name}
      </h2>
      <form id="editMerchForm">
        <div class="form-grid">
          <div class="fgroup">
            <label>Tên sản phẩm *</label>
            <input type="text" id="merchName" value="${item.name}" required/>
          </div>
          <div class="fgroup">
            <label>Emoji *</label>
            <input type="text" id="merchEmoji" value="${item.emoji}" required/>
          </div>
          <div class="fgroup">
            <label>Giá (VNĐ) *</label>
            <input type="number" id="merchPrice" value="${item.price}" required/>
          </div>
          <div class="fgroup">
            <label>Loại</label>
            <select id="merchType">
              <option value="apparel" ${item.type === 'apparel' ? 'selected' : ''}>👕 Áo quần</option>
              <option value="accessory" ${item.type === 'accessory' ? 'selected' : ''}>🎒 Phụ kiện</option>
              <option value="sticker" ${item.type === 'sticker' ? 'selected' : ''}>🎨 Sticker</option>
              <option value="blindbox" ${item.type === 'blindbox' ? 'selected' : ''}>📦 Blindbox</option>
            </select>
          </div>
          <div class="fgroup">
            <label>Campus Edition</label>
            <select id="merchCampus">
              <option value="all" ${item.campus === 'all' ? 'selected' : ''}>🎓 Tất cả trường</option>
              <option value="bachkhoa" ${item.campus === 'bachkhoa' ? 'selected' : ''}>🏫 ĐH Bách Khoa</option>
              <option value="kinhte" ${item.campus === 'kinhte' ? 'selected' : ''}>📈 ĐH Kinh tế</option>
              <option value="supham" ${item.campus === 'supham' ? 'selected' : ''}>📚 ĐH Sư Phạm</option>
              <option value="khhtn" ${item.campus === 'khhtn' ? 'selected' : ''}>🔬 ĐH KHTN</option>
            </select>
          </div>
          <div class="fgroup">
            <label>Badge (nổi bật)</label>
            <input type="text" id="merchBadge" value="${item.badge || ''}" placeholder="VD: Bán chạy nhất..."/>
          </div>
          <div class="fgroup form-full">
            <label>Mô tả *</label>
            <textarea id="merchDesc" rows="3" required>${item.desc}</textarea>
          </div>
          <div class="fgroup">
            <label>Màu nền</label>
            <input type="color" id="merchBgColor" value="${item.bgColor}" style="height:42px;cursor:pointer"/>
          </div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-submit">💾 Lưu thay đổi</button>
          <button type="button" class="btn-reset" onclick="cancelMerchForm()">❌ Hủy</button>
        </div>
      </form>
    </div>
  `;
  
  document.getElementById("editMerchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    updateMerch();
  });
}

function updateMerch() {
  const name = document.getElementById("merchName").value.trim();
  const emoji = document.getElementById("merchEmoji").value.trim();
  const price = parseInt(document.getElementById("merchPrice").value);
  const type = document.getElementById("merchType").value;
  const campus = document.getElementById("merchCampus").value;
  const badge = document.getElementById("merchBadge").value.trim();
  const desc = document.getElementById("merchDesc").value.trim();
  const bgColor = document.getElementById("merchBgColor").value;
  
  if (!name || !emoji || !price || !desc) {
    showToast("⚠️ Vui lòng điền đầy đủ thông tin!");
    return;
  }
  
  merchList = getMerch();
  const idx = merchList.findIndex(m => m.id === editingMerchId);
  if (idx !== -1) {
    merchList[idx] = { ...merchList[idx], name, emoji, price, type, campus, desc, bgColor, badge: badge || null };
    saveMerch(merchList);
    showToast(`✏️ Đã cập nhật sản phẩm "${name}"!`);
  }
  
  navigateTo("merch");
}

function deleteMerch(id) {
  if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
  merchList = getMerch().filter(m => m.id !== id);
  saveMerch(merchList);
  showToast("🗑 Đã xóa sản phẩm!");
  renderMerchManagement();
}

function cancelMerchForm() {
  navigateTo("merch");
}

// // ===== FOSTERS MANAGEMENT (with Edit/Add/Delete) =====
let editingFosterId = null;
let editingVolunteerId = null;

// Dữ liệu mặc định cho fosters
const DEFAULT_FOSTERS = [
  { id: 1, name: "Nguyễn Minh Anh", area: "Quận 10", type: "Mèo", rating: 5, current: 1, max: 2, phone: "0901234567", email: "minhanh@gmail.com", avatar: "🌸", joined: "15/01/2025", status: "active" },
  { id: 2, name: "Trần Hoàng Hùng", area: "Thủ Đức", type: "Chó + Mèo", rating: 5, current: 0, max: 1, phone: "0912345678", email: "hoanghung@gmail.com", avatar: "🌟", joined: "22/01/2025", status: "active" },
  { id: 3, name: "Lê Phương Linh", area: "Quận 3", type: "Mèo", rating: 4, current: 2, max: 2, phone: "0987654321", email: "phuonglinh@gmail.com", avatar: "🎀", joined: "30/01/2025", status: "busy" },
  { id: 4, name: "Phạm Văn Khoa", area: "Bình Thạnh", type: "Chó", rating: 5, current: 1, max: 3, phone: "0978123456", email: "vankhoa@gmail.com", avatar: "⭐", joined: "05/02/2025", status: "active" },
  { id: 5, name: "Võ Thị Mai", area: "Quận 7", type: "Mèo", rating: 4, current: 0, max: 2, phone: "0965432187", email: "thimai@gmail.com", avatar: "🌺", joined: "12/02/2025", status: "inactive" },
];

// Dữ liệu mặc định cho volunteers
const DEFAULT_VOLUNTEERS = [
  { id: 1, name: "Trần Minh Khoa", role: "Rescuer", area: "Q.1, Q.3", phone: "0901111222", email: "minhkhoa@gmail.com", status: "active", missions: 12, joined: "10/01/2025", avatar: "🚑", skills: ["Bắt chó mèo", "Sơ cứu"] },
  { id: 2, name: "Nguyễn Thu Hà", role: "Foster Parent", area: "Thủ Đức", phone: "0912222333", email: "thuha@gmail.com", status: "active", missions: 8, joined: "18/01/2025", avatar: "🏠", skills: ["Chăm sóc thú cưng"] },
  { id: 3, name: "Lê Văn Dũng", role: "Coordinator", area: "Online", phone: "0923333444", email: "vandung@gmail.com", status: "active", missions: 24, joined: "05/01/2025", avatar: "💻", skills: ["Điều phối", "Quản lý case"] },
  { id: 4, name: "Phạm Bích Ngọc", role: "Pet Photographer", area: "Q.7, Q.5", phone: "0934444555", email: "bichngoc@gmail.com", status: "inactive", missions: 5, joined: "20/02/2025", avatar: "📸", skills: ["Chụp ảnh pet"] },
  { id: 5, name: "Vũ Hoàng Nam", role: "Rescuer", area: "Bình Thạnh", phone: "0945555666", email: "hoangnam@gmail.com", status: "active", missions: 17, joined: "14/01/2025", avatar: "🚑", skills: ["Bắt chó mèo", "Vận chuyển"] },
];

// Get/Set fosters
function getStoredFosters() {
  try {
    const stored = JSON.parse(localStorage.getItem("pawlink_fosters") || "null");
    if (!stored) {
      localStorage.setItem("pawlink_fosters", JSON.stringify(DEFAULT_FOSTERS));
      return DEFAULT_FOSTERS;
    }
    return stored;
  } catch { return DEFAULT_FOSTERS; }
}
function saveFosters(data) { localStorage.setItem("pawlink_fosters", JSON.stringify(data)); }

// Get/Set volunteers
function getStoredVolunteers() {
  try {
    const stored = JSON.parse(localStorage.getItem("pawlink_volunteers") || "null");
    if (!stored) {
      localStorage.setItem("pawlink_volunteers", JSON.stringify(DEFAULT_VOLUNTEERS));
      return DEFAULT_VOLUNTEERS;
    }
    return stored;
  } catch { return DEFAULT_VOLUNTEERS; }
}
function saveVolunteers(data) { localStorage.setItem("pawlink_volunteers", JSON.stringify(data)); }

// ===== FOSTERS MANAGEMENT (with Edit/Add/Delete) =====
let editingFosterId = null;
let editingVolunteerId = null;

// Dữ liệu mặc định cho fosters
const DEFAULT_FOSTERS = [
  { id: 1, name: "Nguyễn Minh Anh", area: "Quận 10", type: "Mèo", rating: 5, current: 1, max: 2, phone: "0901234567", email: "minhanh@gmail.com", avatar: "🌸", joined: "15/01/2025", status: "active" },
  { id: 2, name: "Trần Hoàng Hùng", area: "Thủ Đức", type: "Chó + Mèo", rating: 5, current: 0, max: 1, phone: "0912345678", email: "hoanghung@gmail.com", avatar: "🌟", joined: "22/01/2025", status: "active" },
  { id: 3, name: "Lê Phương Linh", area: "Quận 3", type: "Mèo", rating: 4, current: 2, max: 2, phone: "0987654321", email: "phuonglinh@gmail.com", avatar: "🎀", joined: "30/01/2025", status: "busy" },
  { id: 4, name: "Phạm Văn Khoa", area: "Bình Thạnh", type: "Chó", rating: 5, current: 1, max: 3, phone: "0978123456", email: "vankhoa@gmail.com", avatar: "⭐", joined: "05/02/2025", status: "active" },
  { id: 5, name: "Võ Thị Mai", area: "Quận 7", type: "Mèo", rating: 4, current: 0, max: 2, phone: "0965432187", email: "thimai@gmail.com", avatar: "🌺", joined: "12/02/2025", status: "inactive" },
];

// Dữ liệu mặc định cho volunteers
const DEFAULT_VOLUNTEERS = [
  { id: 1, name: "Trần Minh Khoa", role: "Rescuer", area: "Q.1, Q.3", phone: "0901111222", email: "minhkhoa@gmail.com", status: "active", missions: 12, joined: "10/01/2025", avatar: "🚑", skills: ["Bắt chó mèo", "Sơ cứu"] },
  { id: 2, name: "Nguyễn Thu Hà", role: "Foster Parent", area: "Thủ Đức", phone: "0912222333", email: "thuha@gmail.com", status: "active", missions: 8, joined: "18/01/2025", avatar: "🏠", skills: ["Chăm sóc thú cưng"] },
  { id: 3, name: "Lê Văn Dũng", role: "Coordinator", area: "Online", phone: "0923333444", email: "vandung@gmail.com", status: "active", missions: 24, joined: "05/01/2025", avatar: "💻", skills: ["Điều phối", "Quản lý case"] },
  { id: 4, name: "Phạm Bích Ngọc", role: "Pet Photographer", area: "Q.7, Q.5", phone: "0934444555", email: "bichngoc@gmail.com", status: "inactive", missions: 5, joined: "20/02/2025", avatar: "📸", skills: ["Chụp ảnh pet"] },
  { id: 5, name: "Vũ Hoàng Nam", role: "Rescuer", area: "Bình Thạnh", phone: "0945555666", email: "hoangnam@gmail.com", status: "active", missions: 17, joined: "14/01/2025", avatar: "🚑", skills: ["Bắt chó mèo", "Vận chuyển"] },
];

// Get/Set fosters
function getStoredFosters() {
  try {
    const stored = JSON.parse(localStorage.getItem("pawlink_fosters") || "null");
    if (!stored) {
      localStorage.setItem("pawlink_fosters", JSON.stringify(DEFAULT_FOSTERS));
      return DEFAULT_FOSTERS;
    }
    return stored;
  } catch { return DEFAULT_FOSTERS; }
}
function saveFosters(data) { localStorage.setItem("pawlink_fosters", JSON.stringify(data)); }

// Get/Set volunteers
function getStoredVolunteers() {
  try {
    const stored = JSON.parse(localStorage.getItem("pawlink_volunteers") || "null");
    if (!stored) {
      localStorage.setItem("pawlink_volunteers", JSON.stringify(DEFAULT_VOLUNTEERS));
      return DEFAULT_VOLUNTEERS;
    }
    return stored;
  } catch { return DEFAULT_VOLUNTEERS; }
}
function saveVolunteers(data) { localStorage.setItem("pawlink_volunteers", JSON.stringify(data)); }

// ===== RENDER FOSTERS =====
function renderFosters() {
  const fosters = getStoredFosters();
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">🏠 Danh sách người nuôi tạm (${fosters.length})</span>
        <button class="btn-submit" onclick="showAddFosterForm()">+ Thêm mới</button>
      </div>
      <div style="overflow-x:auto">
        <table class="tbl">
          <thead>
            <tr><th>Tên</th><th>Khu vực</th><th>Loại nuôi</th><th>Sức chứa</th><th>Đánh giá</th><th>Trạng thái</th><th>Ngày tham gia</th><th>Hành động</th></tr>
          </thead>
          <tbody>
            ${fosters.map(f => `
              <tr>
                <td><div class="pet-cell"><div style="font-size:1.5rem">${f.avatar}</div><div><div class="pet-cell-name">${f.name}</div><div class="pet-cell-sub">${f.phone}</div></div></div></td>
                <td>${f.area}</td><td>${f.type}</td>
                <td><div style="display:flex;align-items:center;gap:0.5rem"><div style="display:flex;gap:2px">${Array.from({length:f.max}).map((_,i) => `<div style="width:16px;height:16px;border-radius:50%;background:${i<f.current?"var(--terracotta)":"var(--light-gray)"}"></div>`).join("")}</div><span>${f.current}/${f.max}</span></div></td>
                <td>⭐ ${f.rating}/5</div></td>
                <td><span class="sbadge ${f.status === 'active' ? 'sbadge-approved' : f.status === 'busy' ? 'sbadge-watch' : 'sbadge-rejected'}">${f.status === 'active' ? '🟢 Hoạt động' : f.status === 'busy' ? '🟡 Đã có thú' : '🔴 Tạm dừng'}</span></td>
                <td>${f.joined}</td>
                <td><div class="action-btns"><button class="btn-edit" onclick="editFoster(${f.id})">✏️ Sửa</button><button class="btn-delete" onclick="deleteFoster(${f.id})">🗑 Xóa</button></div></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function showAddFosterForm() {
  editingFosterId = null;
  document.getElementById("pageContent").innerHTML = `
    <div class="add-form-card"><h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:1.75rem">➕ Thêm người nuôi tạm mới</h2>
      <form id="fosterFormModal"><div class="form-grid">
        <div class="fgroup"><label>Họ tên *</label><input type="text" id="fosterName" required/></div>
        <div class="fgroup"><label>Avatar (emoji)</label><input type="text" id="fosterAvatar" value="🐾"/></div>
        <div class="fgroup"><label>Số điện thoại *</label><input type="tel" id="fosterPhone" required/></div>
        <div class="fgroup"><label>Email</label><input type="email" id="fosterEmail"/></div>
        <div class="fgroup"><label>Khu vực *</label><input type="text" id="fosterArea" required/></div>
        <div class="fgroup"><label>Loại nuôi</label><select id="fosterType"><option>Mèo</option><option>Chó</option><option>Chó + Mèo</option></select></div>
        <div class="fgroup"><label>Số lượng tối đa</label><input type="number" id="fosterMax" value="2" min="1"/></div>
        <div class="fgroup"><label>Số lượng hiện tại</label><input type="number" id="fosterCurrent" value="0" min="0"/></div>
        <div class="fgroup"><label>Đánh giá (1-5)</label><input type="number" id="fosterRating" value="5" min="1" max="5"/></div>
        <div class="fgroup"><label>Trạng thái</label><select id="fosterStatus"><option value="active">🟢 Đang hoạt động</option><option value="busy">🟡 Đã có thú</option><option value="inactive">🔴 Tạm dừng</option></select></div>
        <div class="fgroup"><label>Ngày tham gia</label><input type="date" id="fosterJoined" value="${new Date().toISOString().split('T')[0]}"/></div>
      </div><div class="form-actions"><button type="submit" class="btn-submit">💾 Lưu</button><button type="button" class="btn-reset" onclick="renderFosters()">❌ Hủy</button></div></form></div>
  `;
  document.getElementById("fosterFormModal").addEventListener("submit", (e) => { e.preventDefault(); submitAddFoster(); });
}

function submitAddFoster() {
  const fosters = getStoredFosters();
  const newId = Math.max(...fosters.map(f => f.id), 0) + 1;
  const newFoster = {
    id: newId, name: document.getElementById("fosterName").value, avatar: document.getElementById("fosterAvatar").value,
    phone: document.getElementById("fosterPhone").value, email: document.getElementById("fosterEmail").value,
    area: document.getElementById("fosterArea").value, type: document.getElementById("fosterType").value,
    max: parseInt(document.getElementById("fosterMax").value), current: parseInt(document.getElementById("fosterCurrent").value),
    rating: parseInt(document.getElementById("fosterRating").value), status: document.getElementById("fosterStatus").value,
    joined: document.getElementById("fosterJoined").value,
  };
  fosters.push(newFoster); saveFosters(fosters);
  showToast(`✅ Đã thêm "${newFoster.name}"!`); renderFosters();
}

function editFoster(id) {
  const fosters = getStoredFosters(); const foster = fosters.find(f => f.id === id);
  if (!foster) return; editingFosterId = id;
  document.getElementById("pageContent").innerHTML = `
    <div class="add-form-card"><h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:1.75rem">✏️ Chỉnh sửa: ${foster.name}</h2>
      <form id="fosterFormModal"><div class="form-grid">
        <div class="fgroup"><label>Họ tên</label><input type="text" id="fosterName" value="${foster.name}" required/></div>
        <div class="fgroup"><label>Avatar</label><input type="text" id="fosterAvatar" value="${foster.avatar}"/></div>
        <div class="fgroup"><label>SĐT</label><input type="tel" id="fosterPhone" value="${foster.phone}" required/></div>
        <div class="fgroup"><label>Email</label><input type="email" id="fosterEmail" value="${foster.email || ''}"/></div>
        <div class="fgroup"><label>Khu vực</label><input type="text" id="fosterArea" value="${foster.area}" required/></div>
        <div class="fgroup"><label>Loại nuôi</label><select id="fosterType"><option ${foster.type === 'Mèo' ? 'selected' : ''}>Mèo</option><option ${foster.type === 'Chó' ? 'selected' : ''}>Chó</option><option ${foster.type === 'Chó + Mèo' ? 'selected' : ''}>Chó + Mèo</option></select></div>
        <div class="fgroup"><label>Số lượng tối đa</label><input type="number" id="fosterMax" value="${foster.max}" min="1"/></div>
        <div class="fgroup"><label>Số lượng hiện tại</label><input type="number" id="fosterCurrent" value="${foster.current}" min="0"/></div>
        <div class="fgroup"><label>Đánh giá</label><input type="number" id="fosterRating" value="${foster.rating}" min="1" max="5"/></div>
        <div class="fgroup"><label>Trạng thái</label><select id="fosterStatus"><option value="active" ${foster.status === 'active' ? 'selected' : ''}>🟢 Hoạt động</option><option value="busy" ${foster.status === 'busy' ? 'selected' : ''}>🟡 Đã có thú</option><option value="inactive" ${foster.status === 'inactive' ? 'selected' : ''}>🔴 Tạm dừng</option></select></div>
        <div class="fgroup"><label>Ngày tham gia</label><input type="date" id="fosterJoined" value="${foster.joined}"/></div>
      </div><div class="form-actions"><button type="submit" class="btn-submit">💾 Lưu</button><button type="button" class="btn-reset" onclick="renderFosters()">❌ Hủy</button></div></form></div>
  `;
  document.getElementById("fosterFormModal").addEventListener("submit", (e) => { e.preventDefault(); updateFoster(); });
}

function updateFoster() {
  const fosters = getStoredFosters(); const idx = fosters.findIndex(f => f.id === editingFosterId);
  if (idx !== -1) {
    fosters[idx] = { ...fosters[idx], name: document.getElementById("fosterName").value, avatar: document.getElementById("fosterAvatar").value, phone: document.getElementById("fosterPhone").value, email: document.getElementById("fosterEmail").value, area: document.getElementById("fosterArea").value, type: document.getElementById("fosterType").value, max: parseInt(document.getElementById("fosterMax").value), current: parseInt(document.getElementById("fosterCurrent").value), rating: parseInt(document.getElementById("fosterRating").value), status: document.getElementById("fosterStatus").value, joined: document.getElementById("fosterJoined").value };
    saveFosters(fosters); showToast(`✏️ Đã cập nhật!`);
  } renderFosters();
}

function deleteFoster(id) {
  if (!confirm("Xóa người nuôi tạm này?")) return;
  saveFosters(getStoredFosters().filter(f => f.id !== id));
  showToast("🗑 Đã xóa!"); renderFosters();
}

// ===== RENDER VOLUNTEERS =====
function renderVolunteers() {
  const volunteers = getStoredVolunteers();
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card"><div class="table-header"><span class="table-title">🙋 Danh sách tình nguyện viên (${volunteers.length})</span><button class="btn-submit" onclick="showAddVolunteerForm()">+ Thêm mới</button></div>
      <div style="overflow-x:auto"><table class="tbl"><thead><tr><th>Tên</th><th>Vai trò</th><th>Khu vực</th><th>Nhiệm vụ</th><th>Kỹ năng</th><th>Trạng thái</th><th>Ngày tham gia</th><th>Hành động</th></tr></thead>
      <tbody>${volunteers.map(v => `
        <td><div class="pet-cell"><div style="font-size:1.5rem">${v.avatar || '🙋'}</div><div><div class="pet-cell-name">${v.name}</div><div class="pet-cell-sub">${v.phone}</div></div></div></td>
        <td><span class="sbadge sbadge-approved" style="background:#E8F0FF;color:var(--blue)">${v.role}</span></td>
        <td>${v.area}</td><td><span style="font-family:var(--font-mono);font-weight:700">${v.missions}</span> nhiệm vụ</div></td>
        <td><span style="font-size:0.72rem">${(v.skills || []).join(', ')}</span></td>
        <td><span class="sbadge ${v.status === 'active' ? 'sbadge-approved' : 'sbadge-rejected'}">${v.status === 'active' ? '✅ Đang hoạt động' : '⏸ Tạm ngưng'}</span></td>
        <td>${v.joined}</td>
        <td><div class="action-btns"><button class="btn-edit" onclick="editVolunteer(${v.id})">✏️ Sửa</button><button class="btn-delete" onclick="deleteVolunteer(${v.id})">🗑 Xóa</button></div></td>
      </tr>
      `).join("")}</tbody></table></div></div>
  `;
}

function showAddVolunteerForm() {
  editingVolunteerId = null;
  document.getElementById("pageContent").innerHTML = `
    <div class="add-form-card"><h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:1.75rem">➕ Thêm tình nguyện viên mới</h2>
      <form id="volunteerFormModal"><div class="form-grid">
        <div class="fgroup"><label>Họ tên *</label><input type="text" id="volName" required/></div>
        <div class="fgroup"><label>Avatar (emoji)</label><input type="text" id="volAvatar" value="🙋"/></div>
        <div class="fgroup"><label>Số điện thoại *</label><input type="tel" id="volPhone" required/></div>
        <div class="fgroup"><label>Email *</label><input type="email" id="volEmail" required/></div>
        <div class="fgroup"><label>Vai trò</label><select id="volRole"><option value="Rescuer">🚑 Rescuer</option><option value="Foster Parent">🏠 Foster Parent</option><option value="Coordinator">💻 Coordinator</option><option value="Pet Photographer">📸 Pet Photographer</option></select></div>
        <div class="fgroup"><label>Khu vực</label><input type="text" id="volArea"/></div>
        <div class="fgroup"><label>Số nhiệm vụ</label><input type="number" id="volMissions" value="0" min="0"/></div>
        <div class="fgroup"><label>Kỹ năng</label><input type="text" id="volSkills" placeholder="Bắt chó mèo, Sơ cứu, ..."/></div>
        <div class="fgroup"><label>Trạng thái</label><select id="volStatus"><option value="active">✅ Đang hoạt động</option><option value="inactive">⏸ Tạm ngưng</option></select></div>
        <div class="fgroup"><label>Ngày tham gia</label><input type="date" id="volJoined" value="${new Date().toISOString().split('T')[0]}"/></div>
      </div><div class="form-actions"><button type="submit" class="btn-submit">💾 Lưu</button><button type="button" class="btn-reset" onclick="renderVolunteers()">❌ Hủy</button></div></form></div>
  `;
  document.getElementById("volunteerFormModal").addEventListener("submit", (e) => { e.preventDefault(); submitAddVolunteer(); });
}

function submitAddVolunteer() {
  const volunteers = getStoredVolunteers(); const newId = Math.max(...volunteers.map(v => v.id), 0) + 1;
  const skillsStr = document.getElementById("volSkills").value; const skills = skillsStr ? skillsStr.split(',').map(s => s.trim()) : [];
  const newVolunteer = {
    id: newId, name: document.getElementById("volName").value, avatar: document.getElementById("volAvatar").value,
    phone: document.getElementById("volPhone").value, email: document.getElementById("volEmail").value,
    role: document.getElementById("volRole").value, area: document.getElementById("volArea").value,
    missions: parseInt(document.getElementById("volMissions").value), skills: skills,
    status: document.getElementById("volStatus").value, joined: document.getElementById("volJoined").value,
  };
  volunteers.push(newVolunteer); saveVolunteers(volunteers);
  showToast(`✅ Đã thêm "${newVolunteer.name}"!`); renderVolunteers();
}

function editVolunteer(id) {
  const volunteers = getStoredVolunteers(); const volunteer = volunteers.find(v => v.id === id);
  if (!volunteer) return; editingVolunteerId = id;
  document.getElementById("pageContent").innerHTML = `
    <div class="add-form-card"><h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:1.75rem">✏️ Chỉnh sửa: ${volunteer.name}</h2>
      <form id="volunteerFormModal"><div class="form-grid">
        <div class="fgroup"><label>Họ tên</label><input type="text" id="volName" value="${volunteer.name}" required/></div>
        <div class="fgroup"><label>Avatar</label><input type="text" id="volAvatar" value="${volunteer.avatar || '🙋'}"/></div>
        <div class="fgroup"><label>SĐT</label><input type="tel" id="volPhone" value="${volunteer.phone}" required/></div>
        <div class="fgroup"><label>Email</label><input type="email" id="volEmail" value="${volunteer.email}" required/></div>
        <div class="fgroup"><label>Vai trò</label><select id="volRole"><option value="Rescuer" ${volunteer.role === 'Rescuer' ? 'selected' : ''}>🚑 Rescuer</option><option value="Foster Parent" ${volunteer.role === 'Foster Parent' ? 'selected' : ''}>🏠 Foster Parent</option><option value="Coordinator" ${volunteer.role === 'Coordinator' ? 'selected' : ''}>💻 Coordinator</option><option value="Pet Photographer" ${volunteer.role === 'Pet Photographer' ? 'selected' : ''}>📸 Pet Photographer</option></select></div>
        <div class="fgroup"><label>Khu vực</label><input type="text" id="volArea" value="${volunteer.area}"/></div>
        <div class="fgroup"><label>Số nhiệm vụ</label><input type="number" id="volMissions" value="${volunteer.missions}" min="0"/></div>
        <div class="fgroup"><label>Kỹ năng</label><input type="text" id="volSkills" value="${(volunteer.skills || []).join(', ')}"/></div>
        <div class="fgroup"><label>Trạng thái</label><select id="volStatus"><option value="active" ${volunteer.status === 'active' ? 'selected' : ''}>✅ Đang hoạt động</option><option value="inactive" ${volunteer.status === 'inactive' ? 'selected' : ''}>⏸ Tạm ngưng</option></select></div>
        <div class="fgroup"><label>Ngày tham gia</label><input type="date" id="volJoined" value="${volunteer.joined}"/></div>
      </div><div class="form-actions"><button type="submit" class="btn-submit">💾 Lưu</button><button type="button" class="btn-reset" onclick="renderVolunteers()">❌ Hủy</button></div></form></div>
  `;
  document.getElementById("volunteerFormModal").addEventListener("submit", (e) => { e.preventDefault(); updateVolunteer(); });
}

function updateVolunteer() {
  const volunteers = getStoredVolunteers(); const idx = volunteers.findIndex(v => v.id === editingVolunteerId);
  if (idx !== -1) {
    const skillsStr = document.getElementById("volSkills").value; const skills = skillsStr ? skillsStr.split(',').map(s => s.trim()) : [];
    volunteers[idx] = { ...volunteers[idx], name: document.getElementById("volName").value, avatar: document.getElementById("volAvatar").value, phone: document.getElementById("volPhone").value, email: document.getElementById("volEmail").value, role: document.getElementById("volRole").value, area: document.getElementById("volArea").value, missions: parseInt(document.getElementById("volMissions").value), skills: skills, status: document.getElementById("volStatus").value, joined: document.getElementById("volJoined").value };
    saveVolunteers(volunteers); showToast(`✏️ Đã cập nhật!`);
  } renderVolunteers();
}

function deleteVolunteer(id) {
  if (!confirm("Xóa tình nguyện viên này?")) return;
  saveVolunteers(getStoredVolunteers().filter(v => v.id !== id));
  showToast("🗑 Đã xóa!"); renderVolunteers();
}
// ===== MODAL HELPERS =====
function openModal() { 
  const modal = document.getElementById("detailModal");
  if (modal) { modal.classList.add("open"); document.body.style.overflow = "hidden"; }
}
function closeModal() { 
  const modal = document.getElementById("detailModal");
  if (modal) { modal.classList.remove("open"); document.body.style.overflow = ""; }
}

if (document.getElementById("detailModal")) {
  document.getElementById("detailModal").addEventListener("click", e => {
    if (e.target === document.getElementById("detailModal")) closeModal();
  });
}

document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ===== TOAST =====
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove("show"), 3500);
  }
}
