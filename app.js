/* ================================================
   PAWLINK — app.js  (clean rewrite)
   Admin inline CRUD hiển thị ngay trên index.html
   khi login với role = "admin"
================================================ */

// ─── KEYS ───────────────────────────────────────
const SES_KEY  = "pawlink_session";
const FOS_KEY  = "pawlink_fosters";
const VOL_KEY  = "pawlink_volunteers";
const MER_KEY  = "pawlink_merch";

// ─── HELPER: session ─────────────────────────────
function getSession() {
  try { return JSON.parse(localStorage.getItem(SES_KEY)); } catch { return null; }
}
function isAdmin() { const s = getSession(); return !!(s && s.role === "admin"); }

// ─── DEFAULT DATA ────────────────────────────────
const PETS_DATA = [
  { id:1, name:"Mochi",      type:"cat", emoji:"🐱",  age:"~2 tháng",  location:"ĐH Bách Khoa, Q.10",       gender:"Cái",  status:"urgent", vaccinated:false, neutered:false, fosterDays:3,  desc:"Mochi được phát hiện tại cổng trường trong tình trạng bị thương nhẹ ở chân. Hiện đã được sơ cứu và cần người nuôi tạm gấp. Rất thân thiện và không cắn.", tags:["Mèo con","Cần gấp","Đang điều trị"], bgColor:"#FFF0E8", costs:"320,000 VNĐ" },
  { id:2, name:"Bông",       type:"dog", emoji:"🐶",  age:"~6 tháng",  location:"Hẻm Nguyễn Trãi, Q.5",     gender:"Đực",  status:"safe",   vaccinated:true,  neutered:false, fosterDays:14, desc:"Bông là chú chó lai rất năng động và thân thiện. Đã được tiêm vaccine đầy đủ. Hòa đồng với trẻ em và mèo.", tags:["Chó con","Đã vaccine","Thân thiện"],  bgColor:"#E8F0FF", costs:"750,000 VNĐ" },
  { id:3, name:"Pudding",    type:"cat", emoji:"🐱",  age:"~1 năm",    location:"KTX ĐHQG, Thủ Đức",         gender:"Cái",  status:"watch",  vaccinated:true,  neutered:true,  fosterDays:7,  desc:"Pudding là một cô mèo trắng rất hiền lành. Đã triệt sản và tiêm đủ vaccine.", tags:["Đã vaccine","Đã triệt sản","Dễ nuôi"],  bgColor:"#F0FFE8", costs:"1,100,000 VNĐ" },
  { id:4, name:"Caramel",    type:"dog", emoji:"🐕",  age:"~3 tháng",  location:"Công viên Tao Đàn, Q.1",    gender:"Cái",  status:"safe",   vaccinated:false, neutered:false, fosterDays:5,  desc:"Caramel được tìm thấy một mình tại công viên. Tình trạng sức khỏe tốt, rất hiếu động.", tags:["Chó con","Sức khỏe tốt","Năng động"], bgColor:"#FFF8E0", costs:"150,000 VNĐ" },
  { id:5, name:"Tàu Hũ",    type:"cat", emoji:"😺",  age:"~4 tháng",  location:"Chợ Bến Thành, Q.1",        gender:"Đực",  status:"safe",   vaccinated:true,  neutered:false, fosterDays:20, desc:"Tàu Hũ là chú mèo vô cùng nghịch ngợm. Đã được tiêm vaccine mũi đầu.", tags:["Đã vaccine 1 mũi","Nghịch ngợm"],     bgColor:"#FFF0E8", costs:"450,000 VNĐ" },
  { id:6, name:"Luna",       type:"cat", emoji:"🐈",  age:"~8 tháng",  location:"ĐH Kinh tế TP.HCM",         gender:"Cái",  status:"urgent", vaccinated:false, neutered:false, fosterDays:1,  desc:"Luna mới được báo cáo hôm nay. Đang bị sốt và cần đưa đến phòng khám ngay. Cần người tình nguyện vận chuyển gấp.", tags:["Cần cứu gấp","Đang ốm"], bgColor:"#FFEAEA", costs:"0 VNĐ (mới)" },
  { id:7, name:"Đậu Phộng", type:"dog", emoji:"🐩",  age:"~2 năm",    location:"Bình Dương (gần HCM)",       gender:"Đực",  status:"safe",   vaccinated:true,  neutered:true,  fosterDays:30, desc:"Đậu Phộng là chú chó trưởng thành rất điềm tĩnh. Không sủa nhiều, phù hợp với người bận rộn.", tags:["Đã vaccine","Đã triệt sản","Điềm tĩnh"], bgColor:"#E8FFF0", costs:"1,500,000 VNĐ" },
  { id:8, name:"Oreo",       type:"cat", emoji:"🐱",  age:"~6 tháng",  location:"ĐH Sư Phạm, Q.5",           gender:"Đực",  status:"watch",  vaccinated:true,  neutered:false, fosterDays:10, desc:"Oreo có bộ lông đen trắng giống bánh Oreo. Đang chờ làm triệt sản.", tags:["Đã vaccine","Chờ triệt sản","Vui vẻ"], bgColor:"#F5E8FF", costs:"600,000 VNĐ" },
];

const DEF_MERCH = [
  { id:1,  name:"Áo Phông PAWGEN Classic",         type:"apparel",   emoji:"👕",  price:250000, desc:"Unisex, cotton 100%, in lưới cao cấp. Màu kem & xanh rừng.",              badge:"Bán chạy nhất", bgColor:"#E8F0FF", active:true },
  { id:2,  name:"Hoodie Cứu Hộ Hero",              type:"apparel",   emoji:"🧥",  price:480000, desc:"Nỉ ấm, có túi kangaroo. In slogan 'Rescue. Foster. Adopt.'",              badge:"New",           bgColor:"#FFF0E8", active:true },
  { id:3,  name:"Tote Bag PawPrint",               type:"accessory", emoji:"👜",  price:150000, desc:"Canvas dày, 2 quai chắc. In dấu chân thú cưng nghệ thuật.",              badge:"Eco",           bgColor:"#E8FFE8", active:true },
  { id:4,  name:"Bộ Sticker PAWGEN Vol.1",         type:"sticker",   emoji:"🎨",  price:45000,  desc:"12 sticker chống nước. Thiết kế chibi mèo chó cute.",                    badge:"45K",           bgColor:"#FFF8E0", active:true },
  { id:5,  name:"Mug Terracotta Cat",              type:"homeware",  emoji:"☕",  price:180000, desc:"Sứ cao cấp 350ml. Họa tiết mèo thủ công trên nền đất nung.",              badge:null,            bgColor:"#FFE8E8", active:true },
  { id:6,  name:"Nón Bucket PAWGEN",               type:"apparel",   emoji:"🧢",  price:220000, desc:"Chất liệu chống nắng tốt. Thêu logo PAWGEN 3D.",                         badge:"Limited",       bgColor:"#E8F5FF", active:true },
  { id:7,  name:"Keychain Paw Charm",              type:"accessory", emoji:"🔑",  price:65000,  desc:"Hợp kim kẽm mạ vàng. Dấu chân thú cưng siêu cute.",                     badge:null,            bgColor:"#F5E8FF", active:true },
  { id:8,  name:"Gối Tựa Lưng Mochi",             type:"homeware",  emoji:"🛋️", price:320000, desc:"Gối bông cao su non. In hình Mochi — mèo được cứu hộ đầu tiên.",         badge:"Story",         bgColor:"#E8FFF5", active:true },
  { id:9,  name:"Poster Art 'Every Life Counts'",  type:"sticker",   emoji:"🖼️", price:95000,  desc:"A3, in decal cao cấp không thấm nước. Thiết kế tranh nghệ thuật.",        badge:null,            bgColor:"#FFF0F5", active:true },
];

