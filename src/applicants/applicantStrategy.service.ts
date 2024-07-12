import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicantStatus } from "src/common/constant";
import { Applicants, Strategies, Users } from "src/entities";
import { ApplicantsStrategies } from "src/entities/ApplicantsStrategies";
import { Repository } from "typeorm";
import { GetApplicantParam, GetStrategiesParams, UpdateStatusApplyBody } from "./Request";
import * as _ from "lodash";
import { Successfully } from "src/common/model/response.model";

@Injectable()
export class ApplicantStrategyService {
  constructor(
    @InjectRepository(ApplicantsStrategies)
    private appliStraRepo: Repository<ApplicantsStrategies>
  ) { }

  public find(strategy: number, applicant: number) {
    return this.appliStraRepo.findOne({
      where: { strategy, applicant },
      relations: { applicant2: true, strategy2: true }
    });
  }


  public getStrategies(params: GetStrategiesParams, user: Users) {
    return this.appliStraRepo
    .createQueryBuilder("as")
    .leftJoin("as.applicant2", "a")
    .leftJoinAndSelect("as.strategy2", "s")
    .where("a.user_id = :userId", {userId: user.id})
    .andWhere("as.status IN (:...statuses)", {
      statuses: _.isEmpty(params.status) ? [ApplicantStatus.WAITING_ACCEPT, ApplicantStatus.ACCEPTED]: [params.status]
    })
    .getRawMany()
  }


  public findOneBy(data: GetApplicantParam) {
    return this.appliStraRepo.findOne({
      where: data,
      relations: { applicant2: true, strategy2: true }
    });
  }

  public findManyBy(data: GetApplicantParam) {
    return this.appliStraRepo.find({
      where: data,
      relations: { applicant2: true, strategy2: true }
    })
  }

  public create(strategies: Strategies, applicants: Applicants) {
    const newAppliStra = this.appliStraRepo.create({
      strategy: strategies.id,
      applicant: applicants.id
    })

    return this.appliStraRepo.save(newAppliStra)
  }

  public async accept(data: UpdateStatusApplyBody) {
    const appliStra = await this.find(data.strategy, data.id);
    if (_.isEmpty(appliStra)) {
      throw new BadRequestException(["Strategy is not exist"])
    }

    if(appliStra.status === ApplicantStatus.CANCELED) { 
      throw new BadRequestException(["This applicant is rejected"])
    }

    appliStra.status = ApplicantStatus.ACCEPTED;
    await this.appliStraRepo.save(appliStra);
    return new Successfully();
  }

  public async reject(data: UpdateStatusApplyBody) {
    const appliStra = await this.find(data.strategy, data.id);
    if (_.isEmpty(appliStra)) {
      throw new BadRequestException("Strategy is not exist")
    }

    appliStra.status = ApplicantStatus.CANCELED;
    await this.appliStraRepo.save(appliStra);
    return new Successfully();
  }
}