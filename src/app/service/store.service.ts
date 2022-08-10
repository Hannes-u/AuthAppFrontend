import { Injectable } from '@angular/core';
import {User} from "../entity/user";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  userInformation: User;
  allUserInformation: User[];
  isAdmin = false;

  constructor() { }

  setUserInformation(user: User): void{
    this.userInformation = user;
  }

  setAllUserInformation(user: User[]): void{
    this.allUserInformation = user;
  }

  getIsAdmin(): boolean{
    return this.isAdmin;
  }

  setIsAdmin(isAdmin: boolean): void{
    this.isAdmin = isAdmin;
  }

  getUserInformation(): User{
    return this.userInformation;
  }

  getAllUserInformation(): User[]{
    return this.allUserInformation;
  }
}
