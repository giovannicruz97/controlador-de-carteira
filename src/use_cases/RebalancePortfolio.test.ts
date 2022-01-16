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
        assets: [{
            ticker: "ivvb11",
            currentQuantity: 10,
            targetAllocationPercentage: 50
        },
        {
            ticker: 'bova11',
            currentQuantity: 10,
            targetAllocationPercentage: 50
        }],
        contribution: 0,
    });
    const expected = [
        {
            ticker: 'bova11',
            currentAllocationPercentage: 26.449750721595382,
            operation: Operation.BUY,
            quantity: 8,
            operationCost: 806.4,
            targetAllocationPercentage: 50
        },
        {
            ticker: 'ivvb11',
            currentAllocationPercentage: 73.55024927840462,
            operation: Operation.SELL,
            quantity: 9,
            operationCost: 2522.7000000000003,
            targetAllocationPercentage: 50,
        }
    ];
    expect(response).toEqual(expected);
});