const DEF_FOSTERS = [
  { id:1, name:"Nguyễn Minh Anh", area:"Quận 10",    type:"cat",  rating:5, current:1, max:2, avatar:"🌸", phone:"0901234567", joined:"15/01/2025" },
  { id:2, name:"Trần Hoàng Hùng", area:"Thủ Đức",    type:"both", rating:5, current:0, max:1, avatar:"🌟", phone:"0912345678", joined:"22/01/2025" },
  { id:3, name:"Lê Phương Linh",  area:"Quận 3",     type:"cat",  rating:4, current:2, max:2, avatar:"🎀", phone:"0987654321", joined:"30/01/2025" },
  { id:4, name:"Phạm Văn Khoa",   area:"Bình Thạnh", type:"dog",  rating:5, current:1, max:3, avatar:"⭐", phone:"0978123456", joined:"05/02/2025" },
  { id:5, name:"Võ Thị Mai",      area:"Quận 7",     type:"cat",  rating:4, current:0, max:2, avatar:"🌺", phone:"0965432187", joined:"12/02/2025" },
];

const DEF_VOLUNTEERS = [
  { id:1, name:"Trần Minh Khoa",  role:"Rescuer",          area:"Q.1, Q.3",   phone:"0901111222", status:"active",   missions:12, joined:"10/01/2025" },
  { id:2, name:"Nguyễn Thu Hà",   role:"Foster Parent",    area:"Thủ Đức",    phone:"0912222333", status:"active",   missions:8,  joined:"18/01/2025" },
  { id:3, name:"Lê Văn Dũng",     role:"Coordinator",      area:"Online",     phone:"0923333444", status:"active",   missions:24, joined:"05/01/2025" },
  { id:4, name:"Phạm Bích Ngọc",  role:"Pet Photographer", area:"Q.7, Q.5",   phone:"0934444555", status:"inactive", missions:5,  joined:"20/02/2025" },
  { id:5, name:"Vũ Hoàng Nam",    role:"Rescuer",          area:"Bình Thạnh", phone:"0945555666", status:"active",   missions:17, joined:"14/01/2025" },
];

const DONORS_DATA = [
  { name:"Minh Anh N.", avatar:"🌸", case:"Quỹ thú y chung",      amount:"500,000đ", time:"5 phút trước"  },
  { name:"Trường H.",   avatar:"🌟", case:"Cứu hộ Luna",          amount:"200,000đ", time:"12 phút trước" },
  { name:"Phương L.",   avatar:"🎀", case:"Quỹ thức ăn",          amount:"100,000đ", time:"28 phút trước" },
  { name:"Anonymous",   avatar:"🐾", case:"Bất kỳ case cần nhất", amount:"1,000,000đ",time:"1 giờ trước"  },
  { name:"Khoa B.",     avatar:"⭐", case:"Cứu hộ Mochi",         amount:"150,000đ", time:"2 giờ trước"   },
];

const CASES_DATA = [
  { id:"PL-001", pet:"🐱 Mochi",   location:"ĐH Bách Khoa",    reporter:"Sinh viên K20", status:"urgent", step:"Điều trị thú y",   time:"2 giờ trước"   },
  { id:"PL-002", pet:"🐶 Bông",    location:"Nguyễn Trãi Q.5", reporter:"Linh T.",       status:"green",  step:"Chờ nhận nuôi",    time:"1 ngày trước"  },
  { id:"PL-003", pet:"🐱 Luna",    location:"ĐH Kinh Tế",      reporter:"Hùng P.",       status:"urgent", step:"Chờ vận chuyển",   time:"30 phút trước" },
  { id:"PL-004", pet:"🐕 Caramel", location:"Tao Đàn Q.1",     reporter:"Mai N.",        status:"yellow", step:"Nuôi tạm",         time:"3 ngày trước"  },
  { id:"PL-005", pet:"😺 Tàu Hũ", location:"Chợ Bến Thành",   reporter:"Hà P.",         status:"blue",   step:"Đã có người nhận", time:"5 ngày trước"  },
  { id:"PL-006", pet:"🐈 Pudding", location:"ĐHQG Thủ Đức",    reporter:"Khoa B.",       status:"yellow", step:"Nuôi tạm",         time:"1 tuần trước"  },
];

// ─── STORAGE ─────────────────────────────────────
function getMerch()     { try { return JSON.parse(localStorage.getItem(MER_KEY)) || DEF_MERCH;    } catch { return DEF_MERCH;    } }
function saveMerchStore(d)   { localStorage.setItem(MER_KEY, JSON.stringify(d)); }
function getFosters()   { try { return JSON.parse(localStorage.getItem(FOS_KEY)) || DEF_FOSTERS;  } catch { return DEF_FOSTERS;  } }
function saveFosters(d) { localStorage.setItem(FOS_KEY, JSON.stringify(d)); }
function getVols()      { try { return JSON.parse(localStorage.getItem(VOL_KEY)) || DEF_VOLUNTEERS; } catch { return DEF_VOLUNTEERS; } }
function saveVols(d)    { localStorage.setItem(VOL_KEY, JSON.stringify(d)); }

// ─── STATE ───────────────────────────────────────
let cart = [], currentFilter = "all", currentMerchFilter = "all", currentDashTab = "overview";

// ─── INIT ────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  injectAdminCSS();
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
  injectAdminBar();
});

