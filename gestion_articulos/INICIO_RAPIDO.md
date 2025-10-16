# ⚡ Inicio Rápido

## 🚀 Para Iniciar Todo

Desde la raíz del proyecto, ejecuta:

```powershell
.\start.ps1
```

Esto abrirá 2 ventanas:

- 🟢 **Backend** (Python/FastAPI) en puerto 8000
- 🔵 **Frontend** (React/Vite) en puerto 5173

## 🌐 URLs

Una vez iniciado, abre en tu navegador:

- **Aplicación**: http://localhost:5173
- **API**: http://localhost:8000
- **Documentación**: http://localhost:8000/docs

## 🎯 Uso Básico

### 1. Buscar Artículos

- Escribe en el campo de búsqueda: `"agua"`, `"papel"`, etc.
- Los resultados se actualizan automáticamente

### 2. Ver Detalle

- Haz clic en cualquier artículo de la lista
- El panel derecho mostrará toda la información

### 3. Ver Claves

- Selecciona un artículo
- Las claves aparecen en la parte inferior del detalle

## 🛑 Para Detener

Cierra las 2 ventanas de PowerShell que se abrieron, o presiona `Ctrl+C` en cada una.

## 🔧 Inicio Manual (Alternativo)

Si prefieres iniciar manualmente:

**Terminal 1:**

```bash
cd backend_python
python main.py
```

**Terminal 2:**

```bash
cd frontend
npm run dev
```

## 📊 Verificación Rápida

### Backend funcionando:

```bash
curl http://localhost:8000
```

Respuesta esperada: `{"message":"API Artículos - Firebird"}`

### Frontend funcionando:

Abre http://localhost:5173 en el navegador

## ⚠️ Problemas Comunes

### "Port 8000 already in use"

```bash
# Detén cualquier proceso en el puerto 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### "Cannot connect to database"

- Verifica que Firebird esté corriendo
- Cierra ISQL si está abierto
- Verifica la ruta en `backend_python/main.py`

### "Module not found"

```bash
# Backend
cd backend_python
pip install fastapi uvicorn fdb pydantic

# Frontend
cd frontend
npm install
```

## 📱 Acceso desde Móvil

1. Encuentra tu IP: `ipconfig`
2. En el móvil: `http://TU_IP:5173`
3. Asegúrate de estar en la misma red WiFi

## 🎨 Personalización Rápida

### Cambiar colores:

Edita `frontend/tailwind.config.js`

### Cambiar puerto del backend:

Edita `backend_python/main.py` (línea final)

### Cambiar puerto del frontend:

Edita `frontend/vite.config.ts`

## 📚 Más Información

- `README.md` - Documentación completa
- `NUEVA_ESTRUCTURA.md` - Estructura del proyecto
- `backend_python/README.md` - Documentación del backend
- `frontend/README_FRONTEND.md` - Documentación del frontend

---

**¡Listo para usar!** 🎉
