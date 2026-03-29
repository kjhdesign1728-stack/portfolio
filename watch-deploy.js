const fs = require('fs');
const { execSync } = require('child_process');

const PROJECT_DIR = __dirname;
const NETLIFY = '/usr/local/bin/netlify';
const IGNORE = ['.netlify', '.DS_Store', 'watch-deploy.js', '.git', '.planning', '.gitignore'];
const MAX_RETRIES = 3;
const RETRY_DELAY = 10000; // 10초 후 재시도

let deployTimer = null;
let pendingDeploy = false;

function log(msg) {
  console.log(`[${new Date().toLocaleTimeString('ko-KR')}] ${msg}`);
}

function shouldIgnore(filePath) {
  return IGNORE.some(name => filePath.includes(name));
}

function deploy(attempt = 1) {
  pendingDeploy = false;
  log(`배포 시작... (시도 ${attempt}/${MAX_RETRIES})`);
  try {
    execSync(`${NETLIFY} deploy --prod --dir "."`, {
      cwd: PROJECT_DIR,
      stdio: 'inherit'
    });
    log('배포 완료 ✓');
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
  pendingDeploy = true;
  deployTimer = setTimeout(() => deploy(1), 2000);
}

// 파일 변경 감시
fs.watch(PROJECT_DIR, { recursive: true }, (event, filename) => {
  if (!filename || shouldIgnore(filename)) return;
  log(`파일 변경: ${filename}`);
  scheduleDeploy();
});

// 예기치 않은 에러로 프로세스가 죽지 않도록 방어
process.on('uncaughtException', (err) => {
  log(`예기치 않은 오류 (계속 실행 중): ${err.message}`);
});

process.on('unhandledRejection', (reason) => {
  log(`처리되지 않은 오류 (계속 실행 중): ${reason}`);
});

log('포트폴리오 자동 배포 감시 시작');
log(`감시 경로: ${PROJECT_DIR}`);
log('파일을 저장하면 자동으로 Netlify에 배포됩니다.\n');
