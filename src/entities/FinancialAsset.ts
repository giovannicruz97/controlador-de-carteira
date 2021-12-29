import { Type } from './Type'

export default class FinancialAsset {
    private name: string;
    private ticker: string;
    private type: Type;
    private price: number;

    public constructor({ name, ticker, type, price }: { name: string; ticker: string; type: Type; price: number }) {
        this.name = name;
        this.ticker = ticker;
        this.type = type;
        this.price = price;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getTicker(): string {
        return this.ticker;
    }

    public setTicker(ticker: string): void {
        this.ticker = ticker;
    }

    public getType(): Type {
        return this.type;
    }

    public setType(type: Type): void {
        this.type = type;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }
}