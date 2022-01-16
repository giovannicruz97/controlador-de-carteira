import Table from 'cli-table';
import RebalancePortfolioController from '../interface_adapters/controllers/RebalancePortfolioController';
import FinancialAssetRepositoryInMemory from '../interface_adapters/repositories/memory/FinancialAssetRepositoryInMemory';
import products from '../products.json';
import RebalancePortfolio from '../use_cases/RebalancePortfolio';

(async () => {
    const table = new Table({
        head: ['Ticker', 'Target (%)', 'Current (%)', 'Quantity', 'Operation', 'Operation Cost']
    });
    const contribution = Number(process.argv[2]);
    const financialAssetRepository = new FinancialAssetRepositoryInMemory();
    const useCase = new RebalancePortfolio({ financialAssetRepository });
    const rebalancePortfolio = new RebalancePortfolioController({ useCase });
    const rebalancing = await rebalancePortfolio.handle({ assets: products, contribution });
    rebalancing?.forEach(product => {
        const values = Object.values(product);
        values[0] = values[0].toUpperCase();
        values[5] = `R$${values[5].toFixed(2)}`;
        table.push(values);
    });
    console.log(table.toString());
})()
