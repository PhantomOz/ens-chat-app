'use client'

import { getCIDParticipants, getChatMessages, getUserDetails } from "@/context/ContractActions";
import { messageDetails, userDetails } from "@/utils/interfaces";
import { useEffect, useState } from "react"
import { useDapp } from "./useDapp";

export default function useParticipantDetails(id: number): { details: userDetails, messages: messageDetails[] } {
    const { state } = useDapp();
    const [details, setDetails] = useState<userDetails>({ address: "", imageUri: "", ensname: "" });
    const [messages, setMessages] = useState<messageDetails[]>([]);
    useEffect(() => {
        async function getMessages(_ensName: string) {
            const res = await getChatMessages(state.user.ensname, _ensName);
            setMessages(res);
        }
        async function getDetails(_ensName: string) {
            const res = await getUserDetails(_ensName);
            setDetails({ address: res._owner, imageUri: res._imageURI, ensname: _ensName });
        }
        async function getPaticipants() {
            const res = await getCIDParticipants(id);
            console.log(res);
            const _ensName = res.find((x: string) => x !== state.user.ensname);
            await getDetails(_ensName);
            await getMessages(_ensName);
        }
        getPaticipants();
    }, [id, state.user.ensname]);
    return { details, messages };
}