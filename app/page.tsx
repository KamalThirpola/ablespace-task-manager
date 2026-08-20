"use client";

import { useEffect, useMemo, useState } from "react";

type Status = "To Do" | "Doing" | "Completed";
type Priority = "High" | "Medium" | "Low";

type Task = {
  id: number;
  name: string;
  priority: Priority;
  member: string;
  dueDate: string;
  status: Status;
};

type Project = {
  id: number;
  name: string;
  description: string;
  progress: number;
  color: string;
};

const statuses: Status[] = ["To Do", "Doing", "Completed"];
const priorities: Priority[] = ["High", "Medium", "Low"];

const seedTasks: Task[] = [
  { id: 1, name: "Design Homepage", priority: "High", member: "N", dueDate: "12 Sep 2026", status: "To Do" },
  { id: 2, name: "Develop Login feature", priority: "Low", member: "K", dueDate: "15 Sep 2026", status: "To Do" },
  { id: 3, name: "Test Payment Gateway", priority: "Medium", member: "A", dueDate: "18 Sep 2026", status: "To Do" },
  { id: 4, name: "Create responsive layout", priority: "High", member: "N", dueDate: "10 Sep 2026", status: "Doing" },
  { id: 5, name: "Connect task API", priority: "Medium", member: "K", dueDate: "14 Sep 2026", status: "Doing" },
  { id: 6, name: "Review accessibility", priority: "Low", member: "A", dueDate: "16 Sep 2026", status: "Completed" },
  { id: 7, name: "Prepare documentation", priority: "Medium", member: "K", dueDate: "20 Sep 2026", status: "Completed" },
];

const seedProjects: Project[] = [
  { id: 1, name: "AbleSpace Website", description: "Main product workspace and task management experience.", progress: 72, color: "#cdb5ff" },
  { id: 2, name: "Mobile Experience", description: "Responsive layouts and mobile navigation improvements.", progress: 46, color: "#b8e3d0" },
  { id: 3, name: "API Integration", description: "Task APIs, validation and persistent data layer.", progress: 28, color: "#ffd7a8" },
];

function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "search") return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
  if (name === "plus") return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
  if (name === "check") return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
  if (name === "folder") return <svg {...common}><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z" /></svg>;
  if (name === "sun") return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>;
  if (name === "moon") return <svg {...common}><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5z" /></svg>;
  if (name === "menu") return <svg {...common}><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
  if (name === "more") return <svg {...common}><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></svg>;
  if (name === "trash") return <svg {...common}><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></svg>;
  if (name === "arrow") return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  if (name === "logout") return <svg {...common}><path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-5" /></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="8" /></svg>;
}

