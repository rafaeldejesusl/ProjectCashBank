import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Account } from "./Account";

@Entity("Users")
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  accountId: string;

  @OneToOne(() => Account)
  @JoinColumn({ name: "accountId" })
  account: Account;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}