"use client";
//this page will be notetaking for the whole school stuff.
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import WeatherWidget from "./_parts/Weather";
import RealTimeClock from "./_parts/Time";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LinkType = {
  alt: string;
  href: string;
};
export default function LandingPage() {
  const [showNotes, setShowNotes] = useState(false);

  const router = useRouter();

  const Links: LinkType[] = [
    { alt: "Tic Tac Toe", href: "/tictactoe" },
    { alt: "To-Do List", href: "/todo" },
    { alt: "Login form (mock)", href: "/loginform" },
  ];

  return (
    <div
      style={{
        backgroundImage: "url(misc/v8engine.png)",
        backgroundBlendMode: "overlay",
      }}
      className="relative box-border w-full h-screen bg-gray-800 bg-center bg-no-repeat bg-cover"
    >
      <div
        id="header"
        className="w-10em h-20 bg-gray-500 flex items-center justify-center "
      >
        <div className="flex flex-row items-center gap-20">
          <button
            className="w-fit px-10 rounded-2xl h-10 bg-gray-400"
            onMouseEnter={() => {
              setShowNotes(true);
            }}
            onMouseLeave={() => {
              setShowNotes(false);
            }}
          >
            Notes
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-2xl" variant={"ghost"}>
                Projects
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Links.map((link, i) => (
                <DropdownMenuItem
                  key={i}
                  onClick={() => {
                    router.push(`${link.href}`);
                  }}
                >
                  {link.alt}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full h-fit p-10 flex flex-col items-center justify-center">
        <div className="mainScreen flex flex-col gap-2 p-5">
          <RealTimeClock />
          <WeatherWidget />
        </div>
      </div>
    </div>
  );
}
//on-hover display plans:
//
