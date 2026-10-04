# Inversiones LR – Marketplace de Alojamientos

Aplicación web (frontend) desarrollada en Angular para que potenciales huéspedes de **Inversiones LR** exploren alojamientos temporales, los filtren, consulten su detalle, obtengan una cotización y registren una reserva simulada.

> Proyecto académico – Desarrollo de Sistemas de Información, 2026-2.

## Integrantes

- Andrés Felipe Hernández Rodríguez
- Juan David Villamizar Moreno
- Edwin Santiago Cacua Gaitan

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| Angular 22 (NgModules) | Framework principal |
| TypeScript | Lenguaje |
| Bootstrap 5 | Estilos, grilla y diseño responsive |
| Bootstrap Icons | Íconos |
| animate.css | Animaciones |
| Open-Meteo API | Clima actual de la ciudad del alojamiento |
| Nager.Date API | Festivos de Colombia dentro de la estadía |
| ExchangeRate API | Total aproximado en dólares |

## Requisitos para ejecutar

- [Node.js](https://nodejs.org/) 20 o superior (incluye npm)
- Conexión a internet (para las APIs externas, Bootstrap Icons y animate.css)

## Instalación

```bash
git clone https://github.com/andresfhr91-collab/Alojamiento.git
cd Alojamiento
npm install
```

## Ejecución

```bash
npm start
```

Luego abrir **http://localhost:4200** en el navegador.

## Principales funcionalidades

- **Inicio:** nombre de la plataforma, descripción y los 3 alojamientos mejor calificados.
- **Listado:** alojamientos activos con imagen, nombre, ciudad, tipo, capacidad, precio, calificación y servicios.
- **Filtros:** por ciudad, número de huéspedes, tipo y precio máximo, con opción para limpiarlos.
- **Detalle:** toda la información del alojamiento, imágenes, reglas, reseñas y clima actual.
- **Cotizador:** calcula noches, subtotal, tarifa de limpieza, tarifa de servicio (10 %) y total; muestra festivos y el valor en dólares.
- **Reserva simulada:** con nombre y correo; queda en estado `CONFIRMADA`.
- **Mis reservas:** lista de las reservas realizadas durante la ejecución.

## Datos

Los datos iniciales están en `public/data/data.json` y se consultan a través del servicio `Alojamientos` (la interfaz no importa el JSON directamente). Las imágenes están en `public/assets/images/`.

## Estructura general del proyecto

```
src/app/
├── components/
│   ├── navbarcomponent/        → barra de navegación
│   ├── footercomponent/        → pie de página
│   ├── iniciocomponent/        → página inicial
│   ├── listadocomponent/       → listado y filtros
│   ├── tarjetacomponent/       → tarjeta reutilizable de alojamiento
│   ├── detallecomponent/       → detalle del alojamiento
│   ├── cotizadorcomponent/     → cotización y formulario de reserva
│   └── misreservascomponent/   → reservas realizadas
├── service/
│   ├── alojamientos.ts         → lectura del JSON
│   ├── reservas.ts             → manejo de reservas
│   └── apisexternas.ts         → clima, festivos y tasa de cambio
├── models/                     → interfaces TypeScript
├── app-module.ts
└── app-routing-module.ts       → rutas
public/
├── data/data.json
└── assets/images/
docs/                           → requerimientos, reglas, prototipos, componentes y navegación
```

## Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Inicio |
| `/alojamientos` | Listado con filtros |
| `/alojamientos/:id` | Detalle y cotizador |
| `/reservas` | Mis reservas |
