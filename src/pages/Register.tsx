import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "iconoir-react";
import { profileSchema, type Profile } from "../types/profile";
import { Button } from "../components/Button";
import "./Register.css";

export function Register() {
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

  function onSubmit(data: Profile) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
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

        <Button type="submit" variant="primary">
          Download profile JSON
        </Button>
      </form>
    </>
  );
}
