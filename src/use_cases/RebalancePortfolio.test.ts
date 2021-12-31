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
    const response = await useCase.execute({
        rebalancePortfolioInput: [{
            ticker: "ivvb11",
            currentQuantity: 10,
            targetAllocationPercentage: 50
        },
        {
            ticker: 'bova11',
            currentQuantity: 10,
            targetAllocationPercentage: 50
        }]
    });
    const expected = [
        {
            ticker: 'bova11',
            currentAllocationPercentage: 25.291682348513362,
            operation: Operation.BUY,
            quantity: 8,
            targetAllocationPercentage: 50
        },
        {
            ticker: 'ivvb11',
            currentAllocationPercentage: 74.70831765148664,
            operation: Operation.SELL,
            quantity: 9,
            targetAllocationPercentage: 50,
        }
    ];
    expect(expected).toEqual(response);
});