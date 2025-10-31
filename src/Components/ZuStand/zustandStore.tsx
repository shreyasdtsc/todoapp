import { create } from "zustand";

// Define allowed task statuses
export type TaskStatus = "pending" | "ongoing" | "completed";

// Define Task shape
export interface Task {
  id: number;
  task: string;
  taskStatus: TaskStatus;
}

// Define shape of the task count object
export interface TaskCounts {
  pending: number;
  ongoing: number;
  completed: number;
}

// Define the full store state and actions
interface ToDoStore {
  input: string;
  toDoList: Task[];
  setInput: (value: string) => void;
  addTask: () => void;
  updateTaskStatus: (id: number, newStatus: TaskStatus) => void;
  deleteTask: (id: number) => void;
  taskCounts: () => TaskCounts;
}

let nextId = 0;

const useToDoStore = create<ToDoStore>((set, get) => ({
  input: "",
  toDoList: [],

  setInput: (value: string) => set({ input: value }),

  addTask: () => {
    const input = get().input.trim();
    if (!input) return;

    const newTask: Task = {
      id: ++nextId,
      task: input,
      taskStatus: "pending",
    };

    set((state) => ({
      toDoList: [...state.toDoList, newTask],
      input: "",
    }));
  },

  updateTaskStatus: (id: number, newStatus: TaskStatus) =>
    set((state) => ({
      toDoList: state.toDoList.map((task) =>
        task.id === id ? { ...task, taskStatus: newStatus } : task
      ),
    })),

  deleteTask: (id: number) =>
    set((state) => ({
      toDoList: state.toDoList.filter((task) => task.id !== id),
    })),

  taskCounts: (): TaskCounts => {
    const tasks = get().toDoList;
    return {
      pending: tasks.filter((t) => t.taskStatus === "pending").length,
      ongoing: tasks.filter((t) => t.taskStatus === "ongoing").length,
      completed: tasks.filter((t) => t.taskStatus === "completed").length,
    };
  },
}));

export default useToDoStore;
