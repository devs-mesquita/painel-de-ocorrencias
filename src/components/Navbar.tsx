import { useState } from "react";
import { v4 as uuid } from "uuid";
import mesquitaWhiteLogo from "../assets/logos/logoWhite.png";

export default function Navbar() {
  return (
    <header className="bg-roxo sticky z-20 w-screen items-center  text-white shadow-md shadow-black/20 md:gap-0">
      <div className="grid grid-cols-1 items-center gap-2 p-2 md:grid-cols-3 md:gap-0">
        <div className="flex items-center justify-center">
          <img
            className="drop-shadow-md"
            width={220}
            alt="Logo Mesquita"
            src={mesquitaWhiteLogo.src}
          />
        </div>
      </div>
    </header>
  );
}
