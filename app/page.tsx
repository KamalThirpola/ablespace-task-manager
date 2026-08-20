"use client";

import { useState } from "react";

type Task = {
  id: number;
  name: string;
  priority: "High" | "Medium" | "Low";
  member: string;
  dueDate: string;
};

const initialTasks: Record<string, Task[]> = {
  "To Do": [
    {
      id: 1,
      name: "Design Homepage",
      priority: "High",
      member: "N",
      dueDate: "12 Sep 2026",
    },
    {
      id: 2,
      name: "Develop Login feature",
      priority: "Low",
      member: "K",
      dueDate: "15 Sep 2026",
    },
    {
      id: 3,
      name: "Test Payment Gateway",
      priority: "Medium",
      member: "A",
      dueDate: "18 Sep 2026",
    },
  ],
  Doing: [
    {
      id: 4,
      name: "Design Homepage",
      priority: "High",
      member: "N",
      dueDate: "12 Sep 2026",
    },
    {
      id: 5,
      name: "Develop Login feature",
      priority: "Low",
      member: "K",
      dueDate: "15 Sep 2026",
    },
    {
      id: 6,
      name: "Test Payment Gateway",
      priority: "Medium",
      member: "A",
      dueDate: "18 Sep 2026",
    },
  ],
  Completed: [
    {
      id: 7,
      name: "Design Homepage",
      priority: "High",
      member: "N",
      dueDate: "12 Sep 2026",
    },
    {
      id: 8,
      name: "Develop Login feature",
      priority: "Low",
      member: "K",
      dueDate: "15 Sep 2026",
    },
  ],
};

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAddTask, setShowAddTask] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [newTask, setNewTask] = useState({
    name: "",
    priority: "Medium" as Task["priority"],
    dueDate: "",
  });

  const addTask = () => {
    if (!newTask.name.trim()) return;

    const task: Task = {
      id: Date.now(),
      name: newTask.name,
      priority: newTask.priority,
      member: "K",
      dueDate: newTask.dueDate || "20 Sep 2026",
    };

    setTasks((current) => ({
      ...current,
      "To Do": [...current["To Do"], task],
    }));

    setNewTask({
      name: "",
      priority: "Medium",
      dueDate: "",
    });

    setShowAddTask(false);
  };

  const deleteTask = (group: string, id: number) => {
    setTasks((current) => ({
      ...current,
      [group]: current[group].filter((task) => task.id !== id),
    }));
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-[#151515] text-white" : "bg-white text-[#202020]"
      }`}
    >
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`hidden w-[220px] border-r px-5 py-6 md:block ${
            darkMode
              ? "border-[#303030] bg-[#191919]"
              : "border-[#eeeeee] bg-[#fafafa]"
          }`}
        >
          <div className="mb-10 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d9b8ff] text-sm font-bold">
              A
            </div>
            <span className="font-semibold">AbleSpace</span>
          </div>

          <div className="mb-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Workspace
            </p>

            <button className="mb-2 flex w-full items-center gap-3 rounded-lg bg-[#eeeeee] px-3 py-2 text-left text-sm font-medium dark:bg-[#292929]">
              <span>✓</span>
              Tasks
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-100">
              <span>□</span>
              Projects
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Header */}
          <header
            className={`flex h-16 items-center justify-between border-b px-5 md:px-8 ${
              darkMode ? "border-[#303030]" : "border-[#eeeeee]"
            }`}
          >
            <div className="flex items-center gap-3">
              <button className="text-xl md:hidden">☰</button>
              <h1 className="text-sm font-semibold">Assessment Task</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full border px-3 py-1.5 text-xs"
              >
                {darkMode ? "☀ Light" : "☾ Dark"}
              </button>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c8b6ff] text-xs font-bold">
                K
              </div>
            </div>
          </header>

          {/* Content */}
          <section className="px-5 py-7 md:px-10">
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Tasks</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Manage and track your tasks
                </p>
              </div>

              <div className="flex gap-2">
                <button className="rounded-lg border px-4 py-2 text-sm">
                  🔍 Search
                </button>

                <button
                  onClick={() => setShowAddTask(true)}
                  className="rounded-lg bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-black"
                >
                  + Add Task
                </button>
              </div>
            </div>

            {/* Task Groups */}
            <div className="space-y-8">
              {Object.entries(tasks).map(([group, groupTasks]) => (
                <div key={group}>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm">⌄</span>
                    <h3 class