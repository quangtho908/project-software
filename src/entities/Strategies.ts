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
import { ApplicantsStrategies } from "./ApplicantsStrategies";
import { Universities } from "./Universities";
import { Users } from "./Users";

@Index("strategies_pkey", ["id"], { unique: true })
@Entity("strategies", { schema: "public" })
export class Strategies {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description" })
  description: string;

  @Column("timestamp with time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("text", { name: "place" })
  place: string;

  @Column("timestamp with time zone", { name: "start_at" })
  startAt: Date;

  @Column("timestamp with time zone", { name: "end_at" })
  endAt: Date;

  @Column("text", { name: "image", nullable: true })
  image: string | null;

  @Column("integer", { name: "status", default: () => "0" })
  status: number;

  @OneToMany(
    () => ApplicantsStrategies,
    (applicantsStrategies) => applicantsStrategies.strategy2
  )
  applicantsStrategies: ApplicantsStrategies[];

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
