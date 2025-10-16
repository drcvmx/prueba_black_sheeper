# Proyecto ETL: Firebird a PostgreSQL

Este repositorio contiene un proceso ETL simple para extraer datos de las tablas `ARTICULOS` y `CLAVES_ARTICULOS` de Firebird, unirlas y cargarlas en una tabla `TABLERO_BI` en PostgreSQL para análisis de Business Intelligence.

## Estructura del Proyecto

```
/bi
├── create_tablero_bi.sql    # Script SQL para crear la tabla destino
├── etl_script.py            # Script Python del proceso ETL
├── .env                     # Configuración de conexiones (no versionar)
└── README.md                # Este archivo
```

## Requisitos Previos

- Python 3.x instalado
- PostgreSQL 18.0 o superior
- Firebird Database
- Acceso a las tablas `ARTICULOS` y `CLAVES_ARTICULOS` en Firebird

## Instalación

### 1. Instalar dependencias de Python

```bash
pip install fdb python-dotenv psycopg2-binary
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con tus credenciales:

```env
# Firebird Connection
FIREBIRD_HOST=localhost
FIREBIRD_PORT=3050
FIREBIRD_DATABASE=C:/ruta/a/tu/base/PRUEBAPROG.FDB
FIREBIRD_USER=SYSDBA
FIREBIRD_PASSWORD=masterkey

# PostgreSQL Connection
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=etl_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_password
```

**Nota:** Asegúrate de incluir la ruta completa al archivo `.FDB` de Firebird.

### 3. Crear la Base de Datos en PostgreSQL

Abre PowerShell como administrador y ejecuta:

```powershell
psql -U postgres
```

Dentro de psql, crea la base de datos:

```sql
CREATE DATABASE etl_db;
\q
```

### 4. Crear la Tabla TABLERO_BI

Conéctate a la base de datos `etl_db`:

```powershell
psql -U postgres -d etl_db
```

Ejecuta el contenido del archivo `create_tablero_bi.sql` o copia y pega:

```sql
CREATE TABLE IF NOT EXISTS TABLERO_BI (
    articulo_id INTEGER NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    estatus CHAR(1) NOT NULL,
    unidad_venta VARCHAR(20),
    clave_articulo VARCHAR(20) NOT NULL,
    PRIMARY KEY (articulo_id, clave_articulo)
);
```

Sal de psql:

```sql
\q
```

## Ejecución del ETL

### Ejecutar el proceso de carga

Navega a la carpeta del proyecto:

```powershell
cd 'C:\Users\chave\Documents\prueba_ Black_Sheeper\bi'
```

Ejecuta el script ETL:

```powershell
python etl_script.py
```

### Salida esperada

```
Iniciando conexión a Firebird...
Conexión a Firebird exitosa.
Se extrajeron 5 filas de Firebird.
Iniciando conexión a PostgreSQL...
Conexión a PostgreSQL exitosa.
Truncando la tabla TABLERO_BI en PostgreSQL...
Tabla TABLERO_BI truncada.
Insertando datos en TABLERO_BI...
Se insertaron 5 filas en TABLERO_BI.
Conexión a Firebird cerrada.
Conexión a PostgreSQL cerrada.
```

## Verificación de Datos

Para verificar que los datos se cargaron correctamente:

```powershell
psql -U postgres -d etl_db
```

Consulta la tabla:

```sql
SELECT * FROM TABLERO_BI;
```

Deberías ver algo como:

```
 articulo_id |                     nombre                     | estatus | unidad_venta | clave_articulo
-------------+------------------------------------------------+---------+--------------+----------------
        3356 | Agua Mineral Natural Coto 2L                   | A       | Pieza        | Prueba1
        3358 | P. Higienico D/H Soft X 30 Campanita Bol 12 M2 | A       | Pieza        | Cuadrado
        3360 | Locion Zanahoria FPS 10 Hawaiian Tropic 240ml  | A       | Pieza        | LZ10
        3362 | Yerba Mate Despalada Rosamonte Paq 500 Grm     | A       | Pieza        | MATEYDR
        3364 | Chupetin Tuti Fruti Mr. Pop´s Bsa 480 Grm      | A       | Pieza        | ChupetinTFM
(5 filas)
```

## Funcionamiento del ETL

El proceso realiza los siguientes pasos:

1. **Extracción (Extract):** Conecta a Firebird y ejecuta un JOIN entre `ARTICULOS` y `CLAVES_ARTICULOS`
2. **Transformación (Transform):** Convierte tipos de datos Decimal a float para compatibilidad con PostgreSQL
3. **Carga (Load):** Realiza un TRUNCATE de `TABLERO_BI` y recarga todos los datos (carga completa)

**Importante:** Este es un proceso de carga completa. Cada ejecución borra todos los datos existentes y los reemplaza con los datos actuales de Firebird.

## Solución de Problemas

### Error: "no existe la relación tablero_bi"

Asegúrate de conectarte a la base de datos correcta:

```powershell
# ❌ Incorrecto (conecta a la base 'postgres')
psql -U postgres

# ✅ Correcto (conecta a la base 'etl_db')
psql -U postgres -d etl_db
```

### Error de conexión a Firebird

Verifica que la ruta al archivo `.FDB` sea correcta y que el servicio de Firebird esté ejecutándose.

### Advertencia de código de página en psql

La advertencia sobre código de página (850 vs 1252) es normal en Windows y no afecta la funcionalidad del ETL.
