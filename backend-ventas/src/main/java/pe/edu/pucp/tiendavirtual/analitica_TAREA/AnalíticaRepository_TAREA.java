package pe.edu.pucp.tiendavirtual.analitica_TAREA;

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
     * Esta query agrupa todas las órdenes por año y mes, y suma el subTotal
     * (que es el monto sin IGV) de cada grupo.
     *
     * Lo que hace cada parte:
     * - YEAR(o.fecha), MONTH(o.fecha): extrae el año y mes de la fecha de la orden
     * - SUM(o.subTotal): suma todos los subtotales del grupo (mes+año)
     * - WHERE o.fecha >= :fechaInicio: filtra solo los últimos 12 meses
     * - GROUP BY: agrupa por año y mes
     * - ORDER BY: ordena cronológicamente (del más viejo al más nuevo)
     *
     * Retorna un arreglo de objetos Object[] donde:
     * - [0] = año (Integer)
     * - [1] = mes (Integer, 1=enero, 12=diciembre)
     * - [2] = total de ventas del mes (BigDecimal)
     */
    @Query("""
            SELECT YEAR(o.fecha), MONTH(o.fecha), SUM(o.subTotal)
            FROM Orden o
            WHERE o.fecha >= :fechaInicio
            GROUP BY YEAR(o.fecha), MONTH(o.fecha)
            ORDER BY YEAR(o.fecha) ASC, MONTH(o.fecha) ASC
            """)
    List<Object[]> ventasPorMes(@Param("fechaInicio") LocalDate fechaInicio);

    /**
     * CONSULTA 2: Cantidad de productos vendidos, agrupados por mes y código de producto.
     *
     * Esta query hace un JOIN entre la tabla ORDEN y sus ITEMORDEN (los ítems de cada orden).
     * Luego agrupa por año, mes y código de producto para saber cuántas unidades
     * de cada producto se vendieron cada mes.
     *
     * - "o JOIN o.items i": hace el JOIN con la lista de ítems de cada orden
     * - i.codigoProducto: el código del producto de cada ítem
     * - SUM(i.cantidad): suma las cantidades del mismo producto en el mismo mes
     *
     * Retorna Object[] donde:
     * - [0] = año (Integer)
     * - [1] = mes (Integer)
     * - [2] = código del producto (String)
     * - [3] = cantidad total vendida (Long/Integer)
     */
    @Query("""
            SELECT YEAR(o.fecha), MONTH(o.fecha), i.codigoProducto, SUM(i.cantidad)
            FROM Orden o JOIN o.items i
            WHERE o.fecha >= :fechaInicio
            GROUP BY YEAR(o.fecha), MONTH(o.fecha), i.codigoProducto
            ORDER BY YEAR(o.fecha) ASC, MONTH(o.fecha) ASC, i.codigoProducto ASC
            """)
    List<Object[]> productosPorMes(@Param("fechaInicio") LocalDate fechaInicio);

    /**
     * CONSULTA 3: Ventas totales (sin IGV) agrupadas por cliente, últimos 3 meses.
     *
     * Hace múltiples JOINs para llegar desde ORDEN hasta CLIENTE:
     * ORDEN → CARRITO → CLIENTE
     *
     * - "o JOIN o.carrito ca": une la orden con su carrito
     * - "JOIN ca.cliente c": une el carrito con el cliente que lo creó
     * - GROUP BY c.id: agrupa todas las órdenes del mismo cliente
     * - ORDER BY ... DESC: los clientes con más ventas aparecen primero
     *
     * Retorna Object[] donde:
     * - [0] = nombre del cliente (String)
     * - [1] = apellidos del cliente (String)
     * - [2] = suma de subtotales del cliente (BigDecimal)
     */
    @Query("""
            SELECT c.nombre, c.apellidos, SUM(o.subTotal)
            FROM Orden o JOIN o.carrito ca JOIN ca.cliente c
            WHERE o.fecha >= :fechaInicio
            GROUP BY c.id, c.nombre, c.apellidos
            ORDER BY SUM(o.subTotal) DESC
            """)
    List<Object[]> ventasPorCliente(@Param("fechaInicio") LocalDate fechaInicio);
}
