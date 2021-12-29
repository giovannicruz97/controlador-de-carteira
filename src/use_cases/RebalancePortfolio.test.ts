import products from '../products.json';
import RebalancePortfolio from "./RebalancePortfolio";
import Product from '../entities/Product';
import Portfolio from "../entities/Portfolio";
import FinancialAssetRepository from "../repositories/FinancialAssetRepository";
import FinancialAssetRepositoryInMemory from "../interface_adapters/repositories/memory/FinancialAssetRepositoryInMemory";

let financialAssetRepository: FinancialAssetRepository;
beforeAll(() => {
    financialAssetRepository = new FinancialAssetRepositoryInMemory();
})

test('Calculate difference between products and return rebalance list', async () => {
    const useCase = new RebalancePortfolio({ financialAssetRepository });
    const response = await useCase.execute({ rebalancePortfolioInput: products });
    const expected = [{ "difference": 74.42101799589966, "operation": "sell", "ticker": "ivvb11" }, { "difference": 25.578982004100332, "operation": "buy", "ticker": "bova11" }];
    expect(response).toEqual(expected);
});