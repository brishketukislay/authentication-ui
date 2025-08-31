import React, { useState, useEffect } from 'react';
import axios from '../interceptor/axios.interceptor';
import { Task } from '../interface/types';
import styles from '../style/Tasks.module.scss';
import strings from '../constants/strings.json';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTaskData, setEditTaskData] = useState({ title: '', description: '' });

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

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/tasks', newTask);
      setTasks([...tasks, response.data.task]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task._id);
    setEditTaskData({ title: task.title, description: task.description });
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTaskData({ title: '', description: '' });
  };

  const handleSaveEdit = async (taskId: string) => {
    try {
      const response = await axios.put(`/tasks/${taskId}`, editTaskData);
      setTasks(tasks.map(task =>
        task._id === taskId ? response.data.task : task
      ));
      setEditingTaskId(null);
      setEditTaskData({ title: '', description: '' });
    } catch (error) {
      console.error('Error updating task:', error);
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
        <button type="submit" className={styles.addTaskButton}>{strings.tasks.addTask}</button>
      </form>

      {/* Task List */}
      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div key={task._id} className={styles.taskCard}>
            {editingTaskId === task._id ? (
              <>
                <input
                  className={styles.inputField}
                  value={editTaskData.title}
                  onChange={(e) => setEditTaskData({ ...editTaskData, title: e.target.value })}
                />
                <textarea
                  className={styles.textareaField}
                  value={editTaskData.description}
                  onChange={(e) => setEditTaskData({ ...editTaskData, description: e.target.value })}
                />
                <button className={styles.addTaskButton} onClick={() => handleSaveEdit(task._id)}>
                  {strings.operations.save}
                </button>
                <button className={styles.deleteButton} onClick={handleCancelEdit}>
                  {strings.operations.cancel}
                </button>
              </>
            ) : (
              <>
                <h3 className={styles.taskTitle}>{task.title}</h3>
                <p className={styles.taskDescription}>{task.description}</p>
                <button className={styles.addTaskButton} onClick={() => handleEditClick(task)}>
                  {strings.operations.edit}
                </button>
                <button className={styles.deleteButton} onClick={() => handleDeleteTask(task._id)}>
                  {strings.operations.delete}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
