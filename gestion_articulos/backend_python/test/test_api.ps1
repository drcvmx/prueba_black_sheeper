# Script para probar la API de Artículos

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "PROBANDO API DE ARTICULOS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test 1: Obtener todos los artículos
Write-Host "1. GET /v1/public/articulos (todos los artículos)" -ForegroundColor Yellow
Write-Host "Comando: curl http://localhost:8000/v1/public/articulos`n" -ForegroundColor Gray
curl http://localhost:8000/v1/public/articulos
Write-Host "`n"

Start-Sleep -Seconds 1

# Test 2: Buscar artículos con 'agua'
Write-Host "`n2. GET /v1/public/articulos?q=agua (buscar 'agua')" -ForegroundColor Yellow
Write-Host "Comando: curl 'http://localhost:8000/v1/public/articulos?q=agua'`n" -ForegroundColor Gray
curl "http://localhost:8000/v1/public/articulos?q=agua"
Write-Host "`n"

Start-Sleep -Seconds 1

# Test 3: Buscar con limit y offset
Write-Host "`n3. GET /v1/public/articulos?limit=2&offset=0 (paginación)" -ForegroundColor Yellow
Write-Host "Comando: curl 'http://localhost:8000/v1/public/articulos?limit=2&offset=0'`n" -ForegroundColor Gray
curl "http://localhost:8000/v1/public/articulos?limit=2&offset=0"
Write-Host "`n"

Start-Sleep -Seconds 1

# Test 4: Obtener artículo por ID
Write-Host "`n4. GET /v1/public/articulos/3356 (artículo específico)" -ForegroundColor Yellow
Write-Host "Comando: curl http://localhost:8000/v1/public/articulos/3356`n" -ForegroundColor Gray
curl http://localhost:8000/v1/public/articulos/3356
Write-Host "`n"

Start-Sleep -Seconds 1

# Test 5: Obtener claves de un artículo
Write-Host "`n5. GET /v1/public/articulos/3356/claves (claves del artículo)" -ForegroundColor Yellow
Write-Host "Comando: curl http://localhost:8000/v1/public/articulos/3356/claves`n" -ForegroundColor Gray
curl http://localhost:8000/v1/public/articulos/3356/claves
Write-Host "`n"

Start-Sleep -Seconds 1

# Test 6: Buscar por clave
Write-Host "`n6. GET /v1/public/articulos?q=Prueba1 (buscar por clave)" -ForegroundColor Yellow
Write-Host "Comando: curl 'http://localhost:8000/v1/public/articulos?q=Prueba1'`n" -ForegroundColor Gray
curl "http://localhost:8000/v1/public/articulos?q=Prueba1"
Write-Host "`n"

Start-Sleep -Seconds 1

# Test 7: Artículo que no existe (debe dar 404)
Write-Host "`n7. GET /v1/public/articulos/99999 (artículo inexistente - debe dar 404)" -ForegroundColor Yellow
Write-Host "Comando: curl http://localhost:8000/v1/public/articulos/99999`n" -ForegroundColor Gray
curl http://localhost:8000/v1/public/articulos/99999
Write-Host "`n"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "PRUEBAS COMPLETADAS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
Write-Host "Documentación interactiva disponible en:" -ForegroundColor Green
Write-Host "  http://localhost:8000/docs" -ForegroundColor White
Write-Host "  http://localhost:8000/redoc`n" -ForegroundColor White
