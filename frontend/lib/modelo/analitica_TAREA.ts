/**
 * Interfaces TypeScript para los datos del dashboard de analítica.
 *
 * En TypeScript, una "interface" es como un contrato que dice exactamente
 * qué campos tiene un objeto y de qué tipo es cada campo.
 *
 * Estas interfaces deben coincidir con los DTOs del backend Java.
 * Si el backend devuelve { "mes": "2024-01", "totalVentas": 1500.00 },
 * entonces la interface debe tener esos mismos campos con sus tipos.
 */

/**
 * Representa las ventas totales (sin IGV) de un mes específico.
 * Viene del endpoint: GET /api/analitica/ventas-por-mes
 *
 * Ejemplo de dato real:
 *   { mes: "2024-03", totalVentas: 1500.50 }
 */
export interface VentasPorMes {
  /** El mes en formato "YYYY-MM", ejemplo: "2024-03" */
  mes: string;
  /** El total de ventas del mes sin IGV, en soles */
  totalVentas: number;
}

/**
 * Representa la cantidad vendida de un producto en un mes específico.
 * Viene del endpoint: GET /api/analitica/productos-por-mes
 *
 * Ejemplo de dato real:
 *   { mes: "2024-03", codigoProducto: "P001", cantidad: 12 }
 *
 * El frontend usará varios de estos objetos para armar la tabla:
 * - Filas = productos únicos
 * - Columnas = meses únicos
 * - Celda = la cantidad de ese producto en ese mes
 */
export interface ProductoPorMes {
  /** El mes en formato "YYYY-MM" */
  mes: string;
  /** El código único del producto, ejemplo: "P001" */
  codigoProducto: string;
  /** Unidades vendidas de ese producto en ese mes */
  cantidad: number;
}

/**
 * Representa las ventas totales de un cliente en los últimos 3 meses.
 * Viene del endpoint: GET /api/analitica/ventas-por-cliente
 *
 * Ejemplo de dato real:
 *   { nombreCliente: "Ana García López", totalVentas: 3500.00 }
 */
export interface VentasPorCliente {
  /** Nombre completo del cliente (nombre + apellidos) */
  nombreCliente: string;
  /** Total de ventas del cliente sin IGV, en soles */
  totalVentas: number;
}
