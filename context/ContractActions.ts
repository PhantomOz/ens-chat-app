import { getChatContract, getENSContract } from "@/constants/contracts";
import { getProvider, readOnlyProvider } from "@/constants/providers";
import { AddressLike } from "ethers";
import { ContractRunner, Eip1193Provider } from "ethers";

export async function login(
  _ensName: string,
  address: AddressLike
): Promise<boolean> {
  const contract = getChatContract(readOnlyProvider);
  try {
    const hasEns = await contract.hasEns(_ensName, address);
    return hasEns;
  } catch (e: any) {
    console.log(e.message);
    return false;
  }
}

export async function register(
  _ensName: string,
  imageUri: string,
  signer: ContractRunner
): Promise<boolean> {
  console.log(_ensName, imageUri);
  const contract = getENSContract(signer);
  try {
    const res = await contract.registerEnsName(_ensName, imageUri);
    await res.wait();
    console.log(res);
    return true;
  } catch (e: any) {
    console.log(e);
    return false;
  }
}

export async function getUserDetails(_ensName: string): Promise<any> {
  const contract = getENSContract(readOnlyProvider);
  try {
    const res = await contract.getEnsDetails(_ensName);
    await res;
    return res;
  } catch (e: any) {
    console.log(e);
    return null;
  }
}

export async function getUserCID(_ensName: string): Promise<any> {
  const contract = getChatContract(readOnlyProvider);
  try {
    const hasEns = await contract.getUserConversationIds(_ensName);
    return hasEns;
  } catch (e: any) {
    console.log(e.message);
    return false;
  }
}

export async function getCIDParticipants(_cid: number): Promise<any> {
  const contract = getChatContract(readOnlyProvider);
  try {
    const participants = await contract.getParicipant(_cid);
    return participants;
  } catch (e: any) {
    console.log(e.message);
    return false;
  }
}

export async function getChatMessages(_author: string, _reciever: string) {
  const contract = getChatContract(readOnlyProvider);
  try {
    const participants = await contract.getMessages(_author, _reciever);
    return participants;
  } catch (e: any) {
    console.log(e.message);
    return false;
  }
}

export async function sendMessage(
  _author: string,
  _reciever: string,
  _message: string,
  _fileUrl: string,
  signer: ContractRunner
) {
  const contract = getChatContract(signer);
  try {
    const res = await contract.sendMessage(
      _author,
      _reciever,
      _message,
      _fileUrl
    );
    await res.wait();
    console.log(res);
    return true;
  } catch (e: any) {
    console.log(e);
    return false;
  }
}
