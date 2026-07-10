SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- LOGISTICA: 8 productos (3 nuevos respecto al original)
-- ============================================================
USE logistica;

TRUNCATE TABLE PRODUCTO;

INSERT INTO PRODUCTO (id, codigo, nombre, descripcion, precio, stock) VALUES
    (1, 'PROD000001', 'Laptop ASUS X515',        'Laptop 14 pulg i5 8GB 512GB SSD',     799.99, 15),
    (2, 'PROD000002', 'Samsung Galaxy S23',       'Telefono 128GB 8GB RAM camara 50MP',  699.99, 10),
    (3, 'PROD000003', 'Auriculares Sony XM5',     'Cancelacion de ruido premium',         349.99, 20),
    (4, 'PROD000004', 'Apple iPad Air',           'Tableta 10.9 pulg WiFi 64GB',          599.99, 12),
    (5, 'PROD000005', 'Mouse Logitech MX3',       'Mouse inalambrico ergonomico',          99.99, 25),
    (6, 'PROD000006', 'Teclado Mecanico Keychron','Teclado RGB switches tactiles',        149.99, 18),
    (7, 'PROD000007', 'Monitor LG 27 4K',         'Monitor 27 pulg IPS 4K 60Hz',         549.99,  8),
    (8, 'PROD000008', 'Webcam Logitech C920',     'Webcam Full HD 1080p autofocus',       129.99, 22);

-- ============================================================
-- VENTAS: 10 clientes, 60 carritos, 99 items, 60 ordenes
-- Fechas: julio 2025 - julio 2026 (ultimos 12 meses)
-- ============================================================
USE ventas;

TRUNCATE TABLE ITEMORDEN;
TRUNCATE TABLE ITEMCARRITO;
TRUNCATE TABLE ORDEN;
TRUNCATE TABLE CARRITO;
TRUNCATE TABLE CLIENTE;

INSERT INTO CLIENTE (id, dni, nombre, apellidos) VALUES
    ( 1, '12345678', 'Juan',    'Perez Lopez'),
    ( 2, '23456789', 'Maria',   'Gonzalez Rodriguez'),
    ( 3, '34567890', 'Carlos',  'Martinez Sanchez'),
    ( 4, '45678901', 'Ana',     'Hernandez Fernandez'),
    ( 5, '56789012', 'Pedro',   'Diaz Ramirez'),
    ( 6, '67890123', 'Sofia',   'Torres Vargas'),
    ( 7, '78901234', 'Luis',    'Mamani Quispe'),
    ( 8, '89012345', 'Elena',   'Rojas Castillo'),
    ( 9, '90123456', 'Roberto', 'Flores Mendez'),
    (10, '01234567', 'Carla',   'Vega Huaman');

