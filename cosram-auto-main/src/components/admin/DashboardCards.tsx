type Props = {
  total: number;
  today: number;
  qualified: number;
  sold: number;
};

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 24,
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          color: "#666",
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function DashboardCards({
  total,
  today,
  qualified,
  sold,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 20,
        marginBottom: 30,
      }}
    >
      <Card title="Lead-uri" value={total} />
      <Card title="Astăzi" value={today} />
      <Card title="Calificate" value={qualified} />
      <Card title="Vândute" value={sold} />
    </div>
  );
}
