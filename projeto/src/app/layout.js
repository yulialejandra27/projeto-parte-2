import "./globals.css";

export const metadata = {
  title: "Mural da Comunidade",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