-- 60 carritos: 4-7 por mes, julio 2025 -> julio 2026
INSERT INTO CARRITO (id, idCliente, nombre, fecha) VALUES
    -- Julio 2025
    ( 1,  1, 'Pedido de Juan - Jul 2025',      '2025-07-05'),
    ( 2,  2, 'Pedido de Maria - Jul 2025',     '2025-07-12'),
    ( 3,  3, 'Pedido de Carlos - Jul 2025',    '2025-07-18'),
    ( 4,  4, 'Pedido de Ana - Jul 2025',       '2025-07-25'),
    -- Agosto 2025
    ( 5,  5, 'Pedido de Pedro - Ago 2025',     '2025-08-03'),
    ( 6,  6, 'Pedido de Sofia - Ago 2025',     '2025-08-10'),
    ( 7,  7, 'Pedido de Luis - Ago 2025',      '2025-08-17'),
    ( 8,  8, 'Pedido de Elena - Ago 2025',     '2025-08-22'),
    -- Septiembre 2025
    ( 9,  9, 'Pedido de Roberto - Sep 2025',   '2025-09-05'),
    (10, 10, 'Pedido de Carla - Sep 2025',     '2025-09-11'),
    (11,  1, 'Pedido de Juan - Sep 2025',      '2025-09-18'),
    (12,  2, 'Pedido de Maria - Sep 2025',     '2025-09-24'),
    -- Octubre 2025
    (13,  3, 'Pedido de Carlos - Oct 2025',    '2025-10-07'),
    (14,  4, 'Pedido de Ana - Oct 2025',       '2025-10-14'),
    (15,  5, 'Pedido de Pedro - Oct 2025',     '2025-10-21'),
    (16,  6, 'Pedido de Sofia - Oct 2025',     '2025-10-28'),
    -- Noviembre 2025
    (17,  7, 'Pedido de Luis - Nov 2025',      '2025-11-04'),
    (18,  8, 'Pedido de Elena - Nov 2025',     '2025-11-11'),
    (19,  9, 'Pedido de Roberto - Nov 2025',   '2025-11-18'),
    (20, 10, 'Pedido de Carla - Nov 2025',     '2025-11-25'),
    (21,  1, 'Pedido de Juan 2 - Nov 2025',    '2025-11-29'),
    -- Diciembre 2025 (temporada alta: 7 pedidos)
    (22,  2, 'Pedido de Maria - Dic 2025',     '2025-12-03'),
    (23,  3, 'Pedido de Carlos - Dic 2025',    '2025-12-07'),
    (24,  4, 'Pedido de Ana - Dic 2025',       '2025-12-11'),
    (25,  5, 'Pedido de Pedro - Dic 2025',     '2025-12-15'),
    (26,  6, 'Pedido de Sofia - Dic 2025',     '2025-12-18'),
    (27,  7, 'Pedido de Luis - Dic 2025',      '2025-12-21'),
    (28,  8, 'Pedido de Elena - Dic 2025',     '2025-12-26'),
    -- Enero 2026
    (29,  9, 'Pedido de Roberto - Ene 2026',   '2026-01-08'),
    (30, 10, 'Pedido de Carla - Ene 2026',     '2026-01-14'),
    (31,  1, 'Pedido de Juan - Ene 2026',      '2026-01-20'),
    (32,  2, 'Pedido de Maria 2 - Ene 2026',   '2026-01-27'),
    -- Febrero 2026
    (33,  3, 'Pedido de Carlos - Feb 2026',    '2026-02-05'),
    (34,  4, 'Pedido de Ana - Feb 2026',       '2026-02-12'),
    (35,  5, 'Pedido de Pedro - Feb 2026',     '2026-02-19'),
    (36,  6, 'Pedido de Sofia 2 - Feb 2026',   '2026-02-25'),
    -- Marzo 2026
    (37,  7, 'Pedido de Luis - Mar 2026',      '2026-03-04'),
    (38,  8, 'Pedido de Elena - Mar 2026',     '2026-03-10'),
    (39,  9, 'Pedido de Roberto - Mar 2026',   '2026-03-17'),
    (40, 10, 'Pedido de Carla - Mar 2026',     '2026-03-23'),
    (41,  1, 'Pedido de Juan 2 - Mar 2026',    '2026-03-28'),
    -- Abril 2026
    (42,  2, 'Pedido de Maria - Abr 2026',     '2026-04-05'),
    (43,  3, 'Pedido de Carlos - Abr 2026',    '2026-04-10'),
    (44,  4, 'Pedido de Ana - Abr 2026',       '2026-04-16'),
    (45,  5, 'Pedido de Pedro - Abr 2026',     '2026-04-22'),
    (46,  6, 'Pedido de Sofia - Abr 2026',     '2026-04-28'),
    -- Mayo 2026
    (47,  7, 'Pedido de Luis - May 2026',      '2026-05-06'),
    (48,  8, 'Pedido de Elena - May 2026',     '2026-05-12'),
    (49,  9, 'Pedido de Roberto - May 2026',   '2026-05-18'),
    (50, 10, 'Pedido de Carla - May 2026',     '2026-05-24'),
    (51,  1, 'Pedido de Juan - May 2026',      '2026-05-30'),
    -- Junio 2026
    (52,  2, 'Pedido de Maria - Jun 2026',     '2026-06-04'),
    (53,  3, 'Pedido de Carlos - Jun 2026',    '2026-06-09'),
    (54,  4, 'Pedido de Ana - Jun 2026',       '2026-06-14'),
    (55,  5, 'Pedido de Pedro - Jun 2026',     '2026-06-19'),
    (56,  6, 'Pedido de Sofia - Jun 2026',     '2026-06-24'),
    -- Julio 2026
    (57,  7, 'Pedido de Luis - Jul 2026',      '2026-07-01'),
    (58,  8, 'Pedido de Elena - Jul 2026',     '2026-07-04'),
    (59,  9, 'Pedido de Roberto - Jul 2026',   '2026-07-07'),
    (60, 10, 'Pedido de Carla - Jul 2026',     '2026-07-09');

