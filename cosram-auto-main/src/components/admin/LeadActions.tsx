type Props = {
  phone: string;
};

export default function LeadActions({ phone }: Props) {
  const cleanPhone = phone?.replace(/\s+/g, "") ?? "";

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
      }}
    >
      <a
        href={`tel:${cleanPhone}`}
        style={{
          padding: "8px 12px",
          background: "#dc2626",
          color: "#fff",
          borderRadius: 8,
          textDecoration: "none",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        📞 Sună
      </a>

      <a
        href={`https://wa.me/${cleanPhone}`}
        target="_blank"
        rel="noreferrer"
        style={{
          padding: "8px 12px",
          background: "#16a34a",
          color: "#fff",
          borderRadius: 8,
          textDecoration: "none",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        💬 WhatsApp
      </a>
    </div>
  );
}
