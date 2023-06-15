
import create from 'zustand';

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskManagerState = {
  tasks: Task[];
  searchTasks: (query: string) => void;
  addTask: (title: string) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
};

const useTaskManager = create<TaskManagerState>((set) => ({
  tasks: [],
  searchTasks: (query: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      ),
    }));
  },
  addTask: (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },
  updateTask: (id: string, updatedTask: Partial<Task>) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            ...updatedTask,
          };
        }
        return task;
      }),
    }));
  },
  deleteTask: (id: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));

export default useTaskManager;
