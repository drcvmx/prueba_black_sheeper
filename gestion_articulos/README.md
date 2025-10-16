# 📦 Sistema de Gestión de Artículos

Sistema completo de gestión de artículos con backend FastAPI y frontend React.

## 📁 Estructura del Proyecto

```
prueba_Black_Sheeper/
├── backend_python/          # Backend FastAPI
│   ├── main.py             # API REST
│   ├── PRUEBAPROG.FDB      # Base de datos Firebird
│   ├── scrip/              # Scripts auxiliares
│   └── test/               # Tests
│
├── frontend/               # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── App.tsx         # Componente principal
│   │   └── main.tsx        # Punto de entrada
│   └── package.json
│
└── start.ps1              # Script para iniciar todo
```

## 🎨 Paleta de Colores

- **Primary**: `#adeada`
- **Secondary**: `#bdeadb`
- **Tertiary**: `#cdeadc`
- **Quaternary**: `#ddeadd`
- **Quinary**: `#edeade`

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)

Desde la raíz del proyecto:

```powershell
.\start.ps1
```

Esto iniciará automáticamente:
- 🟢 Backend en http://localhost:8000
- 🔵 Frontend en http://localhost:5173

### Opción 2: Manual

**Terminal 1 - Backend:**
```bash
cd backend_python
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 📡 Endpoints de la API

### 1. Listar artículos
```
GET /v1/public/articulos
```
**Parámetros opcionales:**
- `q`: Buscar en NOMBRE o CLAVE_ARTICULO
- `limit`: Límite de resultados (máx 100)
- `offset`: Offset para paginación

**Ejemplo:**
```bash
curl "http://localhost:8000/v1/public/articulos?q=agua&limit=10"
```

### 2. Obtener artículo por ID
```
GET /v1/public/articulos/{id}
```

**Ejemplo:**
```bash
curl http://localhost:8000/v1/public/articulos/3356
```

### 3. Obtener claves de un artículo
```
GET /v1/public/articulos/{id}/claves
```

**Ejemplo:**
```bash
curl http://localhost:8000/v1/public/articulos/3356/claves
```

## 🌐 URLs del Sistema

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:5173 | Aplicación React |
| Backend API | http://localhost:8000 | API REST |
| Swagger Docs | http://localhost:8000/docs | Documentación interactiva |
| ReDoc | http://localhost:8000/redoc | Documentación alternativa |

## 🛠️ Tecnologías

### Backend
- **FastAPI** - Framework web moderno
- **Python 3.10** - Lenguaje de programación
- **fdb** - Driver para Firebird
- **Pydantic** - Validación de datos
- **Uvicorn** - Servidor ASGI

### Frontend
- **React 18** - Librería UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS
- **Vite** - Build tool
- **ESLint** - Linter

### Base de Datos
- **Firebird 3.0** - Base de datos SQL

## ✨ Características

### Frontend
- ✅ Lista de artículos con búsqueda en tiempo real
- ✅ Detalle del artículo seleccionado
- ✅ Visualización de claves asociadas
- ✅ Diseño responsive
- ✅ Indicadores de estatus con colores
- ✅ Interfaz moderna con Tailwind CSS

### Backend
- ✅ API REST completa con 3 endpoints
- ✅ Documentación automática (Swagger/ReDoc)
- ✅ CORS habilitado
- ✅ Validación de datos
- ✅ Manejo de errores

## 📝 Requisitos

- Python 3.10+
- Node.js 18+
- Firebird 3.0+

## 🔧 Instalación

### Backend
```bash
cd backend_python
pip install fastapi uvicorn fdb pydantic
```

### Frontend
```bash
cd frontend
npm install
```

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que Firebird esté corriendo
- Verifica la ruta de PRUEBAPROG.FDB en `backend_python/main.py`
- Cierra ISQL si está conectado

### Error: "CORS policy"
- Verifica que el backend esté corriendo en puerto 8000
- CORS ya está configurado en `main.py`

### Error: "Port already in use"
- Detén cualquier proceso en los puertos 8000 o 5173
- O cambia los puertos en la configuración

## 📚 Documentación Adicional

- `backend_python/README.md` - Documentación del backend
- `frontend/README_FRONTEND.md` - Documentación del frontend

## 🎉 Estado del Proyecto

✅ Backend funcionando
✅ Frontend funcionando
✅ Conexión a Firebird OK
✅ CORS configurado
✅ Documentación completa
✅ Scripts de utilidad listos

## 📞 Soporte

Si tienes problemas:
1. Revisa la documentación en cada carpeta
2. Consulta http://localhost:8000/docs para la API
3. Verifica que todos los servicios estén corriendo

---

**© 2025 Sistema de Artículos - Powered by FastAPI + React**
