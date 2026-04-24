import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | RIC App',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
