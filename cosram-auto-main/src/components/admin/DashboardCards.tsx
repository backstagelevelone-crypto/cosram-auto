import {
  Users,
  CalendarDays,
  BadgeCheck,
  Car,
} from "lucide-react";

type Props = {
  total: number;
  today: number;
  qualified: number;
  sold: number;
};

function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        padding: 24,
        boxShadow: "0 10px 30px rgba(15,23,42,.06)",
        border: "1px solid #eef2f7",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            color: "#64748b",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {title}
        </div>

        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          {icon}
        </div>
      </div>

      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: "#0f172a",
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
        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
        gap: 20,
        marginBottom: 30,
      }}
    >
      <Card
        title="Lead-uri totale"
        value={total}
        color="#2563eb"
        icon={<Users size={22} />}
      />

      <Card
        title="Lead-uri astăzi"
        value={today}
        color="#f59e0b"
        icon={<CalendarDays size={22} />}
      />

      <Card
        title="Calificate"
        value={qualified}
        color="#16a34a"
        icon={<BadgeCheck size={22} />}
      />

      <Card
        title="Mașini vândute"
        value={sold}
        color="#dc2626"
        icon={<Car size={22} />}
      />
    </div>
  );
}
