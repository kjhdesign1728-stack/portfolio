function init() {
  const data = PORTFOLIO_DATA;
  const projects = data.projects.filter(p => p.visible);
  const { name, title, bio, email } = data.profile;

  // Header/footer
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
  document.getElementById('btn-light').addEventListener('click', () => setTheme('light'));
  document.getElementById('btn-dark').addEventListener('click', () => setTheme('dark'));

  // Get project id from URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const idx = projects.findIndex(p => p.id === id);

  if (idx === -1) {
    window.location.href = 'index.html';
    return;
  }

  const p = projects[idx];
  const prev = projects[idx - 1] || null;
  const next = projects[idx + 1] || null;

  document.title = p.title + ' — ' + name;

  document.getElementById('project-content').innerHTML = `
    <div class="project-header">
      <div class="project-header-meta">
        <span>${p.categories.map(c => `[${c}]`).join(' ')}</span>
        <span>${p.date}</span>
      </div>
      <h1>${p.title}</h1>
      ${p.subtitle ? `<p class="subtitle">${p.subtitle}</p>` : ''}
    </div>

    <div class="project-overview">
      <div class="project-overview-text">${p.overview || ''}</div>
      <dl class="project-overview-side">
        <dt>역할</dt>
        <dd>${p.role || '—'}</dd>
        <dt>카테고리</dt>
        <dd>${p.categories.join(', ')}</dd>
        <dt>연도</dt>
        <dd>${p.date}</dd>
      </dl>
    </div>

    <div class="project-images">
      ${p.images && p.images.length
        ? p.images.map(img => `<img src="${img}" alt="${p.title}" loading="lazy">`).join('')
        : '<p style="color:var(--text-muted);font-size:11px;text-align:center;padding:60px 0">이미지를 추가해주세요</p>'}
    </div>

    <div class="project-nav">
      <div>${prev ? `<a href="project.html?id=${prev.id}">← ${prev.title}</a>` : '<span style="opacity:0.3">←</span>'}</div>
      <a href="index.html">INDEX</a>
      <div>${next ? `<a href="project.html?id=${next.id}">${next.title} →</a>` : '<span style="opacity:0.3">→</span>'}</div>
    </div>
  `;
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.getElementById('btn-light').classList.toggle('active', theme === 'light');
  document.getElementById('btn-dark').classList.toggle('active', theme === 'dark');
}

init();
