# Jalankan dashboard tanpa perlu restart terminal
$nodeDir = "C:\Program Files\nodejs"
if (-not (Test-Path "$nodeDir\npm.cmd")) {
    Write-Host "Node.js belum terpasang. Install dari https://nodejs.org lalu jalankan ulang." -ForegroundColor Red
    exit 1
}

$env:Path = "$nodeDir;" + [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User")

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "Menginstall dependensi..." -ForegroundColor Yellow
    & "$nodeDir\npm.cmd" install
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host "Memulai AgriMonitor di http://localhost:5173" -ForegroundColor Green
& "$nodeDir\npm.cmd" run dev
