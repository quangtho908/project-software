import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("tokens_pkey", ["id"], { unique: true })
@Entity("tokens", { schema: "public" })
export class Tokens {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "token" })
  token: string;

  @Column("timestamp with time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp with time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "is_expired", default: () => "false" })
  isExpired: boolean;

  @ManyToOne(() => Users, (users) => users.tokens)
  @JoinColumn([{ name: "user", referencedColumnName: "id" }])
  user: Users;
}
