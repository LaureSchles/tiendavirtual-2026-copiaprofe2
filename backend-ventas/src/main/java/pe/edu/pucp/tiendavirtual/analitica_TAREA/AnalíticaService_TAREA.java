package pe.edu.pucp.tiendavirtual.analitica_TAREA;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio de analítica: contiene la lógica de negocio para generar los KPIs.
 *
 * Un @Service es un componente de Spring que se encarga de la LÓGICA de la aplicación.
 * No habla directamente con la base de datos (eso lo hace el Repository),
 * ni responde peticiones HTTP (eso lo hace el Controller).
 * Su trabajo es orquestar los datos y transformarlos al formato que necesita el frontend.
 *
 * Patrón usado: Controller → Service → Repository → Base de datos
 */
@Service
public class AnalíticaService_TAREA {

    // El repositorio con las consultas a la base de datos.
    // Spring lo inyecta automáticamente gracias al constructor.
    private final AnalíticaRepository_TAREA analiticaRepository;

    /**
     * Constructor: Spring detecta automáticamente que debe inyectar el repositorio.
     * Esto se llama "Inyección de Dependencias" (Dependency Injection).
     */
    public AnalíticaService_TAREA(AnalíticaRepository_TAREA analiticaRepository) {
        this.analiticaRepository = analiticaRepository;
    }

    /**
     * Devuelve las ventas totales (sin IGV) agrupadas por mes de los últimos 12 meses.
     *
     * Pasos que realiza este método:
     * 1. Calcula la fecha de inicio: exactamente 12 meses atrás desde hoy
     * 2. Llama al repositorio para obtener los resultados crudos (Object[])
     * 3. Transforma cada fila Object[] en un DTO legible (VentasPorMesDTO_TAREA)
     *
     * @return Lista de objetos con mes y total de ventas, ordenada cronológicamente
     */
    public List<VentasPorMesDTO_TAREA> getVentasPorMes() {
        // Calcula la fecha de inicio: hace 12 meses desde hoy
        // Por ejemplo, si hoy es 2024-07, el inicio es 2023-07-01
        LocalDate fechaInicio = LocalDate.now().minusMonths(12).withDayOfMonth(1);

        // Consulta la base de datos y obtiene filas de datos crudos
        List<Object[]> filas = analiticaRepository.ventasPorMes(fechaInicio);

        // Transforma cada fila (Object[]) en un DTO con nombre de mes legible
        // .stream() permite procesar la lista elemento por elemento
        // .map() convierte cada elemento de un tipo a otro
        // .collect() junta todos los elementos transformados en una nueva lista
        return filas.stream()
                .map(fila -> {
                    // fila[0] = año (ejemplo: 2024), fila[1] = mes (ejemplo: 3)
                    int anio = ((Number) fila[0]).intValue();
                    int mes  = ((Number) fila[1]).intValue();

                    // Formatea el mes como "YYYY-MM" para fácil ordenamiento
                    // String.format("%02d", mes) pone un cero adelante si es necesario: 3 → "03"
                    String mesFormateado = anio + "-" + String.format("%02d", mes);

                    BigDecimal totalVentas = (BigDecimal) fila[2];

                    return new VentasPorMesDTO_TAREA(mesFormateado, totalVentas);
                })
                .collect(Collectors.toList());
    }

    /**
     * Devuelve las cantidades vendidas por producto y mes de los últimos 12 meses.
     *
     * El frontend usará esta lista para construir una tabla donde:
     * - Cada fila es un producto
     * - Cada columna es un mes
     * - El valor de cada celda es la cantidad vendida
     *
     * @return Lista plana de filas: {mes, codigoProducto, cantidad}
     */
    public List<ProductoPorMesDTO_TAREA> getProductosPorMes() {
        // Igual que en ventas por mes: consulta los últimos 12 meses
        LocalDate fechaInicio = LocalDate.now().minusMonths(12).withDayOfMonth(1);

        List<Object[]> filas = analiticaRepository.productosPorMes(fechaInicio);

        return filas.stream()
                .map(fila -> {
                    // fila[0] = año, fila[1] = mes, fila[2] = código, fila[3] = cantidad
                    int anio            = ((Number) fila[0]).intValue();
                    int mes             = ((Number) fila[1]).intValue();
                    String mesFormateado = anio + "-" + String.format("%02d", mes);
                    String codigo       = (String) fila[2];
                    Integer cantidad    = ((Number) fila[3]).intValue();

                    return new ProductoPorMesDTO_TAREA(mesFormateado, codigo, cantidad);
                })
                .collect(Collectors.toList());
    }

    /**
     * Devuelve las ventas totales (sin IGV) agrupadas por cliente en los últimos 3 meses.
     *
     * Solo toma los 3 meses más recientes para tener una visión corta pero relevante
     * de qué clientes están comprando activamente.
     *
     * @return Lista de clientes con su total de ventas, de mayor a menor
     */
    public List<VentasPorClienteDTO_TAREA> getVentasPorCliente() {
        // Solo los últimos 3 meses (diferente a los otros dos que son 12 meses)
        LocalDate fechaInicio = LocalDate.now().minusMonths(3).withDayOfMonth(1);

        List<Object[]> filas = analiticaRepository.ventasPorCliente(fechaInicio);

        return filas.stream()
                .map(fila -> {
                    // fila[0] = nombre, fila[1] = apellidos, fila[2] = total ventas
                    String nombre    = (String) fila[0];
                    String apellidos = (String) fila[1];
                    BigDecimal total = (BigDecimal) fila[2];

                    // Junta nombre y apellidos en un solo campo legible
                    String nombreCompleto = nombre + " " + apellidos;

                    return new VentasPorClienteDTO_TAREA(nombreCompleto, total);
                })
                .collect(Collectors.toList());
    }
}
