import { useState, useEffect } from "react";
import {
  PhoneOutcomeSolid,
  WhatsappSolid,
  SendMailSolid,
  MessageAlertSolid,
  WarningTriangleSolid,
} from "iconoir-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { colors } from "../styles/tokens";
import type { Profile } from "../types/profile";

export function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const profileName = params.get("profile") ?? "tomas";

    fetch(`/profiles/${profileName}.json`)
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
            SOS <MessageAlertSolid width="2rem" color={colors.danger} />
          </h3>
        </header>
        <div className="container">
          <div className="not-found">
            <WarningTriangleSolid width="3rem" color={colors.danger} />
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
          SOS <MessageAlertSolid width="2rem" color={colors.danger} />
        </h3>
      </header>
      <div className="container">
        <h1>{profile.name}</h1>
      </div>
      {profile.contacts.map((contact) => (
        <Card key={contact.label}>
          <Button
            variant="primary"
            leadIcon={<PhoneOutcomeSolid width="1.5rem" />}
            href={`tel:${contact.phone}`}
          >
            Call {contact.label} {contact.phone}
          </Button>
          <Button
            variant="secondary"
            leadIcon={<WhatsappSolid width="1.5rem" />}
            href={`https://wa.me/${contact.phone.replace(/\D/g, "")}`}
          >
            Call {contact.label} Whatsapp
          </Button>
          {contact.email && (
            <Button
              variant="tertiary"
              leadIcon={<SendMailSolid width="1rem" />}
              href={`mailto:${contact.email}?subject=SOS%20${encodeURIComponent(profile.name.split(" ")[0])}`}
            >
              Email {contact.label} {contact.email}
            </Button>
          )}
        </Card>
      ))}
    </>
  );
}