// ─── ADMIN CSS (inject once) ──────────────────────
function injectAdminCSS() {
  if (document.getElementById("_adminCSS")) return;
  const s = document.createElement("style");
  s.id = "_adminCSS";
  s.textContent = `
    /* Admin top bar */
    #_adminBar {
      position:fixed; top:0; left:0; right:0; z-index:10000;
      background:linear-gradient(90deg,#2D5016,#4A7A28);
      color:#fff; display:flex; align-items:center; justify-content:center;
      gap:1.5rem; padding:5px 1rem; font-family:'DM Sans',sans-serif;
      font-size:.82rem; box-shadow:0 2px 10px rgba(0,0,0,.25);
    }
    #_adminBar a {
      background:rgba(255,255,255,.15); color:#fff; padding:.25rem .9rem;
      border-radius:20px; font-size:.78rem; font-weight:600; text-decoration:none;
      transition:background .2s;
    }
    #_adminBar a:hover { background:rgba(255,255,255,.3); }

    /* inline modal overlay */
    #_iModal {
      display:none; position:fixed; inset:0; z-index:99999;
      background:rgba(28,28,28,.6); backdrop-filter:blur(5px);
      align-items:center; justify-content:center; padding:1rem;
    }
    #_iModal.open { display:flex; }
    #_iModalBox {
      background:#fff; border-radius:16px; padding:2rem; width:100%;
      max-width:560px; max-height:90vh; overflow-y:auto;
      box-shadow:0 24px 64px rgba(28,28,28,.22);
      position:relative; animation:_fadeUp .22s ease;
    }
    @keyframes _fadeUp { from{transform:translateY(18px);opacity:0} to{transform:none;opacity:1} }
    #_iModalClose {
      position:absolute; top:1rem; right:1rem; background:none; border:none;
      font-size:1.3rem; cursor:pointer; color:#8A8A8A; line-height:1;
    }

    /* shared input style */
    .ai-label { display:block; font-size:.78rem; font-weight:600; margin-bottom:.3rem; color:#1C1C1C; }
    .ai-input {
      width:100%; padding:.65rem .9rem; border:2px solid #D9D0C6; border-radius:8px;
      font-family:'DM Sans',sans-serif; font-size:.88rem;
      background:#FAF6F0; color:#1C1C1C; outline:none; transition:border .2s;
      box-sizing:border-box;
    }
    .ai-input:focus { border-color:#D4603A; background:#fff; }
    textarea.ai-input { resize:vertical; }

    /* edit/delete buttons on cards */
    .ac-actions {
      position:absolute; top:.6rem; right:.6rem; z-index:5;
      display:flex; gap:.3rem;
      opacity:0; transition:opacity .18s;
    }
    .merch-card:hover .ac-actions,
    .foster-card:hover .ac-actions,
    ._vol-row:hover .ac-actions { opacity:1; }
    .ac-btn {
      width:28px; height:28px; border-radius:7px; border:none; cursor:pointer;
      font-size:.8rem; display:flex; align-items:center; justify-content:center;
      background:rgba(255,255,255,.92); transition:all .15s;
    }
    .ac-btn:hover { transform:scale(1.15); }
    .ac-btn.edit:hover  { background:#FFF8E0; }
    .ac-btn.del:hover   { background:#FFEAEA; }

    /* volunteer admin table */
    #volunteerAdminTable { padding:0 2rem 2rem; max-width:1200px; margin:0 auto; }
    ._vol-table { width:100%; border-collapse:collapse; font-size:.84rem; }
    ._vol-table th { padding:.6rem .75rem; text-align:left; background:#FAF6F0; font-size:.72rem; color:#8A8A8A; font-weight:700; }
    ._vol-table td { padding:.65rem .75rem; border-bottom:1px solid #F2EAE0; vertical-align:middle; }
    ._vol-row { position:relative; }

    /* add-new card for merch */
    .merch-add-new {
      border:2px dashed #D9D0C6 !important; border-radius:var(--radius-md);
      min-height:220px; display:flex; align-items:center; justify-content:center;
      cursor:pointer; transition:all .2s; background:transparent !important;
      flex-direction:column; gap:.5rem; color:#8A8A8A; font-weight:600;
    }
    .merch-add-new:hover { border-color:#D4603A !important; color:#D4603A; background:#FFF0E8 !important; }
  `;
  document.head.appendChild(s);
}

// ─── ADMIN TOP BAR ────────────────────────────────
function injectAdminBar() {
  if (!isAdmin()) return;
  if (document.getElementById("_adminBar")) return;
  const bar = document.createElement("div");
  bar.id = "_adminBar";
  bar.innerHTML = `<span>🛡️ <strong>Chế độ Admin</strong> — Hover vào card để Sửa / Xóa</span>
    <a href="admin.html">Vào trang Admin đầy đủ →</a>`;
  document.body.prepend(bar);
  document.body.style.paddingTop = "34px";
}

// ─── INLINE MODAL ─────────────────────────────────
function openIModal(html) {
  let overlay = document.getElementById("_iModal");
  if (!overlay) {
    overlay = document.createElement("div"); overlay.id = "_iModal";
    overlay.innerHTML = `<div id="_iModalBox"><button id="_iModalClose" onclick="closeIModal()">✕</button><div id="_iModalBody"></div></div>`;
    overlay.addEventListener("click", e => { if (e.target === overlay) closeIModal(); });
    document.body.appendChild(overlay);
  }
  document.getElementById("_iModalBody").innerHTML = html;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeIModal() {
  document.getElementById("_iModal")?.classList.remove("open");
  document.body.style.overflow = "";
}

// ─── NAVBAR ──────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
    ["hero","adopt","rescue","foster","volunteer","dashboard","donate","merch"].forEach(id => {
      const el = document.getElementById(id); if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top <= 100 && r.bottom >= 100) {
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
        document.querySelector(`[data-section="${id}"]`)?.classList.add("active");
      }
    });
  });
}
function initMobileMenu() {
  document.getElementById("hamburger").addEventListener("click", () => document.getElementById("mobileMenu").classList.add("open"));
  document.getElementById("mobileClose").addEventListener("click", closeMobileMenu);
}
function closeMobileMenu() { document.getElementById("mobileMenu")?.classList.remove("open"); }

// ─── FLOATING PAWS ────────────────────────────────
function initFloatingPaws() {
  const c = document.getElementById("floatingPaws");
  ["🐾","🐱","🐶","❤️","🐾"].forEach(p => {
    for (let i=0;i<3;i++) {
      const el = document.createElement("div"); el.className = "floating-paw"; el.textContent = p;
      el.style.left = `${Math.random()*100}%`;
      el.style.animationDuration = `${8+Math.random()*12}s`;
      el.style.animationDelay = `${Math.random()*15}s`;
      el.style.fontSize = `${1+Math.random()*1.5}rem`;
      c.appendChild(el);
    }
  });
}

// ─── COUNTERS ─────────────────────────────────────
function initCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); } });
  }, { threshold:.5 });
  document.querySelectorAll(".stat-num[data-target]").forEach(c => obs.observe(c));
}
function animateCounter(el) {
  const target = parseInt(el.dataset.target), dur = 1500, start = Date.now();
  const tick = () => {
    const p = Math.min((Date.now()-start)/dur, 1);
    el.textContent = Math.round((1-Math.pow(1-p,3))*target);
    if (p<1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
function scrollToSection(id) { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); }

// ─── PETS GRID ────────────────────────────────────
function initPetsGrid() {
  try {
    JSON.parse(localStorage.getItem("pawgen_pets")||"[]").forEach(p => {
      if (!PETS_DATA.find(e=>e.id===p.id)) PETS_DATA.push(p);
    });
  } catch {}
  renderPets("all");
}
function renderPets(filter) {
  let pets = PETS_DATA;
  if (filter==="cat")       pets = pets.filter(p=>p.type==="cat");
  else if (filter==="dog")  pets = pets.filter(p=>p.type==="dog");
  else if (filter==="urgent") pets = pets.filter(p=>p.status==="urgent");
  else if (filter==="vaccinated") pets = pets.filter(p=>p.vaccinated);
  document.getElementById("petsGrid").innerHTML = pets.map(p=>`
    <div class="pet-adopt-card" onclick="openPetModal(${p.id})">
      <div class="pet-adopt-img" style="background:${p.bgColor}">
        <span>${p.emoji}</span>
        <span class="tag tag-${p.status==='urgent'?'urgent':p.status==='watch'?'watch':'safe'}" style="position:absolute;top:12px;left:12px">
          ${p.status==='urgent'?'🔴 Cần gấp':p.status==='watch'?'🟡 Theo dõi':'🟢 An toàn'}
        </span>
      </div>
      <div class="pet-adopt-body">
        <div class="pet-adopt-name">${p.name}</div>
        <div class="pet-adopt-meta">${p.gender} · ${p.age} · ${p.location}</div>
        <div class="pet-adopt-tags">${p.tags.map(t=>`<span class="pet-tag">${t}</span>`).join("")}</div>
        <div class="pet-adopt-footer">
          <span class="pet-foster-time">Nuôi tạm: ${p.fosterDays} ngày</span>
          <button class="btn-primary" style="padding:.4rem .85rem;font-size:.8rem" onclick="event.stopPropagation();openPetModal(${p.id})">Xem chi tiết</button>
        </div>
      </div>
    </div>
  `).join("");
}
function initFilterBtns() {
  document.querySelectorAll(".filter-btn[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn[data-filter]").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active"); currentFilter = btn.dataset.filter; renderPets(currentFilter);
    });
  });
}
function showMorePets() { showToast("🐾 Hiện đã hiển thị tất cả thú cưng đang cần nhận nuôi!"); }

