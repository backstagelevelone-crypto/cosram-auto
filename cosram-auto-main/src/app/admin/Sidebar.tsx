import Link from "next/link";

export default function Sidebar() {
  const menu = [
    { icon: "📊", title: "Dashboard", href: "/crm" },
    { icon: "👥", title: "Lead-uri", href: "/crm/leads" },
    { icon: "🚘", title: "Mașini", href: "#" },
    { icon: "📢", title: "Reclame", href: "#" },
    { icon: "💰", title: "Finanțări", href: "#" },
    { icon: "📅", title: "Calendar", href: "#" },
    { icon: "💬", title: "WhatsApp", href: "#" },
    { icon: "⚙️", title: "Setări", href: "#" },
  ];

  return (
    <aside
      style={{
        width: 260,
        background: "#ffffff",
        borderRight: "1px solid #e5e7eb",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        padding: 24,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: "#dc2626",
          }}
        >
          COSRAM
        </div>

        <div
          style={{
            color: "#6b7280",
            fontSize: 14,
          }}
        >
          AUTO CRM
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {menu.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              borderRadius: 12,
              background:
                item.title === "Lead-uri"
                  ? "#dc2626"
                  : "transparent",
              color:
                item.title === "Lead-uri"
                  ? "#ffffff"
                  : "#374151",
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all .2s",
            }}
          >
            <span style={{ fontSize: 20 }}>
              {item.icon}
            </span>

            {item.title}
          </Link>
        ))}
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 24,
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Cosram Auto
        </div>

        <div
          style={{
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          CRM v1.0
        </div>
      </div>
    </aside>
  );
}
