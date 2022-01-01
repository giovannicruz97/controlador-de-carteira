import { Type } from '../../../entities/Type';
import FinancialAsset from "../../../entities/FinancialAsset";
import FinancialAssetRepository from "../../../repositories/FinancialAssetRepository";

export default class FinancialAssetRepositoryInMemory implements FinancialAssetRepository {
    private financialAssets: FinancialAsset[];

    public constructor() {
        this.financialAssets = [
            new FinancialAsset({ name: 'IVVB11', ticker: 'ivvb11', price: 297.75, type: Type.ETF }),
            new FinancialAsset({ name: 'BOVA11', ticker: 'bova11', price: 100.8, type: Type.ETF }),
            new FinancialAsset({
                name: 'CLUBEDOVALOR DEEP VALUE INVESTING FICFIA', ticker: 'cdv', price: 1, type: Type.STOCK_INVESTIMENT_FUND
            }),
            new FinancialAsset({ name: 'MXRF11', ticker: 'mxrf11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 10.01 }),
            new FinancialAsset({ name: 'IBFF11', ticker: 'ibff11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 59.76 }),
            new FinancialAsset({ name: 'CVBI11', ticker: 'cvbi11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 102.25 }),
            new FinancialAsset({ name: 'RBVA11 ', ticker: 'rbva11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 102.49 }),
            new FinancialAsset({ name: 'RBRY11 ', ticker: 'rbry11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 104.60 }),
            new FinancialAsset({ name: 'RNGO11', ticker: 'rngo11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 52.97 }),
            new FinancialAsset({ name: 'XPCM11', ticker: 'xpcm11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 22.23 }),
            new FinancialAsset({ name: 'XPPR11', ticker: 'xppr11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 67.50 }),
            new FinancialAsset({ name: 'OULG11', ticker: 'oulg11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 57.80 }),
            new FinancialAsset({ name: 'FEXC11', ticker: 'fexc11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 89 }),
            new FinancialAsset({ name: 'OUFF11', ticker: 'ouff11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 72.25 }),
            new FinancialAsset({ name: 'BRCR11', ticker: 'brcr11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 72.69 }),
            new FinancialAsset({ name: 'RECT11', ticker: 'rect11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 73.51 }),
            new FinancialAsset({ name: 'XPCI11', ticker: 'xpci11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 96.81 }),
            new FinancialAsset({ name: 'VGIR11', ticker: 'vgir11', type: Type.REAL_ESTATE_INVESTIMENT_FUND, price: 98.70 }),
        ];
    }

    public async getByTicker({ ticker }: { ticker: string; }): Promise<FinancialAsset> {
        const financialAsset = this.financialAssets.find(financialAsset => financialAsset.getTicker() === ticker);
        if (!financialAsset) throw new Error(`Financial asset not find by ticker ${ticker}`);
        return financialAsset;
    }
}