// ─── PET MODAL ────────────────────────────────────
function openPetModal(id) {
  const pet = PETS_DATA.find(p=>p.id===id); if (!pet) return;
  document.getElementById("petModalContent").innerHTML = `
    <div class="pet-modal-grid">
      <div><div class="pet-modal-img" style="background:${pet.bgColor}">${pet.emoji}</div></div>
      <div class="pet-modal-info">
        <div class="pet-modal-tags">
          <span class="tag tag-${pet.status==='urgent'?'urgent':pet.status==='watch'?'watch':'safe'}">
            ${pet.status==='urgent'?'🔴 Cần gấp':pet.status==='watch'?'🟡 Theo dõi':'🟢 An toàn'}
          </span>
          ${pet.vaccinated?'<span class="pet-tag">💉 Đã vaccine</span>':'<span class="pet-tag">Chưa vaccine</span>'}
          ${pet.neutered?'<span class="pet-tag">✂️ Đã triệt sản</span>':''}
        </div>
        <h2 class="pet-adopt-name" style="font-size:2rem">${pet.name}</h2>
        <div class="pet-adopt-meta" style="margin-bottom:1rem">${pet.gender} · ${pet.age} · ${pet.location}</div>
        <p class="pet-modal-desc">${pet.desc}</p>
        <div class="pet-modal-stats">
          <div class="pet-stat"><div class="pet-stat-label">Nuôi tạm</div><div class="pet-stat-val">${pet.fosterDays} ngày</div></div>
          <div class="pet-stat"><div class="pet-stat-label">Chi phí</div><div class="pet-stat-val">${pet.costs}</div></div>
          <div class="pet-stat"><div class="pet-stat-label">Loài</div><div class="pet-stat-val">${pet.type==='cat'?'🐱 Mèo':'🐶 Chó'}</div></div>
          <div class="pet-stat"><div class="pet-stat-label">Giới tính</div><div class="pet-stat-val">${pet.gender}</div></div>
        </div>
        <div style="display:flex;gap:.75rem;flex-wrap:wrap">
          <button class="btn-primary" onclick="handleAdopt('${pet.name}')">❤️ Đăng ký nhận nuôi</button>
          <button class="btn-outline" onclick="handleDonate('${pet.name}')">💝 Donate cho ${pet.name}</button>
        </div>
      </div>
    </div>`;
  openModal("petModal");
}
function handleAdopt(name) { closeModal("petModal"); showToast(`✅ Đăng ký nhận nuôi ${name} thành công!`); }
function handleDonate(name) { closeModal("petModal"); scrollToSection("donate"); showToast(`💝 Hãy donate để giúp ${name} nhé!`); }

// ─── MERCH ────────────────────────────────────────
function initMerchGrid() { renderMerch("all"); }
function initMerchFilterBtns() {
  document.querySelectorAll(".filter-btn[data-mfilter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn[data-mfilter]").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active"); currentMerchFilter = btn.dataset.mfilter; renderMerch(currentMerchFilter);
    });
  });
}

