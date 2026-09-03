const app = document.getElementById("app");

const state = {
  route: "home",
  role: localStorage.getItem("sunwork_role") || null,
  loggedIn: localStorage.getItem("sunwork_logged_in") === "true",
  selectedRole: "candidate",
  authMode: "login",
  currentChat: 1,
  jobQuery: "",
  locationQuery: "",
  candidateQuery: ""
};


const getUsers = () => JSON.parse(localStorage.getItem("sunwork_users") || "[]");
const setUsers = (v) => localStorage.setItem("sunwork_users", JSON.stringify(v));
const getCurrentUser = () => JSON.parse(localStorage.getItem("sunwork_current_user") || "null");
const setCurrentUser = (v) => localStorage.setItem("sunwork_current_user", JSON.stringify(v));

const getJobs = () => JSON.parse(localStorage.getItem("sunwork_jobs") || "[]");
const setJobs = (v) => localStorage.setItem("sunwork_jobs", JSON.stringify(v));
const getCandidates = () => JSON.parse(localStorage.getItem("sunwork_candidates") || "[]");
const setCandidates = (v) => localStorage.setItem("sunwork_candidates", JSON.stringify(v));
const getMessages = () => JSON.parse(localStorage.getItem("sunwork_messages") || "[]");
const setMessages = (v) => localStorage.setItem("sunwork_messages", JSON.stringify(v));
const getApplications = () => JSON.parse(localStorage.getItem("sunwork_applications") || "[]");
const setApplications = (v) => localStorage.setItem("sunwork_applications", JSON.stringify(v));
const getSavedJobs = () => JSON.parse(localStorage.getItem("sunwork_saved_jobs") || "[]");
const setSavedJobs = (v) => localStorage.setItem("sunwork_saved_jobs", JSON.stringify(v));
const getTalentBoard = () => JSON.parse(localStorage.getItem("sunwork_talent_board") || "[]");
const setTalentBoard = (v) => localStorage.setItem("sunwork_talent_board", JSON.stringify(v));

