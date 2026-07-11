package pe.edu.pucp.tiendavirtual.modelo;

/**
 * DTO para transportar los datos de productos vendidos por mes.
 *
 * Cada objeto de esta clase representa UNA FILA de la tabla de analítica:
 * cuántas unidades de UN producto se vendieron en UN mes específico.
 *
 * El frontend juntará múltiples filas para armar la tabla completa donde:
 * - Las filas son los productos (por código)
 * - Las columnas son los meses
 * - El valor de cada celda es la cantidad vendida
 *
 * Ejemplo: { "mes": "2024-03", "codigoProducto": "PROD-001", "cantidad": 12 }
 */
public class ProductoPorMesDTO_TAREA {

    /**
     * El mes en formato "YYYY-MM", igual que en VentasPorMesDTO_TAREA.
     */
    private String mes;

    /**
     * El código único del producto, por ejemplo "PROD-001".
     * Se usa el código (no el nombre) porque es la clave en la base de datos.
     */
    private String codigoProducto;

    /**
     * Total de unidades vendidas de ese producto en ese mes.
     */
    private Integer cantidad;

    /**
     * Constructor que crea un registro de producto-mes-cantidad.
     */
    public ProductoPorMesDTO_TAREA(String mes, String codigoProducto, Integer cantidad) {
        this.mes = mes;
        this.codigoProducto = codigoProducto;
        this.cantidad = cantidad;
    }

    // --- Getters para que Spring pueda convertir este objeto a JSON ---

    public String getMes() {
        return mes;
    }

    public String getCodigoProducto() {
        return codigoProducto;
    }

    public Integer getCantidad() {
        return cantidad;
    }
}