function renderMerch(filter) {
  const admin = isAdmin();
  let items = getMerch().filter(m => m.active !== false);
  if (filter !== "all") items = items.filter(m => m.type === filter);

  const grid = document.getElementById("merchGrid");
  grid.innerHTML = items.map(m => `
    <div class="merch-card" style="position:relative">
      ${admin ? `<div class="ac-actions">
        <button class="ac-btn edit" onclick="event.stopPropagation();openMerchModal(${m.id})" title="Sửa">✏️</button>
        <button class="ac-btn del"  onclick="event.stopPropagation();deleteMerch(${m.id})"   title="Xóa">🗑</button>
      </div>` : ""}
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

  if (admin) {
    const div = document.createElement("div");
    div.className = "merch-add-new";
    div.innerHTML = `<span style="font-size:2rem">➕</span><span>Thêm sản phẩm</span>`;
    div.onclick = () => openMerchModal(null);
    grid.appendChild(div);
  }
}

// MERCH CRUD
function openMerchModal(id) {
  const items = getMerch();
  const m = id ? items.find(x=>x.id===id) : null;
  const types = [{v:"apparel",l:"👕 Quần áo"},{v:"accessory",l:"🎒 Phụ kiện"},{v:"sticker",l:"🎨 Sticker/Poster"},{v:"homeware",l:"🏠 Đồ nhà"}];
  openIModal(`
    <h3 style="font-family:'Playfair Display',serif;font-size:1.25rem;margin-bottom:1.25rem;margin-right:2rem">${m?"✏️ Sửa sản phẩm":"➕ Thêm sản phẩm Merch"}</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem">
      <div style="grid-column:1/-1"><label class="ai-label">Tên sản phẩm *</label><input id="m_name" class="ai-input" value="${m?m.name:""}" placeholder="VD: Áo Phông PAWGEN..."></div>
      <div><label class="ai-label">Loại sản phẩm</label>
        <select id="m_type" class="ai-input">${types.map(t=>`<option value="${t.v}" ${m&&m.type===t.v?"selected":""}>${t.l}</option>`).join("")}</select>
      </div>
      <div><label class="ai-label">Emoji đại diện</label><input id="m_emoji" class="ai-input" value="${m?m.emoji:"🛍️"}" maxlength="4"></div>
      <div><label class="ai-label">Giá bán (VNĐ) *</label><input id="m_price" class="ai-input" type="number" value="${m?m.price:""}" placeholder="250000" min="0"></div>
      <div><label class="ai-label">Badge nổi bật</label><input id="m_badge" class="ai-input" value="${m&&m.badge?m.badge:""}" placeholder="New, Bán chạy, Limited..."></div>
      <div><label class="ai-label">Màu nền card</label><input id="m_bg" type="color" class="ai-input" value="${m?m.bgColor:"#E8F0FF"}" style="height:42px;cursor:pointer;padding:.25rem"></div>
      <div><label class="ai-label">Trạng thái</label>
        <select id="m_active" class="ai-input">
          <option value="true"  ${!m||m.active!==false?"selected":""}>✅ Hiển thị</option>
          <option value="false" ${m&&m.active===false?"selected":""}>⏸ Ẩn</option>
        </select>
      </div>
      <div style="grid-column:1/-1"><label class="ai-label">Mô tả</label><textarea id="m_desc" class="ai-input" rows="2">${m?m.desc:""}</textarea></div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:1.25rem">
      <button class="btn-primary" style="flex:1" onclick="saveMerch(${id||"null"})">💾 Lưu</button>
      <button class="btn-outline" style="flex:1" onclick="closeIModal()">Huỷ</button>
    </div>
  `);
}
function saveMerch(id) {
  const name  = document.getElementById("m_name").value.trim();
  if (!name) { showToast("⚠️ Vui lòng nhập tên sản phẩm!"); return; }
  const obj = {
    type:  document.getElementById("m_type").value,
    emoji: document.getElementById("m_emoji").value.trim() || "🛍️",
    price: parseInt(document.getElementById("m_price").value) || 0,
    badge: document.getElementById("m_badge").value.trim() || null,
    bgColor: document.getElementById("m_bg").value,
    active:  document.getElementById("m_active").value === "true",
    desc:  document.getElementById("m_desc").value.trim(),
    name,
  };
  const items = getMerch();
  if (id) {
    const i = items.findIndex(x=>x.id===id);
    if (i!==-1) items[i] = {...items[i],...obj};
    showToast(`✏️ Đã cập nhật "${name}"!`);
  } else {
    items.push({id:Date.now(),...obj});
    showToast(`✅ Đã thêm sản phẩm "${name}"!`);
  }
  saveMerchStore(items); closeIModal(); renderMerch(currentMerchFilter);
}
function deleteMerch(id) {
  const item = getMerch().find(x=>x.id===id);
  if (!confirm(`Xoá "${item?.name||"sản phẩm"}"?`)) return;
  saveMerchStore(getMerch().filter(x=>x.id!==id));
  showToast("🗑 Đã xoá sản phẩm."); renderMerch(currentMerchFilter);
}

// ─── CART ─────────────────────────────────────────
function addToCart(id) {
  const item = getMerch().find(m=>m.id===id); if (!item) return;
  const ex = cart.find(c=>c.id===id);
  if (ex) ex.qty++; else cart.push({...item,qty:1});
  updateCartFloat(); showToast(`🛒 Đã thêm "${item.name}" vào giỏ!`);
}
function updateCartFloat() {
  const total = cart.reduce((s,c)=>s+c.qty,0);
  const cf = document.getElementById("cartFloat");
  if (cf) { cf.style.display = total>0?"flex":"none"; document.getElementById("cartCount").textContent = total; }
}
function openCart() {
  const content = document.getElementById("cartContent"), footer = document.getElementById("cartFooter");
  if (cart.length===0) {
    content.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--mid-gray)">🛒 Giỏ hàng trống<br>Hãy chọn một vài món từ Merch Shop nhé!</div>`;
    footer.innerHTML = "";
  } else {
    content.innerHTML = cart.map(c=>`
      <div class="cart-item">
        <div class="cart-item-emoji">${c.emoji}</div>
        <div class="cart-item-info"><div class="cart-item-name">${c.name}</div><div class="cart-item-price">${formatPrice(c.price)} / cái</div></div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${c.id},-1)">−</button>
          <span style="font-weight:700">${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${c.id},+1)">+</button>
        </div>
        <div style="font-weight:700;color:var(--terracotta);min-width:80px;text-align:right">${formatPrice(c.price*c.qty)}</div>
      </div>`).join("");
    const total = cart.reduce((s,c)=>s+c.price*c.qty,0);
    footer.innerHTML = `
      <div class="cart-total"><span>Tổng cộng</span><span>${formatPrice(total)}</span></div>
      <div class="cart-note">🌿 ${formatPrice(Math.round(total*.3))} (30%) vào quỹ cứu hộ PAWGEN</div>
      <button class="btn-primary w-full" onclick="checkout()">Thanh toán ngay →</button>
      <button class="btn-outline w-full" style="margin-top:.5rem" onclick="closeModal('cartModal')">Tiếp tục mua sắm</button>`;
  }
  openModal("cartModal");
}
function changeQty(id,d) {
  const i = cart.find(c=>c.id===id); if (!i) return;
  i.qty+=d; if (i.qty<=0) cart=cart.filter(c=>c.id!==id);
  updateCartFloat(); openCart();
}
function checkout() { cart=[]; updateCartFloat(); closeModal("cartModal"); showToast("🎉 Đặt hàng thành công! Cảm ơn bạn đã ủng hộ PAWGEN!"); }
function formatPrice(n) { return n.toLocaleString("vi-VN")+" VNĐ"; }

// ─── DONORS ──────────────────────────────────────
function initDonors() {
  document.getElementById("donorList").innerHTML = DONORS_DATA.map(d=>`
    <div class="donor-item">
      <div class="donor-avatar">${d.avatar}</div>
      <div class="donor-info"><div class="donor-name">${d.name}</div><div class="donor-case">${d.case} · ${d.time}</div></div>
      <div class="donor-amount">${d.amount}</div>
    </div>`).join("");
}

// ─── DONATE ──────────────────────────────────────
function initDonateAmounts() {
  const btns = document.querySelectorAll(".donate-amt");
  const impact = document.getElementById("donateImpact");
  const customInput = document.getElementById("customDonate");
  const impactMap = {
    2000:"1 gói thức ăn nhỏ cho thú cưng 🐾",
    5000:"1 bữa ăn no cho thú cưng 🍚",
    10000:"1 ngày chăm sóc cơ bản 🐱",
    20000:"1 bát thức ăn + snack 🥣",
    50000:"1 buổi khám thú y 🏥",
  };
  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b=>b.classList.remove("active")); btn.classList.add("active");
      customInput.value="";
      impact.innerHTML = `✨ ${formatPrice(parseInt(btn.dataset.amt))} = ${impactMap[btn.dataset.amt]||"Hỗ trợ cứu hộ"}`;
    });
  });
  customInput.addEventListener("input", () => {
    btns.forEach(b=>b.classList.remove("active"));
    const v=parseInt(customInput.value)||0;
    if (v>0) impact.innerHTML=`✨ ${formatPrice(v)} = Cảm ơn tấm lòng của bạn! 💝`;
  });
  document.getElementById("donateBtn").addEventListener("click", () => {
    const a = document.querySelector(".donate-amt.active");
    const amt = parseInt(customInput.value)||(a?parseInt(a.dataset.amt):0);
    if (!amt) { showToast("⚠️ Vui lòng chọn hoặc nhập số tiền donate!"); return; }
    showToast(`💝 Cảm ơn bạn đã donate ${formatPrice(amt)}! Đang chuyển đến cổng thanh toán...`);
  });
}

