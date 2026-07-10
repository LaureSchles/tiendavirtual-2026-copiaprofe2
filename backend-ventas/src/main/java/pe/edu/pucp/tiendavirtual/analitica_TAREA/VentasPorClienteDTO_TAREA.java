package pe.edu.pucp.tiendavirtual.analitica_TAREA;

import java.math.BigDecimal;

/**
 * DTO para transportar los datos de ventas agrupadas por cliente.
 *
 * Cada objeto representa el total que ha comprado UN cliente
 * durante los últimos 3 meses (sin incluir IGV).
 *
 * Este dato se usará para el gráfico de barras horizontal del dashboard,
 * donde cada barra representa a un cliente y su longitud es el monto vendido.
 *
 * Ejemplo: { "nombreCliente": "Juan Pérez", "totalVentas": 850.00 }
 */
public class VentasPorClienteDTO_TAREA {

    /**
     * Nombre completo del cliente (nombre + apellidos concatenados).
     * Se arma en el servicio para tener un solo campo legible en el frontend.
     */
    private String nombreCliente;

    /**
     * Suma de los subTotal (sin IGV) de todas las órdenes del cliente
     * en los últimos 3 meses.
     */
    private BigDecimal totalVentas;

    /**
     * Constructor que crea el registro de un cliente y su total de ventas.
     */
    public VentasPorClienteDTO_TAREA(String nombreCliente, BigDecimal totalVentas) {
        this.nombreCliente = nombreCliente;
        this.totalVentas = totalVentas;
    }

    // --- Getters para serialización a JSON ---

    public String getNombreCliente() {
        return nombreCliente;
    }

    public BigDecimal getTotalVentas() {
        return totalVentas;
    }
}
