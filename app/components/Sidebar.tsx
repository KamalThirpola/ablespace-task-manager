"use client";

export function Sidebar({ darkMode, active, onChange, mobile = false }: { darkMode: boolean; active: "Tasks" | "Projects"; onChange: (value: "Tasks" | "Projects") => void; mobile?: boolean }) {
  return (
    <aside className={`${mobile ? "h-full" : "min-h-screen"} w-[232px] shrink-0 border-r px-5 py-6 ${darkMode ? "border-[#2d2d2d] bg-[#181818]" : "border-[#ececec] bg-[#fbfbfb]"}`}>
      <div className="mb-10 flex items-center gap-2.5"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8b9ff] text-sm font-bold text-[#332244]">A</div><span className="font-semibold tracking-tight">AbleSpace</span></div>
      <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Workspace</p>
      <nav className="space-y-1" aria-label="Workspace navigation">
        {(["Tasks", "Projects"] as const).map((item) => <button key={item} onClick={() => onChange(item)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${active === item ? (darkMode ? "bg-[#2a2a2a] text-white" : "bg-[#ededed] text-[#202020]") : "text-slate-500 hover:bg-black/5 dark:hover:bg-white/5"}`}><span>{item === "Tasks" ? "✓" : "□"}</span>{item}</button>)}
      </nav>
      <div className={`mt-10 rounded-xl border p-4 ${darkMode ? "border-[#303030] bg-[#202020]" : "border-[#e9e9e9] bg-white"}`}><p className="text-xs font-semibold">Guest workspace</p><p className="mt-1 text-[11px] leading-4 text-slate-400">Changes are saved locally when the API is unavailable.</p></div>
    </aside>
  );
}
