const socket = io();

// Función para agregar tarea
window.addTask = () => {
  const newTask = $('#taskInput').val();
  if (newTask.trim() !== '') {
    socket.emit('addTask', { content: newTask });
    $('#taskInput').val('');
  }
};

// Función para vaciar la lista de tareas
window.clearTasks = () => {
  // Enviar solicitud al servidor para borrar tareas
  socket.emit('clearTasks');

  // Limpiar la lista de tareas en el cliente inmediatamente
  updateTasksList([]);
};

// Escuchar el evento 'updateTasks' del servidor
socket.on('updateTasks', (updatedTasks) => {
  // Actualizar la interfaz de usuario con las tareas actualizadas
  updateTasksList(updatedTasks);
});

// Función para actualizar la lista de tareas en la página
const updateTasksList = (tasks) => {
  const tasksList = $('#tasksList');
  tasksList.empty();

  tasks.forEach((task) => {
    const listItem = $('<li class="list-group-item d-flex justify-content-between align-items-center"></li>');
    const taskText = task.content;

    // Icono para indicar si la tarea está completada
    const icon = $('<i class="fa"></i>');

    // Manejar clic en el icono para cambiar el estado de la tarea
    icon.on('click', () => {
      task.completed = !task.completed;
      updateTasksList(tasks);
    });

    // Asignar la clase y el contenido del icono según el estado de la tarea
    if (task.completed) {
      icon.addClass('fa-pencil-square text-success mr-2');
      listItem.addClass('completed-task'); // Agregar clase para subrayado intermedio
    } else {
      icon.addClass('fa-pencil-square-o text-secondary mr-2');
    }

    // Manejar clic en el texto para editar la tarea
    const taskSpan = $('<span></span>')
      .text(taskText)
      .on('click', () => {
        const editedTask = prompt('Editar tarea:', task.content);
        if (editedTask !== null) {
          task.content = editedTask;
          updateTasksList(tasks);
        }
      });

    listItem.append(icon);
    listItem.append(taskSpan);

    // Botón para eliminar la tarea
    const deleteButton = $('<button type="button" class="btn btn-danger btn-sm ml-2">Eliminar</button>')
      .on('click', () => {
        tasks = tasks.filter((t) => t !== task);
        updateTasksList(tasks);
      });

    listItem.append(deleteButton);
    tasksList.append(listItem);
  });

  console.log('Lista de tareas actualizada en el cliente:', tasks);
};













  