// ─── DASHBOARD ───────────────────────────────────
function initDashboard() { renderDashboard("overview"); }
function initDashTabs() {
  document.querySelectorAll(".dash-tab").forEach(t=>{
    t.addEventListener("click",()=>{
      document.querySelectorAll(".dash-tab").forEach(x=>x.classList.remove("active"));
      t.classList.add("active"); currentDashTab=t.dataset.tab; renderDashboard(currentDashTab);
    });
  });
}
function renderDashboard(tab) {
  const content = document.getElementById("dashboardContent");
  const admin   = isAdmin();

  if (tab==="overview") {
    content.innerHTML = `
      <div class="dash-overview-grid">
        <div class="dash-metric"><span class="dash-metric-val">23</span><span class="dash-metric-label">Cases đang xử lý</span><div class="dash-metric-change">↑ 5 case mới hôm nay</div></div>
        <div class="dash-metric" style="border-left-color:var(--gold)"><span class="dash-metric-val" style="color:var(--gold)">47</span><span class="dash-metric-label">Foster đang hoạt động</span><div class="dash-metric-change">↑ 3 người mới tuần này</div></div>
        <div class="dash-metric" style="border-left-color:var(--forest-light)"><span class="dash-metric-val" style="color:var(--forest-light)">312</span><span class="dash-metric-label">Thú đã nhận nuôi (tháng)</span><div class="dash-metric-change">↑ 18% so với tháng trước</div></div>
        <div class="dash-metric" style="border-left-color:#4D96FF"><span class="dash-metric-val" style="color:#4D96FF">47.2M</span><span class="dash-metric-label">Quỹ donate (VNĐ)</span><div class="dash-metric-change">↑ 8.3M tuần này</div></div>
      </div>
      <div class="dash-chart-area">
        <div class="dash-chart-box">
          <h4>📊 Số ca cứu hộ theo tháng</h4>
          <div class="bar-chart">
            ${[{m:"T1",v:28},{m:"T2",v:35},{m:"T3",v:42},{m:"T4",v:38},{m:"T5",v:55},{m:"T6",v:48},{m:"T7",v:62},{m:"T8",v:71},{m:"T9",v:59},{m:"T10",v:78},{m:"T11",v:84},{m:"T12",v:91}].map(b=>`
              <div class="bar-group"><div class="bar" style="height:${(b.v/91)*100}%" title="${b.v} ca"></div><span class="bar-label">${b.m}</span></div>`).join("")}
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
      </div>`;
  }

  else if (tab==="cases") {
    content.innerHTML = `<div style="overflow-x:auto">
      <table class="cases-table"><thead><tr>
        <th>Mã case</th><th>Thú cưng</th><th>Vị trí</th><th>Người báo</th><th>Trạng thái</th><th>Bước</th><th>Thời gian</th><th></th>
      </tr></thead><tbody>
        ${CASES_DATA.map(c=>`<tr>
          <td><span style="font-family:monospace;font-size:.8rem">${c.id}</span></td>
          <td>${c.pet}</td>
          <td style="font-size:.82rem;color:var(--mid-gray)">${c.location}</td>
          <td style="font-size:.82rem">${c.reporter}</td>
          <td><span class="status-badge status-${c.status==='urgent'?'red':c.status==='yellow'?'yellow':c.status==='blue'?'blue':'green'}">${c.status==='urgent'?'🔴 Khẩn cấp':c.status==='yellow'?'🟡 Theo dõi':c.status==='blue'?'🔵 Hoàn tất':'🟢 Ổn định'}</span></td>
          <td style="font-size:.82rem">${c.step}</td>
          <td style="font-size:.78rem;color:var(--mid-gray)">${c.time}</td>
          <td><button onclick="showToast('📋 Chi tiết ${c.id}')" style="padding:.3rem .7rem;background:var(--terracotta);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:.75rem">Xem</button></td>
        </tr>`).join("")}
      </tbody></table></div>`;
  }

  else if (tab==="fosters") {
    const fosters = getFosters();
    content.innerHTML = `
      ${admin ? `<div style="display:flex;justify-content:flex-end;margin-bottom:1rem">
        <button class="btn-primary" style="padding:.4rem 1rem;font-size:.85rem" onclick="openFosterModal(null)">➕ Thêm foster mới</button>
      </div>` : ""}
      <div class="pets-grid">
        ${fosters.map(f=>`
          <div class="foster-card" style="text-align:left;position:relative">
            ${admin ? `<div class="ac-actions">
              <button class="ac-btn edit" onclick="event.stopPropagation();openFosterModal(${f.id})" title="Sửa">✏️</button>
              <button class="ac-btn del"  onclick="event.stopPropagation();deleteFoster(${f.id})"   title="Xóa">🗑</button>
            </div>` : ""}
            <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem">
              <div style="width:48px;height:48px;border-radius:50%;background:var(--cream-2);display:flex;align-items:center;justify-content:center;font-size:1.5rem">${f.avatar}</div>
              <div>
                <div style="font-weight:700">${f.name}</div>
                <div style="font-size:.78rem;color:var(--mid-gray)">${f.area} · ${f.type==="both"?"Mèo+Chó":f.type==="cat"?"Mèo":"Chó"}</div>
              </div>
              <div style="margin-left:auto;font-size:.75rem;color:var(--gold)">⭐ ${f.rating}/5</div>
            </div>
            <div style="background:var(--cream);border-radius:8px;padding:.75rem;margin-bottom:1rem">
              <div style="font-size:.78rem;color:var(--mid-gray);margin-bottom:.25rem">Sức chứa hiện tại</div>
              <div style="display:flex;gap:.35rem">
                ${Array.from({length:f.max}).map((_,i)=>`<div style="width:24px;height:24px;border-radius:50%;background:${i<f.current?'var(--terracotta)':'var(--light-gray)'};display:flex;align-items:center;justify-content:center;font-size:.8rem">${i<f.current?'🐾':''}</div>`).join("")}
              </div>
              <div style="font-size:.78rem;margin-top:.25rem">${f.current}/${f.max} chỗ đang dùng</div>
            </div>
            <button onclick="showToast('📞 ${f.name}: ${f.phone||'N/A'}')" class="btn-outline" style="width:100%;justify-content:center;padding:.5rem;font-size:.82rem">Liên hệ foster</button>
          </div>`).join("")}
      </div>`;
  }

  else if (tab==="campus") {
    content.innerHTML = `<div style="background:var(--cream);border-radius:var(--radius-md);padding:3rem;text-align:center">
      <div style="font-size:4rem;margin-bottom:1rem">🗺️</div>
      <h3 style="font-family:'Playfair Display',serif;font-size:1.5rem;margin-bottom:.75rem">Bản đồ Campus</h3>
      <p style="color:var(--mid-gray);margin-bottom:2rem">Hiển thị phân bổ động vật bị bỏ rơi tại các trường đại học đối tác.</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;max-width:600px;margin:0 auto">
        ${[{uni:"ĐH Bách Khoa",count:8,c:"var(--red-urgent)"},{uni:"ĐH KHTN",count:3,c:"var(--yellow-watch)"},{uni:"ĐH Kinh Tế",count:5,c:"var(--red-urgent)"},{uni:"ĐH Sư Phạm",count:2,c:"var(--green-safe)"},{uni:"ĐHQG Thủ Đức",count:11,c:"var(--red-urgent)"},{uni:"ĐH Văn Lang",count:1,c:"var(--green-safe)"}].map(u=>`
          <div style="background:var(--white);border-radius:var(--radius-sm);padding:1rem;border-left:4px solid ${u.c}">
            <div style="font-size:.8rem;font-weight:700;margin-bottom:.25rem">${u.uni}</div>
            <div style="font-size:1.5rem;font-weight:900;font-family:'Playfair Display',serif;color:${u.c}">${u.count}</div>
            <div style="font-size:.7rem;color:var(--mid-gray)">case đang xử lý</div>
          </div>`).join("")}
      </div>
      <button onclick="showToast('🗺️ Tính năng bản đồ đang phát triển!')" class="btn-primary" style="margin-top:2rem">Mở bản đồ đầy đủ</button>
    </div>`;
  }
}

