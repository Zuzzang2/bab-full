# 1단계: 빌드
FROM node:20 AS builder

WORKDIR /app

COPY . .
RUN npm install && npm run build

# 2단계: 정적 파일 서빙
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


