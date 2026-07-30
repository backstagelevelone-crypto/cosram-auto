import { Phone, MessageCircle, Eye } from "lucide-react";

type Props = {
  phone: string;
};

export default function LeadActions({ phone }: Props) {
  const cleanPhone = (phone ?? "")
    .replace(/\D/g, "")
    .replace(/^0/, "40");

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
      }}
    >
      <a
        href={`tel:${cleanPhone}`}
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

      <a
        href={`https://wa.me/${cleanPhone}`}
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
