/// <reference types="@solana/web3.js" />
import { web3 } from '@project-serum/anchor';
import { TxVersion } from '@raydium-io/raydium-sdk';
export declare const RPC_ENDPOINT_MAIN = "https://indulgent-wandering-wave.solana-mainnet.quiknode.pro/a2bbf908f0bef4ff590544046ccc4f1b711b6d32/";
export declare const RPC_ENDPOINT_DEV = "https://api.devnet.solana.com";
export declare const addLookupTableInfo: import("@raydium-io/raydium-sdk").CacheLTA;
export declare const makeTxVersion = TxVersion['V0'];
export declare const feeLevel = 18;
export declare const jitoTipAccount: web3.PublicKey;
export declare const ENV: {
    PINATA_API_kEY: string;
    PINATA_API_SECRET_KEY: string;
    PINATA_DOMAIN: string;
    IN_PRODUCTION: boolean;
    COMPUTE_UNIT_PRICE: number;
    JITO_AUTH_KEYPAIR: web3.Keypair;
    JITO_BLOCK_ENGINE_URL: string;
};
