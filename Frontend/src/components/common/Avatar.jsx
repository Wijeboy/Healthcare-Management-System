import React from "react";

export default function Avatar({ name, size = "h-9 w-9", tint = "bg-blue-100 text-blue-600" }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={`flex ${size} shrink-0 items-center justify-center rounded-full text-xs font-semibold ${tint}`}>
      {initials}
    </div>
  );
}
