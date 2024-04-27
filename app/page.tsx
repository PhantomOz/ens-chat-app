'use client'
import Login from "@/components/login";
import Register from "@/components/register";
import { useDapp } from "@/hooks/useDapp";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";

export default function Home() {
  const [authPage, setAuthPage] = useState(0);
  const { state } = useDapp();
  const { isAuth } = state;
  const router = useRouter();

  const handleAuthCompChange = () => {
    authPage === 0 ? setAuthPage(1) : setAuthPage(0);
  }

  useEffect(() => {
    console.log(isAuth);
    if (isAuth === true) {
      router.push("/chat");
    }
  }, [isAuth, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Chat Dapp
        </p>
        <w3m-button />
      </div>

      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        {authPage === 0 ? <><Login />
          <p>Don&apos;t have an ens name <span className="text-blue-800 cursor-pointer" onClick={handleAuthCompChange}>Register</span></p></>
          : <><Register />
            <p>Already have an ens name <span className="text-blue-800 cursor-pointer" onClick={handleAuthCompChange}>Login</span> </p></>}
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <p>Made With Love by @SuperDevFavour</p>
      </div>
    </main>
  );
}
