import { Entity, Column, PrimaryColumn, JoinColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Account } from "./Account";

@Entity("Transactions")
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column() 
  debitedAccountId: string;

  @Column()
  creditedAccountId: string;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "debitedAccountId" })
  debitedAccount: Account;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "creditedAccountId" })
  creditedAccount: Account;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}