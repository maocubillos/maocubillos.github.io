import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { SunLight, HalfMoon } from "iconoir-react";
import { Footer } from "./components/Footer";
import { useTheme } from "./hooks/useTheme";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";

function App() {
  const { theme, toggle } = useTheme();

  return (
    <BrowserRouter>
      <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
        {theme === "dark" ? <SunLight width="1.25rem" /> : <HalfMoon width="1.25rem" />}
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
