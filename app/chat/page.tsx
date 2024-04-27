'use client'
import ChatCard from "@/components/chatCard";
import MessageCard from "@/components/messageCard";
import SendMessage from "@/components/sendMessage";
import { getUserDetails } from "@/context/ContractActions";
import { useDapp } from "@/hooks/useDapp";
import useHandleCids from "@/hooks/useHandleCids";
import { messageDetails } from "@/utils/interfaces";
import Image from "next/image"
import { useEffect } from "react";

export default function Chat() {
    const { state, dispatch } = useDapp();
    const { user, messages, chatDetails } = state;
    const cids = useHandleCids();

    useEffect(() => {
        async function getDetails() {
            const res = await getUserDetails(user.ensname);
            dispatch({ type: "userdetails", payload: { address: res._owner, imageUri: res._imageURI } })
        }
        getDetails();
    }, [user.ensname, dispatch]);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <div className="flex flex-row items-center gap-2">
                    <div style={{ backgroundImage: `url(${user.imageUri})` }} className="bg-auto bg-no-repeat bg-center border-b border-gray-300 my-3 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static w-10 h-10  lg:rounded-full lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">{/**Avatar */}</div>
                    <p className=" text-white">
                        {user.ensname}
                    </p>
                </div>
                <w3m-button />
            </div>
            <div className="relative flex flex-row w-10/12 place-items-center items-stretch before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
                <div className="border-b self-stretch border-gray-300 my-3 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-s-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <div className="">
                        <h1>Chats</h1>
                        <div className="flex flex-row items-center">
                            <input className="my-3 bg-gradient-to-b from-zinc-200 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-s-xl" type="text" placeholder="Add new chat" />
                            <button className="bg-gradient-to-b from-blue-600 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-blue-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-e-xl"> <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                +
                            </span></button>
                        </div>
                    </div>
                    <div className="">
                        {cids?.map((id, index) => <ChatCard key={index} id={id} />)}
                    </div>
                </div>
                <div className="flex-1 border-b border-gray-300 my-3 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-full lg:min-w-80 lg:max-h-screen lg:rounded-e-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <div className="flex flex-row items-center justify-between my-3">
                        <div className="flex flex-row items-center gap-2 my-3">
                            <div style={{ backgroundImage: `url(${chatDetails.imageUri})` }} className="bg-auto bg-no-repeat bg-center border-b border-gray-300 my-3 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-10 lg:h-10  lg:rounded-full lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">{/**Avatar */}</div>
                            <p>{chatDetails.ensname}</p>
                        </div>
                        <div>
                            <button className="bg-gradient-to-b from-blue-600 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-blue-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl"> <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                &uarr;
                            </span></button>
                        </div>
                    </div>
                    <div className="flex flex-col max-h-[300px] overflow-y-auto pb-8">
                        {messages?.map((message, index) => <MessageCard key={index} message={message} />)}
                    </div>
                    <SendMessage />
                </div>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <p>Made With Love by @SuperDevFavour</p>
            </div>
        </main>
    );
}