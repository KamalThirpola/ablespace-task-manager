"use client";

export function Sidebar({ darkMode, active, onChange, mobile = false }: { darkMode: boolean; active: "Tasks" | "Projects"; onChange: (value: "Tasks" | "Projects") => void; mobile?: boolean }) {
  return (
    <aside className={`${mobile ? "h-full" : "min-h-screen"} w-[248px] shrink-0 border-r px-4 py-5 ${darkMode ? "border-[#2c2c2c] bg-[#181818]" : "border-[#ededed] bg-white"}`}>
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8b9ff] text-xs font-bold text-[#3d2b50]">A</div>
        <div>
          <p className="text-[13px] font-semibold">AbleSpace</p>
          <p className="text-[10px] text-[#999]">Assessment Task</p>
        </div>
      </div>

      <p className="mb-2 px-2 text-[11px] font-medium text-[#999]">Workspace</p>
      <nav className="space-y-0.5" aria-label="Workspace navigation">
        {(["Tasks", "Projects"] as const).map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] transition ${
              active === item
                ? darkMode ? "bg-[#292929] text-white" : "bg-[#f1f1f1] text-[#222]"
                : darkMode ? "text-[#999] hover:bg-white/5" : "text-[#666] hover:bg-[#f7f7f7]"
            }`}
          >
            <span className="flex w-4 justify-center text-[13px]">{item === "Tasks" ? "▣" : "▱"}</span>
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
