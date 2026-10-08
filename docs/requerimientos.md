# Requerimientos funcionales del proyecto

En este apartado vamos a hacer la división de los requerimientos que nos solicita el enunciado del proyecto

## Listado

| Código | Nombre | Descripción | Pantalla |
|-------|-----------------------------------------------------------------------|---------------------------|---|--|
| RF-01 | Consultar alojamientos disponibles | Al entrar a `/alojamientos` se leen los datos de `data.json` y se muestran en tarjetas solo los alojamientos activos. Mientras carga aparece un indicador y, si la carga falla, un mensaje de error. | Listado |
| RF-02 | Filtrar por ciudad | Un selector con las ciudades disponibles (sin repetir) deja ver solo los alojamientos de la ciudad elegida. La opción "Todas" quita el filtro. | Listado |
| RF-03 | Filtrar por número de huéspedes | Muestra solo los alojamientos cuya capacidad es igual o mayor al número de huéspedes ingresado. | Listado |
| RF-04 | Filtrar por tipo de alojamiento | Un selector con los tipos disponibles (sin repetir) deja ver solo los alojamientos del tipo elegido. La opción "Todos" quita el filtro. | Listado |
| RF-05 | Filtrar por precio máximo | Muestra solo los alojamientos con precio por noche menor o igual al valor ingresado. | Listado |
| RF-06 | Limpiar filtros | El botón "Limpiar filtros" reinicia ciudad, huéspedes, tipo, precio máximo y orden, y vuelve a mostrar todos los alojamientos activos. | Listado |
| RF-07 | Ver alojamientos destacados | La portada muestra los 3 alojamientos activos con mejor calificación. | Inicio |
| RF-08 | Consultar el detalle de un alojamiento | Al abrir `/alojamientos/:id` se toma el `id` de la URL y se muestra nombre, ubicación, descripción, tipo, capacidad, habitaciones, camas, baños, precio, calificación, servicios, reglas y reseñas. Si el `id` no existe o el alojamiento está inactivo, se informa "Alojamiento no encontrado". | Detalle |
| RF-09 | Seleccionar fechas y huéspedes | El usuario elige fecha de llegada, fecha de salida y número de huéspedes. El calendario no permite fechas pasadas ni una salida anterior a la llegada. Si cambia algún dato, la cotización anterior deja de ser válida. | Detalle – Cotizador |
| RF-10 | Generar cotización: noches, subtotal, limpieza, servicio 10 % y total | Al pulsar "Cotizar" se validan las reglas RN-01 a RN-06 y se calcula: noches = salida − llegada; subtotal = noches × precio por noche; tarifa de limpieza del alojamiento; servicio = 10 % del subtotal; total = subtotal + limpieza + servicio. | Detalle – Cotizador |
| RF-11 | Registrar una reserva simulada con nombre y correo | Después de una cotización válida aparece el formulario de nombre y correo. Se valida que el nombre no esté vacío y que el correo tenga un formato válido. Al reservar se asigna un número consecutivo y el estado CONFIRMADA, y se muestra un mensaje de éxito. No se hace ningún pago real. | Detalle – Cotizador |
| RF-12 | Consultar mis reservas | En `/reservas` se muestra una tabla con número, alojamiento, ciudad, fechas, huéspedes, valor total y estado de cada reserva. Si no hay reservas, aparece un mensaje con un enlace al listado. | Mis reservas |
| RF-13 | Ordenar alojamientos (precio menor/mayor, calificación) | El selector "Ordenar por" organiza los resultados por precio de menor a mayor, de mayor a menor o por mejor calificación. El orden se aplica sobre los resultados ya filtrados. | Listado |
| RF-14 | Cancelar una reserva | Cada reserva CONFIRMADA tiene un botón "Cancelar". Tras confirmar en un cuadro de diálogo, el estado cambia a CANCELADA y la reserva sigue visible en la lista. | Mis reservas |
| RF-15 | Conservar las reservas al recargar la página (localStorage) | Cada vez que se crea o cancela una reserva, la lista se guarda en el `localStorage` del navegador y se vuelve a cargar al abrir la aplicación, así las reservas no se pierden al recargar. | Mis reservas |
| RF-16 | Ver fotos en carrusel | Las imágenes del alojamiento se muestran en un carrusel que avanza solo. Las flechas para pasar las fotos solo aparecen si hay más de una imagen. | Detalle |
| RF-17 | Ver promedio de reseñas | Junto al título "Reseñas" se muestra el promedio de calificación (con un decimal) y la cantidad de reseñas. Si no hay reseñas, se indica "Este alojamiento aún no tiene reseñas". | Detalle |
| RF-18 | Página de error 404 | Cualquier ruta que no exista muestra una página 404 con un botón para volver al inicio. | 404 (cualquier ruta inválida) |

## Funcionalidades adicionales

- Clima actual de la ciudad (API Open-Meteo) - Detalles
- Festivos de Colombia dentro de la estadía (API Nager.Date) - Cotizaciones
- Aproximación total en dólares (API ExchangeRate) - Cotizaciones
