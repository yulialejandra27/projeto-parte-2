import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Mural da Comunidade",
  description: "Plataforma colaborativa para eventos e vagas locais",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <header className="menu">
          <div className="logo">
            <img src="/logo.png" alt="Mural da Comunidade" height="80" />
            <div className="titulo">
              <p>Mural da <span>Comunidade</span></p>
            </div>
          </div>
          <div className="menu-link">
            <Link href="/cadastro" className="links">
              Cadastrar-se
            </Link>
          </div>
        </header>

        {children}

        <footer>
          <p>Contatos</p>
          <p>TELEFONE | FACEBOOK | INSTAGRAM</p>
          <p>Copyright©2026 Rafael Ros | Yulianny Briceno</p>
        </footer>
      </body>
    </html>
  );
}