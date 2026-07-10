package pe.edu.pucp.tiendavirtual.analitica_TAREA;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controlador REST para el módulo de analítica del dashboard.
 *
 * Un @RestController es el componente de Spring que:
 * 1. Escucha peticiones HTTP que llegan al servidor
 * 2. Llama al servicio para obtener los datos
 * 3. Devuelve los datos como JSON al frontend
 *
 * @RequestMapping("/api/analitica") → todos los endpoints empiezan con /api/analitica
 *
 * @CrossOrigin permite que el frontend (que corre en un puerto diferente, ej. 3000)
 * pueda hacer peticiones a este backend (que corre en el puerto 8080).
 * Sin esto, el navegador bloquearía las peticiones por seguridad (política CORS).
 */
@RestController
@RequestMapping("/api/analitica")
@CrossOrigin
public class AnalíticaController_TAREA {

    // El servicio que contiene la lógica de negocio.
    // Spring lo inyecta automáticamente por el constructor.
    private final AnalíticaService_TAREA analiticaService;

    /**
     * Constructor: Spring detecta y provee el servicio automáticamente.
     */
    public AnalíticaController_TAREA(AnalíticaService_TAREA analiticaService) {
        this.analiticaService = analiticaService;
    }

    /**
     * ENDPOINT 1: GET /api/analitica/ventas-por-mes
     *
     * Devuelve las ventas totales sin IGV de los últimos 12 meses,
     * agrupadas por mes. Se usa para el gráfico de barras del dashboard.
     *
     * Ejemplo de respuesta JSON:
     * [
     *   { "mes": "2023-08", "totalVentas": 1234.50 },
     *   { "mes": "2023-09", "totalVentas": 2100.00 },
     *   ...
     * ]
     *
     * @return Lista de VentasPorMesDTO_TAREA como JSON
     */
    @GetMapping("/ventas-por-mes")
    public List<VentasPorMesDTO_TAREA> ventasPorMes() {
        return analiticaService.getVentasPorMes();
    }

    /**
     * ENDPOINT 2: GET /api/analitica/productos-por-mes
     *
     * Devuelve la cantidad vendida de cada producto, por mes, en los últimos 12 meses.
     * Se usa para construir la tabla de productos del dashboard.
     *
     * Ejemplo de respuesta JSON:
     * [
     *   { "mes": "2023-08", "codigoProducto": "P001", "cantidad": 5 },
     *   { "mes": "2023-08", "codigoProducto": "P002", "cantidad": 12 },
     *   ...
     * ]
     *
     * @return Lista de ProductoPorMesDTO_TAREA como JSON
     */
    @GetMapping("/productos-por-mes")
    public List<ProductoPorMesDTO_TAREA> productosPorMes() {
        return analiticaService.getProductosPorMes();
    }

    /**
     * ENDPOINT 3: GET /api/analitica/ventas-por-cliente
     *
     * Devuelve las ventas totales sin IGV agrupadas por cliente,
     * de los últimos 3 meses. Se usa para el gráfico de barras por cliente.
     *
     * Ejemplo de respuesta JSON:
     * [
     *   { "nombreCliente": "Ana García López", "totalVentas": 3500.00 },
     *   { "nombreCliente": "Luis Mamani Torres", "totalVentas": 2100.00 },
     *   ...
     * ]
     *
     * @return Lista de VentasPorClienteDTO_TAREA como JSON
     */
    @GetMapping("/ventas-por-cliente")
    public List<VentasPorClienteDTO_TAREA> ventasPorCliente() {
        return analiticaService.getVentasPorCliente();
    }
}
