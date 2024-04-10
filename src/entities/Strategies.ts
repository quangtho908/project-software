import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Applicants } from "./Applicants";
import { Universities } from "./Universities";
import { Users } from "./Users";

@Index("strategies_pkey", ["id"], { unique: true })
@Entity("strategies", { schema: "public" })
export class Strategies {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("timestamp with time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Applicants, (applicants) => applicants.strategy)
  applicants: Applicants[];

  @ManyToMany(() => Universities, (universities) => universities.strategies)
  @JoinTable({
    name: "stragtegies_universities",
    joinColumns: [{ name: "strategy", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "university", referencedColumnName: "id" }],
    schema: "public",
  })
  universities: Universities[];

  @ManyToOne(() => Users, (users) => users.strategies)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: Users;
}
