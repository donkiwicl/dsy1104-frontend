# dsy1104-frontend

SPA de ejemplo (React + Vite) para el taller de despliegue en AWS de DSY1104 Full Stack 2. Lista, crea y elimina productos del backend.

```bash
npm install
npm run dev                                   # http://localhost:5173, API en http://localhost:8080
VITE_API_URL=http://<IP-EC2>:8080 npm run build   # genera dist/ para subir a S3
```

La URL de la API se lee de `VITE_API_URL` **al compilar**; cambiarla exige volver a compilar.

```bash
docker build --build-arg VITE_API_URL=http://localhost:8080 -t dsy1104-frontend .
```

El entorno completo se levanta desde el repositorio `dsy1104-meta`.
