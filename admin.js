/* ========================================
   PAWLINK — admin.js  (patched)
   Fixes:
   1. Login now uses pawlink_session (consistent with login.html)
   2. Foster CRUD: add / edit / delete
   3. Volunteer CRUD: add / edit / delete
   4. Merch management tab added
======================================== */

// ===== STORAGE KEYS =====
const STORAGE_KEY        = "pawgen_pets";
const PENDING_KEY        = "pawgen_pending";
const SESSION_KEY        = "pawlink_session";   // ← same as login.html
const FOSTER_KEY         = "pawlink_fosters";
const VOLUNTEER_KEY      = "pawlink_volunteers";
const MERCH_KEY          = "pawlink_merch";

// ===== SEED DATA =====
const SEED_PENDING = [
  { id:"RPT-001", submitTime:"2 phút trước",  reporter:"Nguyễn Thị Lan",  phone:"0901234567", name:"Kem",      type:"cat", emoji:"🐱",   age:"~1 tháng", gender:"Không rõ", location:"Cổng sau ĐH Bách Khoa, Q.10",        condition:"urgent", desc:"Mèo con rất nhỏ, đang kêu liên tục, có vẻ bị bỏ rơi từ tối qua. Chân phải hơi khập khiễng.", tags:["Mèo con","Cần cứu gấp"],       bgColor:"#FFF0E8", vaccinated:false, neutered:false, status:"pending", fosterDays:0, costs:"0 VNĐ" },
  { id:"RPT-002", submitTime:"15 phút trước", reporter:"Trần Văn Minh",   phone:"0912345678", name:"Bí",      type:"dog", emoji:"🐕",   age:"~4 tháng", gender:"Đực",     location:"Hẻm 12 Lê Văn Sỹ, Q.3",            condition:"watch",  desc:"Chó con lông vàng, có vẻ lạc. Đang ngồi trước cửa nhà tôi từ sáng, không thấy chủ tìm.",   tags:["Chó con","Lạc chủ?"],           bgColor:"#FFF8E0", vaccinated:false, neutered:false, status:"pending", fosterDays:0, costs:"0 VNĐ" },
  { id:"RPT-003", submitTime:"1 giờ trước",   reporter:"Lê Phương Anh",   phone:"0987654321", name:"Sữa",     type:"cat", emoji:"😸",   age:"~6 tháng", gender:"Cái",     location:"Sân ký túc xá ĐHQG, Thủ Đức",       condition:"safe",   desc:"Mèo trắng sống lang thang trong KTX đã 2 tuần. Sức khỏe tốt.",                               tags:["Mèo trẻ","Sức khỏe tốt"],       bgColor:"#F0F8FF", vaccinated:false, neutered:false, status:"pending", fosterDays:0, costs:"0 VNĐ" },
  { id:"RPT-004", submitTime:"3 giờ trước",   reporter:"Phạm Quốc Hùng",  phone:"0978123456", name:"Than",    type:"cat", emoji:"🐈‍⬛", age:"~3 năm",   gender:"Đực",     location:"Chợ Phạm Văn Hai, Tân Bình",        condition:"urgent", desc:"Mèo đen bị thương ở mắt phải. Đang trú dưới gầm xe, rất sợ người.",                          tags:["Cần cứu gấp","Bị thương"],      bgColor:"#FFEAEA", vaccinated:false, neutered:false, status:"pending", fosterDays:0, costs:"0 VNĐ" },
  { id:"RPT-005", submitTime:"5 giờ trước",   reporter:"Võ Thị Hoa",      phone:"0965432187", name:"Cà Phê",  type:"dog", emoji:"🐶",   age:"~1 năm",   gender:"Cái",     location:"Công viên Hoàng Văn Thụ, Tân Bình", condition:"watch",  desc:"Chó nâu vừa, lang thang công viên, có vẻ có bầu, lo cho sức khỏe mẹ và con.",               tags:["Đang mang thai?","Cần theo dõi"],bgColor:"#E8FFF0", vaccinated:false, neutered:false, status:"pending", fosterDays:0, costs:"0 VNĐ" },
];

const SEED_FOSTERS = [
  { id:1, name:"Nguyễn Minh Anh", area:"Quận 10",    type:"cat",  rating:5, current:1, max:2, phone:"0901234567", avatar:"🌸", joined:"15/01/2025", status:"active" },
  { id:2, name:"Trần Hoàng Hùng", area:"Thủ Đức",    type:"both", rating:5, current:0, max:1, phone:"0912345678", avatar:"🌟", joined:"22/01/2025", status:"active" },
  { id:3, name:"Lê Phương Linh",  area:"Quận 3",     type:"cat",  rating:4, current:2, max:2, phone:"0987654321", avatar:"🎀", joined:"30/01/2025", status:"full"   },
  { id:4, name:"Phạm Văn Khoa",   area:"Bình Thạnh", type:"dog",  rating:5, current:1, max:3, phone:"0978123456", avatar:"⭐", joined:"05/02/2025", status:"active" },
  { id:5, name:"Võ Thị Mai",      area:"Quận 7",     type:"cat",  rating:4, current:0, max:2, phone:"0965432187", avatar:"🌺", joined:"12/02/2025", status:"active" },
];

const SEED_VOLUNTEERS = [
  { id:1, name:"Trần Minh Khoa",   role:"Rescuer",          area:"Q.1, Q.3",   phone:"0901111222", status:"active",   missions:12, joined:"10/01/2025" },
  { id:2, name:"Nguyễn Thu Hà",    role:"Foster Parent",    area:"Thủ Đức",    phone:"0912222333", status:"active",   missions:8,  joined:"18/01/2025" },
  { id:3, name:"Lê Văn Dũng",      role:"Coordinator",      area:"Online",     phone:"0923333444", status:"active",   missions:24, joined:"05/01/2025" },
  { id:4, name:"Phạm Bích Ngọc",   role:"Pet Photographer", area:"Q.7, Q.5",   phone:"0934444555", status:"inactive", missions:5,  joined:"20/02/2025" },
  { id:5, name:"Vũ Hoàng Nam",     role:"Rescuer",          area:"Bình Thạnh", phone:"0945555666", status:"active",   missions:17, joined:"14/01/2025" },
];

