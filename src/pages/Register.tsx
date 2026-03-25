import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "iconoir-react";
import { profileSchema, type Profile } from "../types/profile";
import { Button } from "../components/Button";
import { supabase } from "../lib/supabase";
import "./Register.css";

type SubmitState = "idle" | "loading" | "success" | "error";

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

function downloadJson(data: Profile) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${toSlug(data.name)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function Register() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      contacts: [{ label: "", phone: "", email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  async function onSubmit(data: Profile) {
    setSubmitState("loading");
    setSubmitError(null);

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert({ name: data.name, slug: toSlug(data.name) })
      .select("id")
      .single();

    if (profileError || !profile) {
      setSubmitState("error");
      setSubmitError(profileError?.message ?? "Failed to save profile.");
      return;
    }

    const { error: contactsError } = await supabase
      .from("contacts")
      .insert(
        data.contacts.map((c) => ({ ...c, profile_id: profile.id }))
      );

    if (contactsError) {
      setSubmitState("error");
      setSubmitError(contactsError.message);
      return;
    }

    setSubmitState("success");
    downloadJson(data);
  }

  return (
    <>
      <header>
        <h3>New Profile</h3>
      </header>

      <form className="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" type="text" placeholder="e.g. Tomás Cubillos" {...register("name")} />
          {errors.name && <span className="field-error">{errors.name.message}</span>}
        </div>

        <div className="contacts-section">
          <h4>Contacts</h4>

          {fields.map((field, index) => (
            <div className="contact-row" key={field.id}>
              <div className="contact-row-fields">
                <div className="field">
                  <label>Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Mom"
                    {...register(`contacts.${index}.label`)}
                  />
                  {errors.contacts?.[index]?.label && (
                    <span className="field-error">{errors.contacts[index].label?.message}</span>
                  )}
                </div>

                <div className="field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 234 567 8900"
                    {...register(`contacts.${index}.phone`)}
                  />
                  {errors.contacts?.[index]?.phone && (
                    <span className="field-error">{errors.contacts[index].phone?.message}</span>
                  )}
                </div>

                <div className="field">
                  <label>Email <span className="optional">optional</span></label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    {...register(`contacts.${index}.email`)}
                  />
                  {errors.contacts?.[index]?.email && (
                    <span className="field-error">{errors.contacts[index].email?.message}</span>
                  )}
                </div>
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  className="remove-contact"
                  onClick={() => remove(index)}
                  aria-label="Remove contact"
                >
                  <Trash width="1.1rem" />
                </button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="tertiary"
            leadIcon={<Plus width="1rem" />}
            onClick={() => append({ label: "", phone: "", email: "" })}
          >
            Add contact
          </Button>
        </div>

        <div className="form-actions">
          <Button type="submit" variant="primary" disabled={submitState === "loading"}>
            {submitState === "loading" ? "Saving…" : "Save profile"}
          </Button>
          {submitState === "success" && (
            <p className="form-success">Profile saved — JSON downloaded.</p>
          )}
          {submitState === "error" && (
            <p className="field-error">{submitError}</p>
          )}
        </div>
      </form>
    </>
  );
}
