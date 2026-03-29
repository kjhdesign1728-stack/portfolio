// ─────────────────────────────────────
//  State
// ─────────────────────────────────────
let allProjects = [];
let currentCat = 'all';
let currentView = 'grid';

// ─────────────────────────────────────
//  Init
// ─────────────────────────────────────
function init() {
  const data = PORTFOLIO_DATA;
  allProjects = data.projects.filter(p => p.visible);

  // Profile
  const { name, title, bio, email } = data.profile;
  document.title = name + ' — 포트폴리오';
  document.getElementById('header-name').textContent = name;
  document.getElementById('header-title').textContent = title;
  document.getElementById('footer-name').textContent = name;
  document.getElementById('footer-bio').textContent = bio;
  document.getElementById('footer-contact').innerHTML =
    email ? `<a href="mailto:${email}">${email}</a>` : '';
  document.getElementById('contact-link').href = email ? `mailto:${email}` : '#';

  // Theme
  const saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);

  // Render
  render();
  bindEvents();
}

// ─────────────────────────────────────
//  Render
// ─────────────────────────────────────
function filtered() {
  if (currentCat === 'all') return allProjects;
  return allProjects.filter(p => p.categories.includes(currentCat));
}

function render() {
  const items = filtered();
  if (currentView === 'grid') renderGrid(items);
  else renderList(items);
}

function renderGrid(items) {
  const el = document.getElementById('grid-view');
  el.style.display = 'grid';
  document.getElementById('list-view').style.display = 'none';

  el.innerHTML = items.map(p => `
    <div class="grid-item" onclick="goProject('${p.id}')">
      <div class="grid-item-img${p.thumbnail ? '' : ' no-img'}">
        ${p.thumbnail
          ? `<img src="${p.thumbnail}" alt="${p.title}" loading="lazy" onerror="this.parentElement.classList.add('no-img');this.remove()">`
          : '<span>NO IMAGE</span>'}
      </div>
      <div class="grid-item-info">
        <div class="grid-item-title">${p.title}</div>
        <div class="grid-item-meta">
          <span class="grid-item-cats">${p.categories.map(c => `<span>${c}</span>`).join('')}</span>
          <span>${p.date}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderList(items) {
  document.getElementById('grid-view').style.display = 'none';
  const el = document.getElementById('list-view');
  el.style.display = 'block';

  el.innerHTML = `
    <div class="list-header">
      <span>프로젝트</span>
      <span>설명</span>
      <span>카테고리</span>
      <span style="text-align:right">날짜</span>
    </div>
  ` + items.map(p => `
    <div class="list-item"
         onclick="goProject('${p.id}')"
         data-thumb="${p.thumbnail || ''}">
      <span class="list-item-title">${p.title}</span>
      <span class="list-item-subtitle">${p.subtitle || ''}</span>
      <span class="list-item-cats">${p.categories.map(c => `<span>${c}</span>`).join('')}</span>
      <span class="list-item-date">${p.date}</span>
    </div>
  `).join('');

  bindListHover();
}

// ─────────────────────────────────────
//  List hover preview
// ─────────────────────────────────────
function bindListHover() {
  const preview = document.getElementById('list-preview');
  const previewImg = document.getElementById('preview-img');

  document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const thumb = item.dataset.thumb;
      if (!thumb) return;
      previewImg.src = thumb;
      preview.classList.add('visible');
    });
    item.addEventListener('mousemove', e => {
      preview.style.left = (e.clientX + 20) + 'px';
      preview.style.top = Math.min(e.clientY - 60, window.innerHeight - 200) + 'px';
    });
    item.addEventListener('mouseleave', () => {
      preview.classList.remove('visible');
    });
  });
}

// ─────────────────────────────────────
//  Navigation
// ─────────────────────────────────────
function goProject(id) {
  window.location.href = `project.html?id=${id}`;
}

// ─────────────────────────────────────
//  Events
// ─────────────────────────────────────
function bindEvents() {
  document.querySelectorAll('#view-toggle .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#view-toggle .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.dataset.view;
      render();
    });
  });

  document.querySelectorAll('#cat-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#cat-filter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      render();
    });
  });

  document.getElementById('btn-light').addEventListener('click', () => setTheme('light'));
  document.getElementById('btn-dark').addEventListener('click', () => setTheme('dark'));
}

// ─────────────────────────────────────
//  Theme
// ─────────────────────────────────────
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.getElementById('btn-light').classList.toggle('active', theme === 'light');
  document.getElementById('btn-dark').classList.toggle('active', theme === 'dark');
}

// ─────────────────────────────────────
//  Start
// ─────────────────────────────────────
init();
