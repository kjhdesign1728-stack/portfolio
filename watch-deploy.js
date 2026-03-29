const fs = require('fs');
const { execSync } = require('child_process');

const PROJECT_DIR = __dirname;
const GIT = '/usr/bin/git';
const IGNORE = ['.DS_Store', 'watch-deploy.js', '.git', '.planning'];
const MAX_RETRIES = 3;
const RETRY_DELAY = 10000;

let deployTimer = null;

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString('ko-KR')}] ${msg}`);
}

function shouldIgnore(filePath) {
  return IGNORE.some(name => filePath.includes(name));
}

function deploy(attempt = 1) {
  log(`배포 시작... (시도 ${attempt}/${MAX_RETRIES})`);
  try {
    execSync(`${GIT} add -A && ${GIT} commit -m "Update portfolio" --allow-empty && ${GIT} push origin main`, {
      cwd: PROJECT_DIR,
      stdio: 'inherit',
      env: { ...process.env, PATH: '/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/macbookprokonseutanteugimjaehwi/bin' }
    });
    log('배포 완료 ✓ → https://kjhdesign1728-stack.github.io/portfolio/');
  } catch (e) {
    log(`배포 실패: ${e.message}`);
    if (attempt < MAX_RETRIES) {
      log(`${RETRY_DELAY / 1000}초 후 재시도...`);
      setTimeout(() => deploy(attempt + 1), RETRY_DELAY);
    } else {
      log('최대 재시도 횟수 초과. 다음 파일 변경 시 다시 시도합니다.');
    }
  }
}

function scheduleDeploy() {
  if (deployTimer) clearTimeout(deployTimer);
  deployTimer = setTimeout(() => deploy(1), 2000);
}

fs.watch(PROJECT_DIR, { recursive: true }, (event, filename) => {
  if (!filename || shouldIgnore(filename)) return;
  log(`파일 변경: ${filename}`);
  scheduleDeploy();
});

process.on('uncaughtException', (err) => {
  log(`예기치 않은 오류 (계속 실행 중): ${err.message}`);
});

process.on('unhandledRejection', (reason) => {
  log(`처리되지 않은 오류 (계속 실행 중): ${reason}`);
});

log('포트폴리오 자동 배포 감시 시작');
log(`감시 경로: ${PROJECT_DIR}`);
log('파일을 저장하면 자동으로 GitHub Pages에 배포됩니다.\n');
log('주소: https://kjhdesign1728-stack.github.io/portfolio/\n');
