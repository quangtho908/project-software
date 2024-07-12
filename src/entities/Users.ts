import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Applicants } from "./Applicants";
import { Strategies } from "./Strategies";
import { Tokens } from "./Tokens";
import { Universities } from "./Universities";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "email" })
  email: string;

  @Column("text", { name: "full_name" })
  fullName: string;

  @Column("timestamp with time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("text", { name: "password" })
  password: string;

  @Column("integer", { name: "role" })
  role: number;

  @OneToMany(() => Applicants, (applicants) => applicants.updatedBy)
  applicants: Applicants[];

  @OneToMany(() => Applicants, (applicants) => applicants.user)
  joinStrategies: Applicants[];

  @OneToMany(() => Strategies, (strategies) => strategies.createdBy)
  strategies: Strategies[];

  @OneToMany(() => Tokens, (tokens) => tokens.user)
  tokens: Tokens[];

  @OneToMany(() => Universities, (universities) => universities.createdBy)
  universities: Universities[];

  @ManyToOne(() => Universities, (universities) => universities.users)
  @JoinColumn([{ name: "organization", referencedColumnName: "id" }])
  organization: Universities;
}