-- 99 items de carrito (1-3 items por carrito)
-- subTotal = precio * cantidad  (precios: P1=799.99, P2=699.99, P3=349.99,
--   P4=599.99, P5=99.99, P6=149.99, P7=549.99, P8=129.99)
INSERT INTO ITEMCARRITO (id, idCarrito, codigoProducto, cantidad, subTotal) VALUES
    -- Carrito 1  (Juan,    Jul 2025)
    ( 1,  1, 'PROD000001', 1,  799.99),
    -- Carrito 2  (Maria,   Jul 2025)
    ( 2,  2, 'PROD000002', 1,  699.99),
    ( 3,  2, 'PROD000005', 2,  199.98),
    -- Carrito 3  (Carlos,  Jul 2025)
    ( 4,  3, 'PROD000004', 1,  599.99),
    -- Carrito 4  (Ana,     Jul 2025)
    ( 5,  4, 'PROD000006', 2,  299.98),
    -- Carrito 5  (Pedro,   Ago 2025)
    ( 6,  5, 'PROD000007', 1,  549.99),
    ( 7,  5, 'PROD000008', 1,  129.99),
    -- Carrito 6  (Sofia,   Ago 2025)
    ( 8,  6, 'PROD000001', 1,  799.99),
    ( 9,  6, 'PROD000006', 1,  149.99),
    -- Carrito 7  (Luis,    Ago 2025)
    (10,  7, 'PROD000003', 2,  699.98),
    -- Carrito 8  (Elena,   Ago 2025)
    (11,  8, 'PROD000005', 3,  299.97),
    (12,  8, 'PROD000008', 2,  259.98),
    -- Carrito 9  (Roberto, Sep 2025)
    (13,  9, 'PROD000002', 1,  699.99),
    -- Carrito 10 (Carla,   Sep 2025)
    (14, 10, 'PROD000004', 1,  599.99),
    (15, 10, 'PROD000005', 1,   99.99),
    -- Carrito 11 (Juan,    Sep 2025)
    (16, 11, 'PROD000007', 1,  549.99),
    (17, 11, 'PROD000006', 2,  299.98),
    -- Carrito 12 (Maria,   Sep 2025)
    (18, 12, 'PROD000001', 1,  799.99),
    -- Carrito 13 (Carlos,  Oct 2025)
    (19, 13, 'PROD000003', 1,  349.99),
    (20, 13, 'PROD000008', 1,  129.99),
    -- Carrito 14 (Ana,     Oct 2025)
    (21, 14, 'PROD000002', 2, 1399.98),
    -- Carrito 15 (Pedro,   Oct 2025)
    (22, 15, 'PROD000007', 2, 1099.98),
    -- Carrito 16 (Sofia,   Oct 2025)
    (23, 16, 'PROD000005', 2,  199.98),
    (24, 16, 'PROD000006', 1,  149.99),
    -- Carrito 17 (Luis,    Nov 2025)
    (25, 17, 'PROD000001', 1,  799.99),
    (26, 17, 'PROD000004', 1,  599.99),
    -- Carrito 18 (Elena,   Nov 2025)
    (27, 18, 'PROD000008', 2,  259.98),
    (28, 18, 'PROD000003', 1,  349.99),
    -- Carrito 19 (Roberto, Nov 2025)
    (29, 19, 'PROD000002', 1,  699.99),
    (30, 19, 'PROD000006', 2,  299.98),
    -- Carrito 20 (Carla,   Nov 2025)
    (31, 20, 'PROD000007', 1,  549.99),
    -- Carrito 21 (Juan,    Nov 2025)
    (32, 21, 'PROD000005', 3,  299.97),
    -- Carrito 22 (Maria,   Dic 2025)
    (33, 22, 'PROD000001', 2, 1599.98),
    -- Carrito 23 (Carlos,  Dic 2025)
    (34, 23, 'PROD000002', 1,  699.99),
    (35, 23, 'PROD000004', 1,  599.99),
    -- Carrito 24 (Ana,     Dic 2025)
    (36, 24, 'PROD000003', 2,  699.98),
    (37, 24, 'PROD000007', 1,  549.99),
    -- Carrito 25 (Pedro,   Dic 2025)
    (38, 25, 'PROD000001', 1,  799.99),
    (39, 25, 'PROD000006', 3,  449.97),
    -- Carrito 26 (Sofia,   Dic 2025)
    (40, 26, 'PROD000008', 2,  259.98),
    (41, 26, 'PROD000005', 2,  199.98),
    -- Carrito 27 (Luis,    Dic 2025)
    (42, 27, 'PROD000002', 2, 1399.98),
    -- Carrito 28 (Elena,   Dic 2025)
    (43, 28, 'PROD000007', 1,  549.99),
    (44, 28, 'PROD000001', 1,  799.99),
    -- Carrito 29 (Roberto, Ene 2026)
    (45, 29, 'PROD000004', 2, 1199.98),
    -- Carrito 30 (Carla,   Ene 2026)
    (46, 30, 'PROD000003', 1,  349.99),
    (47, 30, 'PROD000005', 3,  299.97),
    -- Carrito 31 (Juan,    Ene 2026)
    (48, 31, 'PROD000006', 2,  299.98),
    (49, 31, 'PROD000008', 2,  259.98),
    -- Carrito 32 (Maria,   Ene 2026)
    (50, 32, 'PROD000001', 1,  799.99),
    -- Carrito 33 (Carlos,  Feb 2026)
    (51, 33, 'PROD000007', 1,  549.99),
    (52, 33, 'PROD000003', 2,  699.98),
    -- Carrito 34 (Ana,     Feb 2026)
    (53, 34, 'PROD000002', 1,  699.99),
    (54, 34, 'PROD000008', 1,  129.99),
    -- Carrito 35 (Pedro,   Feb 2026)
    (55, 35, 'PROD000005', 2,  199.98),
    (56, 35, 'PROD000006', 2,  299.98),
    -- Carrito 36 (Sofia,   Feb 2026)
    (57, 36, 'PROD000004', 1,  599.99),
    -- Carrito 37 (Luis,    Mar 2026)
    (58, 37, 'PROD000001', 1,  799.99),
    (59, 37, 'PROD000007', 1,  549.99),
    -- Carrito 38 (Elena,   Mar 2026)
    (60, 38, 'PROD000002', 2, 1399.98),
    (61, 38, 'PROD000006', 1,  149.99),
    -- Carrito 39 (Roberto, Mar 2026)
    (62, 39, 'PROD000003', 3, 1049.97),
    -- Carrito 40 (Carla,   Mar 2026)
    (63, 40, 'PROD000008', 3,  389.97),
    (64, 40, 'PROD000005', 2,  199.98),
    -- Carrito 41 (Juan,    Mar 2026)
    (65, 41, 'PROD000004', 2, 1199.98),
    -- Carrito 42 (Maria,   Abr 2026)
    (66, 42, 'PROD000001', 1,  799.99),
    (67, 42, 'PROD000003', 1,  349.99),
    -- Carrito 43 (Carlos,  Abr 2026)
    (68, 43, 'PROD000007', 2, 1099.98),
    -- Carrito 44 (Ana,     Abr 2026)
    (69, 44, 'PROD000006', 3,  449.97),
    (70, 44, 'PROD000008', 2,  259.98),
    -- Carrito 45 (Pedro,   Abr 2026)
    (71, 45, 'PROD000002', 1,  699.99),
    (72, 45, 'PROD000005', 3,  299.97),
    -- Carrito 46 (Sofia,   Abr 2026)
    (73, 46, 'PROD000004', 1,  599.99),
    (74, 46, 'PROD000001', 1,  799.99),
    -- Carrito 47 (Luis,    May 2026)
    (75, 47, 'PROD000007', 1,  549.99),
    (76, 47, 'PROD000006', 2,  299.98),
    -- Carrito 48 (Elena,   May 2026)
    (77, 48, 'PROD000001', 2, 1599.98),
    (78, 48, 'PROD000008', 1,  129.99),
    -- Carrito 49 (Roberto, May 2026)
    (79, 49, 'PROD000003', 1,  349.99),
    (80, 49, 'PROD000002', 1,  699.99),
    -- Carrito 50 (Carla,   May 2026)
    (81, 50, 'PROD000005', 2,  199.98),
    (82, 50, 'PROD000004', 1,  599.99),
    -- Carrito 51 (Juan,    May 2026)
    (83, 51, 'PROD000006', 1,  149.99),
    (84, 51, 'PROD000007', 1,  549.99),
    -- Carrito 52 (Maria,   Jun 2026)
    (85, 52, 'PROD000002', 2, 1399.98),
    -- Carrito 53 (Carlos,  Jun 2026)
    (86, 53, 'PROD000001', 1,  799.99),
    (87, 53, 'PROD000008', 3,  389.97),
    -- Carrito 54 (Ana,     Jun 2026)
    (88, 54, 'PROD000004', 2, 1199.98),
    (89, 54, 'PROD000006', 1,  149.99),
    -- Carrito 55 (Pedro,   Jun 2026)
    (90, 55, 'PROD000003', 3, 1049.97),
    (91, 55, 'PROD000005', 1,   99.99),
    -- Carrito 56 (Sofia,   Jun 2026)
    (92, 56, 'PROD000007', 2, 1099.98),
    -- Carrito 57 (Luis,    Jul 2026)
    (93, 57, 'PROD000001', 1,  799.99),
    (94, 57, 'PROD000005', 2,  199.98),
    -- Carrito 58 (Elena,   Jul 2026)
    (95, 58, 'PROD000002', 1,  699.99),
    (96, 58, 'PROD000006', 2,  299.98),
    -- Carrito 59 (Roberto, Jul 2026)
    (97, 59, 'PROD000004', 1,  599.99),
    (98, 59, 'PROD000008', 2,  259.98),
    -- Carrito 60 (Carla,   Jul 2026)
    (99, 60, 'PROD000003', 2,  699.98);

