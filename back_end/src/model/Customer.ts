import {Entity, PrimaryGeneratedColumn, Column, Index} from "typeorm";

@Entity({ name: 'pnttest.customer_info' })
export class Customer {
  @Column('varchar', { length: 50 })
  first_name: string = "";

  @Column('varchar', { length: 50 })
  last_name: string = "";

  @PrimaryGeneratedColumn()
  customer_id: number = 0;

  @Index({unique: true})
  @Column('varchar', { length: 100 })
  email_id: string = "";

  @Column('text', { nullable: false})
  password: string = "";

  @Column({ type: "timestamptz", default: "now()" })
  dob: Date = new Date();

  @Column('varchar', { length: 8 })
  policy_code: string = "";

}
