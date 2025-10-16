import { useState, useEffect } from 'react';
import type { Articulo } from '../App';

interface ClaveArticulo {
  CLAVE_ARTICULO: string;
}

interface ArticuloDetailProps {
  apiUrl: string;
  articuloId: number | null;
}

export default function ArticuloDetail({ apiUrl, articuloId }: ArticuloDetailProps) {
  const [articulo, setArticulo] = useState<Articulo | null>(null);
  const [claves, setClaves] = useState<ClaveArticulo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (articuloId) {
      fetchArticuloDetail();
      fetchClaves();
    } else {
      setArticulo(null);
      setClaves([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articuloId]);

  const fetchArticuloDetail = async () => {
    if (!articuloId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/v1/public/articulos/${articuloId}`);
      
      if (!response.ok) {
        throw new Error('Error al cargar el artículo');
      }
      
      const data = await response.json();
      setArticulo(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const fetchClaves = async () => {
    if (!articuloId) return;
    
    try {
      const response = await fetch(`${apiUrl}/v1/public/articulos/${articuloId}/claves`);
      
      if (!response.ok) {
        throw new Error('Error al cargar las claves');
      }
      
      const data = await response.json();
      setClaves(data);
    } catch (err) {
      console.error('Error al cargar claves:', err);
      setClaves([]);
    }
  };

  const getEstatusColor = (estatus: string) => {
    switch (estatus) {
      case 'A': return 'bg-green-100 text-green-800 border-green-300';
      case 'S': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'B': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getEstatusText = (estatus: string) => {
    switch (estatus) {
      case 'A': return 'Activo';
      case 'S': return 'Suspendido';
      case 'B': return 'Baja';
      case 'V': return 'Vigente';
      case 'C': return 'Cancelado';
      default: return estatus;
    }
  };

  if (!articuloId) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
        <div className="text-center py-12 text-gray-400">
          <span className="text-6xl">👈</span>
          <p className="mt-4 text-lg">Selecciona un artículo para ver los detalles</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  if (error || !articulo) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <p className="font-bold text-red-800">Error</p>
              <p className="text-red-700">{error || 'No se pudo cargar el artículo'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 sticky top-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🔍 Detalle del Artículo</h2>
      
      {/* ID */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">ID</label>
        <p className="text-3xl font-bold text-primary mt-1">#{articulo.ARTICULO_ID}</p>
      </div>

      {/* Nombre */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Nombre</label>
        <p className="text-lg text-gray-800 mt-1 font-medium">{articulo.NOMBRE}</p>
      </div>

      {/* Estatus */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Estatus</label>
        <div className="mt-2">
          <span className={`inline-block px-4 py-2 rounded-lg font-semibold border-2 ${getEstatusColor(articulo.ESTATUS)}`}>
            {getEstatusText(articulo.ESTATUS)}
          </span>
        </div>
      </div>

      {/* Unidad de Venta */}
      {articulo.UNIDAD_VENTA && (
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Unidad de Venta</label>
          <p className="text-lg text-gray-800 mt-1">📦 {articulo.UNIDAD_VENTA}</p>
        </div>
      )}

      {/* Claves */}
      <div className="mt-8 pt-6 border-t-2 border-gray-200">
        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3 block">
          🔑 Claves del Artículo
        </label>
        
        {claves.length === 0 ? (
          <p className="text-gray-500 italic">Sin claves asociadas</p>
        ) : (
          <div className="space-y-2">
            {claves.map((clave, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-3 rounded-lg border-2 border-primary/30"
              >
                <p className="font-mono font-semibold text-gray-800">
                  {clave.CLAVE_ARTICULO}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
