type VisualIconProps = {
  name:
    | "bot"
    | "briefcase"
    | "building"
    | "check-circle"
    | "chevron-down"
    | "chevron-up"
    | "clipboard-check"
    | "clock"
    | "copy"
    | "database"
    | "eye"
    | "facebook"
    | "home"
    | "instagram"
    | "linkedin"
    | "globe"
    | "headphones"
    | "life-buoy"
    | "lightbulb"
    | "mail"
    | "map-pin"
    | "masia"
    | "message-circle"
    | "navigation"
    | "network"
    | "pencil"
    | "phone"
    | "phone-call"
    | "puzzle"
    | "radio-tower"
    | "ruler"
    | "shield-check"
    | "sliders"
    | "smartphone"
    | "star"
    | "store"
    | "technician"
    | "users"
    | "wifi"
    | "wrench"
    | "x";
  className?: string;
};

export function VisualIcon({ name, className = "size-5" }: VisualIconProps) {
  const commonProps = {
    className,
    "aria-hidden": true,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "bot") {
    return (
      <svg {...commonProps}>
        <path d="M12 4V2" />
        <path d="M8 4h8a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" />
        <path d="M9 10h.01M15 10h.01M9 14h6" />
        <path d="M5 20h14" />
      </svg>
    );
  }

  if (name === "check-circle") {
    return (
      <svg {...commonProps}>
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    );
  }

  if (name === "chevron-down") {
    return (
      <svg {...commonProps}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    );
  }

  if (name === "chevron-up") {
    return (
      <svg {...commonProps}>
        <path d="m18 15-6-6-6 6" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "copy") {
    return (
      <svg {...commonProps}>
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    );
  }

  if (name === "database") {
    return (
      <svg {...commonProps}>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v6c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
        <path d="M5 11v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg {...commonProps}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...commonProps}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...commonProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  if (name === "globe") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18" />
        <path d="M12 3a14 14 0 0 0 0 18" />
      </svg>
    );
  }

  if (name === "headphones") {
    return (
      <svg {...commonProps}>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2" />
        <path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2" />
      </svg>
    );
  }

  if (name === "life-buoy") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M5.6 5.6 9.9 9.9" />
        <path d="m14.1 14.1 4.3 4.3" />
        <path d="m18.4 5.6-4.3 4.3" />
        <path d="m9.9 14.1-4.3 4.3" />
      </svg>
    );
  }

  if (name === "lightbulb") {
    return (
      <svg {...commonProps}>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M8.5 14.5A6 6 0 1 1 15.5 14.5c-.9.6-1.5 1.6-1.5 2.5h-4c0-.9-.6-1.9-1.5-2.5Z" />
      </svg>
    );
  }

  if (name === "mail") {
    return (
      <svg {...commonProps}>
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    );
  }

  if (name === "map-pin") {
    return (
      <svg {...commonProps}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  }

  if (name === "masia") {
    return (
      <svg {...commonProps}>
        <path d="M3 12 12 4l9 8" />
        <path d="M5 11v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" />
        <path d="M7 7V4h2v3.5" />
        <circle cx="12" cy="10" r="1.6" />
        <path d="M9 21v-3.5a3 3 0 0 1 6 0v3.5" />
      </svg>
    );
  }

  if (name === "message-circle") {
    return (
      <svg {...commonProps}>
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.8-.9L3 20l1.1-4.7A8.4 8.4 0 1 1 21 11.5Z" />
      </svg>
    );
  }

  if (name === "network") {
    return (
      <svg {...commonProps}>
        <path d="M12 5 18 8.5M18 8.5 18 15.5M18 15.5 12 19M12 19 6 15.5M6 15.5 6 8.5M6 8.5 12 5" />
        <circle cx="12" cy="5" r="1.8" />
        <circle cx="18" cy="8.5" r="1.8" />
        <circle cx="18" cy="15.5" r="1.8" />
        <circle cx="12" cy="19" r="1.8" />
        <circle cx="6" cy="15.5" r="1.8" />
        <circle cx="6" cy="8.5" r="1.8" />
      </svg>
    );
  }

  if (name === "pencil") {
    return (
      <svg {...commonProps}>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        <path d="m15 5 4 4" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg {...commonProps}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L8.09 9.64a16 16 0 0 0 6.27 6.27l1.21-1.2a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }

  if (name === "phone-call") {
    return (
      <svg {...commonProps}>
        <path d="M15 2a7 7 0 0 1 7 7" />
        <path d="M15 6a3 3 0 0 1 3 3" />
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L8.09 9.64a16 16 0 0 0 6.27 6.27l1.21-1.2a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }

  if (name === "radio-tower") {
    return (
      <svg {...commonProps}>
        <path d="M12 12h.01" />
        <path d="M9.2 9.2a4 4 0 0 1 5.6 0" />
        <path d="M6.3 6.3a8 8 0 0 1 11.4 0" />
        <path d="M3.5 3.5a12 12 0 0 1 17 0" />
        <path d="m12 12-3 9" />
        <path d="m12 12 3 9" />
        <path d="M9.8 18h4.4" />
      </svg>
    );
  }

  if (name === "shield-check") {
    return (
      <svg {...commonProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (name === "sliders") {
    return (
      <svg {...commonProps}>
        <path d="M5 4v16" />
        <circle cx="5" cy="14" r="2" />
        <path d="M12 4v16" />
        <circle cx="12" cy="8" r="2" />
        <path d="M19 4v16" />
        <circle cx="19" cy="16" r="2" />
      </svg>
    );
  }

  if (name === "smartphone") {
    return (
      <svg {...commonProps}>
        <rect width="12" height="20" x="6" y="2" rx="2" />
        <path d="M11 18h2" />
      </svg>
    );
  }

  if (name === "technician") {
    return (
      <svg {...commonProps}>
        <circle cx="8" cy="7" r="3.2" />
        <path d="M3 20v-1.5a5 5 0 0 1 5-5 5 5 0 0 1 5 5V20" />
        <circle cx="18" cy="17" r="2.3" />
        <path d="M18 13.7v1.5M18 18.8v1.5M13.7 17h1.5M20.8 17h1.5M19.6 15.4 20.7 14.3M16.4 15.4 15.3 14.3M19.6 18.6 20.7 19.7M16.4 18.6 15.3 19.7" />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg {...commonProps}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  if (name === "briefcase") {
    return (
      <svg {...commonProps}>
        <rect x="2" y="7" width="20" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M2 13h20" />
      </svg>
    );
  }

  if (name === "building") {
    return (
      <svg {...commonProps}>
        <path d="M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15" />
        <path d="M14 10h4a2 2 0 0 1 2 2v9" />
        <path d="M3 21h18" />
        <path d="M7.5 8h3M7.5 12h3M7.5 16h3" />
        <path d="M17 14h.01M17 17.5h.01" />
      </svg>
    );
  }

  if (name === "clipboard-check") {
    return (
      <svg {...commonProps}>
        <rect x="6" y="4" width="12" height="17" rx="2" />
        <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
        <path d="m9.5 13 2 2 4-4" />
      </svg>
    );
  }

  if (name === "eye") {
    return (
      <svg {...commonProps}>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  if (name === "home") {
    return (
      <svg {...commonProps}>
        <path d="M3 11 12 3l9 8" />
        <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
      </svg>
    );
  }

  if (name === "navigation") {
    return (
      <svg {...commonProps}>
        <path d="m3 11 18-8-8 18-2-8-8-2Z" />
      </svg>
    );
  }

  if (name === "puzzle") {
    return (
      <svg {...commonProps}>
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
      </svg>
    );
  }

  if (name === "ruler") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="9" width="18" height="6" rx="1" />
        <path d="M7 9v3" />
        <path d="M11 9v3" />
        <path d="M15 9v3" />
        <path d="M19 9v3" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg
        aria-hidden={true}
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2L7 14.2l-5-4.9 6.9-1Z" />
      </svg>
    );
  }

  if (name === "store") {
    return (
      <svg {...commonProps}>
        <path d="M4 7 5 3h14l1 4" />
        <path d="M4 7v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7" />
        <path d="M4 7a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
      </svg>
    );
  }

  if (name === "wrench") {
    return (
      <svg {...commonProps}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2Z" />
      </svg>
    );
  }

  if (name === "x") {
    return (
      <svg {...commonProps}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M5 12.5a10 10 0 0 1 14 0" />
      <path d="M8.5 16a5 5 0 0 1 7 0" />
      <path d="M12 20h.01" />
    </svg>
  );
}
