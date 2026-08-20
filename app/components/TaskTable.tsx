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
  High: "text-[#b85c5c]",
  Medium: "text-[#b87543]",
  Low: "text-[#777777]",
};

export function TaskTable({
  tasks,
  darkMode,
  onMove,
  onDelete,
  onAddTask,
}: {
  tasks: Task[];
  darkMode: boolean;
  onMove: (id: number, status: TaskStatus) => void;
  onDelete: (id: number) => void;
  onAddTask?: () => void;
}) {
  const statuses: TaskStatus[] = ["To Do", "Doing", "Completed"];

  return (
    <div className={`overflow-hidden rounded-md border ${darkMode ? "border-[#303030]" : "border-[#e8e8e8]"}`}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className={darkMode ? "bg-[#181818] text-[#8f8f8f]" : "bg-[#fafafa] text-[#777777]"}>
            <tr className="h-11 text-left text-[12px] font-medium">
              <th className="w-[43%] px-5">Task</th>
              <th className="w-[12%] px-4">Priority</th>
              <th className="w-[15%] px-4">Members</th>
              <th className="w-[20%] px-4">Due Date</th>
              <th className="w-[10%] px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className={`h-12 border-t ${darkMode ? "border-[#2b2b2b] hover:bg-white/[0.02]" : "border-[#eeeeee] hover:bg-[#fafafa]"}`}
              >
                <td className="px-5 font-medium text-[13px]">{task.name}</td>
                <td className="px-4">
                  <span className={`text-[12px] font-medium ${priorityClass[task.priority]}`}>
                    <span className="mr-1 text-[9px]">◢</span>{task.priority}
                  </span>
                </td>
                <td className="px-4">
                  <div className="flex items-center -space-x-1">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#d9c5ff] text-[11px] font-semibold text-[#4d3d61] dark:border-[#181818]">
                      {task.member}
                    </span>
                  </div>
                </td>
                <td className="px-4 text-[12px] text-[#666666] dark:text-[#b0b0b0]">{task.dueDate}</td>
                <td className="px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <select
                      aria-label={`Change status for ${task.name}`}
                      value={task.status}
                      onChange={(e) => onMove(task.id, e.target.value as TaskStatus)}
                      className={`max-w-6 cursor-pointer appearance-none border-0 bg-transparent px-1 text-xs outline-none ${darkMode ? "text-[#aaa]" : "text-[#888]"}`}
                    >
                      {statuses.map((status) => <option key={status}>{status}</option>)}
                    </select>
                    <button
                      aria-label={`Delete ${task.name}`}
                      onClick={() => onDelete(task.id)}
                      className="rounded px-2 py-1 text-[16px] leading-none text-[#888] hover:bg-black/5 dark:hover:bg-white/5"
                    >
                      ···
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-7 text-center text-xs text-[#999]">No tasks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {onAddTask && (
        <button
          onClick={onAddTask}
          className={`flex w-full items-center border-t px-5 py-3 text-left text-[12px] font-medium transition ${darkMode ? "border-[#303030] text-[#aaa] hover:bg-white/[0.03]" : "border-[#eeeeee] text-[#777] hover:bg-[#fafafa]"}`}
        >
          + Add Task
        </button>
      )}
    </div>
  );
}
