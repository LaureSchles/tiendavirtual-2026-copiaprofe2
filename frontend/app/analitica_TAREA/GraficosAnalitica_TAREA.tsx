"use client";
/**
 * GraficosAnalitica_TAREA.tsx
 *
 * COMPONENTE CLIENTE de Next.js (marcado con "use client" al inicio).
 * Se ejecuta en el NAVEGADOR del usuario, no en el servidor.
 * Necesita ser cliente porque usa:
 *   - Recharts: librería de gráficos que necesita el DOM del navegador
 *   - useRef: hook de React para acceder a elementos HTML directamente
 *   - html2canvas + jsPDF: librerías para exportar a PDF
 *
 * ESTRUCTURA DEL COMPONENTE:
 *   <>   ← fragmento React (agrupa sin crear un div extra)
 *     <div ref={dashboardRef}>   ← todo esto SE CAPTURA en el PDF
 *       Gráfico 1: ventas por mes (barras verticales)
 *       Tabla:     productos vendidos por mes (matriz)
 *       Gráfico 3: ventas por cliente (barras horizontales)
 *     </div>
 *     <button onClick={exportarPDF}>   ← NO se captura (está fuera del ref)
 *   </>
 */

// useRef: hook para crear una referencia a un elemento del DOM
import { useRef } from "react";

// Componentes de Recharts para construir gráficos de barras
import {
  Bar,                 // Componente de barras individuales
  BarChart,            // Contenedor del gráfico de barras
  CartesianGrid,       // Líneas de cuadrícula del fondo
  Cell,                // Para colorear cada barra con un color distinto
  Legend,              // Leyenda que explica los colores
  ResponsiveContainer, // Hace el gráfico adaptable al ancho de la pantalla
  Tooltip,             // Cuadro de información al pasar el mouse
  XAxis,               // Eje horizontal
  YAxis,               // Eje vertical
} from "recharts";

// Interfaces TypeScript que definen la estructura de los datos
import {
  ProductoPorMes,
  VentasPorCliente,
  VentasPorMes,
} from "@/lib/modelo/analitica_TAREA";

/**
 * Interfaz de Props: define qué datos debe recibir este componente.
 * Props son los "parámetros" que un componente padre le pasa a un hijo.
 * page.tsx (el padre) le pasará estos tres arreglos de datos.
 */
interface GraficosAnaliticaProps {
  ventasPorMes: VentasPorMes[];
  productosPorMes: ProductoPorMes[];
  ventasPorCliente: VentasPorCliente[];
}

/**
 * Convierte un mes "YYYY-MM" a etiqueta corta en español.
 * Ejemplo: "2024-03" → "mar 24"
 */
function formatearMes(mes: string): string {
  const [anio, mesNum] = mes.split("-").map(Number);
  const fecha = new Date(anio, mesNum - 1); // mesNum-1 porque en JS enero=0
  return fecha.toLocaleDateString("es-PE", { month: "short", year: "2-digit" });
}

/**
 * Formatea un número como moneda peruana.
 * Ejemplo: 1500.5 → "S/ 1,500.50"
 */
