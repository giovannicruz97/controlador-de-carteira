import FinancialAsset from "../entities/FinancialAsset";
import { Type } from "../entities/Type";

export default interface FinancialAssetRepository {
    getByTicker({ ticker, url }: { ticker: string; url: string; }): Promise<FinancialAsset>
};