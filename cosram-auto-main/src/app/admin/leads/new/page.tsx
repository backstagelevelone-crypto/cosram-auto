export default function NewLeadPage() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: 32,
        maxWidth: 700,
        boxShadow: "0 10px 30px rgba(0,0,0,.05)",
      }}
    >
      <h1
        style={{
          marginTop: 0,
          marginBottom: 24,
        }}
      >
        Adaugă Lead
      </h1>

      <form
        style={{
          display: "grid",
          gap: 20,
        }}
      >
        <div>
          <label>Nume</label>

          <input
            type="text"
            style={{
              width: "100%",
              padding: 12,
              marginTop: 8,
              border: "1px solid #ddd",
              borderRadius: 10,
            }}
          />
        </div>

        <div>
          <label>Telefon</label>

          <input
            type="text"
            style={{
              width: "100%",
              padding: 12,
              marginTop: 8,
              border: "1px solid #ddd",
              borderRadius: 10,
            }}
          />
        </div>

        <div>
          <label>Mașină</label>

          <input
            type="text"
            style={{
              width: "100%",
              padding: 12,
              marginTop: 8,
              border: "1px solid #ddd",
              borderRadius: 10,
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: 14,
            border: 0,
            borderRadius: 12,
            background: "#dc2626",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Salvează Lead
        </button>
      </form>
    </div>
  );
}
