import { Operation } from '../entities/Operation';
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

    public async execute({ assets, contribution }: RebalancePortfolioInput): Promise<RebalancePortfolioOutput[]> {
        const products = await Promise.all(assets.map(async product => new Product({
            financialAsset: await this.financialAssetRepository.getByTicker({ ticker: product.ticker, url: product.url }),
            currentQuantity: product.currentQuantity,
            targetAllocationPercentage: product.targetAllocationPercentage
        })));
        const portfolio = new Portfolio({ products });
        return portfolio.calculateRebalancing({ contribution });
    }
}