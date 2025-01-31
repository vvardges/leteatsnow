import './styles.css';

export const metadata = {
  title: 'Let Eat Snow!',
  description: 'Webcam Game',
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
