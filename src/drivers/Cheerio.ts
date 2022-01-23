import cheerio from 'cheerio';
import Scraper from "./adapters/Scraper";

class Cheerio implements Scraper {
    private scraper: any;

    public constructor() {
        this.scraper = cheerio;
    }

    public load(html: string): any {
        return this.scraper.load(html);
    }
}

export default new Cheerio();