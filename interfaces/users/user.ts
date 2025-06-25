import { UserAuthPassword } from "./userAuthPassword";
import { BaseEntity } from "../baseEntity";

export interface User extends BaseEntity {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  userAuthPassword: UserAuthPassword | null;
}
