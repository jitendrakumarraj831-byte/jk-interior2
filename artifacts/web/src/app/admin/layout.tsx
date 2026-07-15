import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin – JK Interior",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
