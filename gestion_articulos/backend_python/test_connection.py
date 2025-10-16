import fdb

# Configuración de la base de datos
DATABASE_PATH = r'C:\Users\chave\Documents\prueba_ Black_Sheeper\backend\backend_python\PRUEBAPROG.FDB'
USER = 'SYSDBA'
PASSWORD = 'masterkey'
HOST = 'localhost'
PORT = 3050

print("🔍 Probando conexión a Firebird...")
print(f"📁 Ruta: {DATABASE_PATH}")

try:
    conn = fdb.connect(
        host=HOST,
        port=PORT,
        database=DATABASE_PATH,
        user=USER,
        password=PASSWORD,
        charset='UTF8'
    )
    print("✅ Conexión exitosa!")
    
    cur = conn.cursor()
    cur.execute("SELECT COUNT(*) FROM ARTICULOS")
    count = cur.fetchone()[0]
    print(f"📊 Total de artículos: {count}")
    
    cur.close()
    conn.close()
    print("✅ Prueba completada exitosamente!")
    
except Exception as e:
    print(f"❌ Error: {e}")
