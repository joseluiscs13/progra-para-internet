// Importa la librería React y el componente MemeGenerator desde el archivo MemeGenerator.js
import React from 'react';
import MemeGenerator from './MemeGenerator';
// Importa los estilos de Bootstrap desde el paquete 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

// Define la función del componente App
function App() {
  // Retorna la estructura del componente
  return (
    <div>
      {/* Barra de navegación */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container">
          {/* Enlace con el logo */}
          <a className="navbar-brand" href="/inicio">
            {/* Imagen del logo desde la carpeta 'public' */}
            <img src={process.env.PUBLIC_URL + '/logo.jpg'} width="30" height="30" alt="Logo" />
            MemeCraft
          </a>
          {/* Botón de hamburguesa para navegación en dispositivos móviles */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Contenedor de opciones de navegación */}
          <div className="collapse navbar-collapse" id="navbarNav">
          </div>
        </div>
      </nav>
      {/* Contenedor principal del contenido */}
      <div className="container mt-4">
        {/* Componente MemeGenerator para la generación de memes */}
        <MemeGenerator />
      </div>
    </div>
  );
}

// Exporta el componente App para su uso en otros archivos
export default App;