function formatearMonto(valor: number): string {
  return (
    "S/ " +
    Number(valor).toLocaleString("es-PE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

// Colores para las barras del gráfico de clientes
const COLORES_BARRAS = ["#2563eb", "#16a34a", "#dc2626", "#d97706", "#7c3aed", "#0891b2"];

/**
 * Componente principal del dashboard de analítica.
 */
export default function GraficosAnalitica_TAREA({
  ventasPorMes,
  productosPorMes,
  ventasPorCliente,
}: GraficosAnaliticaProps) {

  /**
   * useRef<HTMLDivElement>(null):
   * Crea una variable especial (ref) que apunta al <div> que envuelve el dashboard.
   * Cuando html2canvas necesita capturar el contenido, usamos dashboardRef.current
   * para decirle "captura exactamente este elemento HTML".
   */
  const dashboardRef = useRef<HTMLDivElement>(null);

  // ─── PREPARACIÓN DE DATOS PARA RECHARTS ───────────────────────────────────

  /**
   * Recharts necesita un arreglo de objetos con nombres específicos.
   * Transformamos { mes: "2024-03", totalVentas: 1500 }
   *             → { etiqueta: "mar 24", ventas: 1500 }
   */
  const datosGrafico1 = ventasPorMes.map((item) => ({
    etiqueta: formatearMes(item.mes),
    ventas: Number(item.totalVentas),
  }));

  const datosGrafico3 = ventasPorCliente.map((item) => ({
    cliente: item.nombreCliente,
    ventas: Number(item.totalVentas),
  }));

  // ─── PREPARACIÓN DE DATOS PARA LA TABLA ───────────────────────────────────

  /**
   * new Set(...) elimina duplicados. Array.from(...).sort() ordena el resultado.
   * mesesUnicos → ["2024-01", "2024-02", ..., "2024-12"]
   * productosUnicos → ["P001", "P002", ...]
   */
  const mesesUnicos: string[] = Array.from(
    new Set(productosPorMes.map((p) => p.mes))
  ).sort();

  const productosUnicos: string[] = Array.from(
    new Set(productosPorMes.map((p) => p.codigoProducto))
  ).sort();

  /**
   * Construimos un "mapa" (diccionario) para buscar rápidamente la cantidad
   * de un producto en un mes específico.
   * Clave: "YYYY-MM|CODIGO" → Valor: cantidad vendida
   * Ejemplo: { "2024-03|P001": 5, "2024-03|P002": 12 }
   */
  const mapaProductosMes: Record<string, number> = {};
  productosPorMes.forEach((p) => {
    mapaProductosMes[`${p.mes}|${p.codigoProducto}`] = p.cantidad;
  });

  // ─── FUNCIÓN DE EXPORTACIÓN A PDF ─────────────────────────────────────────

  /**
   * exportarPDF: captura el dashboard como imagen y genera un PDF A4.
   *
   * Flujo:
   * 1. html2canvas "fotografía" el div referenciado → devuelve un <canvas>
   * 2. Convertimos el canvas a imagen PNG (base64)
   * 3. jsPDF crea el documento y añade la imagen, paginando si es necesario
   * 4. El navegador descarga el PDF automáticamente
   *
   * "async/await" nos permite esperar operaciones que toman tiempo
   * sin bloquear el navegador.
   */
  async function exportarPDF() {
    if (!dashboardRef.current) return;

    // Carga dinámica: solo descarga estas librerías cuando el usuario hace clic.
    // Esto hace que la página cargue más rápido inicialmente.
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    // Captura el div del dashboard como imagen (canvas HTML)
    const canvas = await html2canvas(dashboardRef.current, {
      scale: 2,                        // Doble resolución para mejor calidad
      useCORS: true,
      backgroundColor: "#f3f4f6",      // Fondo gris claro, igual que la página
    });

    // Convierte el canvas a una cadena base64 (formato de imagen para jsPDF)
    const imgData   = canvas.toDataURL("image/png");
    const imgWidth  = canvas.width;
    const imgHeight = canvas.height;

    // Cálculo de proporciones para ajustar la imagen al ancho A4 (210 mm)
    const pdfAncho     = 210;             // mm, ancho de una hoja A4
    const altoPaginaMm = 297;             // mm, alto de una hoja A4
    const ratio        = pdfAncho / imgWidth;
    const totalPaginas = Math.ceil((imgHeight * ratio) / altoPaginaMm);

    // Crea el documento PDF en orientación vertical (portrait), tamaño A4
    const pdf = new jsPDF("p", "mm", "a4");

    // Si el dashboard es largo, genera múltiples páginas
    for (let pagina = 0; pagina < totalPaginas; pagina++) {
      if (pagina > 0) pdf.addPage();
      // La posición Y negativa "desplaza" la imagen hacia arriba
      // para mostrar el trozo correcto en cada página
      pdf.addImage(
        imgData,
        "PNG",
        0,                               // Posición X en el PDF
        -(pagina * altoPaginaMm),        // Posición Y (negativa = scroll hacia abajo)
        pdfAncho,                        // Ancho en mm
        imgHeight * ratio                // Alto total escalado en mm
      );
    }

    // Descarga el archivo en el navegador del usuario
    pdf.save("dashboard-analitica.pdf");
  }

  // ─── RENDERIZADO ──────────────────────────────────────────────────────────
  return (
    // <> es un "fragmento React": agrupa elementos sin añadir un div extra al DOM
    <>
      {/* ════════════════════════════════════════════
          DIV DE CAPTURA: todo lo que hay aquí dentro
          se incluirá en el PDF al hacer clic en el botón.
          ════════════════════════════════════════════ */}
      <div ref={dashboardRef} className="space-y-8 bg-gray-100 p-2">

        {/* ── GRÁFICO 1: Ventas por mes ──────────────── */}
        <section className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-1 text-xl font-bold text-gray-800">
            Ventas por Mes (sin IGV) — últimos 12 meses
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Suma del subtotal (sin IGV) de todas las órdenes, agrupado por mes.
          </p>

          {datosGrafico1.length === 0 ? (
            <p className="text-gray-500">No hay datos para los últimos 12 meses.</p>
          ) : (
            // ResponsiveContainer hace el gráfico adaptable al ancho de la pantalla
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={datosGrafico1}
                margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="etiqueta" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v: number) => "S/ " + v.toLocaleString("es-PE")}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip formatter={(v: number) => [formatearMonto(v), "Ventas"]} />
                <Legend />
                {/* dataKey="ventas" dice a Recharts qué campo del objeto usar para la barra */}
                <Bar
                  dataKey="ventas"
                  name="Ventas (sin IGV)"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>

        {/* ── TABLA: Productos vendidos por mes ─────── */}
        <section className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-1 text-xl font-bold text-gray-800">
            Productos Vendidos por Mes — últimos 12 meses
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Unidades vendidas de cada producto por mes. "—" significa sin ventas ese mes.
          </p>

          {productosPorMes.length === 0 ? (
            <p className="text-gray-500">No hay datos para los últimos 12 meses.</p>
          ) : (
            // overflow-x-auto permite scroll horizontal si la tabla es muy ancha
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="sticky left-0 bg-gray-100 px-4 py-2 text-left font-semibold text-gray-700">
                      Producto
                    </th>
                    {mesesUnicos.map((mes) => (
                      <th
                        key={mes}
                        className="px-4 py-2 text-center font-semibold text-gray-700"
                      >
                        {formatearMes(mes)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productosUnicos.map((codigo, idx) => (
                    // idx % 2 alterna colores de fila para mejor legibilidad
                    <tr
                      key={codigo}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="sticky left-0 bg-inherit px-4 py-2 font-medium text-gray-800">
                        {codigo}
                      </td>
                      {mesesUnicos.map((mes) => {
                        const cantidad = mapaProductosMes[`${mes}|${codigo}`];
                        return (
                          <td
                            key={mes}
                            className="px-4 py-2 text-center text-gray-700"
                          >
                            {cantidad !== undefined ? cantidad : "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* ── GRÁFICO 3: Ventas por cliente ─────────── */}
        <section className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-1 text-xl font-bold text-gray-800">
            Ventas por Cliente (sin IGV) — últimos 3 meses
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Total comprado sin IGV por cliente, de mayor a menor.
          </p>

          {datosGrafico3.length === 0 ? (
            <p className="text-gray-500">No hay datos para los últimos 3 meses.</p>
          ) : (
            // La altura aumenta dinámicamente según la cantidad de clientes
            <ResponsiveContainer
              width="100%"
              height={Math.max(280, datosGrafico3.length * 50)}
            >
              {/*
               * layout="vertical" → barras horizontales.
               * Mejor para nombres de clientes largos en el eje Y.
               */}
              <BarChart
                data={datosGrafico3}
                layout="vertical"
                margin={{ top: 10, right: 40, left: 140, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                {/* En layout vertical: XAxis tiene los números */}
                <XAxis
                  type="number"
                  tickFormatter={(v: number) => "S/ " + v.toLocaleString("es-PE")}
                  tick={{ fontSize: 11 }}
                />
                {/* En layout vertical: YAxis tiene las etiquetas (nombres) */}
                <YAxis
                  type="category"
                  dataKey="cliente"
                  tick={{ fontSize: 12 }}
                  width={135}
                />
                <Tooltip formatter={(v: number) => [formatearMonto(v), "Ventas"]} />
                <Legend />
                <Bar dataKey="ventas" name="Ventas (sin IGV)" radius={[0, 4, 4, 0]}>
                  {datosGrafico3.map((_entry, index) => (
                    // Cell colorea cada barra con un color de la paleta
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORES_BARRAS[index % COLORES_BARRAS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>

      </div>
      {/* ════════ FIN DEL DIV CAPTURADO PARA PDF ════════ */}

      {/* ── BOTÓN EXPORTAR PDF ────────────────────────
          Está FUERA del div con ref → no aparece en el PDF.
          Pero al estar en el mismo componente, puede usar
          la función exportarPDF que tiene acceso al dashboardRef. */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={exportarPDF}
          className="flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-red-700 active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16v-8m0 8l-3-3m3 3l3-3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            />
          </svg>
          Exportar todo a PDF
        </button>
      </div>
    </>
  );
}
