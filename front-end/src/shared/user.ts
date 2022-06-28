export interface IUser {
  id: string;
  username: string;
  date_joined: Date;
  email_list: { id: number; email: string; main: boolean }[];
}
