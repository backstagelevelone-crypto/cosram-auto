export default function LeadsPage() {
  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          marginBottom: "30px",
        }}
      >
        🚗 Cosram CRM
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,.08)",
        }}
      >
        <h2>Lead-uri</h2>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th align="left">Nume</th>
              <th align="left">Telefon</th>
              <th align="left">Mașină</th>
              <th align="left">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Demo Lead</td>
              <td>0722 000 000</td>
              <td>BMW X5</td>
              <td>Nou</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
