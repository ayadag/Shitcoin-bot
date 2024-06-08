"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = exports.jitoTipAccount = exports.feeLevel = exports.makeTxVersion = exports.addLookupTableInfo = exports.RPC_ENDPOINT_DEV = exports.RPC_ENDPOINT_MAIN = void 0;
var dotenv_1 = require("dotenv");
var anchor_1 = require("@project-serum/anchor");
var bytes_1 = require("@project-serum/anchor/dist/cjs/utils/bytes");
var raydium_sdk_1 = require("@raydium-io/raydium-sdk");
(0, dotenv_1.config)();
function getKeypairFromStr(str) {
    try {
        return anchor_1.web3.Keypair.fromSecretKey(Uint8Array.from(bytes_1.bs58.decode(str)));
    }
    catch (error) {
        return null;
    }
}
///////////ayad//////////////
exports.RPC_ENDPOINT_MAIN = "https://indulgent-wandering-wave.solana-mainnet.quiknode.pro/a2bbf908f0bef4ff590544046ccc4f1b711b6d32/";
// export const RPC_ENDPOINT_DEV = "https://white-proportionate-putty.solana-devnet.quiknode.pro/11132715a936f8adb03c940c627d6c0b9369d9e6/"
// export const RPC_ENDPOINT_DEV = "https://api.devnet.solana.com/"
exports.RPC_ENDPOINT_DEV = "https://api.devnet.solana.com";
exports.addLookupTableInfo = raydium_sdk_1.LOOKUP_TABLE_CACHE; // only mainnet. other = undefined
exports.makeTxVersion = raydium_sdk_1.TxVersion.V0; // LEGACY
// export const RPC_ENDPOINT_MAIN = "http://127.0.0.1:8899"
// export const RPC_ENDPOINT_DEV = "http://127.0.0.1:8899"
var PINATA_API_kEY = process.env.PINATA_API_KEY;
var PINATA_DOMAIN = process.env.PINATA_DOMAIN;
var PINATA_API_SECRET_KEY = process.env.PINATA_API_SECRET_KEY;
var IN_PRODUCTION = process.env.PRODUCTION == '1' ? true : false;
var COMPUTE_UNIT_PRICE = 1800000; // default: 200_000
var JITO_AUTH_KEYPAIR = getKeypairFromStr(process.env.JITO_AUTH_KEYPAIR);
var JITO_BLOCK_ENGINE_URL = process.env.JITO_BLOCK_ENGINE_URL;
if (!JITO_AUTH_KEYPAIR || !JITO_BLOCK_ENGINE_URL) {
    throw "Some ENV values not found";
}
exports.feeLevel = 18;
exports.jitoTipAccount = new anchor_1.web3.PublicKey("2d9CGsG2SnDveJkdszyepjMyQh64pQiFgLFXR7kmZYQo");
exports.ENV = {
    PINATA_API_kEY: PINATA_API_kEY,
    PINATA_API_SECRET_KEY: PINATA_API_SECRET_KEY,
    PINATA_DOMAIN: PINATA_DOMAIN,
    IN_PRODUCTION: IN_PRODUCTION,
    COMPUTE_UNIT_PRICE: COMPUTE_UNIT_PRICE,
    JITO_AUTH_KEYPAIR: JITO_AUTH_KEYPAIR,
    JITO_BLOCK_ENGINE_URL: JITO_BLOCK_ENGINE_URL
};
