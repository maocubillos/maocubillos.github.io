// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div> */}
      <header>
        <h3>SOS kiddo</h3>
      </header>
      <div className="container">
        <h1>Tomás Mateo Cubillos Barragán</h1>
      </div>
      <div className="card">
        {/* <a
          href="https://wa.me/573017711429"
          target="_blank"
          rel="noopener noreferrer"
        >
          Call Dad (+57) 3017711429
        </a> */}
        <button onClick={() => (window.location.href = "tel:+573005631664")}>
          Call Mom (+57) 300 563 1664
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
          Call Mom Whatsapp
        </button>
      </div>
      <div className="card">
        <button onClick={() => (window.location.href = "tel:+573017711429")}>
          Call Dad (+57) 301 7711 429
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
          Call Dad Whatsapp
        </button>
      </div>
    </>
  );
}

export default App;