const SEED_MERCH = [
  { id:1, name:"Áo Phông PAWGEN Classic",    type:"apparel",   emoji:"👕",  price:250000, desc:"Unisex, cotton 100%, in lưới cao cấp. Màu kem & xanh rừng.", badge:"Bán chạy nhất", bgColor:"#E8F0FF", stock:50, active:true },
  { id:2, name:"Hoodie Cứu Hộ Hero",         type:"apparel",   emoji:"🧥",  price:480000, desc:"Nỉ ấm, có túi kangaroo. In slogan 'Rescue. Foster. Adopt.'", badge:"New",           bgColor:"#FFF0E8", stock:30, active:true },
  { id:3, name:"Tote Bag PawPrint",          type:"accessory", emoji:"👜",  price:150000, desc:"Canvas dày, 2 quai chắc. In dấu chân thú cưng nghệ thuật.",   badge:"Eco",           bgColor:"#E8FFE8", stock:100,active:true },
  { id:4, name:"Bộ Sticker PAWGEN Vol.1",    type:"sticker",   emoji:"🎨",  price:45000,  desc:"12 sticker chống nước. Thiết kế chibi mèo chó cute.",         badge:"45K",           bgColor:"#FFF8E0", stock:200,active:true },
  { id:5, name:"Mug Terracotta Cat",         type:"homeware",  emoji:"☕",  price:180000, desc:"Sứ cao cấp 350ml. Họa tiết mèo thủ công trên nền đất nung.",   badge:null,            bgColor:"#FFE8E8", stock:40, active:true },
  { id:6, name:"Nón Bucket PAWGEN",          type:"apparel",   emoji:"🧢",  price:220000, desc:"Chất liệu chống nắng tốt. Thêu logo PAWGEN 3D.",              badge:"Limited",       bgColor:"#E8F5FF", stock:20, active:true },
  { id:7, name:"Keychain Paw Charm",         type:"accessory", emoji:"🔑",  price:65000,  desc:"Hợp kim kẽm mạ vàng. Dấu chân thú cưng siêu cute.",           badge:null,            bgColor:"#F5E8FF", stock:150,active:true },
  { id:8, name:"Gối Tựa Lưng Mochi",        type:"homeware",  emoji:"🛋️", price:320000, desc:"Gối bông cao su non. In hình Mochi — mèo được cứu hộ đầu tiên.", badge:"Story",       bgColor:"#E8FFF5", stock:25, active:true },
  { id:9, name:"Poster Art 'Every Life Counts'",type:"sticker",emoji:"🖼️", price:95000,  desc:"A3, in decal cao cấp không thấm nước. Thiết kế tranh nghệ thuật.", badge:null,        bgColor:"#FFF0F5", stock:80, active:true },
];

// ===== STATE =====
let currentPage  = "overview";
let pendingList  = [];
let approvedList = [];
let selectedEmoji = "🐱";
let currentTags   = [];
let editingId     = null;

// ===== STORAGE HELPERS =====
function getApproved()   { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)   || "[]"); } catch { return []; } }
function saveApproved(d) { localStorage.setItem(STORAGE_KEY,   JSON.stringify(d)); }

function getPending()    { try { const s = JSON.parse(localStorage.getItem(PENDING_KEY) || "null"); if (!s) { localStorage.setItem(PENDING_KEY, JSON.stringify(SEED_PENDING)); return SEED_PENDING; } return s; } catch { return SEED_PENDING; } }
function savePending(d)  { localStorage.setItem(PENDING_KEY,  JSON.stringify(d)); }

function getFosters()    { try { const s = JSON.parse(localStorage.getItem(FOSTER_KEY)    || "null"); if (!s) { localStorage.setItem(FOSTER_KEY,    JSON.stringify(SEED_FOSTERS));   return SEED_FOSTERS;   } return s; } catch { return SEED_FOSTERS;   } }
function saveFosters(d)  { localStorage.setItem(FOSTER_KEY,    JSON.stringify(d)); }

function getVolunteers()    { try { const s = JSON.parse(localStorage.getItem(VOLUNTEER_KEY) || "null"); if (!s) { localStorage.setItem(VOLUNTEER_KEY, JSON.stringify(SEED_VOLUNTEERS)); return SEED_VOLUNTEERS; } return s; } catch { return SEED_VOLUNTEERS; } }
function saveVolunteers(d)  { localStorage.setItem(VOLUNTEER_KEY, JSON.stringify(d)); }

function getMerch()   { try { const s = JSON.parse(localStorage.getItem(MERCH_KEY) || "null"); if (!s) { localStorage.setItem(MERCH_KEY, JSON.stringify(SEED_MERCH)); return SEED_MERCH; } return s; } catch { return SEED_MERCH; } }
function saveMerch(d) { localStorage.setItem(MERCH_KEY, JSON.stringify(d)); }

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  checkSession();
  initLogin();
  initSidebar();
  initModal();

  pendingList  = getPending();
  approvedList = getApproved();
  updatePendingBadge();
});

// ===== FIX #1 — SESSION-BASED LOGIN =====
function checkSession() {
  try {
    const sess = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (sess && sess.role === "admin") {
      showApp();
    }
  } catch {}
}

function showApp() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("adminApp").style.display    = "flex";
  navigateTo("overview");
}

function initLogin() {
  document.getElementById("loginForm").addEventListener("submit", e => {
    e.preventDefault();
    const user = document.getElementById("loginUser").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    // Accept both credential sets
    const ok = (user === "admin" && pass === "pawgen123") ||
               (user === "admin@pawlink.vn" && pass === "pawlink123");

    if (ok) {
      const sess = { name:"Admin PAWGEN", email:"admin@pawlink.vn", role:"admin" };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sess));
      showApp();
    } else {
      document.getElementById("loginError").classList.add("show");
      setTimeout(() => document.getElementById("loginError").classList.remove("show"), 3000);
    }
  });
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  document.getElementById("adminApp").style.display    = "none";
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
    const main    = document.getElementById("adminApp").querySelector(".admin-main");
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
  document.querySelectorAll(".sidebar-link").forEach(l => l.classList.toggle("active", l.dataset.page === page));

  const titles = {
    overview:"Dashboard Tổng quan", pending:"Duyệt báo cáo cứu hộ",
    approved:"Thú cưng đã duyệt",   rejected:"Báo cáo đã từ chối",
    add:"Thêm thú cưng mới",        fosters:"Người nuôi tạm",
    volunteers:"Tình nguyện viên",  merch:"Quản lý Merch",
  };
  document.getElementById("topbarTitle").textContent = titles[page] || page;

  pendingList  = getPending();
  approvedList = getApproved();

  switch (page) {
    case "overview":   renderOverview();   break;
    case "pending":    renderPending();    break;
    case "approved":   renderApproved();   break;
    case "rejected":   renderRejected();   break;
    case "add":        renderAddForm();    break;
    case "fosters":    renderFosters();    break;
    case "volunteers": renderVolunteers(); break;
    case "merch":      renderMerch();      break;
  }
}

