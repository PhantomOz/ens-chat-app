import { login } from "@/context/ContractActions";
import { useDapp } from "@/hooks/useDapp";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useState } from "react";

export default function Login() {
    const { dispatch } = useDapp();
    const { address } = useWeb3ModalAccount();
    const [ensName, setEnsName] = useState<string>("");

    const handleLogin = async () => {
        const res = await login(ensName, `${address}`);
        dispatch({ type: 'login', payload: { auth: res, ensName } });
    }
    return <div className="border-b border-gray-300 my-3 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <p>Ens Name</p>
        <input className="my-3 bg-gradient-to-b from-zinc-200 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl" type="text" name="ensname" placeholder="favour.chat" value={ensName} onChange={(e) => setEnsName(e.target.value)} />
        <div>
            <button disabled={ensName.length < 1 || address === undefined} className="bg-gradient-to-b from-blue-600 p-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-blue-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl" onClick={handleLogin}>Login <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
            </span></button>
        </div>
    </div>
}