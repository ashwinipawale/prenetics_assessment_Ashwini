import {Entity, Column, OneToOne, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import {Customer} from "../model/Customer";

class GeneticResultJson {
    gene_id     : string = "";
    protein_id  : string = "";
}

@Entity({ name: 'pnttest.genetic_result' })
export class GeneticResult {
    @PrimaryGeneratedColumn()
    test_id: number = 0;

    @Column('int4')
    customer_id: Customer = new Customer();
  
    @Column({type : "simple-json", nullable: true})
    genetic_result: GeneticResultJson = { gene_id : "", protein_id : ""};

    @Column({ type: "timestamptz", default: "now()" })
    test_date: Date = new Date();
}
