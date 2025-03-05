const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = req.body.content;
  tasks.push({ content: newTask });
  io.emit('updateTasks', tasks);
  res.json({ message: 'Task added successfully', tasks });
});

app.delete('/tasks', (req, res) => {
  tasks = [];
  io.emit('updateTasks', tasks);
  res.json({ message: 'Tasks cleared successfully', tasks });
});

io.on('connection', (socket) => {
  // Emitir mensaje al cliente cuando se conecta
  socket.emit('message', 'Hello from the server');

  // Escuchar el evento 'addTask' del cliente
  socket.on('addTask', (newTask) => {
    // Agregar la tarea a una lista (puedes adaptar esto según tus necesidades)
    tasks.push(newTask);

    // Emitir actualización a todos los clientes
    io.emit('updateTasks', tasks);
  });

  // Escuchar el evento 'clearTasks' del cliente
  socket.on('clearTasks', () => {
    // Vaciar la lista de tareas
    tasks = [];

    // Emitir actualización a todos los clientes
    io.emit('updateTasks', tasks);
  });

  socket.on('disconnect', () => {
    // Usuario desconectado
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