// ─── FOSTER CRUD ─────────────────────────────────
function openFosterModal(id) {
  const f = id ? getFosters().find(x=>x.id===id) : null;
  openIModal(`
    <h3 style="font-family:'Playfair Display',serif;font-size:1.25rem;margin-bottom:1.25rem;margin-right:2rem">${f?"✏️ Sửa người nuôi tạm":"➕ Thêm người nuôi tạm"}</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem">
      <div><label class="ai-label">Họ tên *</label><input id="f_name" class="ai-input" value="${f?f.name:""}" placeholder="Nguyễn Thị A"></div>
      <div><label class="ai-label">Số điện thoại</label><input id="f_phone" class="ai-input" value="${f?f.phone||"":""}" placeholder="09xxxxxxxx"></div>
      <div><label class="ai-label">Khu vực *</label><input id="f_area" class="ai-input" value="${f?f.area:""}" placeholder="Quận 10"></div>
      <div><label class="ai-label">Loại nuôi</label>
        <select id="f_type" class="ai-input">
          <option value="cat"  ${f&&f.type==="cat" ?"selected":""}>🐱 Mèo</option>
          <option value="dog"  ${f&&f.type==="dog" ?"selected":""}>🐶 Chó</option>
          <option value="both" ${f&&f.type==="both"?"selected":""}>🐱🐶 Cả hai</option>
        </select>
      </div>
      <div><label class="ai-label">Sức chứa tối đa</label><input id="f_max" class="ai-input" type="number" value="${f?f.max:1}" min="1" max="10"></div>
      <div><label class="ai-label">Đang nuôi (hiện tại)</label><input id="f_cur" class="ai-input" type="number" value="${f?f.current:0}" min="0"></div>
      <div><label class="ai-label">Đánh giá (1–5)</label><input id="f_rat" class="ai-input" type="number" value="${f?f.rating:5}" min="1" max="5"></div>
      <div><label class="ai-label">Avatar (emoji)</label><input id="f_ava" class="ai-input" value="${f?f.avatar:"🐾"}" maxlength="4"></div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:1.25rem">
      <button class="btn-primary" style="flex:1" onclick="saveFoster(${id||"null"})">💾 Lưu</button>
      <button class="btn-outline" style="flex:1" onclick="closeIModal()">Huỷ</button>
    </div>
  `);
}
function saveFoster(id) {
  const name    = document.getElementById("f_name").value.trim();
  const area    = document.getElementById("f_area").value.trim();
  if (!name||!area) { showToast("⚠️ Vui lòng điền đầy đủ!"); return; }
  const obj = {
    name, area,
    phone:   document.getElementById("f_phone").value.trim(),
    type:    document.getElementById("f_type").value,
    max:     parseInt(document.getElementById("f_max").value)||1,
    current: parseInt(document.getElementById("f_cur").value)||0,
    rating:  parseInt(document.getElementById("f_rat").value)||5,
    avatar:  document.getElementById("f_ava").value.trim()||"🐾",
  };
  const list = getFosters();
  if (id) {
    const i=list.findIndex(x=>x.id===id); if(i!==-1) list[i]={...list[i],...obj};
    showToast(`✏️ Đã cập nhật "${name}"!`);
  } else {
    list.push({id:Date.now(),...obj,joined:new Date().toLocaleDateString("vi-VN"),status:"active"});
    showToast(`✅ Đã thêm "${name}"!`);
  }
  saveFosters(list); closeIModal(); renderDashboard("fosters");
}
function deleteFoster(id) {
  const f=getFosters().find(x=>x.id===id);
  if (!confirm(`Xoá "${f?.name||"foster"}" khỏi danh sách?`)) return;
  saveFosters(getFosters().filter(x=>x.id!==id));
  showToast("🗑 Đã xoá."); renderDashboard("fosters");
}

