import products from '../products.json';
import RebalancePortfolio from "./RebalancePortfolio";
import FinancialAssetRepository from "../repositories/FinancialAssetRepository";
import FinancialAssetRepositoryInMemory from "../interface_adapters/repositories/memory/FinancialAssetRepositoryInMemory";
import { Operation } from '../entities/Operation';

let financialAssetRepository: FinancialAssetRepository;
beforeAll(() => {
    financialAssetRepository = new FinancialAssetRepositoryInMemory();
})

test('Calculate currentAllocationPercentage between products and return rebalance list', async () => {
    const useCase = new RebalancePortfolio({ financialAssetRepository });
    const response = await useCase.execute({ rebalancePortfolioInput: products });
    const expected = [{ ticker: 'bova11', currentAllocationPercentage: 25.578982004100332, operation: Operation.BUY, quantity: 0, targetAllocationPercentage: 50 }];
    expect(expected).toEqual(response);
});