<template>
  <!-- Contenedor principal de la aplicación -->
  <div id="app" class="app-background">
    <!-- Encabezado de la aplicación -->
    <div class="header">
      <!-- Imagen del logo de la aplicación -->
      <img src="@/assets/logo.jpeg" alt="Logo de la aplicación" width="200" height="200" />
      <br /><br />
      <!-- Título de la aplicación -->
      <h1>DigiSolver</h1>
    </div>
    <!-- Componente de la calculadora -->
    <Calculator />
  </div>
</template>

<script>
// Importa el componente Calculator desde el archivo correspondiente
import Calculator from './components/Calculator.vue';

// Define el componente principal de la aplicación
export default {
  // Registra el componente Calculator para su uso en este componente
  components: {
    Calculator,
  },
};
</script>

<style>
/* Estilos para el contenedor principal de la aplicación */
#app {
  text-align: center;
  margin-top: 60px;
}

/* Estilos para el fondo de la aplicación */
.app-background {
  background-image: url("./assets/fondo.jpg"); /* Ruta de tu imagen de fondo */
  background-size: cover; /* Ajusta la imagen al tamaño del contenedor */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita la repetición de la imagen */
  min-height: 100vh; /* Garantiza que el fondo ocupe al menos el 100% de la altura de la ventana */
  display: flex;
  flex-direction: column;
}

/* Estilos para el encabezado de la aplicación */
.header {
  margin-bottom: 20px;
}

/* Estilos para el título de la aplicación */
.header h1 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

/* Estilos para la imagen del logo */
.header img {
  width: 200px;
  height: 200px;
}
</style>