-- 60 ordenes con subTotal/igv/total calculados:
--   igv  = ROUND(subTotal * 0.18, 2)
--   total = subTotal + igv
INSERT INTO ORDEN (id, numero, idCarrito, fecha, subTotal, igv, total) VALUES
    -- Julio 2025
    ( 1, 'ORD0000001',  1, '2025-07-05',  799.99, 144.00,  943.99),
    ( 2, 'ORD0000002',  2, '2025-07-12',  899.97, 161.99, 1061.96),
    ( 3, 'ORD0000003',  3, '2025-07-18',  599.99, 108.00,  707.99),
    ( 4, 'ORD0000004',  4, '2025-07-25',  299.98,  54.00,  353.98),
    -- Agosto 2025
    ( 5, 'ORD0000005',  5, '2025-08-03',  679.98, 122.40,  802.38),
    ( 6, 'ORD0000006',  6, '2025-08-10',  949.98, 171.00, 1120.98),
    ( 7, 'ORD0000007',  7, '2025-08-17',  699.98, 126.00,  825.98),
    ( 8, 'ORD0000008',  8, '2025-08-22',  559.95, 100.79,  660.74),
    -- Septiembre 2025
    ( 9, 'ORD0000009',  9, '2025-09-05',  699.99, 126.00,  825.99),
    (10, 'ORD0000010', 10, '2025-09-11',  699.98, 126.00,  825.98),
    (11, 'ORD0000011', 11, '2025-09-18',  849.97, 152.99, 1002.96),
    (12, 'ORD0000012', 12, '2025-09-24',  799.99, 144.00,  943.99),
    -- Octubre 2025
    (13, 'ORD0000013', 13, '2025-10-07',  479.98,  86.40,  566.38),
    (14, 'ORD0000014', 14, '2025-10-14', 1399.98, 252.00, 1651.98),
    (15, 'ORD0000015', 15, '2025-10-21', 1099.98, 198.00, 1297.98),
    (16, 'ORD0000016', 16, '2025-10-28',  349.97,  62.99,  412.96),
    -- Noviembre 2025
    (17, 'ORD0000017', 17, '2025-11-04', 1399.98, 252.00, 1651.98),
    (18, 'ORD0000018', 18, '2025-11-11',  609.97, 109.79,  719.76),
    (19, 'ORD0000019', 19, '2025-11-18',  999.97, 179.99, 1179.96),
    (20, 'ORD0000020', 20, '2025-11-25',  549.99,  99.00,  648.99),
    (21, 'ORD0000021', 21, '2025-11-29',  299.97,  53.99,  353.96),
    -- Diciembre 2025 (temporada alta)
    (22, 'ORD0000022', 22, '2025-12-03', 1599.98, 288.00, 1887.98),
    (23, 'ORD0000023', 23, '2025-12-07', 1299.98, 234.00, 1533.98),
    (24, 'ORD0000024', 24, '2025-12-11', 1249.97, 224.99, 1474.96),
    (25, 'ORD0000025', 25, '2025-12-15', 1249.96, 224.99, 1474.95),
    (26, 'ORD0000026', 26, '2025-12-18',  459.96,  82.79,  542.75),
    (27, 'ORD0000027', 27, '2025-12-21', 1399.98, 252.00, 1651.98),
    (28, 'ORD0000028', 28, '2025-12-26', 1349.98, 243.00, 1592.98),
    -- Enero 2026
    (29, 'ORD0000029', 29, '2026-01-08', 1199.98, 216.00, 1415.98),
    (30, 'ORD0000030', 30, '2026-01-14',  649.96, 116.99,  766.95),
    (31, 'ORD0000031', 31, '2026-01-20',  559.96, 100.79,  660.75),
    (32, 'ORD0000032', 32, '2026-01-27',  799.99, 144.00,  943.99),
    -- Febrero 2026
    (33, 'ORD0000033', 33, '2026-02-05', 1249.97, 224.99, 1474.96),
    (34, 'ORD0000034', 34, '2026-02-12',  829.98, 149.40,  979.38),
    (35, 'ORD0000035', 35, '2026-02-19',  499.96,  89.99,  589.95),
    (36, 'ORD0000036', 36, '2026-02-25',  599.99, 108.00,  707.99),
    -- Marzo 2026
    (37, 'ORD0000037', 37, '2026-03-04', 1349.98, 243.00, 1592.98),
    (38, 'ORD0000038', 38, '2026-03-10', 1549.97, 278.99, 1828.96),
    (39, 'ORD0000039', 39, '2026-03-17', 1049.97, 188.99, 1238.96),
    (40, 'ORD0000040', 40, '2026-03-23',  589.95, 106.19,  696.14),
    (41, 'ORD0000041', 41, '2026-03-28', 1199.98, 216.00, 1415.98),
    -- Abril 2026
    (42, 'ORD0000042', 42, '2026-04-05', 1149.98, 207.00, 1356.98),
    (43, 'ORD0000043', 43, '2026-04-10', 1099.98, 198.00, 1297.98),
    (44, 'ORD0000044', 44, '2026-04-16',  709.95, 127.79,  837.74),
    (45, 'ORD0000045', 45, '2026-04-22',  999.96, 179.99, 1179.95),
    (46, 'ORD0000046', 46, '2026-04-28', 1399.98, 252.00, 1651.98),
    -- Mayo 2026
    (47, 'ORD0000047', 47, '2026-05-06',  849.97, 152.99, 1002.96),
    (48, 'ORD0000048', 48, '2026-05-12', 1729.97, 311.39, 2041.36),
    (49, 'ORD0000049', 49, '2026-05-18', 1049.98, 189.00, 1238.98),
    (50, 'ORD0000050', 50, '2026-05-24',  799.97, 143.99,  943.96),
    (51, 'ORD0000051', 51, '2026-05-30',  699.98, 126.00,  825.98),
    -- Junio 2026
    (52, 'ORD0000052', 52, '2026-06-04', 1399.98, 252.00, 1651.98),
    (53, 'ORD0000053', 53, '2026-06-09', 1189.96, 214.19, 1404.15),
    (54, 'ORD0000054', 54, '2026-06-14', 1349.97, 242.99, 1592.96),
    (55, 'ORD0000055', 55, '2026-06-19', 1149.96, 206.99, 1356.95),
    (56, 'ORD0000056', 56, '2026-06-24', 1099.98, 198.00, 1297.98),
    -- Julio 2026
    (57, 'ORD0000057', 57, '2026-07-01',  999.97, 179.99, 1179.96),
    (58, 'ORD0000058', 58, '2026-07-04',  999.97, 179.99, 1179.96),
    (59, 'ORD0000059', 59, '2026-07-07',  859.97, 154.79, 1014.76),
    (60, 'ORD0000060', 60, '2026-07-09',  699.98, 126.00,  825.98);

