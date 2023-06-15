import React, { ChangeEvent, useRef } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import useTaskManager from '../hooks/useTaskManager';
import useLocalStorage from '../hooks/useLocalStorage';

const TasksPage = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTaskManager();
  const [searchQuery, setSearchQuery] = useState('');
  const [storedTasks, setStoredTasks] = useLocalStorage('tasks', []);

  // Mettre à jour les tâches stockées lorsqu'elles changent
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = event.currentTarget.title.value;
    if (title) {
      addTask(title);
      event.currentTarget.title.value = '';
    }
  };

  const handleUpdateTask = (id: string, completed: boolean) => {
    updateTask(id, { completed });
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  return (
    <>
      <Head>
        <title>Task Manager - Tasks</title>
        <meta name="description" content="Task Manager - Tasks" />
      </Head>
      <div>
        <h1>Task Manager</h1>
        <form onSubmit={handleAddTask}>
          <input type="text" name="title" placeholder="Task title" required />
          <button type="submit">Add Task</button>
        </form>
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={handleSearch}
        />
        <ul>
          {tasks
            .filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((task) => (
              <li key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(event) => handleUpdateTask(task.id, event.target.checked)}
                />
                <span>{task.title}</span>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default TasksPage;

export default TaskManager;
