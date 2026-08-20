"use client";

import { useEffect, useMemo, useState } from "react";
import { AddTaskModal } from "./components/AddTaskModal";
import { Sidebar } from "./components/Sidebar";
import { Task, TaskPriority, TaskStatus, TaskTable } from "./components/TaskTable";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const statuses: TaskStatus[] = ["To Do", "Doing", "Completed"];

const seedTasks: Task[] = [
  { id: 1, name: "Design Homepage", priority: "High", member: "N", dueDate: "12 Sep 2026", status: "To Do" },
  { id: 2, name: "Develop Login feature", priority: "Low", member: "K", dueDate: "15 Sep 2026", status: "To Do" },
  { id: 3, name: "Test Payment Gateway", priority: "Medium", member: "A", dueDate: "18 Sep 2026", status: "To Do" },
  { id: 4, name: "Create responsive layout", priority: "High", member: "N", dueDate: "10 Sep 2026", status: "Doing" },
  { id: 5, name: "Connect task API", priority: "Medium", member: "K", dueDate: "14 Sep 2026", status: "Doing" },
  { id: 6, name: "Review accessibility", priority: "Low", member: "A", dueDate: "16 Sep 2026", status: "Completed" },
  { id: 7, name: "Prepare documentation", priority: "Medium", member: "K", dueDate: "20 Sep 2026", status: "Completed" },
];

const projects = [
  { name: "AbleSpace Website", description: "Main product workspace and task management experience.", progress: 72, icon: "◈" },
  { name: "Mobile Experience", description: "Responsive layouts and mobile navigation improvements.", progress: 46, icon: "□" },
  { name: "API Integration", description: "Task APIs, validation and persistent data layer.", progress: 28, icon: "◇" },
];

