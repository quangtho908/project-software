import { Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";

@Injectable()
export class BcryptService {

  private saltRound = 8;

  public hashPassword(password: string): Promise<string> {
    return hash(password, this.saltRound);
  }

  public comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return compare(password, hashPassword);
  }
}