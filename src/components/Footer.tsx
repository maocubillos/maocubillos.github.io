import "./Footer.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-copyright">
        © {year} mao.cubillos@gmail.com
      </p>
    </footer>
  );
}
