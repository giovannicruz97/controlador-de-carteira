import { Type } from './Type'

export default class FinancialAsset {
    private name: string;
    private ticker?: string;
    private type: Type;

    public constructor({ name, ticker, type }: { name: string; ticker?: string; type: Type }) {
        this.name = name;
        this.ticker = ticker;
        this.type = type;
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
}