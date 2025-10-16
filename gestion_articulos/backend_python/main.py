from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
import fdb
from pydantic import BaseModel, Field

# Configuración de la base de datos
DATABASE_PATH = r'C:\Users\chave\Documents\prueba_ Black_Sheeper\gestion_articulos\backend_python\PRUEBAPROG.FDB'
USER = 'SYSDBA'
PASSWORD = 'masterkey'
HOST = 'localhost'
PORT = 3050

app = FastAPI(
    title="API Artículos Firebird",
    description="API REST para gestión de artículos",
    version="1.0.0"
)

# Configurar CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos Pydantic
class Articulo(BaseModel):
    ARTICULO_ID: int
    NOMBRE: str
    ESTATUS: str
    UNIDAD_VENTA: Optional[str] = None

class ClaveArticulo(BaseModel):
    CLAVE_ARTICULO: str

# Función para obtener conexión
def get_db_connection():
    try:
        conn = fdb.connect(
            host=HOST,
            port=PORT,
            database=DATABASE_PATH,
            user=USER,
            password=PASSWORD,
            charset='UTF8'
        )
        return conn
    except fdb.Error as e:
        raise HTTPException(status_code=500, detail=f"Error de conexión a la base de datos: {str(e)}")

@app.get("/")
def root():
    return {"message": "API Artículos - Firebird", "version": "1.0.0"}

@app.get("/v1/public/articulos", response_model=List[Articulo])
def get_articulos(
    q: Optional[str] = Query(None, description="Buscar en NOMBRE o CLAVE_ARTICULO"),
    limit: int = Query(100, le=100, ge=1, description="Límite de resultados (máximo 100)"),
    offset: int = Query(0, ge=0, description="Offset para paginación")
):
    """
    Obtiene la lista de artículos con filtros opcionales.
    
    - **q**: Busca en NOMBRE o CLAVE_ARTICULO
    - **limit**: Cantidad máxima de resultados (máximo 100)
    - **offset**: Número de registros a saltar
    """
    conn = None
    cur = None
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        if q:
            # Búsqueda en NOMBRE o CLAVE_ARTICULO
            query = """
                SELECT DISTINCT a.ARTICULO_ID, a.NOMBRE, a.ESTATUS, a.UNIDAD_VENTA
                FROM ARTICULOS a
                LEFT JOIN CLAVES_ARTICULOS ca ON a.ARTICULO_ID = ca.ARTICULO_ID
                WHERE UPPER(a.NOMBRE) LIKE UPPER(?) OR UPPER(ca.CLAVE_ARTICULO) LIKE UPPER(?)
                ORDER BY a.ARTICULO_ID
                ROWS ? TO ?
            """
            search_term = f"%{q}%"
            cur.execute(query, (search_term, search_term, offset + 1, offset + limit))
        else:
            # Sin búsqueda
            query = """
                SELECT ARTICULO_ID, NOMBRE, ESTATUS, UNIDAD_VENTA
                FROM ARTICULOS
                ORDER BY ARTICULO_ID
                ROWS ? TO ?
            """
            cur.execute(query, (offset + 1, offset + limit))
        
        rows = cur.fetchall()
        articulos = [
            Articulo(
                ARTICULO_ID=row[0],
                NOMBRE=row[1],
                ESTATUS=row[2],
                UNIDAD_VENTA=row[3]
            )
            for row in rows
        ]
        
        return articulos
    
    except fdb.Error as e:
        print(f"Error de Firebird: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error en la consulta: {str(e)}")
    except Exception as e:
        print(f"Error general: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error inesperado: {str(e)}")
    finally:
        if cur:
            cur.close()
        if conn:
            conn.close()

@app.get("/v1/public/articulos/{id}", response_model=Articulo)
def get_articulo_by_id(id: int):
    """
    Obtiene un artículo específico por su ARTICULO_ID.
    
    - **id**: ID del artículo a buscar
    """
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        query = """
            SELECT ARTICULO_ID, NOMBRE, ESTATUS, UNIDAD_VENTA
            FROM ARTICULOS
            WHERE ARTICULO_ID = ?
        """
        cur.execute(query, (id,))
        row = cur.fetchone()
        
        if not row:
            raise HTTPException(status_code=404, detail=f"Artículo con ID {id} no encontrado")
        
        articulo = Articulo(
            ARTICULO_ID=row[0],
            NOMBRE=row[1],
            ESTATUS=row[2],
            UNIDAD_VENTA=row[3]
        )
        
        return articulo
    
    except fdb.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en la consulta: {str(e)}")
    finally:
        cur.close()
        conn.close()

@app.get("/v1/public/articulos/{id}/claves", response_model=List[ClaveArticulo])
def get_claves_articulo(id: int):
    """
    Obtiene las claves de un artículo específico.
    
    - **id**: ID del artículo
    """
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Verificar que el artículo existe
        cur.execute("SELECT ARTICULO_ID FROM ARTICULOS WHERE ARTICULO_ID = ?", (id,))
        if not cur.fetchone():
            raise HTTPException(status_code=404, detail=f"Artículo con ID {id} no encontrado")
        
        # Obtener las claves
        query = """
            SELECT CLAVE_ARTICULO
            FROM CLAVES_ARTICULOS
            WHERE ARTICULO_ID = ?
            ORDER BY CLAVE_ARTICULO_ID
        """
        cur.execute(query, (id,))
        rows = cur.fetchall()
        
        claves = [ClaveArticulo(CLAVE_ARTICULO=row[0]) for row in rows]
        
        return claves
    
    except fdb.Error as e:
        raise HTTPException(status_code=500, detail=f"Error en la consulta: {str(e)}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
