import { User } from "./users/user";
import { BaseEntity } from "./baseEntity";

export interface BaseUserEntity extends BaseEntity {
  userId: string;
  user: User | null;
}
