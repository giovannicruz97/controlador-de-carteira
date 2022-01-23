export default interface Scraper {
    load(html: string): any;
}