export interface Infraccion {
  id: number;
  placaVehiculo: string;
  tipoInfraccion: string;
  montoMulta: number;
  fecha: string;
}

export const infraccionesIniciales: Infraccion[] = [
  {
    id: 1,
    placaVehiculo: "ABC-123",
    tipoInfraccion: "Exceso de velocidad",
    montoMulta: 280,
    fecha: "2026-07-08",
  },
  {
    id: 2,
    placaVehiculo: "DEF-456",
    tipoInfraccion: "Mal estacionado",
    montoMulta: 120,
    fecha: "2026-07-03",
  },
  {
    id: 3,
    placaVehiculo: "GHI-789",
    tipoInfraccion: "Semáforo en rojo",
    montoMulta: 350,
    fecha: "2026-06-28",
  },
  {
    id: 4,
    placaVehiculo: "JKL-012",
    tipoInfraccion: "Uso de celular al conducir",
    montoMulta: 210,
    fecha: "2026-06-21",
  },
  {
    id: 5,
    placaVehiculo: "MNO-345",
    tipoInfraccion: "Sin cinturón de seguridad",
    montoMulta: 95,
    fecha: "2026-06-15",
  },
  {
    id: 6,
    placaVehiculo: "PQR-678",
    tipoInfraccion: "Conducir en estado de ebriedad",
    montoMulta: 1500,
    fecha: "2026-06-10",
  },
  {
    id: 7,
    placaVehiculo: "STU-901",
    tipoInfraccion: "No respetar señal de pare",
    montoMulta: 175,
    fecha: "2026-06-05",
  },
  {
    id: 8,
    placaVehiculo: "VWX-234",
    tipoInfraccion: "Exceso de velocidad",
    montoMulta: 420,
    fecha: "2026-05-29",
  },
  {
    id: 9,
    placaVehiculo: "YZA-567",
    tipoInfraccion: "Invasión de carril",
    montoMulta: 130,
    fecha: "2026-05-22",
  },
  {
    id: 10,
    placaVehiculo: "BCD-890",
    tipoInfraccion: "Mal estacionado",
    montoMulta: 120,
    fecha: "2026-05-17",
  },
  {
    id: 11,
    placaVehiculo: "EFG-123",
    tipoInfraccion: "Documentos vencidos",
    montoMulta: 200,
    fecha: "2026-05-11",
  },
  {
    id: 12,
    placaVehiculo: "HIJ-456",
    tipoInfraccion: "Giro indebido",
    montoMulta: 155,
    fecha: "2026-05-04",
  },
  {
    id: 13,
    placaVehiculo: "KLM-789",
    tipoInfraccion: "Uso de celular al conducir",
    montoMulta: 210,
    fecha: "2026-04-26",
  },
  {
    id: 14,
    placaVehiculo: "NOP-012",
    tipoInfraccion: "Sin cinturón de seguridad",
    montoMulta: 95,
    fecha: "2026-04-18",
  },
  {
    id: 15,
    placaVehiculo: "QRS-345",
    tipoInfraccion: "Semáforo en rojo",
    montoMulta: 350,
    fecha: "2026-04-10",
  },
];
