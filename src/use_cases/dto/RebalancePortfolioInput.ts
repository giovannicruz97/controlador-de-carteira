interface Asset {
    ticker: string;
    currentQuantity: number;
    targetAllocationPercentage: number;
    url: string;
};

export default class RebalancePortfolioInput {
    public assets: Asset[];
    public contribution: number;

    public constructor({ assets, contribution = 0 }: { assets: Asset[]; contribution?: number }) {
        this.assets = assets;
        this.contribution = contribution;
    }
}