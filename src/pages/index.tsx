import Head from "next/head";

import { v4 as uuid } from "uuid";

import { useEffect, useState } from "react";
import useSocket from "@/hooks/useSocket";
//import useLocalStorage from "@/hooks/useLocalStorage";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import type { PanicInfo } from "@/types/interfaces";
import PanicItem from "@/components/PanicItem";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [panics, setPanics] = useLocalStorage<PanicInfo[]>(
    "received-panics",
    []
  );

  const [seenPanics, setSeenPanics] = useLocalStorage<number[]>(
    "seen-panics",
    []
  );

  const socket = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected");
      });

      socket.on("new-panic", (panic: PanicInfo) => {
        setPanics((st) => [panic, ...st]);
      });

      return () => {
        socket.off("connect");
        socket.off("new-panic");
      };
    }
  }, [socket]);

  const handleSee = (id: number) => {
    setSeenPanics((st) => [...st!, id]);
  };

  const handleUndo = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setSeenPanics((st) => st.slice(0, st.length - 1));
  };

  return (
    <>
      <Head>
        <title>Painel de Ocorrências</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-1 flex-wrap items-baseline justify-around gap-4 py-8">
        {isClient &&
          panics.length > 0 &&
          panics
            .filter((panic) => !seenPanics.includes(panic.id))
            .map((panic) => (
              <PanicItem key={uuid()} panic={panic} handleSee={handleSee} />
            ))}
      </div>
      <button
        onClick={handleUndo}
        className="m-4 self-center rounded bg-roxo p-1 text-white hover:bg-indigo-600/80"
        title="Restaurar última ocorrência ocultada."
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
        </svg>
      </button>
    </>
  );
}
