"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMemoTransaction = exports.onBundleResult = exports.build_bundle = void 0;
var web3_js_1 = require("@solana/web3.js");
var types_1 = require("jito-ts/dist/sdk/block-engine/types");
var utils_1 = require("jito-ts/dist/sdk/block-engine/utils");
var constants_1 = require("../constants");
var utils_2 = require("../utils");
var MEMO_PROGRAM_ID = "Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo";
function build_bundle(search, 
// accounts: PublicKey[],
// regions: string[],
bundleTransactionLimit, lp_ix, swap_ix, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var jito_auth_keypair, feeWallet, _tipAccount, tipAccount, message1, message2, bund, resp, maybeBundle, response_bund, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jito_auth_keypair = constants_1.ENV.JITO_AUTH_KEYPAIR;
                    feeWallet = (0, utils_2.getKeypairFromEnv)();
                    return [4 /*yield*/, search.getTipAccounts()];
                case 1:
                    _tipAccount = (_a.sent())[0];
                    console.log("tip account:", _tipAccount);
                    tipAccount = new web3_js_1.PublicKey(_tipAccount);
                    message1 = "First TXN";
                    message2 = "Second TXN";
                    bund = new types_1.Bundle([], bundleTransactionLimit);
                    return [4 /*yield*/, connection.getLatestBlockhash("processed")];
                case 2:
                    resp = _a.sent();
                    // bund.addTransactions(lp_ix, swap_ix);
                    bund.addTransactions(lp_ix);
                    bund.addTransactions(swap_ix);
                    maybeBundle = bund.addTipTx(feeWallet, 10000000, tipAccount, resp.blockhash);
                    if ((0, utils_1.isError)(maybeBundle)) {
                        throw maybeBundle;
                    }
                    console.log();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, search.sendBundle(maybeBundle)];
                case 4:
                    response_bund = _a.sent();
                    console.log("response_bund:", response_bund);
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.error("error sending bundle:", e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, maybeBundle];
            }
        });
    });
}
exports.build_bundle = build_bundle;
var onBundleResult = function (c) {
    var first = 0;
    var isResolved = false;
    return new Promise(function (resolve) {
        // Set a timeout to reject the promise if no bundle is accepted within 5 seconds
        setTimeout(function () {
            resolve(first);
            isResolved = true;
        }, 30000);
        c.onBundleResult(function (result) {
            var _a;
            if (isResolved)
                return first;
            // clearTimeout(timeout); // Clear the timeout if a bundle is accepted
            var bundleId = result.bundleId;
            var isAccepted = result.accepted;
            var isRejected = result.rejected;
            if (isResolved == false) {
                if (isAccepted) {
                    console.log("bundle accepted, ID:", result.bundleId, " Slot: ", (_a = result.accepted) === null || _a === void 0 ? void 0 : _a.slot);
                    first += 1;
                    isResolved = true;
                    resolve(first); // Resolve with 'first' when a bundle is accepted
                }
                if (isRejected) {
                    console.log("bundle is Rejected:", result);
                    // Do not resolve or reject the promise here
                }
            }
        }, function (e) {
            console.error(e);
            // Do not reject the promise here
        });
    });
};
exports.onBundleResult = onBundleResult;
var buildMemoTransaction = function (keypair, recentBlockhash, message) {
    var ix = new web3_js_1.TransactionInstruction({
        keys: [
            {
                pubkey: keypair.publicKey,
                isSigner: true,
                isWritable: true,
            },
        ],
        programId: new web3_js_1.PublicKey(MEMO_PROGRAM_ID),
        data: Buffer.from(message),
    });
    var instructions = [ix];
    var messageV0 = new web3_js_1.TransactionMessage({
        payerKey: keypair.publicKey,
        recentBlockhash: recentBlockhash,
        instructions: instructions,
    }).compileToV0Message();
    var tx = new web3_js_1.VersionedTransaction(messageV0);
    tx.sign([keypair]);
    return tx;
};
exports.buildMemoTransaction = buildMemoTransaction;
