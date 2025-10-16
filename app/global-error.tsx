'use client';
import ValidateSession from './dashboard/Session';
// import { useEffect } from 'react';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Opcional: Usar useEffect para registrar el error
  // useEffect(() => {
  //   // Ejemplo: Registrar el error en un servicio de monitoreo (como Sentry)
  // }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <ValidateSession />
      <h1>¡Algo salió mal! 😵</h1>
      <p>Lo sentimos, ha ocurrido un error de renderizado.</p>

      {/* Botón para intentar recuperar */}
      <button
        onClick={
          // Intenta re-renderizar el segmento de la ruta
          () => reset()
        }
        style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Intentar de Nuevo
      </button>

      {/* Opcional: Mostrar detalles del error en desarrollo */}
      <details
        style={{
          marginTop: '1rem',
          whiteSpace: 'pre-wrap',
          textAlign: 'left',
          maxWidth: '600px',
          margin: '1rem auto',
        }}
      >
        <summary>Detalles del Error</summary>
        {error.message}
      </details>
    </div>
  );
}
