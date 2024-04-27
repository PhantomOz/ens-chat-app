import { useDapp } from "@/hooks/useDapp";
import { messageDetails } from "@/utils/interfaces";
import Image from "next/image";

export default function MessageCard(message: any) {
    const { state } = useDapp();
    console.log(message);
    if (message?.message?.author !== state.user.ensname) {
        return <div className="border-b border-gray-300 my-3 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-4/12 lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            {message?.message?.imageUrl.includes("https") && <Image className="w-full h-fit object-contain" width={200} height={200} src={message?.message?.imageUrl} alt="image" />}
            <p>{message?.message?.message}</p>
            <p className="text-xs text-right">{new Date(Number(message?.message?.createdAt) * 1000).toLocaleTimeString()}</p>
        </div>
    }
    return (

        <div className="bg-gradient-to-b self-end from-blue-600 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-blue-800/30 dark:from-inherit lg:static lg:w-4/12  lg:rounded-xl">
            {message?.message?.imageUrl.includes("https") && <Image className="w-full h-fit object-contain" width={200} height={200} src={message?.message?.imageUrl} alt="image" />}
            <p>{message?.message?.message}</p>
            <p className="text-xs text-right">{new Date(Number(message?.message?.createdAt) * 1000).toLocaleTimeString()} <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &uarr;
            </span></p>
        </div>
    )
}
// "https://media.istockphoto.com/id/1041373364/photo/photos-of-the-family-in-various-photo-frames.jpg?s=612x612&w=0&k=20&c=9s6M0OuQ7Z-tJe0SVZQVucJYlb6n1QioWEzOnQ0hiqs="