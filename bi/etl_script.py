import fdb
import psycopg2
from dotenv import load_dotenv
import os
from decimal import Decimal

# Cargar variables de entorno desde .env
load_dotenv()

# --- Configuración de Firebird ---
FIREBIRD_HOST = os.getenv('FIREBIRD_HOST')
FIREBIRD_PORT = int(os.getenv('FIREBIRD_PORT'))
FIREBIRD_DATABASE = os.getenv('FIREBIRD_DATABASE') # Ahora se obtiene del .env
FIREBIRD_USER = os.getenv('FIREBIRD_USER')
FIREBIRD_PASSWORD = os.getenv('FIREBIRD_PASSWORD')

# --- Configuración de PostgreSQL ---
POSTGRES_HOST = os.getenv('POSTGRES_HOST')
POSTGRES_PORT = int(os.getenv('POSTGRES_PORT'))
POSTGRES_DATABASE = os.getenv('POSTGRES_DATABASE')
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')

def run_etl():
    firebird_conn = None
    postgres_conn = None
    try:
        print("Iniciando conexión a Firebird...")
        firebird_conn = fdb.connect(
            host=FIREBIRD_HOST,
            port=FIREBIRD_PORT,
            database=FIREBIRD_DATABASE,
            user=FIREBIRD_USER,
            password=FIREBIRD_PASSWORD,
            charset='UTF8'
        )
        firebird_cur = firebird_conn.cursor()
        print("Conexión a Firebird exitosa.")

        # 1. Desarrollar el SELECT origen (Firebird)
        select_query_firebird = """
            SELECT
                A.ARTICULO_ID,
                A.NOMBRE,
                A.ESTATUS,
                A.UNIDAD_VENTA,
                CA.CLAVE_ARTICULO
            FROM
                ARTICULOS AS A
            JOIN
                CLAVES_ARTICULOS AS CA ON A.ARTICULO_ID = CA.ARTICULO_ID;
        """
        firebird_cur.execute(select_query_firebird)
        firebird_data = firebird_cur.fetchall()
        print(f"Se extrajeron {len(firebird_data)} filas de Firebird.")

        # Conexión a PostgreSQL
        print("Iniciando conexión a PostgreSQL...")
        postgres_conn = psycopg2.connect(
            host=POSTGRES_HOST,
            port=POSTGRES_PORT,
            database=POSTGRES_DATABASE,
            user=POSTGRES_USER,
            password=POSTGRES_PASSWORD
        )
        postgres_cur = postgres_conn.cursor()
        print("Conexión a PostgreSQL exitosa.")

        # 3. Implementar una carga completa (borra y recarga)
        print("Truncando la tabla TABLERO_BI en PostgreSQL...")
        postgres_cur.execute("TRUNCATE TABLE TABLERO_BI;")
        postgres_conn.commit()
        print("Tabla TABLERO_BI truncada.")

        if firebird_data:
            print("Insertando datos en TABLERO_BI...")
            insert_query_postgres = """
                INSERT INTO TABLERO_BI (
                    articulo_id, nombre, estatus, unidad_venta, clave_articulo
                ) VALUES (%s, %s, %s, %s, %s);
            """
            # Convertir objetos Decimal a float o string para PostgreSQL si es necesario
            # Aquí asumimos que los tipos son compatibles o psycopg2 los maneja
            processed_data = []
            for row in firebird_data:
                processed_row = []
                for item in row:
                    # Usar el tipo Decimal de Python estándar
                    if isinstance(item, Decimal):
                        processed_row.append(float(item)) # Convertir Decimal a float
                    else:
                        processed_row.append(item)
                processed_data.append(tuple(processed_row))

            postgres_cur.executemany(insert_query_postgres, processed_data)
            postgres_conn.commit()
            print(f"Se insertaron {len(firebird_data)} filas en TABLERO_BI.")
        else:
            print("No hay datos para insertar en TABLERO_BI.")

    except fdb.Error as e:
        print(f"Error de Firebird: {e}")
    except psycopg2.Error as e:
        print(f"Error de PostgreSQL: {e}")
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")
    finally:
        if firebird_conn:
            firebird_conn.close()
            print("Conexión a Firebird cerrada.")
        if postgres_conn:
            postgres_conn.close()
            print("Conexión a PostgreSQL cerrada.")

if __name__ == "__main__":
    run_etl()
