import Table from 'cli-table';
import RebalancePortfolioController from '../interface_adapters/controllers/RebalancePortfolioController';
import FinancialAssetRepositoryInMemory from '../interface_adapters/repositories/memory/FinancialAssetRepositoryInMemory';
import products from '../products.json';
import RebalancePortfolio from '../use_cases/RebalancePortfolio';

(async () => {
    const table = new Table({
        head: ['Ticker', 'Target (%)', 'Current (%)', 'Quantity', 'Operation']
    });
    const financialAssetRepository = new FinancialAssetRepositoryInMemory();
    const useCase = new RebalancePortfolio({ financialAssetRepository });
    const rebalancePortfolio = new RebalancePortfolioController({ useCase });
    const rebalancing = await rebalancePortfolio.handle(products);
    rebalancing?.forEach(product => {
        const values = Object.values(product);
        values[0] = values[0].toUpperCase();
        values[1] = values[1].toFixed(2);
        values[2] = values[2].toFixed(2);
        table.push(values);
    });
    console.log(table.toString());
})()
