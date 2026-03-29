function init() {
  const data = PORTFOLIO_DATA;
  const projects = data.projects.filter(p => p.visible);
  const { name, title, bio, email } = data.profile;

  document.getElementById('header-name').textContent = name;
  document.getElementById('header-title').textContent = title;
  document.getElementById('footer-name').textContent = name;
  document.getElementById('footer-bio').textContent = bio;
  document.getElementById('footer-contact').innerHTML = email ? `<a href="mailto:${email}">${email}</a>` : '';
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

  function renderSections(sections) {
    if (!sections || !sections.length) return '';
    return sections.map(s => {
      // 풀와이드 단일 이미지
      if (s.type === 'full') {
        return `
        <div class="pf-section pf-section--full">
          ${s.label ? `<div class="pf-section-header"><span class="pf-tag">${s.label}</span></div>` : ''}
          <div class="pf-img-full">
            <img src="${s.image}" alt="${s.label || p.title}" loading="lazy">
          </div>
        </div>`;
      }
      // 다크 배경 + 모바일 나란히
      if (s.type === 'double') {
        return `
        <div class="pf-section pf-section--dark">
          ${s.label ? `<div class="pf-section-header pf-section-header--dark"><span class="pf-tag pf-tag--light">${s.label}</span></div>` : ''}
          <div class="pf-double-grid">
            ${s.images.map(img => `<div class="pf-double-item"><img src="${img}" alt="${s.label || p.title}" loading="lazy"></div>`).join('')}
          </div>
        </div>`;
      }
      // 텍스트 섹션
      if (s.type === 'text') {
        return `
        <div class="pf-section pf-section--text">
          <p class="pf-section-tag">${s.label || ''}</p>
          <p class="pf-text-body">${s.content || ''}</p>
        </div>`;
      }
      return '';
    }).join('');
  }

  document.getElementById('project-content').innerHTML = `

    <!-- ── 커버: 타이포그래피 중심 (Behance 스타일) ── -->
    <div class="pf-cover-typo">
      <div class="pf-cover-typo-inner">
        <p class="pf-cover-eyebrow">${p.categories.join(' &nbsp;/&nbsp; ')} &nbsp;—&nbsp; ${p.year || p.date}</p>
        <h1 class="pf-cover-headline">${p.title}</h1>
        <p class="pf-cover-sub">${p.subtitle || ''}</p>
      </div>
      ${p.cover ? `<div class="pf-cover-img"><img src="${p.cover}" alt="${p.title}"></div>` : ''}
    </div>

    <!-- ── 프로젝트 오버뷰 ── -->
    <div class="pf-overview-block">
      <div class="pf-overview-left">
        <p class="pf-tag">Overview</p>
        <p class="pf-overview-text">${p.overview || ''}</p>
      </div>
      <div class="pf-overview-right">
        <dl class="pf-meta-list">
          <div class="pf-meta-row"><dt>Client</dt><dd>${p.client || '—'}</dd></div>
          <div class="pf-meta-row"><dt>Role</dt><dd>${p.role || '—'}</dd></div>
          <div class="pf-meta-row"><dt>Year</dt><dd>${p.year || p.date || '—'}</dd></div>
        </dl>
      </div>
    </div>

    <!-- ── 이미지 섹션들 ── -->
    ${p.sections ? renderSections(p.sections) : `
      <div class="pf-section pf-section--full">
        <div class="pf-img-full">
          ${p.images && p.images.length
            ? p.images.map(img => `<img src="${img}" alt="${p.title}" loading="lazy">`).join('')
            : '<p class="pf-empty">이미지를 추가해주세요</p>'}
        </div>
      </div>`}

    <!-- ── 하단 네비게이션 ── -->
    <div class="pf-bottom-nav">
      <div class="pf-bottom-nav-item">${prev ? `<a href="project.html?id=${prev.id}"><span>←</span>${prev.title}</a>` : ''}</div>
      <a href="index.html" class="pf-bottom-nav-index">INDEX</a>
      <div class="pf-bottom-nav-item pf-bottom-nav-item--right">${next ? `<a href="project.html?id=${next.id}">${next.title}<span>→</span></a>` : ''}</div>
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
