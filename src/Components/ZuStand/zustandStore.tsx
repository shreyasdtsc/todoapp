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
export interface ToDoStore {
  input: string;
  toDoList: Task[];
  setInput: (value: string) => void;
  addTask: () => void;
  updateTaskStatus: (id: number, newStatus: TaskStatus) => void;
  deleteTask: (id: number) => void;
  taskCounts: () => TaskCounts;
}

let nextId = 0;

// ✅ Explicitly type `set` and `get` using Zustand generics
const useToDoStore = create<ToDoStore>((set, get) => ({
  input: "",
  toDoList: [],

  setInput: (value) => set({ input: value }),

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

  updateTaskStatus: (id, newStatus) =>
    set((state) => ({
      toDoList: state.toDoList.map((task) =>
        task.id === id ? { ...task, taskStatus: newStatus } : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      toDoList: state.toDoList.filter((task) => task.id !== id),
    })),

  taskCounts: () => {
    const tasks = get().toDoList;
    return {
      pending: tasks.filter((t) => t.taskStatus === "pending").length,
      ongoing: tasks.filter((t) => t.taskStatus === "ongoing").length,
      completed: tasks.filter((t) => t.taskStatus === "completed").length,
    };
  },
}));

export default useToDoStore;
