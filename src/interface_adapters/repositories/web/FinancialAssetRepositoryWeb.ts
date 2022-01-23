import HttpClient from "../../../drivers/adapters/HttpClient";
import Scraper from "../../../drivers/adapters/Scraper";
import FinancialAsset from "../../../entities/FinancialAsset";
import { Type } from "../../../entities/Type";
import FinancialAssetRepository from "../../../repositories/FinancialAssetRepository";

export default class FinancialAssetRepositoryWeb implements FinancialAssetRepository {
    private httpClient: HttpClient;
    private scraper: Scraper;
    private assetsDictionary: any;

    public constructor({
        httpClient,
        scraper
    }: { httpClient: HttpClient; scraper: Scraper }) {
        this.httpClient = httpClient;
        this.scraper = scraper;
        this.assetsDictionary = {
            'acoes': Type.STOCK,
            'etfs': Type.ETF,
            'fundos-imobiliarios': Type.REAL_ESTATE_INVESTIMENT_FUND,
            'fundos-de-investimento': Type.STOCK_INVESTIMENT_FUND,
        };
    }

    private getTypeFromUrl({ url }: { url: string }): Type {
        const [type] = url.split('/');
        return this.assetsDictionary[type];
    }

    private getNameFromPage({ selector }: { selector: any }): string {
        const name =
            selector("#company-section").find(".mb-2.mt-0.fs-4.fs-xl-5.lh-5.lh-xl-5.d-block span.d-block.fw-600.text-main-green-dark").text() ||
            selector('#fund-section > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div > strong').html() ||
            selector('#company-section > div > div.d-block.d-md-flex.mb-5.img-lazy-group > div > div > div:nth-child(1) > h4 > span').html() ||
            selector('#company-section > div:nth-child(1) > div > div.d-block.d-md-flex.mb-5.img-lazy-group > div.company-description.w-100.w-md-70.ml-md-5 > h4 > span').html();
        return name;
    }

    public async getByTicker({ ticker, url }: { ticker: string; url: string; }): Promise<FinancialAsset> {
        try {
            const { data } = await this.httpClient.get(url);
            const selector = this.scraper.load(data);
            const name = this.getNameFromPage({ selector });
            const type = this.getTypeFromUrl({ url });
            let price = 1;
            if (type !== Type.STOCK_INVESTIMENT_FUND) price = Number(selector("#main-2").find("div strong.value").html().replace(',', '.'));
            return new FinancialAsset({ name, ticker, price, type });
        } catch (error: any) {
            throw new Error(`FinancialAssetRepositoryWeb: ${error.message}`)
        }
    }
}