function esc(s = "") {
  return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function statusMeta(status) {
  return {
    pending: ["Đang chờ", "warning"],
    accepted: ["Đã mời phỏng vấn", "success"],
    rejected: ["Không phù hợp", "danger"]
  }[status] || ["Đang chờ", "warning"];
}

function toast(message, type = "success") {
  const wrap = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${type === "success" ? "✓" : type === "danger" ? "!" : "i"}</span><div>${esc(message)}</div>`;
  wrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 250);
  }, 2600);
}

function openModal(id) {
  document.getElementById(id)?.classList.add("show");
  document.body.classList.add("modal-open");
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove("show");
  document.body.classList.remove("modal-open");
}

function setRoute(route) {
  const protectedCandidate = ["candidate-dashboard","saved-jobs","interview-plan","messages","profile","portfolio"];
  const protectedEmployer = ["employer-dashboard","post-job","manage-jobs","talent-board","interview-board","company-profile"];
  if (protectedCandidate.includes(route) && (!state.loggedIn || state.role !== "candidate")) {
    state.selectedRole = "candidate"; openAuth("login"); return;
  }
  if (protectedEmployer.includes(route) && (!state.loggedIn || state.role !== "employer")) {
    state.selectedRole = "employer"; openAuth("login"); return;
  }
  state.route = route;
  window.scrollTo({top:0, behavior:"smooth"});
  render();
}

function openAuth(mode = "login") {
  state.authMode = mode;
  const modal = document.getElementById("auth-modal");
  modal.querySelectorAll(".auth-tab").forEach(b => b.classList.toggle("active", b.dataset.authMode === mode));
  modal.querySelectorAll(".register-only").forEach(x => x.classList.toggle("hidden", mode !== "register"));
  modal.querySelector("#auth-title").textContent = mode === "login" ? "Chào mừng quay lại" : "Tạo tài khoản SunWork";
  modal.querySelector("#auth-subtitle").textContent = mode === "login"
    ? "Chọn vai trò để vào đúng khu vực của bạn."
    : "Tạo tài khoản demo để trải nghiệm giao diện.";
  modal.querySelector("#auth-submit").textContent = mode === "login" ? "Đăng nhập" : "Đăng ký";
  modal.querySelectorAll(".role-card").forEach(b => b.classList.toggle("active", b.dataset.role === state.selectedRole));
  openModal("auth-modal");
}

function updateNavigation() {
  const actions = document.getElementById("nav-actions");
  if (!state.loggedIn) {
    actions.innerHTML = `<button class="btn btn-ghost" id="open-login">Đăng nhập</button><button class="btn btn-primary" id="open-register">Đăng ký</button>`;
  } else {
    const label = state.role === "candidate" ? "Nguyễn Văn A" : "SunByte Studio";
    const route = state.role === "candidate" ? "candidate-dashboard" : "employer-dashboard";
    actions.innerHTML = `
      <button class="user-chip" data-route="${route}">
        <span class="avatar-sm">${state.role === "candidate" ? "NA" : "SB"}</span>
        <span>${label}</span>
      </button>
      <button class="btn btn-ghost btn-sm" id="logout-btn">Đăng xuất</button>`;
  }
  document.querySelectorAll(".nav-link").forEach(b => {
    b.classList.toggle("active", b.dataset.route === state.route || (state.route === "home" && b.dataset.route === "home"));
  });
}

function jobCard(job, compact = false) {
  const saved = getSavedJobs().includes(job.id);
  return `
    <article class="job-card ${compact ? 'sun-compact-job' : ''}" data-open-job="${job.id}">
      <div class="job-logo">${esc(job.logo)}</div>
      <div class="job-main">
        <div class="job-topline">
          <div>
            <h3>${esc(job.title)}</h3>
            <p>${esc(job.company)}</p>
          </div>
          ${job.hot ? '<span class="hot-badge">HOT</span>' : ''}
        </div>
        <div class="job-meta">
          <span>💰 ${esc(job.salary)}</span>
          <span>📍 ${esc(job.location)}</span>
          <span>🕒 ${esc(job.type)}</span>
        </div>
        <div class="job-footer">
          <div class="tag-row">${job.skills.slice(0,3).map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
          <span class="job-posted">${esc(job.posted)}</span>
        </div>
      </div>
      <button class="bookmark-btn ${saved ? 'active' : ''}" data-save-job="${job.id}" title="Lưu việc">${saved ? '♥' : '♡'}</button>
    </article>`;
}

function candidateCard(c, showShortlist = false) {
  const [txt, cls] = statusMeta(c.status);
  const inBoard = getTalentBoard().includes(c.id);
  return `<article class="candidate-card-full">
    <div class="candidate-card-top"><div class="avatar-lg">${esc(c.avatar)}</div><div class="candidate-info"><h3>${esc(c.name)}</h3><p>${esc(c.title)}</p></div><span class="match-pill">${c.score}% phù hợp</span></div>
    <div class="candidate-details"><span>⌖ ${esc(c.location)}</span><span>◷ ${esc(c.experience)}</span><span>✉ ${esc(c.email)}</span></div>
    <div class="tag-row">${c.skills.map(s => `<span class="tag">${esc(s)}</span>`).join("")}</div>
    <div class="candidate-card-bottom"><span class="status ${cls}">${txt}</span>
      <div class="action-row">
        ${showShortlist ? `<button class="btn ${inBoard ? 'btn-soft' : 'btn-primary'} btn-sm" data-toggle-talent="${c.id}">${inBoard ? 'Đã lưu board' : 'Thêm vào board'}</button>` : ''}
        <button class="btn btn-soft btn-sm" data-open-candidate="${c.id}">Xem hồ sơ</button>
      </div>
    </div>
  </article>`;
}

function candidateSidebar(active) {
  const items = [
    ["candidate-dashboard","▦","Tổng quan"],
    ["jobs","⌕","Khám phá việc"],
    ["portfolio","▤","Portfolio"],
    ["saved-jobs","♡","Việc đã lưu"],
    ["interview-plan","☼","Lịch phỏng vấn"],
    ["messages","✉","Tin nhắn"],
    ["profile","○","Hồ sơ cá nhân"]
  ];
  return `<aside class="dashboard-sidebar sun-side">
    <div class="profile-mini"><div class="avatar-lg">NA</div><div><b>Nguyễn Văn A</b><span>Game / Product Candidate</span></div></div>
    <nav>${items.map(i => `<button class="${active===i[0] ? 'active' : ''}" data-route="${i[0]}"><i>${i[1]}</i>${i[2]}</button>`).join("")}</nav>
  </aside>`;
}

function employerSidebar(active) {
  const items = [
    ["employer-dashboard","▦","Tổng quan"],
    ["post-job","+","Tạo chiến dịch"],
    ["talent-board","☀","Talent Board"],
    ["interview-board","◷","Lịch phỏng vấn"],
    ["manage-jobs","▤","Quản lý tin"],
    ["messages","✉","Tin nhắn"],
    ["company-profile","○","Thông tin công ty"]
  ];
  return `<aside class="dashboard-sidebar employer-side sun-side">
    <div class="profile-mini"><div class="avatar-lg company-avatar">SB</div><div><b>SunByte Studio</b><span>Nhà tuyển dụng</span></div></div>
    <nav>${items.map(i => `<button class="${active===i[0] ? 'active' : ''}" data-route="${i[0]}"><i>${i[1]}</i>${i[2]}</button>`).join("")}</nav>
  </aside>`;
}

function renderHome() {
  const jobs = getJobs().slice(0, 4);
  return `
  <section class="hero sun-hero">
    <div class="container sun-grid">
      <div class="hero-copy sun-copy">
        <div class="eyebrow sun-badge">CAREER MARKETPLACE</div>
        <h1>Bật sáng công việc,<br/><span>mở đường tương lai.</span></h1>
        <p>SunWork là phiên bản so sánh với MoonWork: màu ấm hơn, giao diện sáng hơn và thêm các tính năng như lưu việc, talent board và interview planner.</p>
        <div class="search-hero sun-search">
          <div class="input-icon"><span>⌕</span><input id="home-job-query" placeholder="Vị trí, kỹ năng hoặc công ty..." /></div>
          <div class="input-icon location"><span>⌖</span><input id="home-location-query" placeholder="Địa điểm" /></div>
          <button class="btn btn-primary" id="home-search-btn">Khám phá ngay</button>
        </div>
        <div class="popular-search sun-tags">
          <span>Gợi ý nhanh:</span>
          <button data-search-key="Unity">Unity</button>
          <button data-search-key="Designer">Designer</button>
          <button data-search-key="Frontend">Frontend</button>
          <button data-search-key="Marketing">Marketing</button>
        </div>
        <div class="sun-stat-strip">
          <div><b>1.6K+</b><span>Cơ hội đang mở</span></div>
          <div><b>320+</b><span>Lịch phỏng vấn</span></div>
          <div><b>530+</b><span>Portfolio mới</span></div>
        </div>
      </div>
      <div class="hero-art sun-art">
        <div class="sun-glow"></div>
        <div class="sun-disc"></div>
        <div class="sun-ray ray-1"></div>
        <div class="sun-ray ray-2"></div>
        <div class="sun-ray ray-3"></div>
        <div class="sun-ray ray-4"></div>
        
<div class="sun-mascot">
  <img src="images/sun-mascot.png" class="sun-mascot-image" alt="SunWork mascot">
</div>

<div class="sun-label saved-label">
  <strong>Saved Jobs</strong>
  <span>+3 hôm nay</span>
</div>

<div class="sun-label talent-label">
  <strong>Talent Board</strong>
  <span>2 ứng viên nổi bật</span>
</div>

<div class="sun-work-badge">
  <span>✦</span>
  <strong>WORK</strong>
</div>
      </div>
    </div>
  </section>

  <section class="section sun-section-soft">
    <div class="container">
      <div class="section-head">
        <div><span class="eyebrow">CƠ HỘI NỔI BẬT</span><h2>Việc làm đang rất sáng</h2><p class="section-subtitle">Một số cơ hội nổi bật dành cho bạn trên SunWork.</p></div>
        <button class="text-arrow" data-route="jobs">Xem tất cả →</button>
      </div>
      <div class="job-grid">${jobs.map(job => jobCard(job)).join("")}</div>
    </div>
  </section>

  <section class="section alt sun-compare-section">
    <div class="container role-feature-grid">
      <div class="feature-card candidate-feature sun-candidate-feature">
        <div class="feature-icon">✦</div>
        <span class="eyebrow">DÀNH CHO ỨNG VIÊN</span>
        <h2>Lưu việc, dựng portfolio, bám sát tiến trình ứng tuyển.</h2>
        <p>SunWork tập trung nhiều hơn vào hành trình chuẩn bị trước khi ứng tuyển: xây portfolio, lưu việc, theo dõi lịch hẹn và nhắc việc.</p>
        <div class="feature-list"><span>✓ Portfolio builder</span><span>✓ Saved jobs</span><span>✓ Interview planner</span></div>
        <button class="btn btn-dark" data-route="portfolio">Tạo portfolio</button>
      </div>
      <div class="feature-card employer-feature sun-employer-feature">
        <div class="feature-icon">☼</div>
        <span class="eyebrow">DÀNH CHO NHÀ TUYỂN DỤNG</span>
        <h2>Thu gom ứng viên tốt vào Talent Board trước khi ra quyết định.</h2>
        <p>Thay vì chỉ xem CV rồi accept/reject, nhà tuyển dụng có thêm board lưu ứng viên và khu vực quản lý lịch phỏng vấn.</p>
        <div class="feature-list"><span>✓ Talent board</span><span>✓ Interview board</span><span>✓ Quản lý chiến dịch</span></div>
        <button class="btn btn-primary" data-route="talent-board">Mở Talent Board</button>
      </div>
    </div>
  </section>`;
}

function renderJobs() {
  const jobs = getJobs().filter(job => {
    const q = state.jobQuery.toLowerCase();
    const loc = state.locationQuery.toLowerCase();
    const searchable = `${job.title} ${job.company} ${job.skills.join(" ")} ${job.category}`.toLowerCase();
    return (!q || searchable.includes(q)) && (!loc || job.location.toLowerCase().includes(loc));
  });
  return `
    <section class="page-hero compact sun-page-hero">
      <div class="container">
        <span class="eyebrow">CƠ HỘI NGHỀ NGHIỆP</span>
        <h1>Khám phá việc làm phù hợp</h1>
        <p class="page-lead">Bộ lọc nhanh, danh sách rõ ràng và có thể lưu việc để quay lại sau.</p>
        <div class="search-hero search-page sun-search-page">
          <div class="input-icon"><span>⌕</span><input id="jobs-query" value="${esc(state.jobQuery)}" placeholder="Vị trí, kỹ năng hoặc công ty..." /></div>
          <div class="input-icon location"><span>⌖</span><input id="jobs-location" value="${esc(state.locationQuery)}" placeholder="Địa điểm" /></div>
          <button class="btn btn-primary" id="jobs-search-btn">Tìm kiếm</button>
        </div>
      </div>
    </section>
    <section class="section jobs-page">
      <div class="container jobs-layout">
        <aside class="filter-card sun-filter-card">
          <div class="filter-title"><b>Bộ lọc nhanh</b><button id="clear-filter">Xóa lọc</button></div>
          <div class="filter-block">
            <label>Nhóm việc</label>
            <label class="check-row"><input type="checkbox" /> Game / IT <span>58</span></label>
            <label class="check-row"><input type="checkbox" /> Design <span>41</span></label>
            <label class="check-row"><input type="checkbox" /> Product <span>23</span></label>
            <label class="check-row"><input type="checkbox" /> Marketing <span>37</span></label>
          </div>
          <div class="filter-block"><label>Kinh nghiệm</label><select><option>Tất cả</option><option>Fresher</option><option>1 - 2 năm</option><option>2 - 3 năm</option></select></div>
          <div class="filter-block"><label>Mức lương</label><select><option>Tất cả</option><option>10 - 15 triệu</option><option>15 - 25 triệu</option><option>Trên 25 triệu</option></select></div>
          <div class="filter-block"><label>Hình thức</label><select><option>Tất cả</option><option>Full-time</option><option>Hybrid</option><option>Remote</option></select></div>
        </aside>
        <div>
          <div class="result-head"><div><h2>${jobs.length} việc làm</h2><p>Danh sách được hiển thị theo tiêu chí của bạn</p></div><select><option>Mới nhất</option><option>Nổi bật</option><option>Phù hợp nhất</option></select></div>
          <div class="job-list">${jobs.length ? jobs.map(job => jobCard(job)).join("") : `<div class="empty-card"><div>⌕</div><h3>Không tìm thấy công việc</h3><p>Thử từ khóa hoặc địa điểm khác nhé.</p></div>`}</div>
        </div>
      </div>
    </section>`;
}

function renderSkillLab() {
  const tracks = [
    { icon: '🎮', title: 'Game Track', desc: 'Lộ trình cho Unity / gameplay / technical artist.', stats: ['12 skill core', '4 mini project', '2 mock interview'] },
    { icon: '🎨', title: 'Design Track', desc: 'Lộ trình cho UI/UX, research và design system.', stats: ['9 skill core', '3 case study', 'portfolio checklist'] },
    { icon: '💻', title: 'Frontend Track', desc: 'Lộ trình component, animation và hiệu năng UI.', stats: ['10 skill core', '2 live challenge', 'code review'] },
    { icon: '📣', title: 'Marketing Track', desc: 'Lộ trình content, insight và đo lường hiệu quả.', stats: ['8 skill core', 'campaign brief', 'analytics plan'] }
  ];
  return `
  <section class="page-hero compact sun-page-hero">
    <div class="container">
      <span class="eyebrow">SKILL LAB</span>
      <h1>Góc chuẩn bị trước khi ứng tuyển</h1>
      <p>Khác với MoonWork, SunWork có thêm một khu vực định hướng kỹ năng giúp bạn chuẩn bị hồ sơ và chọn track nghề nghiệp.</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="track-grid">
        ${tracks.map(track => `
          <article class="track-card">
            <div class="track-top"><span class="track-icon">${track.icon}</span><div><h3>${track.title}</h3><p>${track.desc}</p></div></div>
            <div class="track-list">${track.stats.map(x => `<span>${x}</span>`).join('')}</div>
            <div class="track-progress"><b>Tiến độ gợi ý</b><div class="progress-bar"><i style="width:${track.title.includes('Design') ? 74 : track.title.includes('Frontend') ? 68 : track.title.includes('Marketing') ? 59 : 81}%"></i></div></div>
            <button class="btn btn-soft">Xem checklist</button>
          </article>`).join('')}
      </div>
    </div>
  </section>`;
}

function renderPortfolio() {
  return `
  <section class="cv-page sun-portfolio-page">
    <div class="cv-toolbar sun-portfolio-toolbar">
      <div class="container cv-toolbar-inner">
        <div><span class="eyebrow">PORTFOLIO BUILDER</span><h2>One-page Portfolio</h2></div>
        <div class="toolbar-actions"><button class="btn btn-ghost" id="reset-cv">Làm mới</button><button class="btn btn-primary" id="save-cv">Lưu portfolio</button></div>
      </div>
    </div>
    <div class="container cv-builder">
      <aside class="cv-editor">
        <div class="editor-section"><h3>Thông tin cá nhân</h3>
          <div class="form-grid">
            <div class="form-group"><label>Họ tên</label><input class="cv-input" data-cv="name" value="Nguyễn Văn A" /></div>
            <div class="form-group"><label>Headline</label><input class="cv-input" data-cv="title" value="Unity / Product Candidate" /></div>
            <div class="form-group"><label>Email</label><input class="cv-input" data-cv="email" value="nguyenvana@gmail.com" /></div>
            <div class="form-group"><label>Số điện thoại</label><input class="cv-input" data-cv="phone" value="0901 234 567" /></div>
            <div class="form-group full"><label>Địa điểm</label><input class="cv-input" data-cv="location" value="Hà Nội, Việt Nam" /></div>
          </div>
        </div>
        <div class="editor-section"><h3>Giới thiệu ngắn</h3><textarea class="cv-input" data-cv="about">Ứng viên yêu thích phát triển game và sản phẩm số, tập trung vào trải nghiệm rõ ràng, logic và có cảm xúc.</textarea></div>
        <div class="editor-section"><h3>Kỹ năng nổi bật</h3><input class="cv-input" data-cv="skills" value="Unity, C#, Figma, Git, UI thinking" /><small>Phân cách bằng dấu phẩy.</small></div>
        <div class="editor-section"><h3>Dự án tiêu biểu</h3>
          <div class="form-group"><label>Tên dự án</label><input class="cv-input" data-cv="company" value="Light & Abyss" /></div>
          <div class="form-group"><label>Vai trò / thời gian</label><input class="cv-input" data-cv="experience" value="Game Developer • 2025 - 2026" /></div>
          <div class="form-group"><label>Mô tả</label><textarea class="cv-input" data-cv="experienceDesc">Xây dựng hệ thống combat, enemy behavior, UI trạng thái và tối ưu trải nghiệm gameplay.</textarea></div>
        </div>
        <div class="editor-section"><h3>Học vấn</h3><input class="cv-input" data-cv="education" value="FPT Polytechnic • Lập trình Game • 2023 - 2026" /></div>
      </aside>
      <div class="cv-preview-wrap">
        <div class="preview-note">Xem trước trực tiếp</div>
        <article class="cv-paper sun-portfolio-paper" id="cv-preview">
          <header class="cv-head"><div class="cv-avatar">NA</div><div><h1 data-preview="name">Nguyễn Văn A</h1><h2 data-preview="title">Unity / Product Candidate</h2></div></header>
          <div class="cv-contact"><span>✉ <i data-preview="email">nguyenvana@gmail.com</i></span><span>☎ <i data-preview="phone">0901 234 567</i></span><span>⌖ <i data-preview="location">Hà Nội, Việt Nam</i></span></div>
          <section><h3>GIỚI THIỆU</h3><p data-preview="about">Ứng viên yêu thích phát triển game và sản phẩm số, tập trung vào trải nghiệm rõ ràng, logic và có cảm xúc.</p></section>
          <section><h3>SKILLS</h3><div class="cv-skills" data-preview="skills"></div></section>
          <section><h3>DỰ ÁN TIÊU BIỂU</h3><div class="cv-entry"><b data-preview="company">Light & Abyss</b><span data-preview="experience">Game Developer • 2025 - 2026</span><p data-preview="experienceDesc">Xây dựng hệ thống combat, enemy behavior, UI trạng thái và tối ưu trải nghiệm gameplay.</p></div></section>
          <section><h3>HỌC VẤN</h3><div class="cv-entry"><b data-preview="education">FPT Polytechnic • Lập trình Game • 2023 - 2026</b></div></section>
        </article>
      </div>
    </div>
  </section>`;
}

function renderCandidateDashboard() {
  const apps = getApplications();
  const saved = getSavedJobs();
  const upcoming = apps.filter(a => a.status === 'accepted').length;
  const suggested = getJobs().slice(0, 3);
  return `<section class="dashboard-page"><div class="container dashboard-grid">
    ${candidateSidebar("candidate-dashboard")}
    <div class="dashboard-content">
      <div class="welcome-card sun-welcome"><div><span class="eyebrow">CANDIDATE DASHBOARD</span><h1>Xin chào, Nguyễn Văn A ☀</h1><p>Hôm nay bạn có <b>${saved.length}</b> việc đã lưu và <b>${upcoming}</b> lịch hẹn cần chú ý.</p></div><div class="profile-progress"><div class="progress-ring"><span>86%</span></div><div><b>Portfolio khá tốt</b><span>Hoàn thiện thêm case study để nổi bật hơn</span></div></div></div>
      <div class="stats-grid">
        <div class="stat-card"><span class="stat-icon">♡</span><div><b>${saved.length}</b><span>Việc đã lưu</span></div></div>
        <div class="stat-card"><span class="stat-icon">▤</span><div><b>${apps.length}</b><span>Đã ứng tuyển</span></div></div>
        <div class="stat-card"><span class="stat-icon">☼</span><div><b>${upcoming}</b><span>Lịch sắp tới</span></div></div>
        <div class="stat-card"><span class="stat-icon">✉</span><div><b>2</b><span>Tin nhắn mới</span></div></div>
      </div>
      <div class="dashboard-split">
        <div class="dash-section table-card no-pad">
          <div class="section-head mini padded"><div><h2>Việc nên ưu tiên</h2><p>Dựa trên việc bạn đã lưu và đã ứng tuyển</p></div><button class="text-arrow" data-route="saved-jobs">Xem saved →</button></div>
          <div class="job-list compact-list">${suggested.map(job => jobCard(job, true)).join('')}</div>
        </div>
        <div class="analytics-card">
          <div class="section-head mini"><div><h2>Lộ trình tuần này</h2><p>Nhắc việc nhanh</p></div></div>
          <div class="sun-checklist"><span>✓ Cập nhật portfolio</span><span>✓ Chuẩn bị demo project</span><span>◔ Luyện trả lời phỏng vấn</span><span>◔ Hoàn thiện mô tả bản thân</span></div>
        </div>
      </div>
    </div>
  </div></section>`;
}

function renderSavedJobs() {
  const ids = getSavedJobs();
  const savedJobs = getJobs().filter(j => ids.includes(j.id));
  return `<section class="dashboard-page"><div class="container dashboard-grid">
    ${candidateSidebar("saved-jobs")}
    <div class="dashboard-content">
      <div class="dash-title"><span class="eyebrow">SAVED JOBS</span><h1>Việc làm đã lưu</h1><p>Khác với MoonWork, SunWork có màn lưu việc riêng để bạn so sánh và quay lại sau.</p></div>
      <div class="saved-summary"><div><b>${savedJobs.length}</b><span>việc đang lưu</span></div><div><b>${savedJobs.filter(j => j.hot).length}</b><span>tin nổi bật</span></div><div><b>${savedJobs.filter(j => j.type === 'Remote').length}</b><span>remote</span></div></div>
      <div class="job-list">${savedJobs.length ? savedJobs.map(job => jobCard(job)).join('') : `<div class="empty-card saved-empty"><div>♡</div><h3>Bạn chưa lưu việc nào</h3><p>Hãy bấm trái tim ở danh sách việc làm để lưu lại.</p></div>`}</div>
    </div>
  </div></section>`;
}

function renderInterviewPlan() {
  const jobs = getJobs();
  const apps = getApplications();
  const schedule = apps.map((a, idx) => {
    const j = jobs.find(x => x.id === a.jobId) || { title: 'Tin tuyển dụng', company: 'Doanh nghiệp' };
    const slot = a.status === 'accepted' ? ['Thứ 4 • 14:00', 'Online qua Google Meet'] : a.status === 'pending' ? ['Đợi xác nhận từ HR', 'Nên follow-up sau 2 ngày'] : ['Đã kết thúc quy trình', 'Có thể lưu lại để rút kinh nghiệm'];
    return { ...a, job: j, slot1: slot[0], slot2: slot[1] };
  });
  return `<section class="dashboard-page"><div class="container dashboard-grid">
    ${candidateSidebar("interview-plan")}
    <div class="dashboard-content">
      <div class="dash-title"><span class="eyebrow">INTERVIEW PLAN</span><h1>Lịch phỏng vấn & tiến trình</h1><p>Màn này là điểm khác để bạn so sánh với web trước: tập trung vào planning hơn là chỉ xem lịch sử ứng tuyển.</p></div>
      <div class="schedule-grid">${schedule.map(item => { const [txt, cls] = statusMeta(item.status); return `
        <article class="schedule-card">
          <div class="schedule-top"><div><h3>${esc(item.job.title)}</h3><p>${esc(item.job.company)}</p></div><span class="status ${cls}">${txt}</span></div>
          <div class="schedule-meta"><span>Ngày nộp: ${esc(item.date)}</span><span>${esc(item.slot1)}</span><span>${esc(item.slot2)}</span></div>
          <div class="schedule-actions"><button class="btn btn-soft btn-sm" data-open-job="${item.jobId}">Xem tin</button><button class="btn btn-primary btn-sm">Nhắc tôi</button></div>
        </article>`; }).join('')}</div>
    </div>
  </div></section>`;
}

function renderMessages() {
  const messages = getMessages();
  const current = messages.find(m => m.id === state.currentChat) || messages[0];
  const side = state.role === 'employer' ? employerSidebar('messages') : candidateSidebar('messages');
  return `<section class="dashboard-page"><div class="container dashboard-grid">
    ${side}
    <div class="dashboard-content">
      <div class="dash-title"><span class="eyebrow">SUN CHAT</span><h1>Trò chuyện</h1><p>Khu vực liên hệ trực tiếp giữa ứng viên và nhà tuyển dụng.</p></div>
      <div class="chat-shell">
        <aside class="chat-list">
          <div class="chat-search">⌕ <input id="chat-search" placeholder="Tìm cuộc trò chuyện..." /></div>
          ${messages.map(m => `<button class="chat-person ${m.id===current.id?'active':''}" data-chat-id="${m.id}"><span class="avatar-md">${esc(m.avatar)}</span><div><b>${esc(m.person)}</b><span>${esc(m.last)}</span></div><small>${esc(m.time)}</small>${m.unread?`<i>${m.unread}</i>`:''}</button>`).join('')}
        </aside>
        <div class="chat-panel">
          <header><div class="chat-user"><span class="avatar-md">${esc(current.avatar)}</span><div><b>${esc(current.person)}</b><span><i class="online-dot"></i> Đang hoạt động</span></div></div><button class="icon-btn">⋮</button></header>
          <div class="chat-messages" id="chat-messages"><div class="date-sep">Hôm nay</div>${current.messages.map(x => `<div class="bubble-row ${x.from==='me'?'me':''}"><div class="bubble">${esc(x.text)}<small>${esc(x.time)}</small></div></div>`).join('')}</div>
          <form class="chat-compose" id="chat-form"><button type="button">＋</button><input id="chat-input" placeholder="Nhập tin nhắn..." autocomplete="off"/><button class="send-btn" type="submit">➤</button></form>
        </div>
      </div>
    </div>
  </div></section>`;
}

function renderProfile() {
  return `<section class="dashboard-page"><div class="container dashboard-grid">${candidateSidebar('profile')}
    <div class="dashboard-content"><div class="dash-title"><span class="eyebrow">PROFILE</span><h1>Hồ sơ cá nhân</h1><p>Thông tin sẽ đi kèm khi bạn ứng tuyển hoặc chia sẻ portfolio.</p></div>
      <div class="profile-card">
        <div class="profile-cover sun-cover"></div>
        <div class="profile-header"><div class="avatar-xl">NA</div><div><h2>Nguyễn Văn A</h2><p>Unity / Product Candidate</p></div><button class="btn btn-soft">Đổi ảnh</button></div>
        <div class="profile-form-grid">
          <div class="form-group"><label>Họ và tên</label><input value="Nguyễn Văn A"></div>
          <div class="form-group"><label>Email</label><input value="nguyenvana@gmail.com"></div>
          <div class="form-group"><label>Số điện thoại</label><input value="0901 234 567"></div>
          <div class="form-group"><label>Địa điểm</label><input value="Hà Nội"></div>
          <div class="form-group full"><label>Giới thiệu</label><textarea>Ứng viên có hứng thú với game, UI/UX và những sản phẩm có trải nghiệm rõ ràng, giàu cảm xúc.</textarea></div>
          <div class="form-group full"><label>Kỹ năng</label><input value="Unity, C#, Figma, Git, UI thinking"></div>
        </div>
        <div class="form-actions"><button class="btn btn-primary" id="save-profile">Lưu thay đổi</button></div>
      </div>
    </div></div></section>`;
}

function renderEmployerDashboard() {
  const candidates = getCandidates();
  const jobs = getJobs();
  const board = getTalentBoard();
  return `<section class="dashboard-page"><div class="container dashboard-grid">
    ${employerSidebar('employer-dashboard')}
    <div class="dashboard-content">
      <div class="welcome-card employer-welcome sun-welcome"><div><span class="eyebrow">EMPLOYER DASHBOARD</span><h1>SunByte Studio</h1><p>Không chỉ đăng tin, SunWork còn cho bạn gom ứng viên vào Talent Board và theo dõi lịch phỏng vấn.</p></div><button class="btn btn-primary" data-route="post-job">＋ Tạo chiến dịch</button></div>
      <div class="stats-grid">
        <div class="stat-card"><span class="stat-icon">▤</span><div><b>${jobs.length}</b><span>Tin đang chạy</span></div></div>
        <div class="stat-card"><span class="stat-icon">☀</span><div><b>${board.length}</b><span>Trong Talent Board</span></div></div>
        <div class="stat-card"><span class="stat-icon">◔</span><div><b>${candidates.filter(c => c.status === 'pending').length}</b><span>Chờ xử lý</span></div></div>
        <div class="stat-card"><span class="stat-icon">✓</span><div><b>${candidates.filter(c => c.status === 'accepted').length}</b><span>Đã mời phỏng vấn</span></div></div>
      </div>
      <div class="dashboard-split">
        <div class="dash-section table-card no-pad">
          <div class="section-head mini padded"><div><h2>Ứng viên nên chú ý</h2><p>Những hồ sơ điểm cao và đang phù hợp</p></div><button class="text-arrow" data-route="talent-board">Mở board →</button></div>
          <div class="candidate-mini-list">${candidates.slice(0,4).map(c => { const [t,cl]=statusMeta(c.status); return `<button data-open-candidate="${c.id}"><span class="avatar-md">${esc(c.avatar)}</span><div><b>${esc(c.name)}</b><span>${esc(c.title)} • ${esc(c.experience)}</span></div><span class="status ${cl}">${t}</span></button>`; }).join('')}</div>
        </div>
        <div class="analytics-card">
          <div class="section-head mini"><div><h2>Tuyển dụng tuần này</h2><p>Tốc độ xử lý hồ sơ</p></div></div>
          <div class="analytics-number"><b>63</b><span>lượt ứng tuyển</span><i>+22%</i></div>
          <div class="bar-chart"><span style="height:40%"></span><span style="height:70%"></span><span style="height:52%"></span><span style="height:85%"></span><span style="height:60%"></span><span style="height:91%"></span><span style="height:74%"></span></div>
          <div class="chart-labels"><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span><span>CN</span></div>
        </div>
      </div>
    </div>
  </div></section>`;
}

function renderPostJob() {
  return `<section class="dashboard-page"><div class="container dashboard-grid">${employerSidebar('post-job')}
    <div class="dashboard-content">
      <div class="dash-title"><span class="eyebrow">CREATE CAMPAIGN</span><h1>Tạo chiến dịch tuyển dụng</h1><p>Ngôn ngữ ở SunWork hơi khác: xem mỗi job như một campaign nhỏ dễ theo dõi.</p></div>
      <form class="post-job-form" id="post-job-form">
        <div class="form-card"><h3>Thông tin cơ bản</h3><div class="form-grid">
          <div class="form-group full"><label>Tên vị trí *</label><input name="title" placeholder="VD: Unity Gameplay Developer" required></div>
          <div class="form-group"><label>Địa điểm *</label><input name="location" placeholder="Hà Nội" required></div>
          <div class="form-group"><label>Mức lương *</label><input name="salary" placeholder="16 - 26 triệu" required></div>
          <div class="form-group"><label>Kinh nghiệm</label><select name="experience"><option>Fresher</option><option selected>1 - 2 năm</option><option>2 - 3 năm</option><option>Trên 3 năm</option></select></div>
          <div class="form-group"><label>Hình thức</label><select name="type"><option>Full-time</option><option>Part-time</option><option>Hybrid</option><option>Remote</option></select></div>
          <div class="form-group full"><label>Kỹ năng</label><input name="skills" placeholder="Unity, C#, Gameplay"></div>
        </div></div>
        <div class="form-card"><h3>Nội dung chiến dịch</h3>
          <div class="form-group"><label>Mô tả công việc</label><textarea name="description" placeholder="Mô tả nhiệm vụ chính..."></textarea></div>
          <div class="form-group"><label>Yêu cầu</label><textarea name="requirements" placeholder="Mỗi yêu cầu cách nhau bằng dấu chấm phẩy..."></textarea></div>
          <div class="form-group"><label>Quyền lợi</label><textarea name="benefits" placeholder="Mỗi quyền lợi cách nhau bằng dấu chấm phẩy..."></textarea></div>
        </div>
        <div class="form-actions sticky-actions"><button type="button" class="btn btn-ghost">Lưu nháp</button><button type="submit" class="btn btn-primary">Xuất bản chiến dịch</button></div>
      </form>
    </div>
  </div></section>`;
}

function renderManageJobs() {
  const jobs = getJobs();
  return `<section class="dashboard-page"><div class="container dashboard-grid">${employerSidebar('manage-jobs')}
    <div class="dashboard-content">
      <div class="dash-title row-title"><div><span class="eyebrow">CAMPAIGN MANAGEMENT</span><h1>Quản lý tin tuyển dụng</h1><p>Theo dõi các chiến dịch đang mở và lượt ứng tuyển.</p></div><button class="btn btn-primary" data-route="post-job">＋ Tạo chiến dịch</button></div>
      <div class="table-card"><div class="table-toolbar"><div class="search-small">⌕ <input placeholder="Tìm chiến dịch..."></div><select><option>Tất cả trạng thái</option><option>Đang chạy</option><option>Đã đóng</option></select></div>
      <div class="responsive-table"><table><thead><tr><th>Vị trí</th><th>Ứng viên</th><th>Đăng lúc</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>
      ${jobs.map(j => `<tr><td><div><b>${esc(j.title)}</b><span class="cell-sub">${esc(j.location)} • ${esc(j.salary)}</span></div></td><td><b>${j.applicants}</b> hồ sơ</td><td>${esc(j.posted)}</td><td><span class="status success">Đang chạy</span></td><td><div class="action-row"><button class="icon-btn" data-route="talent-board" title="Talent board">☀</button><button class="icon-btn" data-open-job="${j.id}" title="Xem tin">→</button><button class="icon-btn danger-ghost" data-close-job="${j.id}" title="Đóng tin">×</button></div></td></tr>`).join('')}
      </tbody></table></div></div>
    </div></div></section>`;
}

function renderTalentBoard() {
  const candidates = getCandidates().filter(c => {
    const q = state.candidateQuery.toLowerCase();
    return !q || `${c.name} ${c.title} ${c.skills.join(' ')} ${c.location}`.toLowerCase().includes(q);
  });
  const board = getTalentBoard();
  const boardCandidates = candidates.filter(c => board.includes(c.id));
  return `<section class="dashboard-page"><div class="container dashboard-grid">${employerSidebar('talent-board')}
    <div class="dashboard-content">
      <div class="dash-title"><span class="eyebrow">TALENT BOARD</span><h1>Bảng ứng viên nổi bật</h1><p>Khác với MoonWork, SunWork có một board để gom các hồ sơ đáng chú ý trước khi ra quyết định.</p></div>
      <div class="applicant-toolbar"><div class="search-small large">⌕ <input id="candidate-search" value="${esc(state.candidateQuery)}" placeholder="Tìm theo tên, vị trí hoặc kỹ năng..."></div><select><option>Tất cả vị trí</option><option>Unity Gameplay Developer</option><option>UI / UX Designer</option><option>Frontend Developer</option></select></div>
      <div class="talent-board-banner"><b>${boardCandidates.length}</b><span>ứng viên đang có trong board</span></div>
      <div class="candidate-grid">${candidates.map(c => candidateCard(c, true)).join('')}</div>
    </div></div></section>`;
}

function renderInterviewBoard() {
  const candidates = getCandidates().filter(c => c.status !== 'rejected');
  return `<section class="dashboard-page"><div class="container dashboard-grid">${employerSidebar('interview-board')}
    <div class="dashboard-content">
      <div class="dash-title"><span class="eyebrow">INTERVIEW BOARD</span><h1>Lịch phỏng vấn</h1><p>Khu vực theo dõi buổi hẹn với ứng viên, giúp trải nghiệm nhà tuyển dụng khác với web trước.</p></div>
      <div class="schedule-grid">${candidates.map((c, idx) => `
        <article class="schedule-card recruiter">
          <div class="schedule-top"><div><h3>${esc(c.name)}</h3><p>${esc(c.title)}</p></div><span class="status ${c.status === 'accepted' ? 'success' : 'warning'}">${c.status === 'accepted' ? 'Đã chốt lịch' : 'Chờ xác nhận'}</span></div>
          <div class="schedule-meta"><span>Job: ${esc((getJobs().find(j => j.id === c.appliedJobId) || {}).title || 'Talent Board')}</span><span>${idx % 2 === 0 ? 'Thứ 4 • 14:00' : 'Thứ 5 • 10:30'}</span><span>${idx % 2 === 0 ? 'Online Meet' : 'Tại văn phòng'}</span></div>
          <div class="schedule-actions"><button class="btn btn-soft btn-sm" data-open-candidate="${c.id}">Xem hồ sơ</button><button class="btn btn-primary btn-sm">Gửi nhắc lịch</button></div>
        </article>`).join('')}</div>
    </div></div></section>`;
}

function renderCompanyProfile() {
  return `<section class="dashboard-page"><div class="container dashboard-grid">${employerSidebar('company-profile')}
    <div class="dashboard-content"><div class="dash-title"><span class="eyebrow">COMPANY PROFILE</span><h1>Thông tin công ty</h1><p>Thông tin hiển thị trên chiến dịch tuyển dụng của SunWork.</p></div>
      <div class="profile-card">
        <div class="company-profile-cover sun-company-cover"><div class="company-logo-xl">SB</div></div>
        <div class="profile-form-grid">
          <div class="form-group full"><label>Tên công ty</label><input value="SunByte Studio"></div>
          <div class="form-group"><label>Email</label><input value="hello@sunbyte.demo"></div>
          <div class="form-group"><label>Số điện thoại</label><input value="024 3888 6868"></div>
          <div class="form-group"><label>Website</label><input value="sunbyte.demo"></div>
          <div class="form-group"><label>Quy mô</label><select><option>30 - 80 nhân sự</option></select></div>
          <div class="form-group full"><label>Địa chỉ</label><input value="Cầu Giấy, Hà Nội"></div>
          <div class="form-group full"><label>Giới thiệu</label><textarea>SunByte Studio xây dựng game và sản phẩm số với tinh thần sáng tạo, ấm áp và định hướng trải nghiệm người dùng.</textarea></div>
        </div>
        <div class="form-actions"><button class="btn btn-primary" id="save-company">Lưu thay đổi</button></div>
      </div>
    </div></div></section>`;
}

function showJob(jobId) {
  const job = getJobs().find(j => j.id === Number(jobId));
  if (!job) return;
  const saved = getSavedJobs().includes(job.id);
  document.getElementById('job-modal-content').innerHTML = `
    <button class="modal-close" data-close-modal="job-modal">×</button>
    <div class="job-detail-header"><div class="job-detail-top"><div class="job-logo xl">${esc(job.logo)}</div><div><span class="eyebrow">SUN OPPORTUNITY</span><h2>${esc(job.title)}</h2><p>${esc(job.company)}</p></div></div><span class="status success">Đang mở</span></div>
    <div class="detail-meta-grid"><div><b>Mức lương</b><span>${esc(job.salary)}</span></div><div><b>Địa điểm</b><span>${esc(job.location)}</span></div><div><b>Hình thức</b><span>${esc(job.type)}</span></div><div><b>Kinh nghiệm</b><span>${esc(job.experience)}</span></div></div>
    <div class="job-detail-body"><div class="detail-main">
      <section><h3>Mô tả công việc</h3><p>${esc(job.description)}</p></section>
      <section><h3>Kỹ năng</h3><div class="tag-row">${job.skills.map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div></section>
      <section><h3>Yêu cầu</h3><ul>${job.requirements.map(r => `<li>${esc(r)}</li>`).join('')}</ul></section>
      <section><h3>Quyền lợi</h3><ul>${job.benefits.map(r => `<li>${esc(r)}</li>`).join('')}</ul></section>
      <section><h3>Về công ty</h3><p>${esc(job.companyDesc)}</p></section>
    </div>
    <aside class="detail-side"><div class="application-box"><span class="status success">HOT MATCH</span><h3>Độ phù hợp</h3><b>Rất tiềm năng</b><p>Hãy lưu việc hoặc ứng tuyển ngay nếu bạn thấy phù hợp.</p><div class="detail-actions-stack"><button class="btn btn-primary btn-full" data-apply-job="${job.id}">Ứng tuyển ngay</button><button class="btn btn-soft btn-full" data-save-job="${job.id}">${saved ? '♥ Đã lưu việc' : '♡ Lưu việc'}</button></div></div></aside></div>`;
  openModal('job-modal');
  bindDynamicEvents();
}

function showCandidate(id) {
  const c = getCandidates().find(x => x.id === Number(id));
  if (!c) return;
  const job = getJobs().find(j => j.id === c.appliedJobId);
  const [txt, cls] = statusMeta(c.status);
  const inBoard = getTalentBoard().includes(c.id);
  document.getElementById('candidate-modal-content').innerHTML = `
    <button class="modal-close" data-close-modal="candidate-modal">×</button>
    <div class="candidate-detail-header"><div class="avatar-xl">${esc(c.avatar)}</div><div><span class="eyebrow">CANDIDATE DETAIL</span><h2>${esc(c.name)}</h2><p>${esc(c.title)} • ${esc(c.location)}</p></div><span class="match-pill">${c.score}% phù hợp</span></div>
    <div class="job-detail-body"><div class="detail-main">
      <section><h3>Giới thiệu</h3><p>${esc(c.about)}</p></section>
      <section><h3>Thông tin liên hệ</h3><div class="detail-meta-grid compact"><div><b>Email</b><span>${esc(c.email)}</span></div><div><b>Số điện thoại</b><span>${esc(c.phone)}</span></div><div><b>Kinh nghiệm</b><span>${esc(c.experience)}</span></div><div><b>Học vấn</b><span>${esc(c.education)}</span></div></div></section>
      <section><h3>Kỹ năng</h3><div class="tag-row">${c.skills.map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div></section>
    </div>
    <aside class="detail-side"><div class="application-box"><span class="status ${cls}">${txt}</span><h3>Ứng tuyển vị trí</h3><b>${esc(job?.title || 'Tin tuyển dụng')}</b><p>Ngày nộp: ${esc(c.appliedAt)}</p><button class="btn btn-soft btn-full" data-toggle-talent="${c.id}">${inBoard ? '☀ Đã có trong board' : '☀ Thêm vào board'}</button></div>
      <div class="decision-actions"><button class="btn btn-danger-soft" data-reject-candidate="${c.id}">✕ Từ chối</button><button class="btn btn-primary" data-accept-candidate="${c.id}">✓ Mời phỏng vấn</button></div>
      <button class="btn btn-dark btn-full" data-message-candidate="${c.id}">✉ Nhắn tin</button></aside></div>`;
  openModal('candidate-modal');
  bindDynamicEvents();
}

function showApply(jobId) {
  const job = getJobs().find(j => j.id === Number(jobId));
  if (!job) return;
  if (!state.loggedIn || state.role !== 'candidate') {
    closeModal('job-modal');
    state.selectedRole = 'candidate';
    openAuth('login');
    return;
  }
  document.getElementById('apply-modal-content').innerHTML = `
    <button class="modal-close" data-close-modal="apply-modal">×</button>
    <div class="modal-header-simple"><span class="eyebrow">SUN APPLY</span><h2>Ứng tuyển ${esc(job.title)}</h2><p>${esc(job.company)}</p></div>
    <form id="apply-form">
      <div class="form-group"><label>Portfolio sử dụng</label><label class="cv-select-card"><input type="radio" checked name="cv"><span class="file-icon">PDF</span><div><b>Portfolio - NguyenVanA.pdf</b><small>Cập nhật hôm nay</small></div><i>✓</i></label></div>
      <div class="form-grid"><div class="form-group"><label>Họ tên</label><input value="Nguyễn Văn A"></div><div class="form-group"><label>Số điện thoại</label><input value="0901 234 567"></div></div>
      <div class="form-group"><label>Email</label><input value="nguyenvana@gmail.com"></div>
      <div class="form-group"><label>Ghi chú ngắn</label><textarea placeholder="Viết vài dòng giới thiệu ngắn với nhà tuyển dụng...">Em quan tâm đến vị trí này và mong có cơ hội trao đổi thêm về dự án cũng như kỹ năng của mình.</textarea></div>
      <button class="btn btn-primary btn-full" type="submit">Gửi hồ sơ ứng tuyển</button>
    </form>`;
  closeModal('job-modal');
  openModal('apply-modal');
  document.getElementById('apply-form').onsubmit = e => {
    e.preventDefault();
    const apps = getApplications();
    if (!apps.some(a => a.jobId === job.id)) apps.unshift({id: Date.now(), jobId: job.id, candidateName: 'Nguyễn Văn A', date: '31/08/2026', status: 'pending'});
    setApplications(apps);
    closeModal('apply-modal');
    toast('Ứng tuyển thành công! Hồ sơ đã được gửi.');
  };
}

function toggleSaveJob(id) {
  const num = Number(id);
  const saved = getSavedJobs();
  const next = saved.includes(num) ? saved.filter(x => x !== num) : [num, ...saved];
  setSavedJobs(next);
  toast(saved.includes(num) ? 'Đã bỏ lưu công việc.' : 'Đã lưu công việc.', 'info');
  render();
}

function toggleTalent(id) {
  const num = Number(id);
  const board = getTalentBoard();
  const next = board.includes(num) ? board.filter(x => x !== num) : [num, ...board];
  setTalentBoard(next);
  toast(board.includes(num) ? 'Đã xóa khỏi Talent Board.' : 'Đã thêm vào Talent Board.');
  if (document.getElementById('candidate-modal')?.classList.contains('show')) showCandidate(num);
  render();
}

function updateCandidateStatus(id, status) {
  const cands = getCandidates();
  const idx = cands.findIndex(c => c.id === Number(id));
  if (idx < 0) return;
  cands[idx].status = status;
  setCandidates(cands);
  closeModal('candidate-modal');
  toast(status === 'accepted' ? 'Đã mời phỏng vấn ứng viên.' : 'Đã từ chối ứng viên.', status === 'accepted' ? 'success' : 'danger');
  render();
}

function initCVPreview() {
  const update = () => {
    document.querySelectorAll('.cv-input').forEach(input => {
      const key = input.dataset.cv;
      const target = document.querySelector(`[data-preview="${key}"]`);
      if (!target) return;
      if (key === 'skills') target.innerHTML = input.value.split(',').filter(Boolean).map(s => `<span>${esc(s.trim())}</span>`).join('');
      else target.textContent = input.value;
    });
  };
  document.querySelectorAll('.cv-input').forEach(i => i.addEventListener('input', update));
  update();
}

function bindDynamicEvents() {
  document.querySelectorAll('[data-route]').forEach(el => el.onclick = (e) => { e.preventDefault(); setRoute(el.dataset.route); });
  document.querySelectorAll('[data-open-job]').forEach(el => el.onclick = (e) => { e.stopPropagation(); showJob(el.dataset.openJob); });
  document.querySelectorAll('[data-open-candidate]').forEach(el => el.onclick = () => showCandidate(el.dataset.openCandidate));
  document.querySelectorAll('[data-close-modal]').forEach(el => el.onclick = () => closeModal(el.dataset.closeModal));
  document.querySelectorAll('[data-apply-job]').forEach(el => el.onclick = () => showApply(el.dataset.applyJob));
  document.querySelectorAll('[data-accept-candidate]').forEach(el => el.onclick = () => updateCandidateStatus(el.dataset.acceptCandidate, 'accepted'));
  document.querySelectorAll('[data-reject-candidate]').forEach(el => el.onclick = () => updateCandidateStatus(el.dataset.rejectCandidate, 'rejected'));
  document.querySelectorAll('[data-message-candidate]').forEach(el => el.onclick = () => { closeModal('candidate-modal'); state.currentChat = 1; setRoute('messages'); });
  document.querySelectorAll('[data-search-key]').forEach(el => el.onclick = () => { state.jobQuery = el.dataset.searchKey; setRoute('jobs'); });
  document.querySelectorAll('[data-chat-id]').forEach(el => el.onclick = () => { state.currentChat = Number(el.dataset.chatId); render(); });
  document.querySelectorAll('[data-company]').forEach(el => el.onclick = () => { state.jobQuery = el.dataset.company; setRoute('jobs'); });
  document.querySelectorAll('[data-close-job]').forEach(el => el.onclick = () => toast('Tin đã được chuyển sang trạng thái tạm đóng.', 'info'));
  document.querySelectorAll('[data-save-job]').forEach(el => el.onclick = (e) => { e.stopPropagation(); toggleSaveJob(el.dataset.saveJob); });
  document.querySelectorAll('[data-toggle-talent]').forEach(el => el.onclick = (e) => { e.stopPropagation(); toggleTalent(el.dataset.toggleTalent); });

  const homeBtn = document.getElementById('home-search-btn');
  if (homeBtn) homeBtn.onclick = () => { state.jobQuery = document.getElementById('home-job-query').value.trim(); state.locationQuery = document.getElementById('home-location-query').value.trim(); setRoute('jobs'); };
  const jobsBtn = document.getElementById('jobs-search-btn');
  if (jobsBtn) jobsBtn.onclick = () => { state.jobQuery = document.getElementById('jobs-query').value.trim(); state.locationQuery = document.getElementById('jobs-location').value.trim(); render(); };
  const clear = document.getElementById('clear-filter');
  if (clear) clear.onclick = () => { state.jobQuery = ''; state.locationQuery = ''; render(); };

  const candSearch = document.getElementById('candidate-search');
  if (candSearch) candSearch.oninput = () => { state.candidateQuery = candSearch.value; setTimeout(() => { if (document.activeElement === candSearch) { const pos = candSearch.selectionStart; render(); const n = document.getElementById('candidate-search'); if (n) { n.focus(); n.setSelectionRange(pos, pos); } } }, 120); };

  const postForm = document.getElementById('post-job-form');
  if (postForm) postForm.onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(postForm); const jobs = getJobs();
    const req = (fd.get('requirements') || '').split(';').map(x => x.trim()).filter(Boolean);
    const ben = (fd.get('benefits') || '').split(';').map(x => x.trim()).filter(Boolean);
    const skills = (fd.get('skills') || '').split(',').map(x => x.trim()).filter(Boolean);
    jobs.unshift({
      id: Date.now(), title: fd.get('title'), company: 'SunByte Studio', logo: 'SB', location: fd.get('location'),
      salary: fd.get('salary'), type: fd.get('type'), experience: fd.get('experience'), category: 'Tuyển dụng mới',
      skills: skills.length ? skills : ['Kỹ năng mới'], hot: true, applicants: 0, posted: 'Vừa xong',
      description: fd.get('description') || 'Mô tả công việc đang được cập nhật.',
      requirements: req.length ? req : ['Trao đổi khi phỏng vấn'], benefits: ben.length ? ben : ['Thỏa thuận theo năng lực'],
      companyDesc: 'SunByte Studio xây dựng sản phẩm game và sản phẩm số với tinh thần sáng tạo.'
    });
    setJobs(jobs); toast('Tạo chiến dịch tuyển dụng thành công!'); setRoute('manage-jobs');
  };

  const chatForm = document.getElementById('chat-form');
  if (chatForm) chatForm.onsubmit = e => {
    e.preventDefault(); const input = document.getElementById('chat-input'); const text = input.value.trim(); if (!text) return;
    const msgs = getMessages(); const conv = msgs.find(m => m.id === state.currentChat);
    if (conv) { conv.messages.push({from: 'me', text, time: '23:24'}); conv.last = text; conv.time = 'Vừa xong'; conv.unread = 0; setMessages(msgs); }
    render();
  };

  const saveCv = document.getElementById('save-cv'); if (saveCv) saveCv.onclick = () => toast('Đã lưu portfolio vào trình duyệt.');
  const resetCv = document.getElementById('reset-cv'); if (resetCv) resetCv.onclick = () => toast('Đã làm mới nội dung demo.', 'info');
  const saveProfile = document.getElementById('save-profile'); if (saveProfile) saveProfile.onclick = () => toast('Đã lưu hồ sơ cá nhân.');
  const saveCompany = document.getElementById('save-company'); if (saveCompany) saveCompany.onclick = () => toast('Đã lưu thông tin công ty.');
}

function render() {
  updateNavigation();
  const map = {
    home: renderHome,
    jobs: renderJobs,
    'skill-lab': renderSkillLab,
    portfolio: renderPortfolio,
    'candidate-dashboard': renderCandidateDashboard,
    'saved-jobs': renderSavedJobs,
    'interview-plan': renderInterviewPlan,
    messages: renderMessages,
    profile: renderProfile,
    'employer-dashboard': renderEmployerDashboard,
    'post-job': renderPostJob,
    'manage-jobs': renderManageJobs,
    'talent-board': renderTalentBoard,
    'interview-board': renderInterviewBoard,
    'company-profile': renderCompanyProfile
  };
  app.innerHTML = (map[state.route] || renderHome)();
  bindDynamicEvents();
  if (state.route === 'portfolio') initCVPreview();
  if (state.route === 'messages') setTimeout(scrollChatBottom, 0);
}

function scrollChatBottom() {
  const box = document.getElementById('chat-messages'); if (box) box.scrollTop = box.scrollHeight;
}

document.addEventListener('click', e => {
  if (e.target.id === 'open-login') openAuth('login');
  if (e.target.id === 'open-register') openAuth('register');
  if (e.target.id === 'logout-btn') {
    state.loggedIn = false; state.role = null;
    localStorage.removeItem('sunwork_logged_in'); localStorage.removeItem('sunwork_role');
    toast('Đã đăng xuất.', 'info'); setRoute('home');
  }
});

document.querySelectorAll('.modal-overlay').forEach(m => m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); }));
document.getElementById('mobile-menu-btn').onclick = () => document.getElementById('main-nav').classList.toggle('open');
document.querySelectorAll('.auth-tab').forEach(b => b.onclick = () => openAuth(b.dataset.authMode));
document.querySelectorAll('.role-card').forEach(b => b.onclick = () => {
  state.selectedRole = b.dataset.role;
  document.querySelectorAll('.role-card').forEach(x => x.classList.toggle('active', x === b));
});
document.getElementById("auth-form").onsubmit = e => {
  e.preventDefault();

  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value.trim();
  const nameInput = document.getElementById("auth-name");
  const name = nameInput ? nameInput.value.trim() : "Demo User";

  let users = getUsers();

  if (state.authMode === "register") {
    if (!email || !password || !name) {
      toast("Vui lòng nhập đầy đủ thông tin.", "danger");
      return;
    }

    if (users.some(u => u.email === email)) {
      toast("Email đã tồn tại.", "danger");
      return;
    }

    const user = {
      id: Date.now(),
      name,
      email,
      password,
      role: state.selectedRole,
      createdAt: new Date().toISOString(),
      profile: {
        phone:"",
        address:"",
        bio:"",
        skills:[]
      }
    };

    users.push(user);
    setUsers(users);
    setCurrentUser(user);

    state.loggedIn = true;
    state.role = user.role;

  } else {
    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      toast("Sai email hoặc mật khẩu.", "danger");
      return;
    }

    state.loggedIn = true;
    state.role = user.role;
    setCurrentUser(user);
  }

  localStorage.setItem("sunwork_logged_in","true");
  localStorage.setItem("sunwork_role",state.role);

  closeModal("auth-modal");
  toast("Đăng nhập thành công!");

  setRoute(
    state.role === "candidate"
      ? "candidate-dashboard"
      : "employer-dashboard"
  );
};

render();
