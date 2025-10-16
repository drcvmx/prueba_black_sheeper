# API REST - Artículos Firebird

API REST construida con FastAPI para gestionar artículos desde una base de datos Firebird.

## Instalación

```bash
pip install -r requirements.txt
```

## Ejecutar la API

```bash
python main.py
```

O con uvicorn directamente:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

La API estará disponible en: `http://localhost:8000`

## Documentación

Una vez iniciada la API, accede a:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Endpoints

### 1. Listar artículos
```
GET /v1/public/articulos
```

**Parámetros opcionales:**
- `q`: Buscar en NOMBRE o CLAVE_ARTICULO (string)
- `limit`: Límite de resultados, máximo 100 (default: 100)
- `offset`: Offset para paginación (default: 0)

**Ejemplo:**
```bash
curl "http://localhost:8000/v1/public/articulos?q=agua&limit=10&offset=0"
```

**Respuesta:**
```json
[
  {
    "ARTICULO_ID": 3356,
    "NOMBRE": "Agua Mineral Natural Coto 2L",
    "ESTATUS": "A",
    "UNIDAD_VENTA": "Pieza"
  }
]
```

### 2. Obtener artículo por ID
```
GET /v1/public/articulos/{id}
```

**Ejemplo:**
```bash
curl "http://localhost:8000/v1/public/articulos/3356"
```

**Respuesta:**
```json
{
  "ARTICULO_ID": 3356,
  "NOMBRE": "Agua Mineral Natural Coto 2L",
  "ESTATUS": "A",
  "UNIDAD_VENTA": "Pieza"
}
```

### 3. Obtener claves de un artículo
```
GET /v1/public/articulos/{id}/claves
```

**Ejemplo:**
```bash
curl "http://localhost:8000/v1/public/articulos/3356/claves"
```

**Respuesta:**
```json
[
  {
    "CLAVE_ARTICULO": "Prueba1"
  }
]
```

## Códigos de respuesta

- `200`: Éxito
- `404`: Artículo no encontrado
- `500`: Error del servidor o base de datos
