package pe.edu.pucp.tiendavirtual.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pe.edu.pucp.tiendavirtual.modelo.Orden;

import java.time.LocalDate;
import java.util.List;

/**
 * Repositorio de analítica: contiene las consultas a la base de datos
 * necesarias para generar los KPIs del dashboard.
 *
 * Extiende JpaRepository<Orden, Integer> porque consultamos la tabla ORDEN
 * como punto de entrada principal para todas las métricas.
 *
 * Las anotaciones @Query usan JPQL (Java Persistence Query Language),
 * que es similar a SQL pero trabaja con los objetos Java (Orden, ItemOrden, etc.)
 * en lugar de las tablas directamente.
 */
public interface AnalíticaRepository_TAREA extends JpaRepository<Orden, Integer> {

    /**
     * CONSULTA 1: Ventas totales (sin IGV) agrupadas por mes.
     *
     * Usamos nativeQuery = true para escribir SQL puro de MySQL.
     * Esto es más simple y compatible con cualquier versión de Hibernate.
     *
     * Lo que hace cada parte:
     * - YEAR(fecha), MONTH(fecha): extrae el año y mes de la columna fecha
     * - SUM(subTotal): suma todos los subtotales del grupo (mes+año)
     * - WHERE fecha >= :fechaInicio: filtra solo los últimos 12 meses
     * - GROUP BY: agrupa por año y mes
     * - ORDER BY: ordena cronológicamente (del más viejo al más nuevo)
     *
     * Retorna filas con 3 columnas:
     * - [0] = año (Long)
     * - [1] = mes (Long, 1=enero, 12=diciembre)
     * - [2] = total de ventas del mes (BigDecimal)
     */
    @Query(value = """
            SELECT YEAR(fecha), MONTH(fecha), SUM(subTotal)
            FROM ORDEN
            WHERE fecha >= :fechaInicio
            GROUP BY YEAR(fecha), MONTH(fecha)
            ORDER BY YEAR(fecha) ASC, MONTH(fecha) ASC
            """, nativeQuery = true)
    List<Object[]> ventasPorMes(@Param("fechaInicio") LocalDate fechaInicio);

    /**
     * CONSULTA 2: Cantidad de productos vendidos, agrupados por mes y código de producto.
     *
     * Hace un JOIN entre ORDEN e ITEMORDEN para acceder a los productos de cada orden.
     * Usamos SQL nativo (nativeQuery = true) con los nombres reales de las tablas.
     *
     * - JOIN ITEMORDEN io ON io.idOrden = o.id: une cada orden con sus ítems
     * - io.codigoProducto: el código del producto de cada ítem
     * - SUM(io.cantidad): suma las cantidades del mismo producto en el mismo mes
     *
     * Retorna filas con 4 columnas:
     * - [0] = año (Long)
     * - [1] = mes (Long)
     * - [2] = código del producto (String)
     * - [3] = cantidad total vendida (Long)
     */
    @Query(value = """
            SELECT YEAR(o.fecha), MONTH(o.fecha), io.codigoProducto, SUM(io.cantidad)
            FROM ORDEN o
            JOIN ITEMORDEN io ON io.idOrden = o.id
            WHERE o.fecha >= :fechaInicio
            GROUP BY YEAR(o.fecha), MONTH(o.fecha), io.codigoProducto
            ORDER BY YEAR(o.fecha) ASC, MONTH(o.fecha) ASC, io.codigoProducto ASC
            """, nativeQuery = true)
    List<Object[]> productosPorMes(@Param("fechaInicio") LocalDate fechaInicio);

    /**
     * CONSULTA 3: Ventas totales (sin IGV) agrupadas por cliente, últimos 3 meses.
     *
     * Hace JOINs entre 3 tablas: ORDEN → CARRITO → CLIENTE
     * para llegar al nombre del cliente que realizó cada orden.
     *
     * - JOIN CARRITO ca ON ca.id = o.idCarrito: une la orden con su carrito
     * - JOIN CLIENTE c ON c.id = ca.idCliente: une el carrito con el cliente
     * - GROUP BY c.id: agrupa todas las órdenes del mismo cliente
     * - ORDER BY SUM(...) DESC: los clientes con más ventas aparecen primero
     *
     * Retorna filas con 3 columnas:
     * - [0] = nombre del cliente (String)
     * - [1] = apellidos del cliente (String)
     * - [2] = suma de subtotales del cliente (BigDecimal)
     */
    @Query(value = """
            SELECT c.nombre, c.apellidos, SUM(o.subTotal)
            FROM ORDEN o
            JOIN CARRITO ca ON ca.id = o.idCarrito
            JOIN CLIENTE c ON c.id = ca.idCliente
            WHERE o.fecha >= :fechaInicio
            GROUP BY c.id, c.nombre, c.apellidos
            ORDER BY SUM(o.subTotal) DESC
            """, nativeQuery = true)
    List<Object[]> ventasPorCliente(@Param("fechaInicio") LocalDate fechaInicio);
}
