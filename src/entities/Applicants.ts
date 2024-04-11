import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Universities } from "./Universities";
import { Users } from "./Users";
import { ApplicantsStrategies } from "./ApplicantsStrategies";

@Index("applicants_pkey", ["id"], { unique: true })
@Entity("applicants", { schema: "public" })
export class Applicants {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "full_name" })
  fullName: string;

  @Column("text", { name: "email" })
  email: string;

  @Column("timestamp with time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("text", { name: "mssv" })
  mssv: string;

  @Column("text", { name: "skill" })
  skill: string;

  @ManyToOne(() => Universities, (universities) => universities.applicants, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "university", referencedColumnName: "id" }])
  university: Universities;

  @ManyToOne(() => Users, (users) => users.applicants)
  @JoinColumn([{ name: "updated_by", referencedColumnName: "id" }])
  updatedBy: Users;

  @OneToMany(
    () => ApplicantsStrategies,
    (applicantsStrategies) => applicantsStrategies.applicant2
  )
  applicantsStrategies: ApplicantsStrategies[];
}
