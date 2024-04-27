"use client";

import { useEffect, useState } from "react";
import { useDapp } from "./useDapp";
import { getUserCID } from "@/context/ContractActions";

export default function useHandleCids(): number[] {
    const { state } = useDapp();
    const [cids, setCids] = useState<number[]>([]);
    useEffect(() => {
        const getCid = async () => {
            const res = await getUserCID(state.user.ensname);
            console.log(res);
            setCids(res);
        }
        getCid();
    }, [state.user.ensname]);
    return cids;
}