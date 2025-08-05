# 第一阶段：构建应用
FROM node:24-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY package*.json ./
COPY . .

# 安装依赖并构建
RUN npm ci
RUN npm run build

# 第二阶段：生产环境
FROM nginx:1.28-alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制Nginx配置
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动Nginx
CMD ["nginx", "-g", "daemon off;"]