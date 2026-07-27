export default function TopBar() {
  return (
    <div
      style={{
        height: 80,
        background: "#ffffff",
        borderRadius: 16,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        boxShadow: "0 4px 20px rgba(0,0,0,.05)",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          Lead-uri
        </h1>

        <p
          style={{
            margin: "4px 0 0",
            color: "#6b7280",
            fontSize: 14,
          }}
        >
          Gestionează toate lead-urile din CRM.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <input
          type="text"
          placeholder="Caută după nume sau telefon..."
          style={{
            width: 320,
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            outline: "none",
            fontSize: 14,
          }}
        />

        <button
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "12px 20px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          + Adaugă Lead
        </button>

        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "#dc2626",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 700,
          }}
        >
          D
        </div>
      </div>
    </div>
  );
}
