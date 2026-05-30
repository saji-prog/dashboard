# Jalankan backend + frontend (2 jendela PowerShell)
$root = $PSScriptRoot
Start-Process powershell -ArgumentList "-NoExit", "-File", "$root\backend\dev.ps1"
Start-Sleep -Seconds 3
Start-Process powershell -ArgumentList "-NoExit", "-File", "$root\dev.ps1"
Write-Host "Backend dan frontend dibuka di jendela terpisah." -ForegroundColor Green
