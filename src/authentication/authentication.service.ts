import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginBody, SignupBody } from "./Request";
import { TokenService } from "src/common/services/token.service";
import { BcryptService } from "src/common/services/bcrypt.service";
import { Successfully } from "src/common/model/response.model";
import { UserService } from "src/users/user.service";
import { Users } from "src/entities";
import * as _ from "lodash";
import { UniversitiesService } from "src/universities/universities.service";
import { UserRole } from "src/common/constant";

@Injectable()
export class AuthenticationService {

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private bcryptService: BcryptService,
    private universitiesService: UniversitiesService
  ) { }

  public async login(body: LoginBody) {
    const userByEmail = await this.userService.findUserByEmail(body.email);

    if (!userByEmail) {
      throw new BadRequestException(["Email or Password is invalid!"])
    }

    const isValidPassword = await this.bcryptService.comparePassword(body.password, userByEmail.password);
    if (!isValidPassword) {
      throw new BadRequestException(["Email or Password is invalid!"])
    }

    const currentToken = await this.tokenService.getToken(userByEmail);

    if (!currentToken) {
      const newToken = await this.tokenService.create(userByEmail);
      return new Successfully({ token: newToken.token })
    }

    if (!currentToken.isExpried) {
      return new Successfully({ token: currentToken.token })
    }
    await this.tokenService.disableTokens(userByEmail);
    const newToken = await this.tokenService.create(userByEmail);

    return new Successfully({ token: newToken.token });
  }

  public async logout(user: Users) {
    const {token, isExpried} = await this.tokenService.getToken(user)
    if(_.isEmpty(token)) {
      return new Successfully()
    }

    if(isExpried) return new Successfully();
    
    await this.tokenService.expiredToken(token)

    return new Successfully();
  }

  public async signup(user: SignupBody) {
    const { universityId, ...data } = user
    const [university, userExist] = await Promise.all([
      this.universitiesService.findById(universityId),
      this.userService.findUserByEmail(data.email)
    ])
    if (!_.isEmpty(userExist)) {
      throw new BadRequestException(["User is already"])
    }

    if (_.isEmpty(university)) {
      throw new BadRequestException(["University is not exist"])
    }

    const savedUser = await this.userService.createUser({
      ...data,
      university,
      role: UserRole.STUDENT
    })

    return new Successfully({
      ..._.omit(savedUser, "password")
    })
  }
}