import React from "react";

function getInitials(name = "") {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("");
}

export default function Avatar({ name, size = "h-9 w-9", tint = "bg-indigo-100 text-indigo-600" }) {
  return (
    <div className={`flex ${size} shrink-0 items-center justify-center rounded-full text-xs font-semibold ${tint}`}>
      {getInitials(name)}
    </div>
  );
}
