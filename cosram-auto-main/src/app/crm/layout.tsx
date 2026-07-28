import { ReactNode } from "react";
import Sidebar from "../admin/Sidebar";

export default function CRMLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <main
        style={{
          marginLeft: 260,
          minHeight: "100vh",
        }}
      >
        {children}
      </main>

    </div>
  );
}
