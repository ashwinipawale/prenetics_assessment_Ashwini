"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// getting a Customer
const getCustomer = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // get the Customer id from the req
    let cust_id = req.params.cust_id;
    // let password: string = req.params.password;
    // get the post
    let result = yield axios_1.default.get(``);
    let customer = result.data;
    return res.status(200).json({
        message: customer
    });
});
// export default { getCustomer };
