
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectPlayer } from "../inputs/SelectPlayer";

export class HeatTrappers implements IProjectCard {
    public cost: number = 6;
    public tags: Array<Tags> = [Tags.ENERGY, Tags.STEEL];
    public name: string = "Heat Trappers";
    public cardType: CardType = CardType.AUTOMATED;
    public text: string = "Decrease any heat production 2 steps and increase your energy production 1 step";
    public description: string = "Utilizing temperature gradients for energy production";
    public play(player: Player, game: Game): Promise<void> {
        return new Promise((resolve, reject) => {
            const inputHandler = (options: {[x: string]: string}) => {
                const otherPlayer = game.getPlayer(options.option1);
                if (otherPlayer === undefined) {
                    reject("player not found");
                } else {
                    otherPlayer.heatProduction = Math.max(otherPlayer.heatProduction - 2, 0);
                    player.energyProduction++;
                    player.victoryPoints--;
                    resolve();
                }
            };
            player.setWaitingFor(new SelectPlayer(this, game.getPlayers()), inputHandler);
        });
    }
}
