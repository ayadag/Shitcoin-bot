/// <reference types="jito-ts/node_modules/@solana/web3.js" />
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import { SearcherClient } from "jito-ts/dist/sdk/block-engine/searcher";
import { Bundle } from "jito-ts/dist/sdk/block-engine/types";
export declare function build_bundle(search: SearcherClient, bundleTransactionLimit: number, lp_ix: any, swap_ix: any, connection: Connection): Promise<Bundle>;
export declare const onBundleResult: (c: SearcherClient) => Promise<number>;
export declare const buildMemoTransaction: (keypair: Keypair, recentBlockhash: string, message: string) => VersionedTransaction;
