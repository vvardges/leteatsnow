import { Orbitron } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-orbitron',
    weight: ['400', '700'], // choose weights you need
});

export const metadata = {
  title: 'Let eat snow!',
  description: 'An interactive webcam game',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${orbitron.className}`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
