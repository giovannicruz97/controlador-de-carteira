import Table from 'cli-table';
import Axios from '../drivers/Axios';
import Cheerio from '../drivers/Cheerio';
import RebalancePortfolioController from '../interface_adapters/controllers/RebalancePortfolioController';
import FinancialAssetRepositoryWeb from '../interface_adapters/repositories/web/FinancialAssetRepositoryWeb';
// import FinancialAssetRepositoryInMemory from '../interface_adapters/repositories/memory/FinancialAssetRepositoryInMemory';
import products from '../products.json';
import RebalancePortfolio from '../use_cases/RebalancePortfolio';

(async () => {
    const table = new Table({
        head: ['Name', 'Ticker', 'Target (%)', 'Current (%)', 'Quantity', 'Operation', 'Operation Cost']
    });
    const contribution = Number(process.argv[2]);
    // const financialAssetRepository = new FinancialAssetRepositoryInMemory();
    const financialAssetRepository = new FinancialAssetRepositoryWeb({ httpClient: Axios, scraper: Cheerio });
    const useCase = new RebalancePortfolio({ financialAssetRepository });
    const rebalancePortfolio = new RebalancePortfolioController({ useCase });
    const rebalancing = await rebalancePortfolio.handle({ assets: products, contribution });
    rebalancing?.forEach(product => {
        const values = Object.values(product);
        values[1] = values[1].toUpperCase();
        values[6] = `R$${values[6]}`;
        table.push(values);
    });
    console.log(table.toString());
})()
