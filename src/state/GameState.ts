import State from '../baseClasses/State';
import Modal from '../components/Modal';

export interface GameState {
    score: number;
    target: number;
    wins: number;
    losses: number;
};

class Game extends State<GameState> {
    constructor() {
        super();
        this.initializeState(<GameState>{
            target: this.getRandomTarget(),
            score: 0,
            wins: 0,
            losses: 0
        });
    };

    getRandomTarget(): number {
        let max = 100;
        let min = 20;
        return Math.ceil(Math.random() * (max - min)) + min;
    };

    scoreClickHandler(engramValue: number) {
        let _this = this;
        let currentState = this.getState();
        let newScore = currentState.score += engramValue;
        let win = 0;
        let loss = 0;

        if (newScore === currentState.target) {
            win += 1;
        }
        else if (newScore > currentState.target) {
            loss += 1;
        }

        this.updateState({ score: newScore });

        if (win || loss) {
            if (win) new Modal(currentState.wins % 5 === 0 ? 'This is amazing! ': 'Your legend grows');
            if (loss) new Modal('Your light fades away...')
            _this.updateState({
                score: 0,
                wins: currentState.wins + win,
                losses: currentState.losses + loss,
                target: _this.getRandomTarget()
            });
        };
    };
};

const game = new Game();
export default game;