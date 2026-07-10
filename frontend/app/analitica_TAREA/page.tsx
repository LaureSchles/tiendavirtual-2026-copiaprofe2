/**
 * page.tsx — Dashboard de Analítica
 *
 * Este es un SERVER COMPONENT de Next.js (sin "use client").
 * Se ejecuta en el SERVIDOR antes de enviar la página al navegador.
 *
 * Ventajas de ser Server Component:
 * - Puede hacer fetch directamente al backend sin pasar por el navegador
 * - La página llega al usuario ya con los datos listos (más rápido)
 * - Las credenciales del servidor (variables de entorno) no se exponen al navegador
 *
 * Lo que hace este componente:
 * 1. Llama a los 3 endpoints del backend en PARALELO (Promise.all)
 * 2. Si hay un error, muestra un mensaje amigable
 * 3. Pasa los datos al componente cliente GraficosAnalitica_TAREA para renderizarlos
 *
 * Ruta en el navegador: /analitica_TAREA
 * (Esta ruta es distinta a: /productos, /clientes, /carrito, /ordenes)
 */

// Importamos el componente cliente que dibuja los gráficos
import GraficosAnalitica_TAREA from "@/app/analitica_TAREA/GraficosAnalitica_TAREA";

// Importamos las funciones que llaman al backend
import {
  getProductosPorMes,
  getVentasPorCliente,
  getVentasPorMes,
} from "@/lib/api/analitica_TAREA";

/**
 * Componente de la página del dashboard.
 *
 * Es una función "async" (asíncrona) porque necesita esperar
 * que el backend responda antes de poder renderizar la página.
 */
export default async function AnaliticaPage() {

  /**
   * Intentamos cargar los datos del backend.
   * Si algo falla (el backend está caído, no hay datos, etc.),
   * capturamos el error y mostramos un mensaje en lugar de romper la página.
   */
  let ventasPorMes;
  let productosPorMes;
  let ventasPorCliente;
  let errorCarga: string | null = null;

  try {
    /**
     * Promise.all ejecuta las 3 llamadas al backend AL MISMO TIEMPO (en paralelo).
     * Esto es mucho más rápido que hacerlas una por una:
     *
     * SIN Promise.all (secuencial):  🐢 3 × tiempo = lento
     * CON Promise.all (paralelo):   🚀 máximo(tiempo1, tiempo2, tiempo3) = rápido
     *
     * Descomposición de arreglo: [ventasPorMes, productosPorMes, ventasPorCliente]
     * = los resultados se asignan en el mismo orden que los promises.
     */
    [ventasPorMes, productosPorMes, ventasPorCliente] = await Promise.all([
      getVentasPorMes(),
      getProductosPorMes(),
      getVentasPorCliente(),
    ]);
  } catch (error) {
    // Si algo falla, guardamos el mensaje de error para mostrarlo al usuario
    errorCarga =
      error instanceof Error
        ? error.message
        : "Error desconocido al cargar los datos.";
  }

  return (
    <section className="space-y-6">

      {/* ── Encabezado del dashboard ── */}
      <header className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-3xl font-bold text-gray-800">📊 Dashboard de Analítica</h2>
        <p className="mt-2 text-gray-600">
          Visualización de KPIs comerciales: ventas por mes, productos vendidos
          y ranking de clientes.
        </p>
      </header>

      {/* ── Mensaje de error si el backend no responde ── */}
      {errorCarga && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          <strong>No se pudo cargar el dashboard:</strong> {errorCarga}
          <p className="mt-1 text-sm">
            Verifica que el backend de ventas esté corriendo y que la variable
            NEXT_URL_BASE_API esté configurada correctamente.
          </p>
        </div>
      )}

      {/* ── Gráficos (solo se muestran si los datos cargaron correctamente) ── */}
      {/*
       * ventasPorMes && productosPorMes && ventasPorCliente verifica que las
       * tres variables tengan datos antes de renderizar el componente cliente.
       */}
      {ventasPorMes && productosPorMes && ventasPorCliente && (
        <GraficosAnalitica_TAREA
          ventasPorMes={ventasPorMes}
          productosPorMes={productosPorMes}
          ventasPorCliente={ventasPorCliente}
        />
      )}
    </section>
  );
}
