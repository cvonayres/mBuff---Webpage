import React, { useEffect, useMemo, useState } from "react";
import type { RGB } from "../services/robotApi";

type Props = {
  onSend: (pixels: RGB[]) => Promise<void>;
  /** Smaller UI so it fits under the camera */
  compact?: boolean;
};

export default function SenseHatPainter({ onSend, compact = true }: Props) {
  const [pixels, setPixels] = useState<RGB[]>(Array(64).fill([0, 0, 0]) as RGB[]);
  const [active, setActive] = useState<RGB>([255, 255, 255]);
  const [painting, setPainting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // palette: off, white, pink, mint, sky
  const palette = useMemo<RGB[]>(
    () => [
      [0, 0, 0],
      [255, 255, 255],
      [255, 99, 132],
      [72, 222, 171],
      [56, 189, 248],
    ],
    []
  );

  // sizes
  const cell = compact ? "h-6 w-6" : "h-8 w-8";
  const gap = compact ? "gap-1" : "gap-1.5";
  const pad = compact ? "p-4" : "p-5";
  const btnPad = compact ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const swatch = compact ? "h-6 w-6" : "h-8 w-8";

  const paintAt = (i: number, color = active) =>
    setPixels((prev) => {
      if (!prev[i] || prev[i].every((v, k) => v === color[k])) return prev;
      const copy = prev.slice();
      copy[i] = color;
      return copy;
    });

  useEffect(() => {
    const stop = () => setPainting(false);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    return () => {
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
  }, []);

  const clearAll = () => setPixels(Array(64).fill([0, 0, 0]) as RGB[]);
  const fillAll = () => setPixels(Array(64).fill(active) as RGB[]);

  const send = async () => {
    setBusy(true);
    setMsg(null);
    try {
      await onSend(pixels);
      setMsg("Sent ✓");
    } catch (e: any) {
      setMsg(`Failed: ${e?.message ?? "Failed to send"}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-white/60 ${pad}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Sense Painter</h3>
        <div className="flex items-center gap-2">
          {palette.map((c, i) => {
            const isActive =
              active[0] === c[0] && active[1] === c[1] && active[2] === c[2];
            return (
              <button
                key={i}
                onClick={() => setActive(c)}
                className={`${swatch} rounded-xl border transition ${
                  isActive ? "ring-2 ring-violet-400 border-violet-300" : "border-gray-200"
                }`}
                style={{ backgroundColor: `rgb(${c.join(",")})` }}
                aria-label={`Select color ${c.join(",")}`}
                title={`rgb(${c.join(",")})`}
              />
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className={`mt-3 grid grid-cols-8 ${gap} select-none w-max`}>
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            onPointerDown={() => {
              setPainting(true);
              paintAt(i);
            }}
            onPointerEnter={() => painting && paintAt(i)}
            className={`${cell} rounded-[6px] border border-gray-200 cursor-crosshair`}
            style={{ backgroundColor: `rgb(${pixels[i].join(",")})` }}
            role="button"
            aria-label={`LED ${i}`}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={send}
          disabled={busy}
          className={`${btnPad} rounded-2xl bg-violet-500 text-white hover:bg-violet-400 disabled:opacity-60 shadow`}
        >
          {busy ? "Sending…" : "Send to Sense HAT"}
        </button>
        <button
          onClick={clearAll}
          className={`${btnPad} rounded-2xl bg-white hover:bg-gray-50 shadow border border-gray-200`}
        >
          Clear
        </button>
        <button
          onClick={fillAll}
          className={`${btnPad} rounded-2xl bg-white hover:bg-gray-50 shadow border border-gray-200`}
        >
          Fill with Selected
        </button>
        {msg && <span className="ml-1 text-sm text-gray-600">{msg}</span>}
      </div>
    </div>
  );
}
