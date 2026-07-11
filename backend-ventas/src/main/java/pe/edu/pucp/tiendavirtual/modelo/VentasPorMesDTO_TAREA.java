package pe.edu.pucp.tiendavirtual.modelo;

import java.math.BigDecimal;

/**
 * DTO (Data Transfer Object) para transportar los datos de ventas por mes.
 *
 * Un DTO es un objeto simple que usamos para enviar datos desde el backend
 * al frontend. No tiene lógica de negocio, solo almacena información.
 *
 * Este DTO representa el total de ventas (sin IGV) de un mes específico.
 * Ejemplo de uso: { "mes": "2024-01", "totalVentas": 1500.00 }
 */
public class VentasPorMesDTO_TAREA {

    /**
     * El mes en formato "YYYY-MM", por ejemplo "2024-03" para marzo de 2024.
     * Usamos este formato porque es fácil de ordenar y mostrar en gráficos.
     */
    private String mes;

    /**
     * La suma de todos los subTotal (sin IGV) de las órdenes de ese mes.
     * BigDecimal se usa para dinero porque es más preciso que double o float.
     */
    private BigDecimal totalVentas;

    /**
     * Constructor: crea un DTO con el mes y el total de ventas.
     * Se llama desde el servicio cuando mapea los resultados de la base de datos.
     */
    public VentasPorMesDTO_TAREA(String mes, BigDecimal totalVentas) {
        this.mes = mes;
        this.totalVentas = totalVentas;
    }

    // --- Getters: métodos para leer los valores del objeto ---
    // Spring los usa automáticamente para convertir el objeto a JSON.

    public String getMes() {
        return mes;
    }

    public BigDecimal getTotalVentas() {
        return totalVentas;
    }
}
