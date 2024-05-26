import NavbarDashboard from "@/components/NavbarDashboard";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col h-screen w-full">
      <NavbarDashboard />
      <div className="w-full">{children}</div>
    </main>
  );
}
