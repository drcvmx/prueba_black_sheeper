# Script para iniciar Backend y Frontend automáticamente

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "INICIANDO SISTEMA DE ARTICULOS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Iniciar Backend en una nueva ventana
Write-Host "1. Iniciando Backend (FastAPI)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'BACKEND - API FastAPI' -ForegroundColor Green; Set-Location backend_python; python main.py"

# Esperar a que el backend inicie
Write-Host "   Esperando 5 segundos para que el backend inicie...`n" -ForegroundColor Gray
Start-Sleep -Seconds 5

# Iniciar Frontend en una nueva ventana
Write-Host "2. Iniciando Frontend (React + Vite)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Write-Host 'FRONTEND - React App' -ForegroundColor Green; Set-Location frontend; npm run dev"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SISTEMA INICIADO" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "URLs disponibles:" -ForegroundColor Green
Write-Host "  Frontend:  http://localhost:5173" -ForegroundColor White
Write-Host "  Backend:   http://localhost:8000" -ForegroundColor White
Write-Host "  API Docs:  http://localhost:8000/docs`n" -ForegroundColor White

Write-Host "Presiona cualquier tecla para cerrar esta ventana..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
