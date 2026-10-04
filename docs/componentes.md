# Identificación de componentes

La aplicación está organizada en **componentes**, **servicios** y **modelos**, separando las responsabilidades que pide el proyecto.

## Componentes

| Componente | Ruta / Uso | Responsabilidad | Tipo |
|---|---|---|---|
| `navbarcomponent` | Siempre visible | Barra superior con enlaces a Inicio, Alojamientos y Mis reservas. | Navegación |
| `footercomponent` | Siempre visible | Pie de página. | Presentación |
| `iniciocomponent` | `/` | Portada con nombre, descripción, botón de búsqueda y los 3 alojamientos mejor calificados. | Presentación |
| `listadocomponent` | `/alojamientos` | Muestra los alojamientos activos y los filtros (ciudad, huéspedes, tipo, precio máximo, limpiar). | Presentación y formulario |
| `tarjetacomponent` | Dentro de inicio y listado | Tarjeta reutilizable que recibe un alojamiento con `@Input()`. | Presentación |
| `detallecomponent` | `/alojamientos/:id` | Lee el `id` de la URL y muestra toda la información, imágenes, reglas, reseñas y clima. | Presentación |
| `cotizadorcomponent` | Dentro del detalle | Formulario de fechas y huéspedes, valida reglas, calcula la cotización, muestra festivos y dólares, y registra la reserva. | Formulario y reservas |
| `misreservascomponent` | `/reservas` | Lista las reservas realizadas o un mensaje si no hay. | Manejo de reservas |

## Servicios

| Servicio | Responsabilidad | Tipo |
|---|---|---|
| `Alojamientos` (`service/alojamientos.ts`) | Lee `public/data/data.json` con `HttpClient`. | Acceso a datos |
| `Reservas` (`service/reservas.ts`) | Guarda las reservas en memoria, asigna el `id` y el estado `CONFIRMADA`. | Manejo de reservas |
| `Apisexternas` (`service/apisexternas.ts`) | Consulta Open-Meteo (clima), Nager.Date (festivos) y ExchangeRate (dólares). | Acceso a datos |

## Modelos (interfaces TypeScript)

| Modelo | Representa |
|---|---|
| `Alojamiento` | Un alojamiento del JSON (incluye latitud y longitud). |
| `Resena` | Una reseña de un alojamiento. |
| `Datos` | La estructura completa del JSON (`alojamientos` y `resenas`). |
| `Reserva` | Una reserva realizada por un huésped. |
| `Clima` | Respuesta de la API de clima. |
| `Festivo` | Un festivo de Colombia. |
| `TasaCambio` | Respuesta de la API de tasa de cambio. |

## Relación entre componentes
```
App
├── navbarcomponent
├── <router-outlet>
│   ├── iniciocomponent ──────── tarjetacomponent (x3)
│   ├── listadocomponent ─────── tarjetacomponent (xN)
│   ├── detallecomponent ─────── cotizadorcomponent
│   └── misreservascomponent
└── footercomponent
```
