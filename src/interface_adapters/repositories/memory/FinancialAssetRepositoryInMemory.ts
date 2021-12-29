import { Type } from '../../../entities/Type';
import FinancialAsset from "../../../entities/FinancialAsset";
import FinancialAssetRepository from "../../../repositories/FinancialAssetRepository";

export default class FinancialAssetRepositoryInMemory implements FinancialAssetRepository {
    private financialAssets: FinancialAsset[];

    public constructor() {
        this.financialAssets = [
            new FinancialAsset({ name: 'IVVB11', ticker: 'ivvb11', price: 294.03, type: Type.ETF }),
            new FinancialAsset({ name: 'BOVA11', ticker: 'bova11', price: 101.06, type: Type.ETF })
        ];
    }

    public async getByTicker({ ticker }: { ticker: string; }): Promise<FinancialAsset> {
        const financialAsset = this.financialAssets.find(financialAsset => financialAsset.getTicker() === ticker);
        if (!financialAsset) throw new Error(`Financial asset not find by ticker ${ticker}`);
        return financialAsset;
    }
}