function updatePendingBadge() {
  const count = getPending().filter(p => p.status === "pending").length;
  const badge = document.getElementById("pendingCount");
  if (badge) { badge.textContent = count; badge.style.display = count > 0 ? "inline-block" : "none"; }
}

// ===== OVERVIEW =====
function renderOverview() {
  pendingList  = getPending();
  approvedList = getApproved();
  const pCount = pendingList.filter(p => p.status === "pending").length;
  const rCount = pendingList.filter(p => p.status === "rejected").length;

  document.getElementById("pageContent").innerHTML = `
    <div class="metrics-row">
      <div class="metric-card" style="border-top-color:var(--yellow)">
        <div class="metric-icon">⏳</div>
        <span class="metric-val" style="color:var(--yellow)">${pCount}</span>
        <div class="metric-label">Chờ duyệt</div>
        <div class="metric-change" style="color:var(--yellow)">Cần xử lý sớm</div>
      </div>
      <div class="metric-card">
        <div class="metric-icon">✅</div>
        <span class="metric-val">${approvedList.length}</span>
        <div class="metric-label">Thú cưng đã duyệt</div>
        <div class="metric-change">Hiện trên trang chủ</div>
      </div>
      <div class="metric-card" style="border-top-color:var(--red)">
        <div class="metric-icon">❌</div>
        <span class="metric-val" style="color:var(--red)">${rCount}</span>
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
      ${renderPendingTable(pendingList.filter(p => p.status === "pending").slice(0,4), true)}
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
            oninput="renderPending(this.value)"/>
          <select class="select-filter" onchange="renderPendingByCondition(this.value)">
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

function renderPendingByCondition(val) {
  pendingList = getPending();
  let items = pendingList.filter(p => p.status === "pending");
  if (val) items = items.filter(p => p.condition === val);
  const wrap = document.getElementById("pageContent").querySelector(".table-card");
  if (wrap) {
    const tbl = wrap.querySelector("[style*='overflow-x']");
    if (tbl) tbl.outerHTML = renderPendingTable(items, false);
    else wrap.insertAdjacentHTML("beforeend", renderPendingTable(items, false));
  }
}

function renderPendingTable(items, mini) {
  if (items.length === 0) return `<div class="empty-state"><div class="empty-state-icon">✅</div><h3>Không có báo cáo nào!</h3></div>`;
  return `
    <div style="overflow-x:auto">
      <table class="tbl">
        <thead>
          <tr><th>Thú cưng</th><th>Người báo</th><th>Địa điểm</th><th>Mức độ</th><th>Thời gian</th><th>Hành động</th></tr>
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
              <td><div style="font-weight:500">${item.reporter}</div><div style="font-size:0.72rem;color:var(--mid-gray)">${item.phone}</div></td>
              <td style="max-width:180px;font-size:0.82rem">${item.location}</td>
              <td><span class="sbadge sbadge-${item.condition}">${item.condition === "urgent" ? "🔴 Khẩn cấp" : item.condition === "watch" ? "🟡 Theo dõi" : "🟢 An toàn"}</span></td>
              <td style="font-size:0.78rem;color:var(--mid-gray)">${item.submitTime}</td>
              <td>
                <div class="action-btns">
                  <button class="btn-view"    onclick="viewPet('${item.id}','pending')">👁 Xem</button>
                  <button class="btn-approve" onclick="approvePet('${item.id}')">✅ Duyệt</button>
                  <button class="btn-reject"  onclick="openRejectModal('${item.id}')">❌ Từ chối</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

// ===== APPROVE =====
function approvePet(id) {
  pendingList  = getPending();
  approvedList = getApproved();
  const idx = pendingList.findIndex(p => p.id === id);
  if (idx === -1) return;
  const pet = { ...pendingList[idx], status:"approved", approvedTime:new Date().toLocaleString("vi-VN"), id:Date.now(), fosterDays:0 };
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
  const pet = getPending().find(p => p.id === id);
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
    <textarea class="reject-reason" id="rejectReason" placeholder="VD: Thông tin không đủ, địa chỉ không rõ..." rows="3"></textarea>
    <div style="display:flex;gap:0.75rem">
      <button class="btn-reject" style="flex:1;padding:0.75rem" onclick="confirmReject('${id}')">❌ Xác nhận từ chối</button>
      <button class="btn-reset"  style="flex:1;padding:0.75rem" onclick="closeModal()">Huỷ</button>
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
  pendingList[idx].status       = "rejected";
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
  const list = source === "pending" ? getPending() : getApproved();
  const pet  = list.find(p => String(p.id) === String(id));
  if (!pet) return;
  const condLabel = { urgent:"🔴 Khẩn cấp", watch:"🟡 Theo dõi", safe:"🟢 An toàn" };
  document.getElementById("modalContent").innerHTML = `
    <div class="modal-pet-header">
      <div class="modal-pet-emoji" style="background:${pet.bgColor}">${pet.emoji}</div>
      <div>
        <div class="modal-pet-name">${pet.name}</div>
        <span class="sbadge sbadge-${pet.condition}">${condLabel[pet.condition] || pet.condition}</span>
        ${pet.status === "pending"  ? '<span class="sbadge sbadge-pending"  style="margin-left:.5rem">⏳ Chờ duyệt</span>'  : ""}
        ${pet.status === "approved" ? '<span class="sbadge sbadge-approved" style="margin-left:.5rem">✅ Đã duyệt</span>'   : ""}
        ${pet.status === "rejected" ? '<span class="sbadge sbadge-rejected" style="margin-left:.5rem">❌ Từ chối</span>'   : ""}
      </div>
    </div>
    <div class="modal-info-grid">
      <div class="modal-info-item"><div class="modal-info-label">Loài</div><div class="modal-info-val">${pet.type === "cat" ? "🐱 Mèo" : "🐶 Chó"}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Giới tính</div><div class="modal-info-val">${pet.gender}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Tuổi ước tính</div><div class="modal-info-val">${pet.age}</div></div>
      <div class="modal-info-item"><div class="modal-info-label">Vaccine</div><div class="modal-info-val">${pet.vaccinated ? "✅ Đã tiêm" : "❌ Chưa tiêm"}</div></div>
      <div class="modal-info-item" style="grid-column:1/-1"><div class="modal-info-label">Địa điểm</div><div class="modal-info-val">${pet.location}</div></div>
      ${pet.reporter ? `<div class="modal-info-item"><div class="modal-info-label">Người báo cáo</div><div class="modal-info-val">${pet.reporter}</div></div>` : ""}
      ${pet.phone    ? `<div class="modal-info-item"><div class="modal-info-label">Số điện thoại</div><div class="modal-info-val">${pet.phone}</div></div>` : ""}
      ${pet.rejectReason ? `<div class="modal-info-item" style="grid-column:1/-1;border-left:3px solid var(--red)"><div class="modal-info-label">Lý do từ chối</div><div class="modal-info-val" style="color:var(--red)">${pet.rejectReason}</div></div>` : ""}
    </div>
    <p class="modal-desc">${pet.desc}</p>
    <div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:1.25rem">${(pet.tags||[]).map(t=>`<span class="tag-chip">${t}</span>`).join("")}</div>
    ${pet.status === "pending" ? `
      <div class="modal-actions">
        <button class="btn-approve" onclick="approvePet('${pet.id}')">✅ Duyệt ngay</button>
        <button class="btn-reject"  onclick="closeModal();openRejectModal('${pet.id}')">❌ Từ chối</button>
        <button class="btn-view"    onclick="closeModal()">Đóng</button>
      </div>` : `<button class="btn-view" onclick="closeModal()">Đóng</button>`}
  `;
  openModal();
}

// ===== APPROVED =====
function renderApproved() {
  approvedList = getApproved();
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">✅ Thú cưng đã duyệt (${approvedList.length})</span>
        <div class="table-actions">
          <input class="search-input" placeholder="🔍 Tìm kiếm..." oninput="searchApproved(this.value)"/>
          <button class="btn-submit" style="padding:0.4rem 1rem;font-size:0.8rem" onclick="navigateTo('add')">+ Thêm mới</button>
        </div>
      </div>
      <div id="approvedTableWrap">${renderApprovedTable(approvedList)}</div>
    </div>
  `;
}

function searchApproved(val) {
  const filtered = getApproved().filter(p =>
    p.name.toLowerCase().includes(val.toLowerCase()) ||
    (p.location||"").toLowerCase().includes(val.toLowerCase())
  );
  document.getElementById("approvedTableWrap").innerHTML = renderApprovedTable(filtered);
}

function renderApprovedTable(items) {
  if (items.length === 0) return `<div class="empty-state"><div class="empty-state-icon">📭</div><h3>Chưa có thú cưng nào được duyệt</h3></div>`;
  return `
    <div style="overflow-x:auto">
      <table class="tbl">
        <thead><tr><th>Thú cưng</th><th>Địa điểm</th><th>Tình trạng</th><th>Thời gian duyệt</th><th>Hành động</th></tr></thead>
        <tbody>
          ${items.map(pet => `
            <tr>
              <td>
                <div class="pet-cell">
                  <div class="pet-emoji-sm" style="background:${pet.bgColor||"#FFF0E8"}">${pet.emoji}</div>
                  <div><div class="pet-cell-name">${pet.name}</div><div class="pet-cell-sub">${pet.type==="cat"?"🐱 Mèo":"🐶 Chó"} · ${pet.age} · ${pet.gender}</div></div>
                </div>
              </td>
              <td style="font-size:0.82rem;max-width:200px">${pet.location}</td>
              <td><span class="sbadge sbadge-${pet.condition}">${pet.condition==="urgent"?"🔴 Khẩn cấp":pet.condition==="watch"?"🟡 Theo dõi":"🟢 An toàn"}</span></td>
              <td style="font-size:0.78rem;color:var(--mid-gray)">${pet.approvedTime||"—"}</td>
              <td>
                <div class="action-btns">
                  <button class="btn-view"   onclick="viewPet('${pet.id}','approved')">👁 Xem</button>
                  <button class="btn-edit"   onclick="editApprovedPet(${pet.id})">✏️ Sửa</button>
                  <button class="btn-delete" onclick="removePet(${pet.id})">🗑</button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function editApprovedPet(id) {
  const pet = getApproved().find(p => p.id === id);
  if (!pet) return;
  renderAddForm(pet);
}

function removePet(id) {
  if (!confirm("Bạn có chắc muốn gỡ thú cưng này khỏi trang nhận nuôi?")) return;
  saveApproved(getApproved().filter(p => p.id !== id));
  showToast("🗑 Đã gỡ thú cưng khỏi danh sách.");
  renderApproved();
}

// ===== REJECTED =====
function renderRejected() {
  const rejected = getPending().filter(p => p.status === "rejected");
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header"><span class="table-title">❌ Báo cáo đã từ chối (${rejected.length})</span></div>
      ${rejected.length === 0
        ? `<div class="empty-state"><div class="empty-state-icon">📋</div><h3>Chưa có báo cáo nào bị từ chối</h3></div>`
        : `<div style="overflow-x:auto"><table class="tbl">
            <thead><tr><th>Thú cưng</th><th>Người báo</th><th>Lý do từ chối</th><th>Thời gian</th><th>Hành động</th></tr></thead>
            <tbody>${rejected.map(pet => `
              <tr>
                <td><div class="pet-cell"><div class="pet-emoji-sm" style="background:${pet.bgColor}">${pet.emoji}</div><div><div class="pet-cell-name">${pet.name}</div><div class="pet-cell-sub">${pet.location}</div></div></div></td>
                <td>${pet.reporter}<br/><span style="font-size:0.72rem;color:var(--mid-gray)">${pet.phone}</span></td>
                <td style="font-size:0.82rem;color:var(--red);max-width:200px">${pet.rejectReason||"—"}</td>
                <td style="font-size:0.78rem;color:var(--mid-gray)">${pet.rejectedTime||"—"}</td>
                <td><button class="btn-approve" style="font-size:0.72rem" onclick="reApprove('${pet.id}')">↩ Duyệt lại</button></td>
              </tr>`).join("")}
            </tbody></table></div>`
      }
    </div>
  `;
}

function reApprove(id) {
  pendingList  = getPending();
  approvedList = getApproved();
  const idx = pendingList.findIndex(p => p.id === id);
  if (idx === -1) return;
  const pet = { ...pendingList[idx], status:"approved", approvedTime:new Date().toLocaleString("vi-VN"), id:Date.now() };
  delete pet.rejectReason; delete pet.rejectedTime;
  pendingList[idx].status = "approved";
  approvedList.push(pet);
  savePending(pendingList); saveApproved(approvedList);
  updatePendingBadge();
  showToast(`✅ Đã duyệt lại "${pet.name}"!`);
  navigateTo("rejected");
}

// ===== ADD / EDIT PET FORM =====
function renderAddForm(prefill = {}) {
  currentTags   = [...(prefill.tags || [])];
  selectedEmoji = prefill.emoji || "🐱";
  editingId     = prefill.id    || null;
  const emojis  = ["🐱","😺","😸","🐈","🐈‍⬛","🐶","🐕","🐩","🦮","🐕‍🦺"];

  document.getElementById("pageContent").innerHTML = `
    <div class="add-form-card">
      <h2 style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:1.75rem">
        ${editingId ? "✏️ Chỉnh sửa thú cưng" : "➕ Thêm thú cưng mới"}
      </h2>
      <form id="addPetForm">
        <div class="form-grid">
          <div class="fgroup"><label>Tên thú cưng *</label><input type="text" id="petName" placeholder="VD: Mochi, Bông..." value="${prefill.name||""}" required/></div>
          <div class="fgroup"><label>Loài *</label><select id="petType" required><option value="cat" ${prefill.type==="cat"?"selected":""}>🐱 Mèo</option><option value="dog" ${prefill.type==="dog"?"selected":""}>🐶 Chó</option></select></div>
          <div class="fgroup"><label>Giới tính</label><select id="petGender"><option ${prefill.gender==="Cái"?"selected":""}>Cái</option><option ${prefill.gender==="Đực"?"selected":""}>Đực</option><option ${prefill.gender==="Không rõ"?"selected":""}>Không rõ</option></select></div>
          <div class="fgroup"><label>Tuổi ước tính</label><input type="text" id="petAge" placeholder="VD: ~2 tháng" value="${prefill.age||""}"/></div>
          <div class="fgroup form-full"><label>Địa điểm phát hiện *</label><input type="text" id="petLocation" placeholder="VD: Cổng ĐH Bách Khoa, Q.10" value="${prefill.location||""}" required/></div>
          <div class="fgroup"><label>Mức độ khẩn cấp *</label><select id="petCondition" required><option value="safe" ${prefill.condition==="safe"?"selected":""}>🟢 An toàn</option><option value="watch" ${prefill.condition==="watch"?"selected":""}>🟡 Theo dõi</option><option value="urgent" ${prefill.condition==="urgent"?"selected":""}>🔴 Khẩn cấp</option></select></div>
          <div class="fgroup"><label>Màu nền card</label><input type="color" id="petBgColor" value="${prefill.bgColorHex||"#FFF0E8"}" style="height:42px;cursor:pointer"/></div>
          <div class="fgroup"><label>Đã tiêm vaccine?</label><select id="petVaccine"><option value="false" ${!prefill.vaccinated?"selected":""}>❌ Chưa</option><option value="true" ${prefill.vaccinated?"selected":""}>✅ Đã tiêm</option></select></div>
          <div class="fgroup"><label>Đã triệt sản?</label><select id="petNeutered"><option value="false" ${!prefill.neutered?"selected":""}>❌ Chưa</option><option value="true" ${prefill.neutered?"selected":""}>✅ Đã triệt sản</option></select></div>
          <div class="fgroup form-full"><label>Chọn emoji đại diện</label><div class="emoji-picker" id="emojiPicker">${emojis.map(e=>`<button type="button" class="emoji-opt ${e===selectedEmoji?"selected":""}" onclick="selectEmoji('${e}')">${e}</button>`).join("")}</div></div>
          <div class="fgroup form-full"><label>Mô tả *</label><textarea id="petDesc" rows="4" placeholder="Mô tả tình trạng, tính cách..." required>${prefill.desc||""}</textarea></div>
          <div class="fgroup form-full"><label>Tags (nhãn)</label>
            <div class="tag-input-wrap">
              <input type="text" id="tagInput" placeholder="VD: Mèo con, Cần gấp..."/>
              <button type="button" class="btn-submit" style="padding:0.5rem 1rem;font-size:0.82rem;flex-shrink:0" onclick="addTag()">+ Thêm</button>
            </div>
            <div class="tags-preview" id="tagsPreview">${currentTags.map((t,i)=>tagChip(t,i)).join("")}</div>
          </div>
          <div class="fgroup"><label>Chi phí đã dùng</label><input type="text" id="petCosts" placeholder="VD: 320,000 VNĐ" value="${prefill.costs||"0 VNĐ"}"/></div>
          <div class="fgroup"><label>Số ngày nuôi tạm</label><input type="number" id="petFosterDays" placeholder="0" value="${prefill.fosterDays||0}" min="0"/></div>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-submit">${editingId?"💾 Lưu thay đổi":"✅ Thêm & Duyệt ngay"}</button>
          <button type="button" class="btn-reset"  onclick="resetAddForm()">🔄 Làm mới</button>
          <button type="button" class="btn-view"   onclick="navigateTo('approved')">← Quay lại</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("tagInput").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } });
  document.getElementById("addPetForm").addEventListener("submit", e => { e.preventDefault(); submitAddPet(); });
}

function selectEmoji(emoji) {
  selectedEmoji = emoji;
  document.querySelectorAll(".emoji-opt").forEach(el => el.classList.toggle("selected", el.textContent === emoji));
}
function tagChip(tag, idx) { return `<span class="tag-chip">${tag}<button type="button" onclick="removeTag(${idx})">✕</button></span>`; }
function addTag() {
  const input = document.getElementById("tagInput");
  const val   = input.value.trim();
  if (!val || currentTags.includes(val)) return;
  currentTags.push(val); input.value = "";
  document.getElementById("tagsPreview").innerHTML = currentTags.map((t,i)=>tagChip(t,i)).join("");
}
function removeTag(idx) { currentTags.splice(idx,1); document.getElementById("tagsPreview").innerHTML = currentTags.map((t,i)=>tagChip(t,i)).join(""); }
function resetAddForm() {
  document.getElementById("addPetForm").reset();
  currentTags = []; selectedEmoji = "🐱"; editingId = null;
  document.querySelectorAll(".emoji-opt").forEach((el,i) => el.classList.toggle("selected", i===0));
  document.getElementById("tagsPreview").innerHTML = "";
}

function submitAddPet() {
  const name       = document.getElementById("petName").value.trim();
  const type       = document.getElementById("petType").value;
  const gender     = document.getElementById("petGender").value;
  const age        = document.getElementById("petAge").value.trim() || "Không rõ";
  const location   = document.getElementById("petLocation").value.trim();
  const condition  = document.getElementById("petCondition").value;
  const desc       = document.getElementById("petDesc").value.trim();
  const vaccinated = document.getElementById("petVaccine").value === "true";
  const neutered   = document.getElementById("petNeutered").value === "true";
  const bgColorHex = document.getElementById("petBgColor").value;
  const costs      = document.getElementById("petCosts").value.trim() || "0 VNĐ";
  const fosterDays = parseInt(document.getElementById("petFosterDays").value) || 0;

  approvedList = getApproved();

  if (editingId) {
    const idx = approvedList.findIndex(p => p.id === editingId);
    if (idx !== -1) {
      approvedList[idx] = { ...approvedList[idx], name, type, gender, age, location, condition, desc, vaccinated, neutered, bgColor:bgColorHex, bgColorHex, costs, fosterDays, emoji:selectedEmoji, tags:[...currentTags] };
    }
    saveApproved(approvedList);
    showToast(`✏️ Đã cập nhật thông tin "${name}"!`);
  } else {
    approvedList.push({ id:Date.now(), name, type, gender, age, location, condition, desc, vaccinated, neutered, emoji:selectedEmoji, bgColor:bgColorHex, bgColorHex, tags:[...currentTags], costs, fosterDays, status:"approved", approvedTime:new Date().toLocaleString("vi-VN"), reporter:"Admin" });
    saveApproved(approvedList);
    showToast(`✅ Đã thêm "${name}" vào danh sách nhận nuôi!`);
  }

  editingId = null;
  navigateTo("approved");
}

// ===== FIX #2 — FOSTERS CRUD =====
function renderFosters() {
  const fosters = getFosters();
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">🏠 Người nuôi tạm (${fosters.length})</span>
        <button class="btn-submit" style="padding:0.4rem 1rem;font-size:0.8rem" onclick="openFosterModal()">+ Thêm mới</button>
      </div>
      <div style="overflow-x:auto">
        <table class="tbl">
          <thead><tr><th>Tên</th><th>Khu vực</th><th>Loại nuôi</th><th>Sức chứa</th><th>Đánh giá</th><th>Ngày tham gia</th><th>Hành động</th></tr></thead>
          <tbody>
            ${fosters.map(f => `
              <tr>
                <td>
                  <div class="pet-cell">
                    <div style="font-size:1.5rem">${f.avatar}</div>
                    <div><div class="pet-cell-name">${f.name}</div><div class="pet-cell-sub">${f.phone}</div></div>
                  </div>
                </td>
                <td>${f.area}</td>
                <td>${f.type === "both" ? "Mèo + Chó" : f.type === "cat" ? "Mèo" : "Chó"}</td>
                <td>
                  <div style="display:flex;align-items:center;gap:0.5rem">
                    <div style="display:flex;gap:2px">
                      ${Array.from({length:f.max}).map((_,i)=>`<div style="width:16px;height:16px;border-radius:50%;background:${i<f.current?"var(--terracotta)":"var(--light-gray)"}"></div>`).join("")}
                    </div>
                    <span style="font-size:0.78rem;color:var(--mid-gray)">${f.current}/${f.max}</span>
                    ${f.current < f.max ? '<span class="sbadge sbadge-approved" style="font-size:0.65rem">Còn chỗ</span>' : '<span class="sbadge sbadge-rejected" style="font-size:0.65rem">Đầy</span>'}
                  </div>
                </td>
                <td><span style="font-family:var(--font-mono);font-size:0.82rem;color:var(--gold)">⭐ ${f.rating}/5</span></td>
                <td style="font-size:0.78rem;color:var(--mid-gray)">${f.joined}</td>
                <td>
                  <div class="action-btns">
                    <button class="btn-edit"   onclick="openFosterModal(${f.id})">✏️ Sửa</button>
                    <button class="btn-delete" onclick="deleteFoster(${f.id})">🗑</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openFosterModal(id) {
  const fosters = getFosters();
  const f = id ? fosters.find(x => x.id === id) : null;
  document.getElementById("modalContent").innerHTML = `
    <h3 style="font-family:var(--font-display);margin-bottom:1.25rem">${f ? "✏️ Sửa người nuôi tạm" : "➕ Thêm người nuôi tạm"}</h3>
    <div class="form-grid" style="gap:0.75rem">
      <div class="fgroup"><label>Họ tên *</label><input type="text" id="fName" value="${f?f.name:""}" placeholder="Nguyễn Thị A" required/></div>
      <div class="fgroup"><label>SĐT *</label><input type="text" id="fPhone" value="${f?f.phone:""}" placeholder="09xxxxxxxx" required/></div>
      <div class="fgroup"><label>Khu vực *</label><input type="text" id="fArea" value="${f?f.area:""}" placeholder="Quận 10" required/></div>
      <div class="fgroup"><label>Loại nuôi</label>
        <select id="fType">
          <option value="cat"  ${f&&f.type==="cat" ?"selected":""}>Mèo</option>
          <option value="dog"  ${f&&f.type==="dog" ?"selected":""}>Chó</option>
          <option value="both" ${f&&f.type==="both"?"selected":""}>Mèo + Chó</option>
        </select>
      </div>
      <div class="fgroup"><label>Sức chứa tối đa</label><input type="number" id="fMax" value="${f?f.max:1}" min="1" max="10"/></div>
      <div class="fgroup"><label>Đang nuôi (hiện tại)</label><input type="number" id="fCurrent" value="${f?f.current:0}" min="0"/></div>
      <div class="fgroup"><label>Đánh giá (1-5)</label><input type="number" id="fRating" value="${f?f.rating:5}" min="1" max="5"/></div>
      <div class="fgroup"><label>Avatar emoji</label><input type="text" id="fAvatar" value="${f?f.avatar:"🐾"}" maxlength="4"/></div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button class="btn-submit" style="flex:1;padding:0.75rem" onclick="saveFoster(${id||"null"})">💾 Lưu</button>
      <button class="btn-reset"  style="flex:1;padding:0.75rem" onclick="closeModal()">Huỷ</button>
    </div>
  `;
  openModal();
}

function saveFoster(id) {
  const name    = document.getElementById("fName").value.trim();
  const phone   = document.getElementById("fPhone").value.trim();
  const area    = document.getElementById("fArea").value.trim();
  const type    = document.getElementById("fType").value;
  const max     = parseInt(document.getElementById("fMax").value)     || 1;
  const current = parseInt(document.getElementById("fCurrent").value) || 0;
  const rating  = parseInt(document.getElementById("fRating").value)  || 5;
  const avatar  = document.getElementById("fAvatar").value.trim()     || "🐾";
  if (!name || !phone || !area) { showToast("⚠️ Vui lòng điền đầy đủ!"); return; }

  const fosters = getFosters();
  if (id) {
    const idx = fosters.findIndex(f => f.id === id);
    if (idx !== -1) fosters[idx] = { ...fosters[idx], name, phone, area, type, max, current, rating, avatar };
    showToast(`✏️ Đã cập nhật "${name}"!`);
  } else {
    fosters.push({ id:Date.now(), name, phone, area, type, max, current, rating, avatar, joined:new Date().toLocaleDateString("vi-VN"), status:"active" });
    showToast(`✅ Đã thêm foster "${name}"!`);
  }
  saveFosters(fosters);
  closeModal();
  renderFosters();
}

function deleteFoster(id) {
  if (!confirm("Bạn có chắc muốn xoá người nuôi tạm này?")) return;
  saveFosters(getFosters().filter(f => f.id !== id));
  showToast("🗑 Đã xoá người nuôi tạm.");
  renderFosters();
}

// ===== FIX #2 — VOLUNTEERS CRUD =====
function renderVolunteers() {
  const volunteers = getVolunteers();
  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">🙋 Tình nguyện viên (${volunteers.length})</span>
        <button class="btn-submit" style="padding:0.4rem 1rem;font-size:0.8rem" onclick="openVolunteerModal()">+ Thêm mới</button>
      </div>
      <div style="overflow-x:auto">
        <table class="tbl">
          <thead><tr><th>Tên</th><th>Vai trò</th><th>Khu vực</th><th>Nhiệm vụ</th><th>Trạng thái</th><th>Ngày tham gia</th><th>Hành động</th></tr></thead>
          <tbody>
            ${volunteers.map(v => `
              <tr>
                <td><div class="pet-cell-name">${v.name}</div><div class="pet-cell-sub">${v.phone}</div></td>
                <td><span class="sbadge sbadge-approved" style="background:#E8F0FF;color:var(--blue)">${v.role}</span></td>
                <td style="font-size:0.82rem">${v.area}</td>
                <td><span style="font-family:var(--font-mono);font-weight:700">${v.missions}</span></td>
                <td><span class="sbadge ${v.status==="active"?"sbadge-approved":"sbadge-rejected"}">${v.status==="active"?"✅ Đang hoạt động":"⏸ Tạm ngưng"}</span></td>
                <td style="font-size:0.78rem;color:var(--mid-gray)">${v.joined}</td>
                <td>
                  <div class="action-btns">
                    <button class="btn-edit"   onclick="openVolunteerModal(${v.id})">✏️ Sửa</button>
                    <button class="btn-delete" onclick="deleteVolunteer(${v.id})">🗑</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openVolunteerModal(id) {
  const volunteers = getVolunteers();
  const v = id ? volunteers.find(x => x.id === id) : null;
  const roles = ["Rescuer","Foster Parent","Coordinator","Pet Photographer","Vet Support","Social Media"];
  document.getElementById("modalContent").innerHTML = `
    <h3 style="font-family:var(--font-display);margin-bottom:1.25rem">${v ? "✏️ Sửa tình nguyện viên" : "➕ Thêm tình nguyện viên"}</h3>
    <div class="form-grid" style="gap:0.75rem">
      <div class="fgroup"><label>Họ tên *</label><input type="text" id="vName" value="${v?v.name:""}" placeholder="Nguyễn Văn A" required/></div>
      <div class="fgroup"><label>SĐT *</label><input type="text" id="vPhone" value="${v?v.phone:""}" placeholder="09xxxxxxxx" required/></div>
      <div class="fgroup"><label>Khu vực</label><input type="text" id="vArea" value="${v?v.area:""}" placeholder="Q.1, Q.3"/></div>
      <div class="fgroup"><label>Vai trò</label>
        <select id="vRole">
          ${roles.map(r=>`<option ${v&&v.role===r?"selected":""}>${r}</option>`).join("")}
        </select>
      </div>
      <div class="fgroup"><label>Số nhiệm vụ</label><input type="number" id="vMissions" value="${v?v.missions:0}" min="0"/></div>
      <div class="fgroup"><label>Trạng thái</label>
        <select id="vStatus">
          <option value="active"   ${v&&v.status==="active"  ?"selected":""}>✅ Đang hoạt động</option>
          <option value="inactive" ${v&&v.status==="inactive"?"selected":""}>⏸ Tạm ngưng</option>
        </select>
      </div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button class="btn-submit" style="flex:1;padding:0.75rem" onclick="saveVolunteer(${id||"null"})">💾 Lưu</button>
      <button class="btn-reset"  style="flex:1;padding:0.75rem" onclick="closeModal()">Huỷ</button>
    </div>
  `;
  openModal();
}

function saveVolunteer(id) {
  const name     = document.getElementById("vName").value.trim();
  const phone    = document.getElementById("vPhone").value.trim();
  const area     = document.getElementById("vArea").value.trim();
  const role     = document.getElementById("vRole").value;
  const missions = parseInt(document.getElementById("vMissions").value) || 0;
  const status   = document.getElementById("vStatus").value;
  if (!name || !phone) { showToast("⚠️ Vui lòng điền đầy đủ!"); return; }

  const volunteers = getVolunteers();
  if (id) {
    const idx = volunteers.findIndex(v => v.id === id);
    if (idx !== -1) volunteers[idx] = { ...volunteers[idx], name, phone, area, role, missions, status };
    showToast(`✏️ Đã cập nhật "${name}"!`);
  } else {
    volunteers.push({ id:Date.now(), name, phone, area, role, missions, status, joined:new Date().toLocaleDateString("vi-VN") });
    showToast(`✅ Đã thêm tình nguyện viên "${name}"!`);
  }
  saveVolunteers(volunteers);
  closeModal();
  renderVolunteers();
}

function deleteVolunteer(id) {
  if (!confirm("Bạn có chắc muốn xoá tình nguyện viên này?")) return;
  saveVolunteers(getVolunteers().filter(v => v.id !== id));
  showToast("🗑 Đã xoá tình nguyện viên.");
  renderVolunteers();
}

// ===== FIX #3 — MERCH MANAGEMENT =====
function renderMerch() {
  const items = getMerch();
  const typeLabels = { apparel:"Quần áo", accessory:"Phụ kiện", sticker:"Sticker/Poster", homeware:"Đồ gia dụng" };

  document.getElementById("pageContent").innerHTML = `
    <div class="table-card">
      <div class="table-header">
        <span class="table-title">🛍️ Quản lý Merch (${items.length})</span>
        <button class="btn-submit" style="padding:0.4rem 1rem;font-size:0.8rem" onclick="openMerchModal()">+ Thêm mới</button>
      </div>
      <div style="overflow-x:auto">
        <table class="tbl">
          <thead><tr><th>Sản phẩm</th><th>Loại</th><th>Giá</th><th>Tồn kho</th><th>Badge</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>
                  <div class="pet-cell">
                    <div class="pet-emoji-sm" style="background:${item.bgColor};font-size:1.5rem">${item.emoji}</div>
                    <div><div class="pet-cell-name">${item.name}</div><div class="pet-cell-sub" style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${item.desc}</div></div>
                  </div>
                </td>
                <td>${typeLabels[item.type]||item.type}</td>
                <td><span style="font-family:var(--font-mono);font-weight:700;color:var(--terracotta)">${item.price.toLocaleString("vi-VN")}đ</span></td>
                <td><span style="font-family:var(--font-mono)">${item.stock??"∞"}</span></td>
                <td>${item.badge ? `<span class="sbadge sbadge-pending" style="background:#FFF8E0;color:var(--gold)">${item.badge}</span>` : "—"}</td>
                <td><span class="sbadge ${item.active!==false?"sbadge-approved":"sbadge-rejected"}">${item.active!==false?"✅ Hiển thị":"⏸ Ẩn"}</span></td>
                <td>
                  <div class="action-btns">
                    <button class="btn-edit"   onclick="openMerchModal(${item.id})">✏️ Sửa</button>
                    <button class="btn-delete" onclick="deleteMerch(${item.id})">🗑</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openMerchModal(id) {
  const items = getMerch();
  const m = id ? items.find(x => x.id === id) : null;
  const types = ["apparel","accessory","sticker","homeware"];
  const typeLabels = { apparel:"Quần áo", accessory:"Phụ kiện", sticker:"Sticker/Poster", homeware:"Đồ gia dụng" };

  document.getElementById("modalContent").innerHTML = `
    <h3 style="font-family:var(--font-display);margin-bottom:1.25rem">${m ? "✏️ Sửa sản phẩm Merch" : "➕ Thêm sản phẩm Merch"}</h3>
    <div class="form-grid" style="gap:0.75rem">
      <div class="fgroup form-full"><label>Tên sản phẩm *</label><input type="text" id="mName" value="${m?m.name:""}" placeholder="Áo Phông PAWGEN..." required/></div>
      <div class="fgroup"><label>Loại sản phẩm</label>
        <select id="mType">
          ${types.map(t=>`<option value="${t}" ${m&&m.type===t?"selected":""}>${typeLabels[t]}</option>`).join("")}
        </select>
      </div>
      <div class="fgroup"><label>Emoji đại diện</label><input type="text" id="mEmoji" value="${m?m.emoji:"🛍️"}" maxlength="4"/></div>
      <div class="fgroup"><label>Giá (VNĐ) *</label><input type="number" id="mPrice" value="${m?m.price:""}" placeholder="250000" required min="0"/></div>
      <div class="fgroup"><label>Tồn kho</label><input type="number" id="mStock" value="${m?m.stock:""}" placeholder="50" min="0"/></div>
      <div class="fgroup"><label>Badge (nhãn nổi bật)</label><input type="text" id="mBadge" value="${m&&m.badge?m.badge:""}" placeholder="New, Bán chạy, Limited..."/></div>
      <div class="fgroup"><label>Màu nền card</label><input type="color" id="mBgColor" value="${m?m.bgColor:"#E8F0FF"}" style="height:42px;cursor:pointer"/></div>
      <div class="fgroup"><label>Trạng thái</label>
        <select id="mActive">
          <option value="true"  ${!m||m.active!==false?"selected":""}>✅ Hiển thị</option>
          <option value="false" ${m&&m.active===false?"selected":""}>⏸ Ẩn</option>
        </select>
      </div>
      <div class="fgroup form-full"><label>Mô tả</label><textarea id="mDesc" rows="2" placeholder="Mô tả ngắn về sản phẩm...">${m?m.desc:""}</textarea></div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button class="btn-submit" style="flex:1;padding:0.75rem" onclick="saveMerchItem(${id||"null"})">💾 Lưu</button>
      <button class="btn-reset"  style="flex:1;padding:0.75rem" onclick="closeModal()">Huỷ</button>
    </div>
  `;
  openModal();
}

function saveMerchItem(id) {
  const name   = document.getElementById("mName").value.trim();
  const type   = document.getElementById("mType").value;
  const emoji  = document.getElementById("mEmoji").value.trim() || "🛍️";
  const price  = parseInt(document.getElementById("mPrice").value) || 0;
  const stock  = parseInt(document.getElementById("mStock").value) || 0;
  const badge  = document.getElementById("mBadge").value.trim() || null;
  const bgColor= document.getElementById("mBgColor").value;
  const active = document.getElementById("mActive").value === "true";
  const desc   = document.getElementById("mDesc").value.trim();
  if (!name) { showToast("⚠️ Vui lòng nhập tên sản phẩm!"); return; }

  const items = getMerch();
  if (id) {
    const idx = items.findIndex(i => i.id === id);
    if (idx !== -1) items[idx] = { ...items[idx], name, type, emoji, price, stock, badge, bgColor, active, desc };
    showToast(`✏️ Đã cập nhật "${name}"!`);
  } else {
    items.push({ id:Date.now(), name, type, emoji, price, stock, badge, bgColor, active, desc });
    showToast(`✅ Đã thêm sản phẩm "${name}"!`);
  }
  saveMerch(items);
  closeModal();
  renderMerch();
}

function deleteMerch(id) {
  if (!confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;
  saveMerch(getMerch().filter(i => i.id !== id));
  showToast("🗑 Đã xoá sản phẩm.");
  renderMerch();
}

// ===== MODAL HELPERS =====
function openModal()  { document.getElementById("detailModal").classList.add("open");    document.body.style.overflow = "hidden"; }
function closeModal() { document.getElementById("detailModal").classList.remove("open"); document.body.style.overflow = ""; }
document.getElementById("detailModal").addEventListener("click", e => { if (e.target === document.getElementById("detailModal")) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ===== TOAST =====
let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3500);
}