// ─── VOLUNTEER CRUD ───────────────────────────────
function renderVolunteerTable() {
  const wrap = document.getElementById("volunteerAdminTable"); if (!wrap) return;
  if (!isAdmin()) { wrap.innerHTML=""; return; }
  const vols = getVols();
  wrap.innerHTML = `
    <div style="background:var(--white);border-radius:var(--radius-md);padding:1.5rem 2rem;box-shadow:var(--shadow-sm);margin:0 0 2rem">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.25rem;flex-wrap:wrap;gap:.5rem">
        <h3 style="font-family:'Playfair Display',serif;font-size:1.2rem;margin:0">🙋 Danh sách Tình nguyện viên</h3>
        <button class="btn-primary" style="padding:.4rem 1rem;font-size:.82rem" onclick="openVolModal(null)">➕ Thêm mới</button>
      </div>
      <div style="overflow-x:auto">
        <table class="_vol-table">
          <thead><tr>
            <th>Họ tên</th><th>Vai trò</th><th>Khu vực</th><th>SĐT</th><th>Nhiệm vụ</th><th>Trạng thái</th><th>Hành động</th>
          </tr></thead>
          <tbody>
            ${vols.map(v=>`
              <tr class="_vol-row">
                <td><div style="font-weight:600">${v.name}</div><div style="font-size:.72rem;color:var(--mid-gray)">${v.joined}</div></td>
                <td><span style="background:#E8F0FF;color:#1565C0;padding:.15rem .5rem;border-radius:12px;font-size:.72rem;font-weight:600">${v.role}</span></td>
                <td style="font-size:.82rem">${v.area}</td>
                <td style="font-size:.82rem">${v.phone}</td>
                <td style="font-weight:700">${v.missions}</td>
                <td><span style="padding:.15rem .5rem;border-radius:12px;font-size:.72rem;font-weight:600;background:${v.status==='active'?'#E8F5E9':'#FFEAEA'};color:${v.status==='active'?'#2D8A3E':'#E83030'}">${v.status==='active'?'✅ Hoạt động':'⏸ Tạm ngưng'}</span></td>
                <td>
                  <div style="display:flex;gap:.35rem">
                    <button class="ac-btn edit" style="opacity:1" onclick="openVolModal(${v.id})" title="Sửa">✏️</button>
                    <button class="ac-btn del"  style="opacity:1" onclick="deleteVol(${v.id})"    title="Xóa">🗑</button>
                  </div>
                </td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openVolModal(id) {
  const v = id ? getVols().find(x=>x.id===id) : null;
  const roles = ["Rescuer","Foster Parent","Coordinator","Pet Photographer","Vet Support","Social Media"];
  openIModal(`
    <h3 style="font-family:'Playfair Display',serif;font-size:1.25rem;margin-bottom:1.25rem;margin-right:2rem">${v?"✏️ Sửa tình nguyện viên":"➕ Thêm tình nguyện viên"}</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.8rem">
      <div><label class="ai-label">Họ tên *</label><input id="v_name" class="ai-input" value="${v?v.name:""}" placeholder="Nguyễn Văn A"></div>
      <div><label class="ai-label">Số điện thoại *</label><input id="v_phone" class="ai-input" value="${v?v.phone:""}" placeholder="09xxxxxxxx"></div>
      <div><label class="ai-label">Khu vực</label><input id="v_area" class="ai-input" value="${v?v.area:""}" placeholder="Q.1, Q.3"></div>
      <div><label class="ai-label">Vai trò</label>
        <select id="v_role" class="ai-input">${roles.map(r=>`<option ${v&&v.role===r?"selected":""}>${r}</option>`).join("")}</select>
      </div>
      <div><label class="ai-label">Số nhiệm vụ</label><input id="v_mis" class="ai-input" type="number" value="${v?v.missions:0}" min="0"></div>
      <div><label class="ai-label">Trạng thái</label>
        <select id="v_sta" class="ai-input">
          <option value="active"   ${!v||v.status==="active"  ?"selected":""}>✅ Hoạt động</option>
          <option value="inactive" ${v&&v.status==="inactive"?"selected":""}>⏸ Tạm ngưng</option>
        </select>
      </div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:1.25rem">
      <button class="btn-primary" style="flex:1" onclick="saveVol(${id||"null"})">💾 Lưu</button>
      <button class="btn-outline" style="flex:1" onclick="closeIModal()">Huỷ</button>
    </div>
  `);
}
function saveVol(id) {
  const name  = document.getElementById("v_name").value.trim();
  const phone = document.getElementById("v_phone").value.trim();
  if (!name||!phone) { showToast("⚠️ Vui lòng điền đủ họ tên và SĐT!"); return; }
  const obj = {
    name, phone,
    area:     document.getElementById("v_area").value.trim(),
    role:     document.getElementById("v_role").value,
    missions: parseInt(document.getElementById("v_mis").value)||0,
    status:   document.getElementById("v_sta").value,
  };
  const list = getVols();
  if (id) {
    const i=list.findIndex(x=>x.id===id); if(i!==-1) list[i]={...list[i],...obj};
    showToast(`✏️ Đã cập nhật "${name}"!`);
  } else {
    list.push({id:Date.now(),...obj,joined:new Date().toLocaleDateString("vi-VN")});
    showToast(`✅ Đã thêm "${name}"!`);
  }
  saveVols(list); closeIModal(); renderVolunteerTable();
}
function deleteVol(id) {
  const v=getVols().find(x=>x.id===id);
  if (!confirm(`Xoá "${v?.name||"tình nguyện viên"}"?`)) return;
  saveVols(getVols().filter(x=>x.id!==id));
  showToast("🗑 Đã xoá."); renderVolunteerTable();
}

// ─── FORMS ───────────────────────────────────────
function initForms() {
  document.getElementById("rescueForm").addEventListener("submit", e=>{
    e.preventDefault(); closeModal("rescueModal");
    showToast("🚨 Báo cáo cứu hộ đã được gửi! Volunteer sẽ liên hệ bạn trong 15 phút."); e.target.reset();
  });
  document.getElementById("fosterForm").addEventListener("submit", e=>{
    e.preventDefault(); showToast("🏠 Đăng ký nuôi tạm thành công! Chúng mình sẽ liên hệ trong 24h."); e.target.reset();
  });
  document.getElementById("volunteerForm").addEventListener("submit", e=>{
    e.preventDefault(); closeModal("volunteerModal");
    showToast("✅ Đơn đăng ký tình nguyện đã được gửi!"); e.target.reset();
  });
  // render bảng volunteer admin ngay sau khi DOM sẵn sàng
  renderVolunteerTable();
}

// ─── UPLOAD ZONE ─────────────────────────────────
function initUploadZone() {
  const zone=document.getElementById("uploadZone"), input=document.getElementById("fileInput");
  zone.addEventListener("click",()=>input.click());
  input.addEventListener("change",e=>{
    if(e.target.files[0]){zone.innerHTML=`<span>✅ Đã tải: ${e.target.files[0].name}</span>`;zone.style.borderColor="var(--forest-light)";zone.style.color="var(--forest-light)";}
  });
  zone.addEventListener("dragover",e=>{e.preventDefault();zone.style.borderColor="var(--terracotta)";});
  zone.addEventListener("dragleave",()=>zone.style.borderColor="var(--light-gray)");
  zone.addEventListener("drop",e=>{
    e.preventDefault();const f=e.dataTransfer.files[0];
    if(f){zone.innerHTML=`<span>✅ Đã tải: ${f.name}</span>`;zone.style.borderColor="var(--forest-light)";}
  });
}

// ─── MODALS ──────────────────────────────────────
function openModal(id)  { document.getElementById(id).classList.add("open");    document.body.style.overflow="hidden"; }
function closeModal(id) { document.getElementById(id).classList.remove("open"); document.body.style.overflow=""; }
document.querySelectorAll(".modal-overlay").forEach(o=>{
  o.addEventListener("click",e=>{ if(e.target===o){o.classList.remove("open");document.body.style.overflow="";} });
});
function openVolunteerModal(role) { document.getElementById("volunteerRole").textContent=role; openModal("volunteerModal"); }
function openPartnerModal() { showToast("📧 Vui lòng liên hệ hello@pawgen.vn để hợp tác!"); }

// ─── TOAST ───────────────────────────────────────
let _tt;
function showToast(msg) {
  const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(_tt); _tt=setTimeout(()=>t.classList.remove("show"),3500);
}

// ─── KEYBOARD ESC ────────────────────────────────
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    document.querySelectorAll(".modal-overlay.open").forEach(m=>{m.classList.remove("open");document.body.style.overflow="";});
    closeIModal(); closeMobileMenu();
  }
});

// ─── NAV AUTH ────────────────────────────────────
function initNavAuth() {
  const nav=document.getElementById("navAuth"); if(!nav) return;
  const sess=getSession();
  if (!sess) { nav.innerHTML=`<a href="auth.html" class="btn-nav-login">👤 Đăng nhập</a>`; return; }
  const init = sess.name?sess.name.charAt(0).toUpperCase():"U";
  const admin = sess.role==="admin";
  nav.innerHTML=`
    <div class="nav-user-pill">
      <div class="nav-avatar ${admin?'admin-av':''}">${init}</div>
      <span>${sess.name.split(" ").slice(-1)[0]}</span>
      ${admin?'<span style="font-size:.65rem;background:var(--forest);color:#fff;padding:.1rem .4rem;border-radius:4px;margin-left:2px">Admin</span>':""}
      <div class="nav-dropdown">
        <div style="padding:.75rem 1rem;border-bottom:1px solid var(--light-gray)">
          <div style="font-weight:700;font-size:.85rem">${sess.name}</div>
          <div style="font-size:.72rem;color:var(--mid-gray)">${sess.email||""}</div>
        </div>
        ${admin?`<a href="admin.html" class="nav-dd-item">🛡️ Trang quản trị</a>`:""}
        <a href="#rescue" class="nav-dd-item" onclick="scrollToSection('rescue')">🚨 Báo cứu hộ</a>
        <a href="#adopt"  class="nav-dd-item" onclick="scrollToSection('adopt')">🐾 Tìm thú cưng</a>
        <div class="nav-dd-divider"></div>
        <button class="nav-dd-item danger" onclick="logoutUser()">⏻ Đăng xuất</button>
      </div>
    </div>`;
}
function logoutUser() { localStorage.removeItem(SES_KEY); window.location.reload(); }
