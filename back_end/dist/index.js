"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 4000;
var fs = require('fs');
var https = require('https');
var keyPath = process.env.PRIVATE_KEY_PATH;
const certPath = process.env.PRIVATE_CERT_PATH;
const privateKey = fs.readFileSync(keyPath, 'utf8');
const certificate = fs.readFileSync(certPath, 'utf8');
var credentials = { key: privateKey, cert: certificate };
var httpsServer = https.createServer(credentials, app_1.default);
httpsServer.listen(PORT, function () { console.log("Server started"); });
