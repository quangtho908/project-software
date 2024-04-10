import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Strategies } from "./Strategies";
import { Users } from "./Users";

@Index("universities_pkey", ["id"], { unique: true })
@Entity("universities", { schema: "public" })
export class Universities {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("timestamp with time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToMany(() => Strategies, (strategies) => strategies.universities)
  strategies: Strategies[];

  @ManyToOne(() => Users, (users) => users.universities)
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy: Users;

  @OneToMany(() => Users, (users) => users.organization)
  users: Users[];
}
