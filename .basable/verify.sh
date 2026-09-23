set -euo pipefail
rm -f package-lock.json
npm install
npm run build
docker build .
