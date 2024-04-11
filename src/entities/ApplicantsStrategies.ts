import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Applicants } from "./Applicants";
import { Strategies } from "./Strategies";

@Index("applicants_strategies_pkey", ["applicant", "strategy"], {
  unique: true,
})
@Entity("applicants_strategies", { schema: "public" })
export class ApplicantsStrategies {
  @Column("integer", { primary: true, name: "applicant" })
  applicant: number;

  @Column("integer", { primary: true, name: "strategy" })
  strategy: number;

  @Column("integer", { name: "status", default: () => "0" })
  status: number;

  @ManyToOne(
    () => Applicants,
    (applicants) => applicants.applicantsStrategies,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "applicant", referencedColumnName: "id" }])
  applicant2: Applicants;

  @ManyToOne(
    () => Strategies,
    (strategies) => strategies.applicantsStrategies,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "strategy", referencedColumnName: "id" }])
  strategy2: Strategies;
}
