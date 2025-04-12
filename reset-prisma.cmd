@echo off
echo ----------------------------------------
echo 🧹 Cleaning project files...
echo ----------------------------------------

rd /s /q node_modules
rd /s /q .prisma
rd /s /q dist
del /f /q package-lock.json
del /f /q prisma\client

echo ----------------------------------------
echo 📦 Installing dependencies...
echo ----------------------------------------

call npm install

echo ----------------------------------------
echo 🔧 Running Prisma generate...
echo ----------------------------------------

call npx prisma generate

echo ----------------------------------------
echo 🏗 Running Prisma migrate dev...
echo ----------------------------------------

call npx prisma migrate dev --name reset

echo ----------------------------------------
echo 🚀 Starting NestJS development server...
echo ----------------------------------------

call npm run start:dev
