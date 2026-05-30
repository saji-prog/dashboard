# Jalankan backend NestJS (perbaiki PATH npm)
$nodeDir = "C:\Program Files\nodejs"
if (-not (Test-Path "$nodeDir\npm.cmd")) {
    Write-Host "Node.js belum terpasang. Install dari https://nodejs.org" -ForegroundColor Red
    exit 1
}

$env:Path = "$nodeDir;" + [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    & "$nodeDir\npm.cmd" install
}

if (-not (Test-Path "prisma\dev.db")) {
    Write-Host "Setting up database..." -ForegroundColor Yellow
    & "$nodeDir\npx.cmd" prisma migrate deploy
    & "$nodeDir\npx.cmd" prisma db seed
}

Write-Host "AgriMonitor API: http://localhost:3000/api" -ForegroundColor Green
& "$nodeDir\npm.cmd" run start:dev
