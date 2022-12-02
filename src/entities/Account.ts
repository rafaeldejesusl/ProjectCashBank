import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('Accounts')
export class Account {
  @PrimaryColumn()
  id: string;

  @Column()
  balance: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}