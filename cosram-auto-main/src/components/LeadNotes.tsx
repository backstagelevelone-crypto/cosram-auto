"use client";

import { useState } from "react";

export default function LeadNotes({
  id,
  notes,
}: {
  id: string;
  notes: string | null;
}) {
  const [value, setValue] = useState(notes || "");
  const [loading, setLoading] = useState(false);

  async function saveNotes() {
    setLoading(true);

    const response = await fetch("/api/leads/notes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        notes: value,
      }),
    });

    setLoading(false);

    if (response.ok) {
      alert("✅ Note salvate");
    } else {
      alert("❌ Eroare la salvare");
    }
  }

  return (
    <div className="mt-6">
      <b>📝 Note</b>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-2 w-full rounded-lg border p-3 min-h-[180px]"
        placeholder="Scrie aici observațiile despre client..."
      />

      <button
        onClick={saveNotes}
        disabled={loading}
        className="mt-3 rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        {loading ? "Se salvează..." : "💾 Salvează"}
      </button>
    </div>
  );
}
