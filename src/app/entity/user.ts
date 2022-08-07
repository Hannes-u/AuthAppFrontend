import {Role} from "./role";

export class User {
  id!: String;
  username!: String;
  email!: String;
  password!: String;
  roles!: Role[];
}
