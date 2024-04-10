import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Strategies } from "./Strategies";
import { Users } from "./Users";

@Index("applicants_pkey", ["id"], { unique: true })
@Entity("applicants", { schema: "public" })
export class Applicants {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "full_name" })
  fullName: string;

  @Column("text", { name: "email" })
  email: string;

  @Column("integer", { name: "university" })
  university: number;

  @Column("timestamp with time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("integer", { name: "status", default: () => "0" })
  status: number;

  @ManyToOne(() => Strategies, (strategies) => strategies.applicants)
  @JoinColumn([{ name: "strategy", referencedColumnName: "id" }])
  strategy: Strategies;

  @ManyToOne(() => Users, (users) => users.applicants)
  @JoinColumn([{ name: "updated_by", referencedColumnName: "id" }])
  updatedBy: Users;
}
