import { UserAuthPassword } from "./userAuthPassword";
import { BaseEntity } from "../baseEntity";

export interface User extends BaseEntity {
  email: string;
  username: string;
  personalName: string;
  isVerified: boolean;
  userAuthPassword: UserAuthPassword | null;
}
