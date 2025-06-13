import {BaseUserEntity} from "../baseUserEntity";

export interface UserAuthPassword extends BaseUserEntity {
  passwordHash: string;
  salt: string;
}
