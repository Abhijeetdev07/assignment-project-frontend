import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import './globals.css';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your users and products with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
