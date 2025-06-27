const express = require('express');
const router = express.Router();
const { pool } = require('../database');

// get Todo=
router.get('/', async (req, res) => {
  try {
    const [todos] = await pool.query('SELECT * FROM todos ORDER BY created_at DESC');
    res.json({
      success: true,
      data: todos,
      count: todos.length
    });
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch todos',
      error: err.message 
    });
  }
});

// getTodo by id
router.get('/:id', async (req, res) => {
  try {
    const [todos] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    
    if (todos.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Todo not found' 
      });
    }
    
    res.json({
      success: true,
      data: todos[0]
    });
  } catch (err) {
    console.error('Error fetching todo:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch todo',
      error: err.message 
    });
  }
});

// Add new todo
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Todo text is required' 
      });
    }
    
    const [result] = await pool.query(
      'INSERT INTO todos (text) VALUES (?)',
      [text.trim()]
    );
    
    const [newTodo] = await pool.query('SELECT * FROM todos WHERE id = ?', [result.insertId]);
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: newTodo[0]
    });
  } catch (err) {
    console.error('Error creating todo:', err);
    res.status(400).json({ 
      success: false, 
      message: 'Failed to create todo',
      error: err.message 
    });
  }
});

//update!
router.put('/:id', async (req, res) => {
  try {
    const { text, completed } = req.body;
    const todoId = req.params.id;
    
    const [existingTodos] = await pool.query('SELECT * FROM todos WHERE id = ?', [todoId]);
    
    if (existingTodos.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Todo not found' 
      });
    }
    
    const updateFields = [];
    const updateValues = [];
    
    if (text !== undefined) {
      if (!text || text.trim() === '') {
        return res.status(400).json({ 
          success: false, 
          message: 'Todo text cannot be empty' 
        });
      }
      updateFields.push('text = ?');
      updateValues.push(text.trim());
    }
    
    if (completed !== undefined) {
      updateFields.push('completed = ?');
      updateValues.push(completed);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No fields to update' 
      });
    }
    
    updateValues.push(todoId);
    
    await pool.query(
      `UPDATE todos SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    const [updatedTodo] = await pool.query('SELECT * FROM todos WHERE id = ?', [todoId]);
    
    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: updatedTodo[0]
    });
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update todo',
      error: err.message 
    });
  }
});

router.patch('/:id/toggle', async (req, res) => {
  try {
    const todoId = req.params.id;
    
    const [existingTodos] = await pool.query('SELECT * FROM todos WHERE id = ?', [todoId]);
    
    if (existingTodos.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Todo not found' 
      });
    }
    
    const currentStatus = existingTodos[0].completed;
    
    await pool.query(
      'UPDATE todos SET completed = ? WHERE id = ?',
      [!currentStatus, todoId]
    );
    
    const [updatedTodo] = await pool.query('SELECT * FROM todos WHERE id = ?', [todoId]);
    
    res.json({
      success: true,
      message: 'Todo status toggled successfully',
      data: updatedTodo[0]
    });
  } catch (err) {
    console.error('Error toggling todo:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to toggle todo status',
      error: err.message 
    });
  }
});

//hapus semua

router.delete('/completed/all', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM todos WHERE completed = true');
    
    res.json({
      success: true,
      message: `${result.affectedRows} completed todos deleted successfully`
    });
  } catch (err) {
    console.error('Error deleting completed todos:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete completed todos',
      error: err.message 
    });
  }
});

// hapus semua
router.delete('/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    
    const [existingTodos] = await pool.query('SELECT * FROM todos WHERE id = ?', [todoId]);
    
    if (existingTodos.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Todo not found' 
      });
    }
    
    await pool.query('DELETE FROM todos WHERE id = ?', [todoId]);
    
    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting todo:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete todo',
      error: err.message 
    });
  }
});

module.exports = router;