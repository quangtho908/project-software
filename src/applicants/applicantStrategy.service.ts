import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { error } from "console";
import { ApplicantStatus } from "src/common/constant";
import { Applicants, Strategies } from "src/entities";
import { ApplicantsStrategies } from "src/entities/ApplicantsStrategies";
import { FindManyOptions, Repository } from "typeorm";
import { UpdateApplyParam } from "./Request";
import * as _ from "lodash";
import { Successfully } from "src/common/model/response.model";
import { GetApplicantParam } from "./Request/getApplicants.param";

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
    console.log(newAppliStra)

    return this.appliStraRepo.save(newAppliStra)
  }

  public async accept(data: UpdateApplyParam) {
    const appliStra = await this.find(data.strategy, data.id);
    if (_.isEmpty(appliStra)) {
      throw new BadRequestException("Strategy is not exist")
    }

    appliStra.status = ApplicantStatus.SCHOOL_ACCEPTED;
    await this.appliStraRepo.save(appliStra);
    return new Successfully();
  }

  public async remove(data: UpdateApplyParam) {
    const appliStra = await this.find(data.strategy, data.id);
    if (_.isEmpty(appliStra)) {
      throw new BadRequestException("Strategy is not exist")
    }

    await this.appliStraRepo.remove(appliStra);
    return new Successfully();
  }
}