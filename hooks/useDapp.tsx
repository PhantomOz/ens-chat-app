'use client'

import { useContext } from "react";
import { DappContext } from "../context/ChatContext";

export function useDapp() {
    return useContext(DappContext);
}