const priorityClasses: Record<Priority, string> = {
  High: "bg-red-50 text-red-700 ring-red-100 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900/60",
  Medium: "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/60",
  Low: "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks);
  const [projects] = useState<Project[]>(seedProjects);
  const [activeSection, setActiveSection] = useState<"Tasks" | "Projects">("Tasks");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuTaskId, setMenuTaskId] = useState<number | null>(null);
  const [notice, setNotice] = useState("");
  const [newTask, setNewTask] = useState({ name: "", priority: "Medium" as Priority, dueDate: "" });

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("ablespace-theme");
    const savedTasks = window.localStorage.getItem("ablespace-tasks");
    if (savedTheme === "dark") setDarkMode(true);
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks) as Task[]);
      } catch {
        window.localStorage.removeItem("ablespace-tasks");
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ablespace-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    window.localStorage.setItem("ablespace-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 2400);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const filteredTasks = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return tasks;
    return tasks.filter((task) => `${task.name} ${task.priority} ${task.member} ${task.dueDate}`.toLowerCase().includes(value));
  }, [query, tasks]);

  const addTask = () => {
    const name = newTask.name.trim();
    if (!name) {
      setNotice("Task name is required");
      return;
    }
    const task: Task = {
      id: Date.now(),
      name,
      priority: newTask.priority,
      member: "K",
      dueDate: newTask.dueDate || "20 Sep 2026",
      status: "To Do",
    };
    setTasks((current) => [task, ...current]);
    setNewTask({ name: "", priority: "Medium", dueDate: "" });
    setShowAddTask(false);
    setNotice("Task added successfully");
  };

  const moveTask = (id: number, status: Status) => {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task));
    setMenuTaskId(null);
    setNotice(`Task moved to ${status}`);
  };

  const deleteTask = (id: number) => {
    setTasks((current) => current.filter((task) => task.id !== id));
    setMenuTaskId(null);
    setNotice("Task deleted");
  };

  const toggleTheme = () => setDarkMode((current) => !current);

  const sidebar = (
    <aside className={`w-[232px] shrink-0 border-r px-5 py-6 ${darkMode ? "border-[#2d2d2d] bg-[#181818]" : "border-[#ececec] bg-[#fbfbfb]"}`}>
      <div className="mb-10 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8b9ff] text-sm font-bold text-[#332244]">A</div>
        <span className="font-semibold tracking-tight">AbleSpace</span>
      </div>

      <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Workspace</p>
      <nav className="space-y-1" aria-label="Workspace navigation">
        <button onClick={() => { setActiveSection("Tasks"); setMobileOpen(false); }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${activeSection === "Tasks" ? (darkMode ? "bg-[#2a2a2a] text-white" : "bg-[#ededed] text-[#202020]") : "text-slate-500 hover:bg-black/5 dark:hover:bg-white/5"}`}>
          <Icon name="check" size={17} /> Tasks
        </button>
        <button onClick={() => { setActiveSection("Projects"); setMobileOpen(false); }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${activeSection === "Projects" ? (darkMode ? "bg-[#2a2a2a] text-white" : "bg-[#ededed] text-[#202020]") : "text-slate-500 hover:bg-black/5 dark:hover:bg-white/5"}`}>
          <Icon name="folder" size={17} /> Projects
        </button>
      </nav>

      <div className={`mt-10 rounded-xl border p-4 ${darkMode ? "border-[#303030] bg-[#202020]" : "border-[#e9e9e9] bg-white"}`}>
        <p className="text-xs font-semibold">Guest workspace</p>
        <p className="mt-1 text-[11px] leading-4 text-slate-400">Changes are saved locally for this assessment demo.</p>
      </div>
    </aside>
  );

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? "bg-[#111111] text-white" : "bg-white text-[#202020]"}`} onClick={() => { if (menuTaskId) setMenuTaskId(null); }}>
      <div className="flex min-h-screen">
        <div className="hidden md:block">{sidebar}</div>

        {mobileOpen && (
          <>
            <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)} />
            <div className="fixed inset-y-0 left-0 z-40 md:hidden">{sidebar}</div>
          </>
        )}

        <main className="min-w-0 flex-1">
          <header className={`sticky top-0 z-20 flex h-16 items-center justify-between border-b px-4 sm:px-6 lg:px-8 ${darkMode ? "border-[#2b2b2b] bg-[#111111]/95" : "border-[#ececec] bg-white/95"} backdrop-blur`}>
            <div className="flex items-center gap-3">
              <button className="rounded-lg p-2 md:hidden" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Icon name="menu" /></button>
              <h1 className="text-sm font-semibold">Assessment Task</h1>
            </div>

            <div className="relative flex items-center gap-2">
              <button onClick={toggleTheme} className={`rounded-full border px-3 py-1.5 text-xs transition ${darkMode ? "border-[#3b3b3b] bg-[#1d1d1d]" : "border-[#dedede] bg-white hover:bg-slate-50"}`} aria-label="Toggle theme">
                <span className="inline-flex items-center gap-1.5">{darkMode ? <Icon name="sun" size={14} /> : <Icon name="moon" size={14} />}{darkMode ? "Light" : "Dark"}</span>
              </button>
              <button onClick={(event) => { event.stopPropagation(); setProfileOpen((open) => !open); }} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#cdbbff] text-xs font-bold text-[#31253f]" aria-label="Open profile menu">K</button>
              {profileOpen && (
                <div className={`absolute right-0 top-11 w-48 rounded-xl border p-2 shadow-xl ${darkMode ? "border-[#333] bg-[#1d1d1d]" : "border-[#e6e6e6] bg-white"}`}>
                  <div className="border-b px-3 py-2 pb-3"><p className="text-sm font-semibold">Kamal</p><p className="text-xs text-slate-400">Guest account</p></div>
                  <button onClick={() => { setNotice("Guest session active"); setProfileOpen(false); }} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-black/5 dark:hover:bg-white/5"><Icon name="logout" size={15} /> Guest Login</button>
                </div>
              )}
            </div>
          </header>

          <section className="px-4 py-7 sm:px-6 lg:px-10 lg:py-9">
            {activeSection === "Tasks" ? (
              <>
                <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Tasks</h2>
                    <p className="mt-1 text-sm text-slate-400">Manage and track your tasks</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={(event) => { event.stopPropagation(); setSearchOpen((open) => !open); }} className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm ${darkMode ? "border-[#363636] hover:bg-white/5" : "border-[#dddddd] hover:bg-slate-50"}`}><Icon name="search" size={16} /> Search</button>
                    <button onClick={(event) => { event.stopPropagation(); setShowAddTask(true); }} className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black"><Icon name="plus" size={16} /> Add Task</button>
                  </div>
                </div>

                {searchOpen && (
                  <div className="mb-6">
                    <label htmlFor="task-search" className="sr-only">Search tasks</label>
                    <div className={`flex items-center gap-2 rounded-xl border px-3 ${darkMode ? "border-[#333] bg-[#1a1a1a]" : "border-[#e2e2e2] bg-white"}`}>
                      <Icon name="search" size={17} />
                      <input id="task-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by task, priority, member or due date" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400" />
                    </div>
                  </div>
                )}

                <div className="space-y-8">
                  {statuses.map((status) => {
                    const groupTasks = filteredTasks.filter((task) => task.status === status);
                    return (
                      <section key={status} aria-labelledby={`group-${status}`}>
                        <div className="mb-3 flex items-center gap-2">
                          <span className="text-xs text-slate-400">⌄</span>
                          <h3 id={`group-${status}`} className="text-sm font-semibold">{status}</h3>
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">{groupTasks.length}</span>
                        </div>

                        <div className={`overflow-x-auto rounded-xl border ${darkMode ? "border-[#2d2d2d]" : "border-[#e8e8e8]"}`}>
                          <table className="w-full min-w-[680px] text-sm">
                            <thead className={darkMode ? "bg-[#1b1b1b] text-slate-400" : "bg-[#fafafa] text-slate-500"}>
                              <tr className="text-left text-xs">
                                <th className="px-4 py-3 font-medium">Task</th><th className="px-4 py-3 font-medium">Priority</th><th className="px-4 py-3 font-medium">Members</th><th className="px-4 py-3 font-medium">Due Date</th><th className="px-4 py-3 text-right font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {groupTasks.length === 0 ? (
                                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">No tasks found.</td></tr>
                              ) : groupTasks.map((task) => (
                                <tr key={task.id} className={`border-t ${darkMode ? "border-[#2b2b2b] hover:bg-white/[0.02]" : "border-[#eeeeee] hover:bg-slate-50/70"}`}>
                                  <td className="px-4 py-4 font-medium">{task.name}</td>
                                  <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${priorityClasses[task.priority]}`}>{task.priority}</span></td>
                                  <td className="px-4 py-4"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ded2ff] text-xs font-semibold text-[#4b3d63]">{task.member}</span></td>
                                  <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{task.dueDate}</td>
                                  <td className="relative px-4 py-4 text-right">
                                    <button onClick={(event) => { event.stopPropagation(); setMenuTaskId((id) => id === task.id ? null : task.id); }} aria-label={`Actions for ${task.name}`} className="rounded-md p-1.5 text-slate-500 hover:bg-black/5 dark:hover:bg-white/10"><Icon name="more" size={17} /></button>
                                    {menuTaskId === task.id && (
                                      <div onClick={(event) => event.stopPropagation()} className={`absolute right-4 top-12 z-10 w-40 rounded-xl border p-1.5 text-left shadow-xl ${darkMode ? "border-[#333] bg-[#202020]" : "border-[#e5e5e5] bg-white"}`}>
                                        {statuses.filter((next) => next !== task.status).map((next) => <button key={next} onClick={() => moveTask(task.id, next)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs hover:bg-black/5 dark:hover:bg-white/5"><Icon name="arrow" size={13} /> Move to {next}</button>)}
                                        <button onClick={() => deleteTask(task.id)} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"><Icon name="trash" size={13} /> Delete</button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </section>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="mb-7 flex items-end justify-between"><div><h2 className="text-2xl font-semibold tracking-tight">Projects</h2><p className="mt-1 text-sm text-slate-400">Organize your workspaces and project progress</p></div><button onClick={() => setNotice("Project creation is ready for the next backend step")} className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-4 py-2 text-sm font-medium text-white"><Icon name="plus" size={16} /> Add Project</button></div>
                <div className="grid gap-4 lg:grid-cols-3">
                  {projects.map((project) => <article key={project.id} className={`rounded-2xl border p-5 ${darkMode ? "border-[#2d2d2d] bg-[#181818]" : "border-[#e8e8e8] bg-white"}`}><div className="mb-5 flex items-start justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: project.color }}><Icon name="folder" size={19} /></div><span className="text-xs text-slate-400">{project.progress}%</span></div><h3 className="font-semibold">{project.name}</h3><p className="mt-1 min-h-10 text-sm leading-5 text-slate-400">{project.description}</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-[#8d6bc2]" style={{ width: `${project.progress}%` }} /></div></article>)}
                </div>
              </>
            )}
          </section>
        </main>
      </div>

      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="add-task-title" onClick={() => setShowAddTask(false)}>
          <div onClick={(event) => event.stopPropagation()} className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${darkMode ? "border-[#333] bg-[#1b1b1b]" : "border-[#e7e7e7] bg-white"}`}>
            <div className="mb-5 flex items-start justify-between"><div><h2 id="add-task-title" className="text-lg font-semibold">Add Task</h2><p className="mt-1 text-xs text-slate-400">Create a new task in To Do.</p></div><button onClick={() => setShowAddTask(false)} aria-label="Close dialog" className="rounded-lg px-2 py-1 text-slate-400 hover:bg-black/5">×</button></div>
            <div className="space-y-4">
              <div><label htmlFor="task-name" className="mb-1.5 block text-xs font-medium">Task name</label><input id="task-name" autoFocus value={newTask.name} onChange={(event) => setNewTask((current) => ({ ...current, name: event.target.value }))} onKeyDown={(event) => { if (event.key === "Enter") addTask(); }} placeholder="e.g. Review homepage" className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#cdb5ff] ${darkMode ? "border-[#3a3a3a] bg-[#131313]" : "border-[#dddddd]"}`} /></div>
              <div className="grid grid-cols-2 gap-3"><div><label htmlFor="task-priority" className="mb-1.5 block text-xs font-medium">Priority</label><select id="task-priority" value={newTask.priority} onChange={(event) => setNewTask((current) => ({ ...current, priority: event.target.value as Priority }))} className={`w-full rounded-lg border px-3 py-2.5 text-sm ${darkMode ? "border-[#3a3a3a] bg-[#131313]" : "border-[#dddddd]"}`}>{priorities.map((priority) => <option key={priority}>{priority}</option>)}</select></div><div><label htmlFor="task-due" className="mb-1.5 block text-xs font-medium">Due date</label><input id="task-due" type="date" value={newTask.dueDate} onChange={(event) => setNewTask((current) => ({ ...current, dueDate: event.target.value ? new Date(`${event.target.value}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "" }))} className={`w-full rounded-lg border px-3 py-2.5 text-sm ${darkMode ? "border-[#3a3a3a] bg-[#131313]" : "border-[#dddddd]"}`} /></div></div>
              <div className="flex justify-end gap-2 pt-2"><button onClick={() => setShowAddTask(false)} className={`rounded-lg border px-4 py-2 text-sm ${darkMode ? "border-[#3a3a3a]" : "border-[#dddddd]"}`}>Cancel</button><button onClick={addTask} className="rounded-lg bg-[#171717] px-4 py-2 text-sm font-medium text-white">Create Task</button></div>
            </div>
          </div>
        </div>
      )}

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-[#171717] px-4 py-2.5 text-xs font-medium text-white shadow-xl">{notice}</div>}
    </div>
  );
}
