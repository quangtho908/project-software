import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Tokens, Users } from "src/entities";
import { Repository } from "typeorm";
import { Successfully } from "../model/response.model";
import { UserService } from "src/users/user.service";

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(Tokens)
    private tokenRepository: Repository<Tokens>
  ) { }

  private _isExpried(tokenData: Tokens) {
    const startTimeToken = tokenData.createdAt.getTime();

    if (((Date.now() - startTimeToken) / 1000) < 3600) {
      return { token: tokenData.token, isExpried: false };
    }

    return { token: tokenData.token, isExpried: true };
  }

  public create(user: Users) {
    const tokenString = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
      time: Date.now()
    });

    const token = this.tokenRepository.create({
      token: tokenString,
      createdAt: new Date(),
      user: user
    })

    return this.tokenRepository.save(token);
  }

  public async getToken(user: Users) {
    const tokenData = await this.tokenRepository.findOneBy({ user, isExpired: false });
    if (!tokenData) return null;
    return this._isExpried(tokenData);
  }

  public async getTokenByValue(token: string) {
    const tokenData = await this.tokenRepository.findOneBy({ token, isExpired: false });
    if (!tokenData) return null;
    return this._isExpried(tokenData);
  }

  public disableTokens(user: Users) {
    this.tokenRepository.update({ user }, { isExpired: true })
  }

  public async verifyToken(token: string) {
    try {
      const data: {
        id: number,
        email: string,
        role: number,
        time: number
      } = this.jwtService.verify(token);

      return data;

    } catch (error) {
      return null
    }
  }
}