import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps {
  variant?: ButtonVariant;
  leadIcon?: React.ReactNode;
  trailIcon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  leadIcon,
  trailIcon,
  onClick,
  href,
  children,
}: ButtonProps) {
  const className = `btn btn-${variant}`;

  if (href) {
    return (
      <a className={className} href={href}>
        {leadIcon && <span className="btn-icon">{leadIcon}</span>}
        {children}
        {trailIcon && <span className="btn-icon">{trailIcon}</span>}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {leadIcon && <span className="btn-icon">{leadIcon}</span>}
      {children}
      {trailIcon && <span className="btn-icon">{trailIcon}</span>}
    </button>
  );
}
