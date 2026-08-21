"use client";

export function Sidebar({
  darkMode,
  active,
  onChange,
  mobile = false,
}: {
  darkMode: boolean;
  active: "Tasks" | "Projects";
  onChange: (value: "Tasks" | "Projects") => void;
  mobile?: boolean;
}) {
  return (
    <aside
      className={`${
        mobile ? "h-full" : "min-h-screen"
      } w-[240px] shrink-0 border-r px-5 py-6 ${
        darkMode
          ? "border-[#2b2b2b] bg-[#181818] text-white"
          : "border-[#e9e9e9] bg-[#fbfbfb] text-[#202020]"
      }`}
    >
      {/* Logo */}
      <div className="mb-11 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
            darkMode
              ? "bg-[#3a3150] text-[#e1d4ff]"
              : "bg-[#d8b9ff] text-[#332244]"
          }`}
        >
          A
        </div>

        <span className="text-[15px] font-semibold tracking-tight">
          AbleSpace
        </span>
      </div>

      {/* Workspace */}
      <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        Workspace
      </p>

      <nav className="space-y-1" aria-label="Workspace navigation">
        {(["Tasks", "Projects"] as const).map((item) => {
          const selected = active === item;

          return (
            <button
              key={item}
              onClick={() => onChange(item)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                selected
                  ? darkMode
                    ? "bg-[#292929] text-white"
                    : "bg-[#ededed] text-[#202020]"
                  : darkMode
                    ? "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                    : "text-slate-500 hover:bg-black/[0.04] hover:text-[#202020]"
              }`}
            >
              <span
                className={`flex w-4 justify-center text-xs ${
                  selected ? "opacity-100" : "opacity-70"
                }`}
              >
                {item === "Tasks" ? "✓" : "□"}
              </span>

              <span>{item}</span>
            </button>
          );
        })}
      </nav>

      {/* Guest Workspace */}
      <div
        className={`mt-10 rounded-xl border p-4 ${
          darkMode
            ? "border-[#303030] bg-[#202020]"
            : "border-[#e7e7e7] bg-white"
        }`}
      >
        <p className="text-xs font-semibold">Guest workspace</p>

        <p className="mt-1.5 text-[11px] leading-4 text-slate-400">
          Changes are saved locally when the API is unavailable.
        </p>
      </div>
    </aside>
  );
}