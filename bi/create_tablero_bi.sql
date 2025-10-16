-- SQL para crear la tabla TABLERO_BI en PostgreSQL

CREATE TABLE IF NOT EXISTS TABLERO_BI (
    articulo_id INTEGER NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    estatus CHAR(1) NOT NULL,
    unidad_venta VARCHAR(20),
    clave_articulo VARCHAR(20) NOT NULL,
    PRIMARY KEY (articulo_id, clave_articulo)
);

-- Opcional: Para borrar y recrear la tabla cada vez que se ejecute el script
-- DROP TABLE IF EXISTS TABLERO_BI;
-- CREATE TABLE TABLERO_BI (
--     articulo_id INTEGER NOT NULL,
--     nombre VARCHAR(200) NOT NULL,
--     estatus CHAR(1) NOT NULL,
--     unidad_venta VARCHAR(20),
--     clave_articulo VARCHAR(20) NOT NULL,
--     PRIMARY KEY (articulo_id, clave_articulo)
-- );
