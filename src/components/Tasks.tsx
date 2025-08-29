import React, { useState, useEffect } from 'react';
import axios from '../interceptor/axios.interceptor'; // Your Axios instance
import { Task } from '../interface/types'; // Assuming you have the Task interface
import styles from '../style/Tasks.module.css'; // Assuming you use CSS modules for styling

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks
  const [newTask, setNewTask] = useState<{ title: string, description: string }>({
    title: '',
    description: '',
  });

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/tasks');
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Handle adding a new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/tasks', newTask);
      setTasks([...tasks, response.data.task]);
      setNewTask({ title: '', description: '' }); // Reset form after submission
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove deleted task from the state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Your Tasks</h2>

      {/* Add Task Form */}
      <form className={styles.addTaskForm} onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className={styles.inputField}
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className={styles.textareaField}
        />
        <button type="submit" className={styles.addTaskButton}>Add Task</button>
      </form>

      {/* Task List */}
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div key={task._id} className={styles.taskCard}>
            <h3 className={styles.taskTitle}>{task.title}</h3>
            <p className={styles.taskDescription}>{task.description}</p>
            <button 
              className={styles.deleteButton} 
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
