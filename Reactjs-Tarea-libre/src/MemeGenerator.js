// Importa las funciones 'useState' y 'useEffect' de React para manejar el estado y los efectos secundarios respectivamente.
// Importa 'axios' para realizar solicitudes HTTP.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define el componente funcional MemeGenerator.
const MemeGenerator = () => {
  // Utiliza el hook 'useState' para crear variables de estado para la imagen, textos y la URL de la imagen generada.
  const [image, setImage] = useState('');
  const [texts, setTexts] = useState([]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');

  // Utiliza el hook 'useEffect' para realizar operaciones cuando el componente se monta.
  useEffect(() => {
    // Define una función asincrónica 'fetchMemeImage' para obtener una imagen de meme aleatoria.
    const fetchMemeImage = async () => {
      try {
        // Realiza una solicitud GET a la API de Imgflip para obtener la lista de memes.
        const response = await axios.get('https://api.imgflip.com/get_memes');
        // Extrae la lista de memes de la respuesta.
        const memes = response.data.data.memes;
        // Selecciona un meme aleatorio de la lista.
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        // Imprime en la consola la información del meme obtenido.
        console.log('Información de la imagen obtenida:', randomMeme);
        // Establece la imagen obtenida como estado.
        setImage(randomMeme);
        // Determina la cantidad de campos de texto requeridos en el meme.
        const fieldsCount = randomMeme.box_count;
        // Inicializa los textos con valores vacíos, según la cantidad de campos.
        setTexts(new Array(fieldsCount).fill(''));
      } catch (error) {
        // Captura y maneja errores en caso de que falle la obtención de la imagen del meme.
        console.error('Error fetching meme image:', error);
      }
    };

    // Llama a la función 'fetchMemeImage' cuando el componente se monta (gracias a la dependencia vacía []).
    fetchMemeImage();
  }, []);


  // Define la función 'updateText' para actualizar el texto en una posición específica.
const updateText = (index, value) => {
  // Crea una copia del array 'texts' utilizando el operador de propagación ('...').
  const newTexts = [...texts];
  // Actualiza el valor del texto en la posición dada con el nuevo valor.
  newTexts[index] = value;
  // Establece el nuevo array de textos como estado.
  setTexts(newTexts);
};

// Define la función 'generateMeme' para generar el meme con los textos actuales.
const generateMeme = () => {
  // Filtra los textos vacíos y los codifica para su inclusión en la URL.
  const filledTexts = texts.filter(text => text.trim() !== '').map(text => encodeURIComponent(text.trim()));

  // Construye la URL para la generación del meme con los textos dinámicos.
  const memeGenerationUrl = `https://api.imgflip.com/caption_image?template_id=${image.id}${filledTexts.map((text, index) => `&boxes[${index}][text]=${text}`).join('')}&username=balcano1234&password=luises13`;

  // Realiza una solicitud POST a la URL construida.
  axios.post(memeGenerationUrl)
    .then(response => {
      // Verifica si la generación del meme fue exitosa.
      if (response.data.success) {
        // Obtiene la URL de la imagen generada y la establece como estado.
        const generatedImageUrl = response.data.data.url;
        setGeneratedImageUrl(generatedImageUrl);
        // Actualiza la URL de la imagen original con la generada.
        setImage(prevImage => ({ ...prevImage, url: generatedImageUrl }));
      } else {
        // Imprime en la consola un mensaje de error si la generación del meme falló.
        console.error('Error generando meme:', response.data.error_message);
      }
    })
    .catch(error => {
      // Captura y maneja errores en caso de fallo en la solicitud de generación del meme.
      console.error('Error en la solicitud de generación de meme:', error);
    });
};

  // Define la función 'downloadMeme' para descargar la imagen del meme generada.
const downloadMeme = () => {
    // Verifica si hay una URL de imagen generada.
    if (generatedImageUrl) {
      // Realiza una solicitud para obtener la imagen en formato blob.
      fetch(generatedImageUrl)
        .then(response => response.blob())
        .then(blob => {
          // Crea una URL para el objeto blob.
          const url = URL.createObjectURL(blob);
          // Crea un elemento de enlace temporal.
          const downloadLink = document.createElement('a');
          // Establece la URL del enlace como la URL del objeto blob.
          downloadLink.href = url;
          // Establece el nombre de descarga del archivo.
          downloadLink.download = 'memazo.png';
          // Agrega el enlace al cuerpo del documento.
          document.body.appendChild(downloadLink);
          // Simula un clic en el enlace para iniciar la descarga.
          downloadLink.click();
          // Elimina el enlace temporal del cuerpo del documento.
          document.body.removeChild(downloadLink);
        })
        .catch(error => {
          // Imprime en la consola un mensaje de error si hay problemas al convertir la imagen.
          console.error('Error al convertir la imagen:', error);
        });
    } else {
      // Imprime en la consola un mensaje si no se ha generado ninguna imagen para descargar.
      console.error('No se ha generado ninguna imagen para descargar.');
    }
  };
  
  // Define la función 'loadNewMeme' para cargar una nueva imagen de meme.
  const loadNewMeme = () => {
    // Recarga la página para obtener otro meme.
    window.location.reload();
  };
  
  // Retorna la interfaz del componente MemeGenerator.
  return (
    <div className="container mt-4" style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
    {/* Contenedor para centrar la imagen */}
    <div className="d-flex justify-content-center mb-4">
      {/* Imagen con tamaño de impresión de 400px por 400px */}
      <img
        src={image.url}
        alt="Meme"
        className="img-fluid rounded"
        style={{ border: '2px solid #ddd', width: '400px', height: '400px', borderRadius: '5px' }}
      />
    </div>

    {/* Campos de texto */}
    {texts.map((text, index) => (
      <div key={index} className="form-group">
        <input
          type="text"
          placeholder={`Texto ${index + 1}`}
          value={text}
          onChange={(e) => updateText(index, e.target.value)}
          className="form-control"
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '20px', fontWeight: 'bold' }}
        />
      </div>
    ))}

    {/* Botones de generación, descarga y otro meme */}
    <div className="text-center">
      <button onClick={generateMeme} className="btn btn-primary mr-2" style={{ padding: '10px 20px', borderRadius: '5px', fontSize: '20px', backgroundColor: '#007bff', color: '#fff' }}>
        Generar Meme
      </button>
      <button onClick={downloadMeme} className="btn btn-success mr-2" style={{ padding: '10px 20px', borderRadius: '5px', fontSize: '20px', backgroundColor: '#28a745', color: '#fff' }}>
        Descargar Meme
      </button>
      <button onClick={loadNewMeme} className="btn btn-secondary" style={{ padding: '10px 20px', borderRadius: '5px', fontSize: '20px', backgroundColor: '#6c757d', color: '#fff' }}>
        Otro Meme
      </button>
    </div>
  </div>
  );
};

export default MemeGenerator;






