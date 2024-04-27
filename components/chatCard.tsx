'use client'
import { useDapp } from "@/hooks/useDapp";
import useParticipantDetails from "@/hooks/useParticipantDetails";

export default function ChatCard({ id }: { id: number }) {
    const { dispatch } = useDapp();
    const getParticipants = useParticipantDetails(id);
    const handleClick = () => {
        dispatch({ type: "setChat", payload: getParticipants });
    }
    return <div className="flex flex-row items-center gap-2 my-3 cursor-pointer" onClick={handleClick}>
        <div style={{ backgroundImage: `url(${getParticipants?.details?.imageUri})` }} className="bg-auto bg-no-repeat bg-center border-b border-gray-300 my-3 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-10 lg:h-10  lg:rounded-full lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">{/**Avatar */}</div>
        <div>
            <p>{getParticipants?.details?.ensname}</p>
            <p>{getParticipants?.messages[0]?.message}</p>
        </div>
    </div>
}
//Hello, how are you doing?