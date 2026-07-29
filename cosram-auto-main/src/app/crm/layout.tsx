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
        className="
          min-h-screen
          ml-0
          md:ml-[260px]
        "
      >
        {children}
      </main>

    </div>
  );
}
