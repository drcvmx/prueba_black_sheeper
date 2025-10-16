# Frontend - Sistema de Artículos

Frontend construido con React 18, TypeScript y Tailwind CSS.

## Paleta de Colores

- **Primary**: `#adeada` - Color principal
- **Secondary**: `#bdeadb` - Color secundario
- **Tertiary**: `#cdeadc` - Color terciario
- **Quaternary**: `#ddeadd` - Color cuaternario
- **Quinary**: `#edeade` - Color quinario

## Características

✅ Lista de artículos con búsqueda en tiempo real
✅ Detalle de artículo seleccionado
✅ Visualización de claves asociadas
✅ Diseño responsive
✅ Indicadores de estatus con colores
✅ Interfaz moderna con Tailwind CSS

## Instalación

Las dependencias ya están instaladas. Si necesitas reinstalar:

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:5173

## Requisitos

- Node.js 18+
- API Backend corriendo en http://localhost:8000

## Estructura del proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── ArticulosList.tsx    # Lista de artículos con búsqueda
│   │   └── ArticuloDetail.tsx   # Detalle y claves del artículo
│   ├── App.tsx                  # Componente principal
│   ├── main.tsx                 # Punto de entrada
│   └── index.css                # Estilos globales con Tailwind
├── tailwind.config.js           # Configuración de Tailwind
└── package.json
```

## Funcionalidades

### Lista de Artículos
- Búsqueda por nombre o clave
- Scroll infinito
- Selección de artículo
- Indicadores de estatus (Activo, Suspendido, Baja)

### Detalle de Artículo
- ID del artículo
- Nombre completo
- Estatus con color
- Unidad de venta
- Claves asociadas

## Build para producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`.
