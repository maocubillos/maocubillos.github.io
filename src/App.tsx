import { useState, useEffect } from "react";
import "./App.css";
import {
  PhoneOutcomeSolid,
  WhatsappSolid,
  SendMailSolid,
  MessageAlertSolid,
  WarningTriangleSolid,
} from "iconoir-react";

interface Contact {
  label: string;
  phone: string;
  email?: string;
}

interface Profile {
  name: string;
  contacts: Contact[];
}

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const profileName = params.get("profile") ?? "tomas";

    fetch(`./profiles/${profileName}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Profile "${profileName}" not found`);
        return res.json() as Promise<Profile>;
      })
      .then(setProfile)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return (
      <>
        <header>
          <h3>
            SOS <MessageAlertSolid width="2rem" color="#e53935" />
          </h3>
        </header>
        <div className="container">
          <div className="not-found">
            <WarningTriangleSolid width="3rem" color="#e53935" />
            <h2>Profile not found</h2>
            <p>The requested profile does not exist.</p>
          </div>
        </div>
      </>
    );
  }

  if (!profile) return null;

  return (
    <>
      <header>
        <h3>
          SOS <MessageAlertSolid width="2rem" color="#e53935" />
        </h3>
      </header>
      <div className="container">
        <h1>{profile.name}</h1>
      </div>
      {profile.contacts.map((contact) => (
        <div className="card" key={contact.label}>
          <button
            onClick={() => (window.location.href = `tel:${contact.phone}`)}
          >
            <PhoneOutcomeSolid width="1.5rem" /> Call {contact.label}{" "}
            {contact.phone}
          </button>
          <br />
          <button
            className="wa"
            onClick={() =>
              window.open(
                `https://wa.me/${contact.phone.replace(/\D/g, "")}`,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <WhatsappSolid width="1.5rem" /> Call {contact.label} Whatsapp
          </button>
          {contact.email && (
            <>
              <br />
              <button
                className="secondary"
                onClick={() =>
                  (window.location.href = `mailto:${contact.email}?subject=SOS%20${encodeURIComponent(profile.name.split(" ")[0])}`)
                }
              >
                <SendMailSolid width="1rem" /> Email {contact.label}{" "}
                {contact.email}
              </button>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default App;
