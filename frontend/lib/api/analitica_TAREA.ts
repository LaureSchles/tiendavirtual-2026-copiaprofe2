/**
 * Funciones para obtener los datos del dashboard de analítica desde el backend.
 *
 * Cada función hace una petición HTTP GET al backend Spring Boot
 * y devuelve los datos ya tipados con TypeScript.
 *
 * Se usa la función apiRequest de http.ts que ya existe en el proyecto,
 * para no duplicar código y mantener consistencia con el resto del frontend.
 */

// Importamos la función que hace las peticiones HTTP al backend
import { apiRequest } from "@/lib/api/http";

// Importamos los tipos TypeScript que definen la estructura de los datos
import {
  ProductoPorMes,
  VentasPorCliente,
  VentasPorMes,
} from "@/lib/modelo/analitica_TAREA";

/**
 * Obtiene las ventas totales sin IGV agrupadas por mes, de los últimos 12 meses.
 *
 * Llama a: GET /api/analitica/ventas-por-mes
 *
 * La función es "async" porque la petición HTTP tarda un tiempo.
 * "async/await" nos permite escribir código asíncrono de forma legible,
 * como si fuera código normal que se ejecuta línea por línea.
 *
 * @returns Promesa con lista de VentasPorMes, ejemplo:
 *   [{ mes: "2024-01", totalVentas: 1500.00 }, ...]
 */
export async function getVentasPorMes(): Promise<VentasPorMes[]> {
  // apiRequest<VentasPorMes[]> le dice a TypeScript que esperamos un arreglo de VentasPorMes
  return apiRequest<VentasPorMes[]>("/api/analitica/ventas-por-mes");
}

/**
 * Obtiene la cantidad vendida de cada producto por mes, de los últimos 12 meses.
 *
 * Llama a: GET /api/analitica/productos-por-mes
 *
 * @returns Promesa con lista plana de ProductoPorMes, ejemplo:
 *   [{ mes: "2024-01", codigoProducto: "P001", cantidad: 5 }, ...]
 */
export async function getProductosPorMes(): Promise<ProductoPorMes[]> {
  return apiRequest<ProductoPorMes[]>("/api/analitica/productos-por-mes");
}

/**
 * Obtiene las ventas totales sin IGV por cliente de los últimos 3 meses.
 *
 * Llama a: GET /api/analitica/ventas-por-cliente
 *
 * @returns Promesa con lista de VentasPorCliente ordenada de mayor a menor, ejemplo:
 *   [{ nombreCliente: "Ana García", totalVentas: 3500.00 }, ...]
 */
export async function getVentasPorCliente(): Promise<VentasPorCliente[]> {
  return apiRequest<VentasPorCliente[]>("/api/analitica/ventas-por-cliente");
}
