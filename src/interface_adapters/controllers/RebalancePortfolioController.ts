import RebalancePortfolio from "../../use_cases/RebalancePortfolio";

export default class RebalancePortfolioController {
    private useCase: RebalancePortfolio;

    public constructor({ useCase }: { useCase: RebalancePortfolio }) {
        this.useCase = useCase;
    }

    public async handle(payload: any) {
        try {
            return this.useCase.execute({ rebalancePortfolioInput: payload });
        } catch (error) {
            console.error(error);
        }
    }
}