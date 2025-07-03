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
        <h1>SOS kiddo</h1>
      </header>
      {/* <nav>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
            </ul>
        </nav> */}
      <div className="container">
        <h2>Tomás Mateo Cubillos Barragán</h2>
      </div>
      <div className="card">
        <a
          href="https://wa.me/573017711429"
          target="_blank"
          rel="noopener noreferrer"
        >
          Call Dad (+57) 3017711429
        </a>
        <br />
      </div>
      <div className="card">
        <button
          onClick={() =>
            window.open(
              "https://wa.me/573017711429",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          Call Dad (+57) 3017711429
        </button>
      </div>
    </>
  );
}

export default App;
