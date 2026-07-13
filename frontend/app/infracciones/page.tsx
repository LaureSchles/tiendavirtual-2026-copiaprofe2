"use client";

import { useState } from "react";
import { infraccionesIniciales, Infraccion } from "./data";

const TIPOS_INFRACCION = [
  "Exceso de velocidad",
  "Mal estacionado",
  "Semáforo en rojo",
  "Sin cinturón de seguridad",
  "Uso de celular al conducir",
  "Conducir en estado de ebriedad",
  "No respetar señal de pare",
  "Invasión de carril",
  "Documentos vencidos",
  "Giro indebido",
];

export default function InfraccionesPage() {
  const [infracciones, setInfracciones] = useState<Infraccion[]>(infraccionesIniciales);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [registrado, setRegistrado] = useState(false);

  const [form, setForm] = useState({
    placaVehiculo: "",
    tipoInfraccion: TIPOS_INFRACCION[0],
    montoMulta: "",
    fecha: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nueva: Infraccion = {
      id: Math.max(...infracciones.map((i) => i.id)) + 1,
      placaVehiculo: form.placaVehiculo.toUpperCase(),
      tipoInfraccion: form.tipoInfraccion,
      montoMulta: Number(form.montoMulta),
      fecha: form.fecha,
    };
    setInfracciones([nueva, ...infracciones]);
    setForm({ placaVehiculo: "", tipoInfraccion: TIPOS_INFRACCION[0], montoMulta: "", fecha: "" });
    setRegistrado(true);
    setTimeout(() => {
      setRegistrado(false);
      setMostrarFormulario(false);
    }, 3000);
  }

  return (
    <section className="space-y-6">
      {/* Encabezado */}
      <header className="rounded-lg bg-white p-6 shadow flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Infracciones de Tránsito</h2>
          <p className="mt-1 text-gray-600">Registro y consulta de infracciones viales.</p>
        </div>
        <button
          onClick={() => { setMostrarFormulario(!mostrarFormulario); setRegistrado(false); }}
          className="rounded-md bg-blue-600 px-5 py-2 text-white font-medium transition hover:bg-blue-700"
        >
          {mostrarFormulario ? "Cancelar" : "Registrar infracción"}
        </button>
      </header>

      {/* Formulario inline */}
      {mostrarFormulario && (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Nueva Infracción</h3>

          {registrado && (
            <div className="mb-4 rounded-md bg-green-100 border border-green-400 px-4 py-3 text-green-800 font-medium">
              ✅ Infracción registrada
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Placa del Vehículo</label>
              <input
                type="text"
                name="placaVehiculo"
                value={form.placaVehiculo}
                onChange={handleChange}
                placeholder="Ej: ABC-123"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Infracción</label>
              <select
                name="tipoInfraccion"
                value={form.tipoInfraccion}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TIPOS_INFRACCION.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monto de Multa (S/)</label>
              <input
                type="number"
                name="montoMulta"
                value={form.montoMulta}
                onChange={handleChange}
                placeholder="Ej: 280"
                min={1}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-md bg-green-600 px-6 py-2 text-white font-medium transition hover:bg-green-700"
              >
                Guardar Infracción
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Listado */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Infracciones registradas ({infracciones.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse overflow-hidden rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Placa</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Tipo de Infracción</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Monto (S/)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-600">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {infracciones.map((inf) => (
                <tr key={inf.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-500">{inf.id}</td>
                  <td className="px-4 py-3 text-sm font-mono font-semibold text-gray-900">{inf.placaVehiculo}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{inf.tipoInfraccion}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">S/ {inf.montoMulta.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{inf.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
