document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
  
    // Load 
    fetchTodos();
  
    // new
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text) {
        await fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        input.value = '';
        fetchTodos();
      }
    });
  
    // Fetch 
    async function fetchTodos() {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      renderTodos(todos);
    }
  
    // Render 
    function renderTodos(todos) {
      list.innerHTML = '';
      todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${todo.text}</span>
          <button class="delete-btn" data-id="${todo.id}">Delete</button>
        `;
        list.appendChild(li);
      });
  
      // Add delete event listeners
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          await fetch(`/api/todos/${btn.dataset.id}`, { method: 'DELETE' });
          fetchTodos();
        });
      });
    }
  });