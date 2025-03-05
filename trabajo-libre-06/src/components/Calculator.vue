<template>
      <!-- Contenedor principal de la calculadora -->
    <div class="calculator">
       <!-- Pantalla de la calculadora -->
        <div class="calculator-screen">
        <!-- Input de texto para mostrar el valor actual -->
        <input type="text" :value="display" disabled />
      </div>
         <!-- Botones de la calculadora -->
      <div class="calculator-buttons">
        <button @click="appendToDisplay('1')">1</button>
        <button @click="appendToDisplay('2')">2</button>
        <button @click="appendToDisplay('3')">3</button>
        <button @click="appendToDisplay('4')">4</button>
        <button @click="appendToDisplay('5')">5</button>
        <button @click="appendToDisplay('6')">6</button>
        <button @click="appendToDisplay('7')">7</button>
        <button @click="appendToDisplay('8')">8</button>
        <button @click="appendToDisplay('9')">9</button>
        <button @click="appendToDisplay('0')">0</button>
        <button @click="appendToDisplay('+')">+</button>
        <button @click="appendToDisplay('-')">-</button>
        <button @click="appendToDisplay('*')">x</button>
        <button @click="appendToDisplay('/')">/</button>
        <button @click="appendToDisplay('Math.sqrt(')">√</button>
        <button @click="appendToDisplay('**')">^</button>
        <button @click="clearDisplay()">C</button>
        <button @click="calculateResult()">=</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Valor actual en la pantalla de la calculadora
        display: '0',
      };
    },
    methods: {
      // Función para agregar un valor a la pantalla
        appendToDisplay(value) {
        if (this.display === '0' || this.display === 'Error') {
          this.display = value;
        } else {
          this.display += value;
        }
      },
      // Función para borrar la pantalla
      clearDisplay() {
        this.display = '0';
      },
       // Función para calcular el resultado de la expresión en la pantalla
      calculateResult() {
        try {
          this.display = eval(this.display);
        } catch (error) {
          this.display = 'Error';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para la calculadora */
.calculator {
  max-width: 300px;
  margin: auto;
  border: 2px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: #000; /* Fondo negro */
  color: #fff; /* Texto blanco */
}

/* Estilos para la pantalla de la calculadora */
.calculator-screen {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 1.5em;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background-color: #ccc; /* Fondo negro más oscuro */
  color: #fff; /* Texto blanco */
}

/* Estilos para los botones de la calculadora */
.calculator-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
}

.calculator-buttons button {
  width: 100%;
  height: 50px;
  font-size: 1.2em;
  background-color: #333; /* Fondo negro aún más oscuro */
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #fff; /* Texto blanco */
}

.calculator-buttons button:hover {
  background-color: #555; /* Cambio de color al pasar el ratón */
}
</style>

  