function formatDueDate(value: string) {
  if (!value) return "20 Sep 2026";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  if (!API_URL) throw new Error("API URL is not configured");
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) } });
  if (!response.ok) throw new Error((await response.text()) || `Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [activeSection, setActiveSection] = useState<"Tasks" | "Projects">("Tasks");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [guest, setGuest] = useState(false);
  const [apiOnline, setApiOnline] = useState(Boolean(API_URL));

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("ablespace-theme");
    const savedTasks = window.localStorage.getItem("ablespace-tasks");
    const savedGuest = window.localStorage.getItem("ablespace-guest");
    if (savedTheme === "dark") setDarkMode(true);
    if (savedGuest === "true") setGuest(true);
    if (savedTasks) {
      try { setTasks(JSON.parse(savedTasks) as Task[]); } catch { window.localStorage.removeItem("ablespace-tasks"); }
    }
  }, []);

  useEffect(() => { window.localStorage.setItem("ablespace-theme", darkMode ? "dark" : "light"); }, [darkMode]);
  useEffect(() => { if (!apiOnline) window.localStorage.setItem("ablespace-tasks", JSON.stringify(tasks)); }, [apiOnline, tasks]);
  useEffect(() => { window.localStorage.setItem("ablespace-guest", String(guest)); }, [guest]);
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(""), 2400); return () => window.clearTimeout(timer); }, [notice]);

  useEffect(() => {
    if (!API_URL) return;
    api<Task[]>("/api/tasks")
      .then((data) => { setTasks(data); setApiOnline(true); })
      .catch(() => { setApiOnline(false); setNotice("API unavailable — using local demo data"); });
  }, []);

  const filteredTasks = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return tasks;
    return tasks.filter((task) => `${task.name} ${task.priority} ${task.member} ${task.dueDate}`.toLowerCase().includes(value));
  }, [query, tasks]);

  const guestLogin = async () => {
    try {
      if (API_URL) await api("/api/auth/guest", { method: "POST" });
      setGuest(true);
      setNotice("Guest login successful");
    } catch { setGuest(true); setNotice("Guest mode enabled"); }
  };

  const addTask = async (data: { name: string; priority: TaskPriority; dueDate: string }) => {
    const payload = { name: data.name, priority: data.priority, member: "K", dueDate: formatDueDate(data.dueDate), status: "To Do" as TaskStatus };
    try {
      if (API_URL && apiOnline) {
        const created = await api<Task>("/api/tasks", { method: "POST", body: JSON.stringify({ ...payload, dueDate: data.dueDate || new Date().toISOString().slice(0, 10) }) });
        setTasks((current) => [created, ...current]);
      } else {
        setTasks((current) => [{ ...payload, id: Date.now() }, ...current]);
      }
      setShowAddTask(false);
      setNotice("Task added successfully");
    } catch { setApiOnline(false); setTasks((current) => [{ ...payload, id: Date.now() }, ...current]); setShowAddTask(false); setNotice("Task added in local demo mode"); }
  };

  const moveTask = async (id: number, status: TaskStatus) => {
    try { if (API_URL && apiOnline) await api<Task>(`/api/tasks/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }); } catch { setApiOnline(false); }
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task));
    setNotice(`Task moved to ${status}`);
  };

  const deleteTask = async (id: number) => {
    try { if (API_URL && apiOnline) await api(`/api/tasks/${id}`, { method: "DELETE" }); } catch { setApiOnline(false); }
    setTasks((current) => current.filter((task) => task.id !== id));
    setNotice("Task deleted");
  };

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? "bg-[#111111] text-white" : "bg-white text-[#202020]"}`}>
      <div className="flex min-h-screen">
        <div className="hidden md:block"><Sidebar darkMode={darkMode} active={activeSection} onChange={setActiveSection} /></div>
        {mobileOpen && <><button aria-label="Close navigation" className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)} /><div className="fixed inset-y-0 left-0 z-40 md:hidden"><Sidebar darkMode={darkMode} active={activeSection} onChange={(value) => { setActiveSection(value); setMobileOpen(false); }} mobile /></div></>}

        <main className="min-w-0 flex-1">
          <header className={`sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 sm:px-6 lg:px-8 ${darkMode ? "border-[#2b2b2b] bg-[#111111]/95" : "border-[#ececec] bg-white/95"} backdrop-blur`}>
            <div className="flex items-center gap-3"><button className="rounded-lg p-2 md:hidden" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>☰</button><h1 className="text-sm font-semibold">Assessment Task</h1></div>
            <div className="flex items-center gap-2">
              <button onClick={() => setDarkMode((value) => !value)} className={`rounded-full border px-3 py-1.5 text-xs ${darkMode ? "border-[#3b3b3b] bg-[#1d1d1d]" : "border-[#dedede] bg-white"}`}>{darkMode ? "☀ Light" : "☾ Dark"}</button>
              <button onClick={guestLogin} className="flex h-9 items-center gap-2 rounded-full bg-[#cdbbff] px-3 text-xs font-bold text-[#31253f]" aria-label="Guest Login"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/50">K</span>{guest ? "Guest" : "Guest Login"}</button>
            </div>
          </header>

          <section className="px-4 py-7 sm:px-6 lg:px-10 lg:py-9">
            {activeSection === "Tasks" ? <>
              <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-semibold tracking-tight">Tasks</h2><p className="mt-1 text-sm text-slate-400">Manage and track your tasks</p></div><div className="flex flex-wrap gap-2"><button onClick={() => setSearchOpen((value) => !value)} className={`rounded-lg border px-4 py-2 text-sm ${darkMode ? "border-[#363636]" : "border-[#dddddd]"}`}>⌕ Search</button><button onClick={() => setShowAddTask(true)} className="rounded-lg bg-[#171717] px-4 py-2 text-sm font-medium text-white">+ Add Task</button></div></div>
              {searchOpen && <div className="mb-6"><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks..." aria-label="Search tasks" className={`w-full rounded-xl border px-4 py-3 text-sm outline-none ${darkMode ? "border-[#333] bg-[#1a1a1a]" : "border-[#e2e2e2]"}`} /></div>}
              {!guest && <div className={`mb-6 rounded-xl border p-4 text-sm ${darkMode ? "border-[#303030] bg-[#191919]" : "border-[#ececec] bg-[#fafafa]"}`}><span className="font-medium">Guest mode:</span> click <button onClick={guestLogin} className="font-semibold underline">Guest Login</button> to start a guest session. {API_URL ? "The NestJS API is configured." : "The UI will work locally without an API."}</div>}
              <div className="space-y-8">{statuses.map((status) => { const group = filteredTasks.filter((task) => task.status === status); return <section key={status}><div className="mb-3 flex items-center gap-2"><span className="text-xs text-slate-400">⌄</span><h3 className="text-sm font-semibold">{status}</h3><span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-300">{group.length}</span></div><TaskTable tasks={group} darkMode={darkMode} onMove={moveTask} onDelete={deleteTask} /></section>; })}</div>
            </> : <>
              <div className="mb-7"><h2 className="text-2xl font-semibold tracking-tight">Projects</h2><p className="mt-1 text-sm text-slate-400">Organize your workspaces and project progress</p></div>
              <div className="grid gap-4 lg:grid-cols-3">{projects.map((project) => <article key={project.name} className={`rounded-2xl border p-5 ${darkMode ? "border-[#2d2d2d] bg-[#181818]" : "border-[#e8e8e8] bg-white"}`}><div className="mb-5 flex items-center justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d8b9ff]">{project.icon}</div><span className="text-xs text-slate-400">{project.progress}%</span></div><h3 className="font-semibold">{project.name}</h3><p className="mt-1 min-h-10 text-sm leading-5 text-slate-400">{project.description}</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-[#8d6bc2]" style={{ width: `${project.progress}%` }} /></div></article>)}</div>
            </>}
          </section>
        </main>
      </div>
      {showAddTask && <AddTaskModal darkMode={darkMode} onClose={() => setShowAddTask(false)} onCreate={addTask} />}
      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#171717] px-4 py-2.5 text-xs font-medium text-white shadow-xl">{notice}</div>}
    </div>
  );
}
