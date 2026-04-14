# Prueba Lectiva

Base SvelteKit con arquitectura `feature-first/domain-first` para integrar la API de Rick and Morty.

## Run

```bash
npm install
npm run dev
```

## Check

```bash
npm run check
npm run build
```

## CI/CD

El proyecto incluye un workflow en `.github/workflows/pages.yml` que:

- valida con `npm run check`
- compila con `npm run build`
- publica automaticamente en GitHub Pages cuando hay un push a `main`

Para que el despliegue funcione, el repositorio debe usar `GitHub Actions` como fuente de GitHub Pages.

## Estructura

- `src/lib/core`: cliente HTTP, configuracion y adaptadores.
- `src/lib/entities`: tipos y mapeos de dominio.
- `src/lib/features`: features por caso de uso.
- `src/routes`: composicion de rutas y carga de datos.