-- 99 items de orden (espejo exacto de ITEMCARRITO, referenciando idOrden)
INSERT INTO ITEMORDEN (id, idOrden, codigoProducto, cantidad, subTotal) VALUES
    ( 1,  1, 'PROD000001', 1,  799.99),
    ( 2,  2, 'PROD000002', 1,  699.99),
    ( 3,  2, 'PROD000005', 2,  199.98),
    ( 4,  3, 'PROD000004', 1,  599.99),
    ( 5,  4, 'PROD000006', 2,  299.98),
    ( 6,  5, 'PROD000007', 1,  549.99),
    ( 7,  5, 'PROD000008', 1,  129.99),
    ( 8,  6, 'PROD000001', 1,  799.99),
    ( 9,  6, 'PROD000006', 1,  149.99),
    (10,  7, 'PROD000003', 2,  699.98),
    (11,  8, 'PROD000005', 3,  299.97),
    (12,  8, 'PROD000008', 2,  259.98),
    (13,  9, 'PROD000002', 1,  699.99),
    (14, 10, 'PROD000004', 1,  599.99),
    (15, 10, 'PROD000005', 1,   99.99),
    (16, 11, 'PROD000007', 1,  549.99),
    (17, 11, 'PROD000006', 2,  299.98),
    (18, 12, 'PROD000001', 1,  799.99),
    (19, 13, 'PROD000003', 1,  349.99),
    (20, 13, 'PROD000008', 1,  129.99),
    (21, 14, 'PROD000002', 2, 1399.98),
    (22, 15, 'PROD000007', 2, 1099.98),
    (23, 16, 'PROD000005', 2,  199.98),
    (24, 16, 'PROD000006', 1,  149.99),
    (25, 17, 'PROD000001', 1,  799.99),
    (26, 17, 'PROD000004', 1,  599.99),
    (27, 18, 'PROD000008', 2,  259.98),
    (28, 18, 'PROD000003', 1,  349.99),
    (29, 19, 'PROD000002', 1,  699.99),
    (30, 19, 'PROD000006', 2,  299.98),
    (31, 20, 'PROD000007', 1,  549.99),
    (32, 21, 'PROD000005', 3,  299.97),
    (33, 22, 'PROD000001', 2, 1599.98),
    (34, 23, 'PROD000002', 1,  699.99),
    (35, 23, 'PROD000004', 1,  599.99),
    (36, 24, 'PROD000003', 2,  699.98),
    (37, 24, 'PROD000007', 1,  549.99),
    (38, 25, 'PROD000001', 1,  799.99),
    (39, 25, 'PROD000006', 3,  449.97),
    (40, 26, 'PROD000008', 2,  259.98),
    (41, 26, 'PROD000005', 2,  199.98),
    (42, 27, 'PROD000002', 2, 1399.98),
    (43, 28, 'PROD000007', 1,  549.99),
    (44, 28, 'PROD000001', 1,  799.99),
    (45, 29, 'PROD000004', 2, 1199.98),
    (46, 30, 'PROD000003', 1,  349.99),
    (47, 30, 'PROD000005', 3,  299.97),
    (48, 31, 'PROD000006', 2,  299.98),
    (49, 31, 'PROD000008', 2,  259.98),
    (50, 32, 'PROD000001', 1,  799.99),
    (51, 33, 'PROD000007', 1,  549.99),
    (52, 33, 'PROD000003', 2,  699.98),
    (53, 34, 'PROD000002', 1,  699.99),
    (54, 34, 'PROD000008', 1,  129.99),
    (55, 35, 'PROD000005', 2,  199.98),
    (56, 35, 'PROD000006', 2,  299.98),
    (57, 36, 'PROD000004', 1,  599.99),
    (58, 37, 'PROD000001', 1,  799.99),
    (59, 37, 'PROD000007', 1,  549.99),
    (60, 38, 'PROD000002', 2, 1399.98),
    (61, 38, 'PROD000006', 1,  149.99),
    (62, 39, 'PROD000003', 3, 1049.97),
    (63, 40, 'PROD000008', 3,  389.97),
    (64, 40, 'PROD000005', 2,  199.98),
    (65, 41, 'PROD000004', 2, 1199.98),
    (66, 42, 'PROD000001', 1,  799.99),
    (67, 42, 'PROD000003', 1,  349.99),
    (68, 43, 'PROD000007', 2, 1099.98),
    (69, 44, 'PROD000006', 3,  449.97),
    (70, 44, 'PROD000008', 2,  259.98),
    (71, 45, 'PROD000002', 1,  699.99),
    (72, 45, 'PROD000005', 3,  299.97),
    (73, 46, 'PROD000004', 1,  599.99),
    (74, 46, 'PROD000001', 1,  799.99),
    (75, 47, 'PROD000007', 1,  549.99),
    (76, 47, 'PROD000006', 2,  299.98),
    (77, 48, 'PROD000001', 2, 1599.98),
    (78, 48, 'PROD000008', 1,  129.99),
    (79, 49, 'PROD000003', 1,  349.99),
    (80, 49, 'PROD000002', 1,  699.99),
    (81, 50, 'PROD000005', 2,  199.98),
    (82, 50, 'PROD000004', 1,  599.99),
    (83, 51, 'PROD000006', 1,  149.99),
    (84, 51, 'PROD000007', 1,  549.99),
    (85, 52, 'PROD000002', 2, 1399.98),
    (86, 53, 'PROD000001', 1,  799.99),
    (87, 53, 'PROD000008', 3,  389.97),
    (88, 54, 'PROD000004', 2, 1199.98),
    (89, 54, 'PROD000006', 1,  149.99),
    (90, 55, 'PROD000003', 3, 1049.97),
    (91, 55, 'PROD000005', 1,   99.99),
    (92, 56, 'PROD000007', 2, 1099.98),
    (93, 57, 'PROD000001', 1,  799.99),
    (94, 57, 'PROD000005', 2,  199.98),
    (95, 58, 'PROD000002', 1,  699.99),
    (96, 58, 'PROD000006', 2,  299.98),
    (97, 59, 'PROD000004', 1,  599.99),
    (98, 59, 'PROD000008', 2,  259.98),
    (99, 60, 'PROD000003', 2,  699.98);

