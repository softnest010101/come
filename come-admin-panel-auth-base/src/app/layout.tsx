import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'My Platform',
  description: 'Admin Panel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-800 min-h-screen">
        <Providers>
          <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <ul className="flex items-center space-x-6 text-sm font-medium">
              <li><Link href="/dashboard" className="text-sky-600 hover:underline">🏠 Dashboard</Link></li>
              <li><Link href="/projects" className="text-sky-600 hover:underline">📁 Projects</Link></li>
              <li><Link href="/pages" className="text-sky-600 hover:underline">📄 Pages</Link></li>
              <li><Link href="/components" className="text-sky-600 hover:underline">📦 Components</Link></li>
              <li><Link href="/widgets" className="text-sky-600 hover:underline">🧩 Widgets</Link></li>
              <li><Link href="/component-instances" className="text-sky-600 hover:underline">🧱 ComponentInstances</Link></li>
              <li><Link href="/widget-instances" className="text-sky-600 hover:underline">🧩 WidgetInstances</Link></li>
              <li><Link href="/editor" className="text-sky-600 hover:underline">🛠 Editor</Link></li>
            </ul>
          </nav>

          <main className="px-6 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
