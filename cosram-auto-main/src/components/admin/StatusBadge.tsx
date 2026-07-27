type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  const colors: Record<string, { bg: string; color: string }> = {
    nou: {
      bg: "#fee2e2",
      color: "#b91c1c",
    },
    contactat: {
      bg: "#fef3c7",
      color: "#92400e",
    },
    programat: {
      bg: "#dbeafe",
      color: "#1d4ed8",
    },
    calificat: {
      bg: "#dcfce7",
      color: "#166534",
    },
    respins: {
      bg: "#f3f4f6",
      color: "#374151",
    },
    vandut: {
      bg: "#ede9fe",
      color: "#6d28d9",
    },
  };

  const current = colors[status?.toLowerCase()] ?? {
    bg: "#e5e7eb",
    color: "#374151",
  };

  return (
    <span
      style={{
        background: current.bg,
        color: current.color,
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
}
