import fdb

# Detalles de la conexión a la base de datos Firebird
DATABASE_PATH = r'C:\Users\chave\Documents\prueba_ Black_Sheeper\backend\PRUEBAPROG.FDB'
USER = 'SYSDBA'
PASSWORD = 'masterkey'
HOST = 'localhost' # O '127.0.0.1'
PORT = 3050 # Puerto por defecto de Firebird

try:
    # Establecer la conexión a la base de datos
    conn = fdb.connect(
        host=HOST,
        port=PORT,
        database=DATABASE_PATH,
        user=USER,
        password=PASSWORD,
        charset='UTF8' # Es buena práctica especificar el charset
    )
    print("Conexión exitosa a la base de datos Firebird!")

    # Crear un cursor para ejecutar consultas
    cur = conn.cursor()

    # Consultar la tabla ARTICULOS
    print("\n--- Datos de la tabla ARTICULOS ---")
    cur.execute("SELECT * FROM ARTICULOS")
    rows_articulos = cur.fetchall()
    for row in rows_articulos:
        print(row)

    # Consultar la tabla CLAVES_ARTICULOS
    print("\n--- Datos de la tabla CLAVES_ARTICULOS ---")
    cur.execute("SELECT * FROM CLAVES_ARTICULOS")
    rows_claves = cur.fetchall()
    for row in rows_claves:
        print(row)

    # Cerrar el cursor y la conexión
    cur.close()
    conn.close()
    print("\nConexión cerrada.")

except fdb.Error as e:
    print(f"Error al conectar o consultar la base de datos: {e}")
except Exception as e:
    print(f"Ocurrió un error inesperado: {e}")
