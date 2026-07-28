"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

const statuses = [
  "nou",
  "contactat",
  "calificat",
  "oferta",
  "vandut",
  "pierdut",
];

export default function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: string | null;
}) {
  const [value, setValue] = useState(status || "nou");

  async function updateStatus(newStatus: string) {
    setValue(newStatus);

    await supabaseBrowser
      .from("leads")
      .update({
        status: newStatus,
      })
      .eq("id", id);
  }

  return (
    <select
      value={value}
      onChange={(e) => updateStatus(e.target.value)}
      className="rounded-full border px-3 py-1 text-sm"
    >
      {statuses.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
