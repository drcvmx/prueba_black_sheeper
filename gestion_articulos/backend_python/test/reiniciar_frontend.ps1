# Script para reiniciar el frontend

Write-Host "`n🔄 Reiniciando Frontend...`n" -ForegroundColor Cyan

Set-Location frontend

Write-Host "✅ Iniciando servidor de desarrollo...`n" -ForegroundColor Green

npm run dev
