import FinancialAsset from "../entities/FinancialAsset";

export default interface FinancialAssetRepository {
    getByTicker({ ticker }: { ticker: string }): Promise<FinancialAsset>
};