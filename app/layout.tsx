import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gayathri — Software Developer',
  description: 'Full Stack Developer building modern web experiences & scalable digital products.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
