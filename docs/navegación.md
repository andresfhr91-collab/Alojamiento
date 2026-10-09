# Estructura de navegación

La navegación de la aplicación se define en `src/app/app-routing-module.ts`. Cada ruta muestra un componente dentro del `<router-outlet>` de `app.html`.

## Rutas

| Ruta                       | Pantalla                                       | Componente              |
|----------------------------|------------------------------------------------|-------------------------|
| `/`                        | Inicio                                         | `iniciocomponent`       |
| `/alojamientos`            | Listado de alojamientos                        | `listadocomponent`      |
| `/alojamientos/:id`        | Detalle del alojamiento (incluye el cotizador) | `detallecomponent`      |
| `/reservas`                | Mis reservas                                   | `misreservascomponent`  |
| `**` (cualquier otra ruta) | Página 404 con un botón para volver al inicio  | `noencontradocomponent` |

El cotizador (`cotizadorcomponent`) no tiene ruta propia: se muestra dentro de la pantalla de detalle.

## Flujo de navegación

Recorrido principal del usuario:

```
Inicio (/)
   │  botón "Buscar alojamientos"
   ▼
Alojamientos (/alojamientos)
   │  botón "Ver detalle" en una tarjeta
   ▼
Detalle (/alojamientos/:id)
   │  Cotizar → Reservar
   │  enlace "Ver mis reservas"
   ▼
Mis reservas (/reservas)
```

Otros enlaces entre pantallas:

| Desde                       | Elemento                                        | Lleva a             |
|-----------------------------|-------------------------------------------------|---------------------|
| Inicio                      | Botón "Ver detalle" de un alojamiento destacado | `/alojamientos/:id` |
| Detalle                     | Botón "Volver a alojamientos"                   | `/alojamientos`     |
| Mis reservas (sin reservas) | Enlace "Explora los alojamientos disponibles"   | `/alojamientos`     |
| Página 404                  | Botón "Volver al inicio"                        | `/`                 |

## Barra de navegación

La barra de navegación (`navbarcomponent`) estará siempre visible, porque se encuentra en `app.html` fuera del `<router-outlet>`. Además, se mantiene fija en la parte superior al hacer scroll (`sticky-top`). Contiene:

- **Inversiones LR** (logo): lleva a `/`.
- **Inicio**: lleva a `/`.
- **Alojamientos**: lleva a `/alojamientos`.
- **Mis reservas**: lleva a `/reservas`.

El enlace de la pantalla actual se resalta automáticamente con `routerLinkActive`.
