'use client'
import { getProvider } from "@/constants/providers";
import { sendMessage } from "@/context/ContractActions";
import { useDapp } from "@/hooks/useDapp";
import { storeNFT } from "@/utils/FileUpload";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import Image from "next/image";
import { useRef, useState } from "react"

export default function SendMessage() {
    const imageRef = useRef<any>();
    const [imgURL, setImgURL] = useState<string>();
    const [text, setText] = useState<string>("");
    const { walletProvider } = useWeb3ModalProvider();
    const { state, dispatch } = useDapp();
    const { user, chatDetails } = state;

    const handleFile = () => {
        imageRef.current.click();
    };
    const handleImageChange = () => {
        setImgURL(URL.createObjectURL(imageRef.current.files[0]));
    };
    const handleClose = () => {
        setImgURL(undefined);
    }

    const handleSendMessage = async () => {
        let imageUri = "";

        const avatar = await storeNFT(imageRef.current.files, "", "");
        console.log(avatar.data.image.pathname.slice(2).split("/"));
        imageUri = `https://${avatar.data.image.pathname.slice(2).split("/")[0]
            }.ipfs.nftstorage.link/${avatar.data.image.pathname.slice(2).split("/")[1]
            }`;

        if (walletProvider) {
            const readWriteProvider = getProvider(walletProvider);
            const signer = await readWriteProvider.getSigner();
            const res = await sendMessage(user.ensname, chatDetails.ensname, text, imageUri, signer);
            const message = {
                author: user.ensname,
                reciever: chatDetails.ensname,
                message: text,
                imageUrl: imageUri
            }
            if (res) {
                dispatch({ type: "sendMessage", payload: message });
            }
        }
    }
    return (<div className="fixed bottom-0 left-0 w-full ">
        {imgURL && <div className="flex flex-col py-3 items-center bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-full lg:rounded-t-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
            <p className="text-right w-full px-7 cursor-pointer" onClick={handleClose}><span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &#128473;
            </span></p>
            <Image className="w-auto max-h-52 object-contain" width={200} height={200} src={imgURL} alt="image" />
        </div>}
        <div className="relative flex flex-row border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-full lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
            <button className="bg-gradient-to-b from-blue-600 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-blue-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-s-xl" onClick={handleFile}> <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                &#128206;
            </span></button>
            <input ref={imageRef} value={text} className="absolute hidden" type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
            <input className="flex-1 bg-gradient-to-b from-zinc-200 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto" type="text" placeholder="Write a message..." />
            <button className="bg-gradient-to-b from-blue-600 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-blue-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-e-xl" onClick={handleSendMessage}> <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
            </span></button>
        </div>
    </div>)
}