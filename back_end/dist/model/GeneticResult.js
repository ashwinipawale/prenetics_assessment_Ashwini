"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Customer_1 = require("../model/Customer");
class GeneticResultJson {
    constructor() {
        this.gene_id = "";
        this.protein_id = "";
    }
}
let GeneticResult = class GeneticResult {
    constructor() {
        this.test_id = 0;
        this.customer_id = new Customer_1.Customer();
        this.genetic_result = { gene_id: "", protein_id: "" };
        this.test_date = new Date();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], GeneticResult.prototype, "test_id", void 0);
__decorate([
    typeorm_1.Column('int4')
], GeneticResult.prototype, "customer_id", void 0);
__decorate([
    typeorm_1.Column({ type: "simple-json", nullable: true })
], GeneticResult.prototype, "genetic_result", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamptz", default: "now()" })
], GeneticResult.prototype, "test_date", void 0);
GeneticResult = __decorate([
    typeorm_1.Entity({ name: 'pnttest.genetic_result' })
], GeneticResult);
exports.GeneticResult = GeneticResult;
