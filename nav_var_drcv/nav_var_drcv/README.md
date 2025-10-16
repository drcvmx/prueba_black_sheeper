# Navbar Responsive - World of Warcraft Style

Navbar moderno y responsive inspirado en el diseño de World of Warcraft, construido con React, TypeScript, Vite y Tailwind CSS.

## 🚀 Características

- ✨ Diseño moderno con efecto de transparencia y blur
- 📱 Completamente responsive (móvil, tablet y desktop)
- 🎨 Colores personalizados inspirados en WoW
- 🔍 Barra de búsqueda integrada
- 👤 Menú de usuario con dropdown
- 📋 Menú desplegable con 3 puntos
- 🎯 Sticky navbar que permanece fijo al hacer scroll
- 🌙 Logos oficiales de Blizzard y World of Warcraft

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (viene incluido con Node.js)

## 🛠️ Instalación

1. **Clona o descarga el repositorio**

```bash
cd nav_var_drcv
```

2. **Instala las dependencias**

```bash
npm install
```

## 🎮 Ejecución Local

### Modo Desarrollo

Para ejecutar el proyecto en modo desarrollo:

```bash
npm run dev
```

El proyecto se abrirá automáticamente en tu navegador en:
```
http://localhost:5173
```

### Compilar para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

### Vista Previa de Producción

Para previsualizar la versión de producción localmente:

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
nav_var_drcv/
├── public/                          # Archivos estáticos
│   ├── Blizzard_Entertainment_Logo.svg.png
│   ├── world-of-warcraft.svg
│   └── logo.png
├── src/
│   ├── components/
│   │   └── Navbar.tsx              # Componente principal del navbar
│   ├── App.tsx                      # Componente raíz
│   ├── main.tsx                     # Punto de entrada
│   └── index.css                    # Estilos globales
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos modernos
- **Supabase** - Backend (opcional)

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Previsualiza la build de producción |
| `npm run lint` | Ejecuta el linter (ESLint) |
| `npm run typecheck` | Verifica los tipos de TypeScript |

## 📱 Breakpoints Responsive

El navbar se adapta a diferentes tamaños de pantalla:

- **Móvil** (< 768px): Menú hamburguesa, logos compactos
- **Tablet** (768px - 1024px): Menú hamburguesa, logos medianos
- **Desktop** (≥ 1024px): Menú completo con todos los botones

## 🎯 Características del Navbar

### Desktop (≥ 1024px)
- Logo de Blizzard con dropdown
- Logo de World of Warcraft
- Menú de 3 puntos con submenú
- Barra de búsqueda
- Menú de usuario
- Botones "Probar gratis" y "Suscribirse ahora"

### Móvil (< 1024px)
- Logo de Blizzard compacto
- Menú hamburguesa
- Todos los enlaces en menú desplegable
- Botones de acción en el menú móvil

## 🐛 Solución de Problemas

### El proyecto no inicia

```bash
# Elimina node_modules y reinstala
rm -rf node_modules
npm install
npm run dev
```

### Los logos no se muestran

Asegúrate de que los archivos de imagen estén en la carpeta `public/`:
- `public/Blizzard_Entertainment_Logo.svg.png`
- `public/world-of-warcraft.svg`
- `public/logo.png`

### Errores de TypeScript

```bash
# Verifica los tipos
npm run typecheck
```

## 📝 Personalización

### Cambiar Colores

Los colores principales están definidos en `src/components/Navbar.tsx`:

```tsx
// Fondo del navbar
bg-[#211C18]/95

// Botón "Probar gratis"
bg-[#1a1a1a]

// Botón "Suscribirse ahora"
bg-[#b83a2f]
```

### Modificar el Logo

Reemplaza los archivos en la carpeta `public/` con tus propios logos.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado con ❤️ para la comunidad de World of Warcraft

---

¿Necesitas ayuda? Abre un issue en el repositorio.
