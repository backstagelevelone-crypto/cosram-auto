"use client";

import { useState } from "react";

const statuses = [
  {
    value: "nou",
    label: "🟡 Nou",
  },
  {
    value: "contactat",
    label: "🔵 Contactat",
  },
  {
    value: "calificat",
    label: "🟢 Calificat",
  },
  {
    value: "oferta",
    label: "🟣 Ofertă",
  },
  {
    value: "vandut",
    label: "🚗 Vândut",
  },
  {
    value: "pierdut",
    label: "🔴 Pierdut",
  },
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

    const response = await fetch("/api/leads/status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status: newStatus,
      }),
    });

    const result = await response.json();

    console.log("STATUS RESPONSE:", result);

    if (!response.ok) {
      console.log("EROARE STATUS:", result);
      setValue(status || "nou");
    }
  }

  return (
    <select
      value={value}
      onChange={(e) => updateStatus(e.target.value)}
      className="rounded-full border px-3 py-2 text-sm font-medium bg-white cursor-pointer"
    >
      {statuses.map((status) => (
        <option
          key={status.value}
          value={status.value}
        >
          {status.label}
        </option>
      ))}
    </select>
  );
}
