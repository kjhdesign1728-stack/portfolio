function init() {
  const data = PORTFOLIO_DATA;
  const projects = data.projects.filter(p => p.visible);
  const { name, title, bio, email } = data.profile;

  document.getElementById('header-name').textContent = name;
  document.getElementById('header-title').textContent = title;
  document.getElementById('footer-name').textContent = name;
  document.getElementById('footer-bio').textContent = bio;
  document.getElementById('footer-contact').innerHTML =
    email ? `<a href="mailto:${email}">${email}</a>` : '';
  document.getElementById('contact-link').href = email ? `mailto:${email}` : '#';

  const saved = localStorage.getItem('theme') || 'dark';
  setTheme(saved);
  document.getElementById('btn-light').addEventListener('click', () => setTheme('light'));
  document.getElementById('btn-dark').addEventListener('click', () => setTheme('dark'));

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const idx = projects.findIndex(p => p.id === id);

  if (idx === -1) { window.location.href = 'index.html'; return; }

  const p = projects[idx];
  const prev = projects[idx - 1] || null;
  const next = projects[idx + 1] || null;

  document.title = p.title + ' — ' + name;

  // ── 섹션 HTML 생성
  function renderSections(sections) {
    if (!sections || !sections.length) return '';
    return sections.map(s => {
      if (s.type === 'full') {
        return `
          <div class="pf-section pf-section--full">
            ${s.label ? `<p class="pf-label">${s.label}</p>` : ''}
            <div class="pf-img-wrap">
              <img src="${s.image}" alt="${s.label || p.title}" loading="lazy">
            </div>
          </div>`;
      }
      if (s.type === 'double') {
        return `
          <div class="pf-section pf-section--double">
            ${s.label ? `<p class="pf-label">${s.label}</p>` : ''}
            <div class="pf-double-wrap">
              ${s.images.map(img => `
                <div class="pf-img-wrap">
                  <img src="${img}" alt="${s.label || p.title}" loading="lazy">
                </div>`).join('')}
            </div>
          </div>`;
      }
      return '';
    }).join('');
  }

  document.getElementById('project-content').innerHTML = `
    ${p.cover ? `
    <div class="pf-cover">
      <img src="${p.cover}" alt="${p.title}">
      <div class="pf-cover-overlay">
        <p class="pf-cover-cat">${p.categories.join(' / ')}</p>
        <h1 class="pf-cover-title">${p.title}</h1>
      </div>
    </div>` : ''}

    <div class="pf-info">
      <div class="pf-info-text">
        <p class="pf-section-label">Overview</p>
        <p class="pf-overview">${p.overview || ''}</p>
      </div>
      <dl class="pf-meta">
        <dt>Client</dt><dd>${p.client || '—'}</dd>
        <dt>Role</dt><dd>${p.role || '—'}</dd>
        <dt>Year</dt><dd>${p.year || p.date || '—'}</dd>
      </dl>
    </div>

    ${p.sections ? renderSections(p.sections) : `
      <div class="pf-section pf-section--full">
        <div class="pf-img-wrap">
          ${p.images && p.images.length
            ? p.images.map(img => `<img src="${img}" alt="${p.title}" loading="lazy">`).join('')
            : '<p style="color:var(--text-muted);font-size:11px;text-align:center;padding:60px 0">이미지를 추가해주세요</p>'}
        </div>
      </div>`}

    <div class="pf-nav">
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
