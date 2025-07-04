// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { PhoneOutcomeSolid, WhatsappSolid, SendMailSolid } from "iconoir-react";

function App() {
  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div> */}
      <header>
        <h3>SOS</h3>
      </header>
      <div className="container">
        <h1>
          Tomás Mateo <br /> Cubillos Barragán
        </h1>
      </div>
      <div className="card">
        <button onClick={() => (window.location.href = "tel:+573005631664")}>
          <PhoneOutcomeSolid width="1.5rem" /> Call Mom (+57) 300 563 1664
        </button>
        <br />
        <button
          className="wa"
          onClick={() =>
            window.open(
              "https://wa.me/573005631664",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          <WhatsappSolid width="1.5rem" /> Call Mom Whatsapp
        </button>
        <br />
        <button
          className="secondary"
          onClick={() =>
            (window.location.href =
              "mailto:mayita8523@gmail.com?subject=SOS%20Tomas")
          }
        >
          <SendMailSolid width="1rem" /> Email Mom mayita8523@gmail.com
        </button>
      </div>
      <div className="card">
        <button onClick={() => (window.location.href = "tel:+573017711429")}>
          <PhoneOutcomeSolid width="1.5rem" /> Call Dad (+57) 301 7711 429
        </button>
        <br />
        <button
          className="wa"
          onClick={() =>
            window.open(
              "https://wa.me/573017711429",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          <WhatsappSolid width="1.5rem" /> Call Dad Whatsapp
        </button>
        <br />
        <button
          className="secondary"
          onClick={() =>
            (window.location.href =
              "mailto:mao.cubillos@gmail.com?subject=SOS%20Tomas")
          }
        >
          <SendMailSolid width="1rem" />
          Email Dad mao.cubillos@gmail.com
        </button>
      </div>
    </>
  );
}

export default App;
