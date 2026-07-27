import Sidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />

      <main
        style={{
          marginLeft: 260,
          minHeight: "100vh",
          background: "#f8fafc",
          padding: 32,
        }}
      >
        {children}
      </main>
    </>
  );
}
