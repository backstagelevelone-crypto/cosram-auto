import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: 260,
          padding: 40,
        }}
      >
        {children}
      </main>
    </div>
  );
}
