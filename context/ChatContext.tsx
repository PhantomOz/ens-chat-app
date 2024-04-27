'use client'

import { InitialState } from "@/utils/interfaces";
import { userAgent } from "next/server";
import { Dispatch, createContext, useMemo, useReducer } from "react";

function reducer(state: InitialState, action: any): InitialState {

    switch (action.type) {
        case 'login': {
            const isAuth = action.payload.auth;
            const ensName = action.payload.ensName;
            console.log(isAuth);
            return { ...state, isAuth: isAuth, user: { address: "", ensname: ensName, imageUri: "" } };
        }
        case 'register': {
            const res = action.payload.res;
            const _ensName = action.payload.ensName;
            const imageUri = action.payload.imageUri
            console.log(res);
            return { ...state, isAuth: res, user: { address: "", ensname: _ensName, imageUri: imageUri } };
        }
        case 'userdetails':
            const address = action.payload.address;
            const imageUri = action.payload.imageUri
            return { ...state, user: { address: address, ensname: state.user.ensname, imageUri: imageUri } }
        case 'setChat':
            return { ...state, messages: action.payload.messages, chatDetails: action.payload.details }
        case 'sendMessage':
            return { ...state, messages: [...state.messages, action.payload], }
        default:
            return state;
    }
}

const initialState: InitialState = {
    user: {
        ensname: "",
        imageUri: "",
        address: "",
    },
    messages: [],
    isAuth: false,
    chatDetails: {
        ensname: "",
        imageUri: "",
        address: "",
    }
}

export const DappContext = createContext<{ state: InitialState, dispatch: Dispatch<any> }>({ state: initialState, dispatch: () => null });


function ChatDappContextProvider({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);
    return (
        <DappContext.Provider value={contextValue}>
            {children}
        </DappContext.Provider>
    );
}

export default ChatDappContextProvider;