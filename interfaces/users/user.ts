import { UserAuthPassword } from "./userAuthPassword";
import { BaseEntity } from "../baseEntity";
import {UserProfileImage} from "@/interfaces/users/userProfileImage";

export interface User extends BaseEntity {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  bio: string;
  userAuthPassword: UserAuthPassword | null;
  userProfileImage: UserProfileImage | null;
}
