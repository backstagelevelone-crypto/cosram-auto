"use client";

import { useState } from "react";

const statuses = [
  {
    value: "nou",
    label: "🟡 Nou",
  },
  {
    value: "de_sunat",
    label: "📞 De sunat",
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
    value: "aprobat",
    label: "🟣 Aprobat",
  },
  {
    value: "vandut",
    label: "🚗 Vândut",
  },
  {
    value: "pierdut",
    label: "🔴 Pierdut",
  },
  {
  value: "biroul_credit_respins",
  label: "🏦 Biroul de Credit Respins",
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

    const getCookie = (name: string) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );

      return match ? match[2] : null;
    };

    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");

    const response = await fetch("/api/leads/status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        status: newStatus,
        fbp,
        fbc,
        user_agent: navigator.userAgent,
        event_source_url: window.location.href,
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
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
