import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Universities } from "./Universities";
import { Users } from "./Users";
import { Strategies } from "./Strategies";

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

  @Column("integer", { name: "status", default: () => "0" })
  status: number;

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

  @ManyToMany(() => Strategies, (strategies) => strategies.applicants)
  @JoinTable({
    name: "applicants_strategies",
    joinColumns: [{ name: "applicant", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "strategy", referencedColumnName: "id" }],
    schema: "public",
  })
  strategies: Strategies[];
}
