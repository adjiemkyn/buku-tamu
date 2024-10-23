# api/Dockerfile

# Gunakan Node.js sebagai base image
FROM node:16

# Buat working directory di dalam container
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependensi Node.js
RUN npm install

# Copy semua source code ke dalam working directory
COPY . .

# Ekspose port yang akan digunakan
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]