-- ============================================================
-- TIENDAVIRTUAL: sincronizacion desde ventas y logistica
-- ============================================================
USE tiendavirtual;

TRUNCATE TABLE ITEMORDEN;
TRUNCATE TABLE ITEMCARRITO;
TRUNCATE TABLE ORDEN;
TRUNCATE TABLE CARRITO;
TRUNCATE TABLE PRODUCTO;
TRUNCATE TABLE CLIENTE;

INSERT INTO CLIENTE   (id, dni, nombre, apellidos)
SELECT id, dni, nombre, apellidos FROM ventas.CLIENTE;

INSERT INTO PRODUCTO  (id, codigo, nombre, descripcion, precio, stock)
SELECT id, codigo, nombre, descripcion, precio, stock FROM logistica.PRODUCTO;

INSERT INTO CARRITO   (id, idCliente, nombre, fecha)
SELECT id, idCliente, nombre, fecha FROM ventas.CARRITO;

INSERT INTO ITEMCARRITO (id, idCarrito, codigoProducto, cantidad, subTotal)
SELECT id, idCarrito, codigoProducto, cantidad, subTotal FROM ventas.ITEMCARRITO;

INSERT INTO ORDEN     (id, numero, idCarrito, fecha, subTotal, igv, total)
SELECT id, numero, idCarrito, fecha, subTotal, igv, total FROM ventas.ORDEN;

INSERT INTO ITEMORDEN (id, idOrden, codigoProducto, cantidad, subTotal)
SELECT id, idOrden, codigoProducto, cantidad, subTotal FROM ventas.ITEMORDEN;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
