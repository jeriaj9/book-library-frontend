# Library Web

Frontend en React para ver y administrar los libros y autores que expone la Library API (.NET).

## Requisitos

- Node.js 22 (o 20.19+)
- La Library API corriendo en http://localhost:5000

## Cómo correrlo

```bash
git clone https://github.com/jeriaj9/book-library-frontend.git
cd library-web
npm install
npm run dev
```

Luego abrir http://localhost:5173

Si la API corre en otra url se puede cambiar en el archivo `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

## Tecnologías

- React 19 + Vite
- React Router
- Axios
- React Bootstrap y Bootstrap Icons

## Estructura

```
src/
  App.jsx          rutas principales, carga los módulos con React.lazy
  modules/
    books/         lista y detalle de libros, formulario de libro
    authors/       lista de autores, formulario de autor
    shared/        layout, paginación, componentes comunes y los servicios que llaman a la API
```

Los módulos `books` y `authors` se cargan con lazy loading, solo cuando se entra a su ruta.

## Páginas

- `/books`: lista de libros con título y descripción. Tiene botones para ver detalle, agregar, editar y eliminar.
- `/books/:id`: detalle del libro con su autor.
- `/authors`: lista de autores con nombre y cantidad de libros. Tiene botones para agregar, editar y eliminar.

Las tablas de libros y autores están paginadas de 10 en 10. La paginación se hace en el frontend porque la FakeRestAPI devuelve todos los registros de una vez.

## Notas

- La FakeRestAPI no guarda los cambios, por eso al crear, editar o eliminar se actualiza la lista en pantalla con lo que responde la API. Si se recarga la página vuelven los datos originales.
- En la API externa cada autor tiene un registro por libro (`idBook`), así que la cantidad de libros se calcula contando los registros con el mismo nombre.
