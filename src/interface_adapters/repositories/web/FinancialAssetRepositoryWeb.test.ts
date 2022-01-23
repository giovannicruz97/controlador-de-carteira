import Axios from "../../../drivers/Axios";
import Cheerio from '../../../drivers/Cheerio';
import FinancialAsset from "../../../entities/FinancialAsset";
import { Type } from "../../../entities/Type";
import FinancialAssetRepositoryWeb from "./FinancialAssetRepositoryWeb";

let financialAssetRepositoryWeb: FinancialAssetRepositoryWeb;
beforeAll(() => {
    financialAssetRepositoryWeb = new FinancialAssetRepositoryWeb({
        httpClient: Axios,
        scraper: Cheerio,
    })
});


test('Get ETF from Status Invest', async () => {
    const expected = new FinancialAsset({
        name: 'ISHARES S&P 500 FDO INV COTAS FDO INDICE',
        ticker: 'ivvb11',
        price: 260.80,
        type: Type.ETF,
    });
    const ivvb11 = await financialAssetRepositoryWeb.getByTicker({
        ticker: 'ivvb11',
        url: 'etfs/ivvb11'
    });
    expect(ivvb11.getName()).toBe(expected.getName());
    expect(ivvb11.getPrice()).toBe(expected.getPrice());
    expect(ivvb11.getType()).toBe(expected.getType());
});

test('Get Real Estate Investment fund from Status Invest', async () => {
    const expected = new FinancialAsset({
        name: 'FII UBSOFFIC',
        ticker: 'rect11',
        price: 71.93,
        type: Type.REAL_ESTATE_INVESTIMENT_FUND,
    });
    const rect11 = await financialAssetRepositoryWeb.getByTicker({
        ticker: 'rect11',
        url: 'fundos-imobiliarios/rect11'
    });
    expect(rect11.getName()).toBe(expected.getName());
    expect(rect11.getPrice()).toBe(expected.getPrice());
    expect(rect11.getType()).toBe(expected.getType());
});

test('Get Stock Investment Fund from Status Invest', async () => {
    const expected = new FinancialAsset({
        name: 'CLUBEDOVALOR DEEP VALUE INVESTING FIC FIA',
        ticker: 'cdv',
        price: 1,
        type: Type.STOCK_INVESTIMENT_FUND,
    });
    const cdv = await financialAssetRepositoryWeb.getByTicker({
        ticker: 'cdv',
        url: 'fundos-de-investimento/clubedovalor-deep-value-investing-fic-fia'
    });
    expect(cdv.getName()).toBe(expected.getName());
    expect(cdv.getPrice()).toBe(expected.getPrice());
    expect(cdv.getType()).toBe(expected.getType());
});

test('Get Stock from Status Invest', async () => {
    const expected = new FinancialAsset({
        name: 'ITAUSA INVESTIMENTOS ITAU S.A.',
        ticker: 'itsa4',
        price: 9.56,
        type: Type.STOCK,
    });
    const itsa4 = await financialAssetRepositoryWeb.getByTicker({
        ticker: 'itsa4',
        url: 'acoes/itsa4'
    });
    expect(itsa4.getName()).toBe(expected.getName());
    expect(itsa4.getPrice()).toBe(expected.getPrice());
    expect(itsa4.getType()).toBe(expected.getType());
});