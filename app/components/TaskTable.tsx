"use client";

export type TaskStatus = "To Do" | "Doing" | "Completed";
export type TaskPriority = "High" | "Medium" | "Low";

export type Task = {
  id: number;
  name: string;
  priority: TaskPriority;
  member: string;
  dueDate: string;
  status: TaskStatus;
};

const priorityClass: Record<TaskPriority, string> = {
  High: "bg-red-50 text-red-700 ring-red-100 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900/60",
  Medium: "bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/60",
  Low: "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
};

export function TaskTable({ tasks, darkMode, onMove, onDelete }: { tasks: Task[]; darkMode: boolean; onMove: (id: number, status: TaskStatus) => void; onDelete: (id: number) => void }) {
  const statuses: TaskStatus[] = ["To Do", "Doing", "Completed"];
  return (
    <div className={`overflow-x-auto rounded-xl border ${darkMode ? "border-[#2d2d2d]" : "border-[#e8e8e8]"}`}>
      <table className="w-full min-w-[680px] text-sm">
        <thead className={darkMode ? "bg-[#1b1b1b] text-slate-400" : "bg-[#fafafa] text-slate-500"}>
          <tr className="text-left text-xs">
            <th className="px-4 py-3 font-medium">Task</th><th className="px-4 py-3 font-medium">Priority</th><th className="px-4 py-3 font-medium">Members</th><th className="px-4 py-3 font-medium">Due Date</th><th className="px-4 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No tasks found.</td></tr> : tasks.map((task) => (
            <tr key={task.id} className={`border-t ${darkMode ? "border-[#2b2b2b] hover:bg-white/[0.02]" : "border-[#eeeeee] hover:bg-slate-50/70"}`}>
              <td className="px-4 py-4 font-medium">{task.name}</td>
              <td className="px-4 py-4"><span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${priorityClass[task.priority]}`}>{task.priority}</span></td>
              <td className="px-4 py-4"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ded2ff] text-xs font-semibold text-[#4b3d63]">{task.member}</span></td>
              <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{task.dueDate}</td>
              <td className="px-4 py-4 text-right">
                <select aria-label={`Change status for ${task.name}`} value={task.status} onChange={(e) => onMove(task.id, e.target.value as TaskStatus)} className={`mr-2 rounded-md border px-2 py-1 text-xs ${darkMode ? "border-[#3a3a3a] bg-[#191919]" : "border-[#dddddd] bg-white"}`}>
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
                <button aria-label={`Delete ${task.name}`} onClick={() => onDelete(task.id)} className="rounded-md px-2 py-1 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
