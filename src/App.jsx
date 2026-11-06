import { useEffect, useState } from 'react';

// La URL del backend se fija al compilar: VITE_API_URL=http://<IP>:8080 npm run build
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [error, setError] = useState('');

  const cargar = async () => {
    try {
      const res = await fetch(`${API_URL}/api/productos`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setProductos(await res.json());
      setError('');
    } catch (e) {
      setError(`No se pudo contactar al backend en ${API_URL} (${e.message})`);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const crear = async (evento) => {
    evento.preventDefault();
    const res = await fetch(`${API_URL}/api/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, precio: Number(precio) }),
    });
    if (res.ok) {
      setNombre('');
      setPrecio('');
      cargar();
    } else {
      setError(`Error al crear el producto (HTTP ${res.status})`);
    }
  };

  const eliminar = async (id) => {
    await fetch(`${API_URL}/api/productos/${id}`, { method: 'DELETE' });
    cargar();
  };

  return (
    <main>
      <h1>Productos</h1>
      <p className="api">API: {API_URL}</p>
      {error && <p className="error">{error}</p>}

      <form onSubmit={crear}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          min="0"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} — ${p.precio}
            <button onClick={() => eliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
