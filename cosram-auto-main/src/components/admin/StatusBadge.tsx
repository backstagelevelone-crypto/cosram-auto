type Props = {
  status: string;
};

export default function StatusBadge({ status }: Props) {
  let background = "#dbeafe";
  let color = "#1e3a8a";

  switch (status?.toLowerCase()) {
    case "nou":
      background = "#fee2e2";
      color = "#b91c1c";
      break;

    case "contactat":
      background = "#fef3c7";
      color = "#92400e";
      break;

    case "calificat":
      background = "#dcfce7";
      color = "#166534";
      break;

    case "vandut":
      background = "#dbeafe";
      color = "#1d4ed8";
      break;

    default:
      background = "#e5e7eb";
      color = "#374151";
  }

  return (
    <span
      style={{
        background,
        color,
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
