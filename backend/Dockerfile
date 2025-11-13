FROM node:20

WORKDIR /app

# package.json과 lock파일만 복사 (캐시 최적화)
COPY package*.json ./

# 설치 (운영용이면 npm ci도 가능)
RUN npm install

# 소스 전체 복사
COPY . .

# 빌드
RUN npm run build

# 포트 열기
EXPOSE 3000

# 실행 (NestJS는 기본적으로 dist/src/main.js)
CMD ["node", "dist/src/main.js"]
