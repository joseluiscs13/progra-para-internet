// Importa las librerías React y ReactDOM/client, estilos, componente App, y funciones de medición de rendimiento
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Importa los estilos de Bootstrap desde el paquete 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

// Crea un nodo raíz para renderizar la aplicación en el elemento con id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
// Renderiza la aplicación dentro de React.StrictMode para mejoras en el desarrollo
root.render(
  <React.StrictMode>
    {/* Componente principal de la aplicación */}
    <App />
  </React.StrictMode>
);

// Función para medir el rendimiento de la aplicación
// Si deseas medir el rendimiento, pasa una función para registrar resultados
// Puedes enviar los resultados a una endpoint de análisis o simplemente imprimirlos en la consola
// Obtén más información en: https://bit.ly/CRA-vitals
reportWebVitals();

