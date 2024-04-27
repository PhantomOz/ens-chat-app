export type userDetails = {
  ensname: string;
  imageUri: string;
  address: string;
};

export type messageDetails = {
  author: string;
  reciever: string;
  message: string;
  imageUrl: string;
  createdAt: string;
};

export type messageType = {
  author: string;
  receiver: string;
  message: string;
  imageUrl: string;
  createdAt: string;
};

export interface InitialState {
  user: userDetails;
  messages: messageType[];
  isAuth: boolean;
  chatDetails: userDetails;
}
