import { useState } from 'react';
import ArticulosList from './components/ArticulosList';
import ArticuloDetail from './components/ArticuloDetail';

const API_URL = 'http://localhost:8000';

export interface Articulo {
  ARTICULO_ID: number;
  NOMBRE: string;
  ESTATUS: string;
  UNIDAD_VENTA: string | null;
}

function App() {
  const [selectedArticuloId, setSelectedArticuloId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-tertiary">
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800">
            📦 Gestión de Artículos
          </h1>
          <p className="text-gray-600 mt-2">Sistema de consulta de inventario</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de artículos */}
          <div className="lg:col-span-2">
            <ArticulosList 
              apiUrl={API_URL}
              onSelectArticulo={setSelectedArticuloId}
              selectedId={selectedArticuloId}
            />
          </div>

          {/* Detalle del artículo */}
          <div className="lg:col-span-1">
            <ArticuloDetail 
              apiUrl={API_URL}
              articuloId={selectedArticuloId}
            />
          </div>
        </div>
      </main>

      <footer className="bg-white/90 backdrop-blur-sm mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Sistema de Artículos - Powered by FastAPI + React</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
