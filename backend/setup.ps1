$nodeDir = "C:\Program Files\nodejs"
if (-not (Test-Path "$nodeDir\npm.cmd")) {
    Write-Host "Node.js belum terpasang." -ForegroundColor Red
    exit 1
}
$env:Path = "$nodeDir;" + [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    & "$nodeDir\npm.cmd" install
}

& "$nodeDir\npx.cmd" prisma generate
& "$nodeDir\npx.cmd" prisma migrate dev --name init
& "$nodeDir\npx.cmd" prisma db seed

Write-Host "Backend siap. Jalankan: npm run start:dev" -ForegroundColor Green
