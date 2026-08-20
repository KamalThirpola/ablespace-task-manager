"use client";

import { useState } from "react";
import type { TaskPriority } from "./TaskTable";

export function AddTaskModal({ darkMode, onClose, onCreate }: { darkMode: boolean; onClose: () => void; onCreate: (data: { name: string; priority: TaskPriority; dueDate: string }) => void }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [dueDate, setDueDate] = useState("");
  const submit = () => { if (!name.trim()) return; onCreate({ name: name.trim(), priority, dueDate }); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="add-task-title" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl ${darkMode ? "border-[#333] bg-[#1b1b1b]" : "border-[#e7e7e7] bg-white"}`}>
        <div className="mb-5 flex items-start justify-between"><div><h2 id="add-task-title" className="text-lg font-semibold">Add Task</h2><p className="mt-1 text-xs text-slate-400">Create a new task in To Do.</p></div><button onClick={onClose} aria-label="Close dialog" className="rounded-lg px-2 py-1 text-slate-400 hover:bg-black/5">×</button></div>
        <div className="space-y-4">
          <div><label htmlFor="task-name" className="mb-1.5 block text-xs font-medium">Task name</label><input id="task-name" autoFocus value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="e.g. Review homepage" className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#cdb5ff] ${darkMode ? "border-[#3a3a3a] bg-[#131313]" : "border-[#dddddd]"}`} /></div>
          <div className="grid grid-cols-2 gap-3"><div><label htmlFor="task-priority" className="mb-1.5 block text-xs font-medium">Priority</label><select id="task-priority" value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)} className={`w-full rounded-lg border px-3 py-2.5 text-sm ${darkMode ? "border-[#3a3a3a] bg-[#131313]" : "border-[#dddddd]"}`}>{["High", "Medium", "Low"].map((p) => <option key={p}>{p}</option>)}</select></div><div><label htmlFor="task-due" className="mb-1.5 block text-xs font-medium">Due date</label><input id="task-due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className={`w-full rounded-lg border px-3 py-2.5 text-sm ${darkMode ? "border-[#3a3a3a] bg-[#131313]" : "border-[#dddddd]"}`} /></div></div>
          <div className="flex justify-end gap-2 pt-2"><button onClick={onClose} className={`rounded-lg border px-4 py-2 text-sm ${darkMode ? "border-[#3a3a3a]" : "border-[#dddddd]"}`}>Cancel</button><button onClick={submit} className="rounded-lg bg-[#171717] px-4 py-2 text-sm font-medium text-white">Create Task</button></div>
        </div>
      </div>
    </div>
  );
}
