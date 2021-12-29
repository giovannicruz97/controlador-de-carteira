import Portfolio from '../entities/Portfolio';
import Product from '../entities/Product';
import FinancialAssetRepository from '../repositories/FinancialAssetRepository';
import RebalancePortfolioInput from './dto/RebalancePortfolioInput';
import RebalancePortfolioOutput from './dto/RebalancePortfolioOutput';

export default class RebalancePortfolio {
    private financialAssetRepository: FinancialAssetRepository;

    public constructor({ financialAssetRepository }: { financialAssetRepository: FinancialAssetRepository }) {
        this.financialAssetRepository = financialAssetRepository;
    }

    public async execute({ rebalancePortfolioInput }: { rebalancePortfolioInput: RebalancePortfolioInput[] }): Promise<RebalancePortfolioOutput[]> {
        const products = await Promise.all(rebalancePortfolioInput.map(async product => new Product({
            financialAsset: await this.financialAssetRepository.getByTicker({ ticker: product.ticker }),
            currentQuantity: product.currentQuantity,
            desiredAllocationPercentage: product.desiredAllocationPercentage
        })));
        const portfolio = new Portfolio({ products });
        return portfolio.calculateRebalancing();
    }
}