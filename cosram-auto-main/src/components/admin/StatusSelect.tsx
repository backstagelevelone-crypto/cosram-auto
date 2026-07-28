"use client";

import { useState } from "react";

type Props = {
  id: string;
  status: string;
};

const statuses = [
  "Nou",
  "Contactat",
  "Calificat",
  "Respins",
  "Vândut",
];

export default function StatusSelect({ id, status }: Props) {
  const [value, setValue] = useState(status);

  async function updateStatus(newStatus: string) {
    setValue(newStatus);

    await fetch("/api/leads/status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status: newStatus
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      }),
    });
  }

  return (
    <select
      value={value}
      onChange={(e) => updateStatus(e.target.value)}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #e5e7eb",
        background: "#fff",
        cursor: "pointer",
      }}
    >
      {statuses.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
