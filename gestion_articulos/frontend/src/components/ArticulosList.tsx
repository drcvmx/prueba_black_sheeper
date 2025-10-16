import { useState, useEffect } from "react";
import type { Articulo } from "../App";

interface ArticulosListProps {
  apiUrl: string;
  onSelectArticulo: (id: number) => void;
  selectedId: number | null;
}

export default function ArticulosList({
  apiUrl,
  onSelectArticulo,
  selectedId,
}: ArticulosListProps) {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit] = useState(100);

  useEffect(() => {
    fetchArticulos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const fetchArticulos = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: "0",
      });

      if (searchQuery) {
        params.append("q", searchQuery);
      }

      const response = await fetch(`${apiUrl}/v1/public/articulos?${params}`);

      if (!response.ok) {
        throw new Error("Error al cargar los artículos");
      }

      const data = await response.json();
      setArticulos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const getEstatusColor = (estatus: string) => {
    switch (estatus) {
      case "A":
        return "bg-green-100 text-green-800";
      case "S":
        return "bg-yellow-100 text-yellow-800";
      case "B":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEstatusText = (estatus: string) => {
    switch (estatus) {
      case "A":
        return "Activo";
      case "S":
        return "Suspendido";
      case "B":
        return "Baja";
      case "V":
        return "Vigente";
      case "C":
        return "Cancelado";
      default:
        return estatus;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          📋 Lista de Artículos
        </h2>

        {/* Buscador */}
        <div className="relative">
         
          <input
            type="text"
            placeholder="Buscar por nombre o clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Cargando artículos...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <p className="font-bold text-red-800">Error</p>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Lista */}
      {!loading && !error && (
        <>
          <div className="mb-4 text-sm text-gray-600">
            {articulos.length} artículo{articulos.length !== 1 ? "s" : ""}{" "}
            encontrado{articulos.length !== 1 ? "s" : ""}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
            {articulos.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <span className="text-6xl">📭</span>
                <p className="mt-4 text-lg">No se encontraron artículos</p>
              </div>
            ) : (
              articulos.map((articulo) => (
                <div
                  key={articulo.ARTICULO_ID}
                  onClick={() => onSelectArticulo(articulo.ARTICULO_ID)}
                  className={`bg-white rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${
                    selectedId === articulo.ARTICULO_ID
                      ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
                      : "border-gray-200 hover:border-primary/50 shadow-md"
                  }`}
                >
                  {/* Header de la card */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold text-gray-700 bg-white px-3 py-1 rounded-full shadow-sm">
                        ID: {articulo.ARTICULO_ID}
                      </span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm ${getEstatusColor(
                          articulo.ESTATUS
                        )}`}
                      >
                        {getEstatusText(articulo.ESTATUS)}
                      </span>
                    </div>
                  </div>

                  {/* Contenido de la card */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-3 text-lg line-clamp-2 min-h-[3.5rem]">
                      {articulo.NOMBRE}
                    </h3>

                    <div className="space-y-2">
                      {articulo.UNIDAD_VENTA && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                          <span className="text-lg">📦</span>
                          <span className="font-medium">Unidad:</span>
                          <span className="font-semibold text-gray-800">
                            {articulo.UNIDAD_VENTA}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer de la card */}
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 rounded-b-xl">
                    <div className="flex items-center justify-end text-primary font-semibold text-sm">
                      <span>Ver detalles</span>
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
