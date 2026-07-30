"use client";

import { Phone, MessageCircle, Eye } from "lucide-react";

type Props = {
  phone: string;
};

export default function LeadActions({ phone }: Props) {
  const whatsappPhone = (() => {
    const value = (phone ?? "").replace(/\D/g, "");

    if (value.startsWith("40")) {
      return value;
    }

    if (value.startsWith("0")) {
      return "40" + value.substring(1);
    }

    return value;
  })();

  const whatsappUrl = `https://wa.me/${whatsappPhone}`;

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
      }}
    >
      {/* Telefon */}
      <a
        href={`tel:${whatsappPhone}`}
        title="Sună"
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "#2563eb",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <Phone size={18} />
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "#16a34a",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <MessageCircle size={18} />
      </a>

      {/* Detalii */}
      <button
        title="Detalii"
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          background: "#f3f4f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Eye size={18} />
      </button>
    </div>
  );
}
