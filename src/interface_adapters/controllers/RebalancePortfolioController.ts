import RebalancePortfolioInput from "../../use_cases/dto/RebalancePortfolioInput";
import RebalancePortfolio from "../../use_cases/RebalancePortfolio";

export default class RebalancePortfolioController {
    private useCase: RebalancePortfolio;

    public constructor({ useCase }: { useCase: RebalancePortfolio }) {
        this.useCase = useCase;
    }

    public async handle(payload: any) {
        try {
            const rebalancePortfolioInput = new RebalancePortfolioInput({ assets: payload.assets, contribution: payload.contribution });
            return this.useCase.execute(rebalancePortfolioInput);
        } catch (error) {
            console.error(error);
        }
    }
}