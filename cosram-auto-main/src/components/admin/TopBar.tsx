export default function TopBar() {
  return (
    <div
      style={{
        height: 70,
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
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#111827",
        }}
      >
        Dashboard
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
