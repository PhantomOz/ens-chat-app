'use client'
import { getProvider } from "@/constants/providers";
import { register } from "@/context/ContractActions";
import { useDapp } from "@/hooks/useDapp";
import { storeNFT } from "@/utils/FileUpload";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useRef, useState } from "react"

export default function Register() {
    const uploadRef = useRef<any>();
    const bgDiv = useRef<any>();
    const [ensName, setEnsName] = useState<string>("");
    const { dispatch } = useDapp();
    const { walletProvider } = useWeb3ModalProvider();


    const handleImageChange = () => {
        bgDiv.current.style.backgroundImage = `url(${URL.createObjectURL(uploadRef.current.files[0])})`;
    }
    const handleUploadFile = () => {
        console.log("clicking")
        uploadRef.current.click();
    }

    const handleRegister = async () => {
        const avatar = await storeNFT(uploadRef.current?.files[0], "", "");
        console.log(avatar.data.image.pathname.slice(2).split("/"));
        const imageUri = `https://${avatar.data.image.pathname.slice(2).split("/")[0]
            }.ipfs.nftstorage.link/${avatar.data.image.pathname.slice(2).split("/")[1]
            }`;
        if (walletProvider) {
            const readWriteProvider = getProvider(walletProvider);
            const signer = await readWriteProvider.getSigner();
            const res = await register(ensName, imageUri, signer);
            dispatch({ type: "register", payload: { ensName, imageUri, res } });
        }
    }

    return <div className="border-b border-gray-300 my-3 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <p onClick={handleUploadFile}>Image URI</p>
        <div ref={bgDiv} className="relative flex justify-center items-center cursor-pointer bg-auto bg-no-repeat bg-center border-b border-gray-300 my-3 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30" onClick={handleUploadFile}>
            <input ref={uploadRef} className="absolute hidden" type="file" accept="image/jpeg, image/png, image/jpg" onChange={handleImageChange} />
            <div className="flex justify-center items-center cursor-pointer border-b border-gray-300 my-8 bg-gradient-to-b from-white-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-4 lg:h-4  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                <span>&uarr;</span>
            </div>
        </div>
        <p>Ens Name</p>
        <input className="my-3 bg-gradient-to-b from-zinc-200 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl" type="text" name="ensname" value={ensName} onChange={(e) => setEnsName(e.target.value)} placeholder="favour.chat" />
        <div>
            <button disabled={ensName.length < 1 || uploadRef.current.files.length < 1} className="bg-gradient-to-b from-blue-600 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-blue-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl" onClick={handleRegister}>Register <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
            </span></button>
        </div>
    </div>
}