"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Customer = class Customer {
    constructor() {
        this.first_name = "";
        this.last_name = "";
        this.customer_id = 0;
        this.email_id = "";
        this.password = "";
        this.dob = new Date();
        this.policy_code = "";
    }
};
__decorate([
    typeorm_1.Column('varchar', { length: 50 })
], Customer.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 50 })
], Customer.prototype, "last_name", void 0);
__decorate([
    typeorm_1.PrimaryGeneratedColumn()
], Customer.prototype, "customer_id", void 0);
__decorate([
    typeorm_1.Index({ unique: true }),
    typeorm_1.Column('varchar', { length: 100 })
], Customer.prototype, "email_id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: false })
], Customer.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamptz", default: "now()" })
], Customer.prototype, "dob", void 0);
__decorate([
    typeorm_1.Column('varchar', { length: 8 })
], Customer.prototype, "policy_code", void 0);
Customer = __decorate([
    typeorm_1.Entity({ name: 'pnttest.customer_info' })
], Customer);
exports.Customer = Customer;
