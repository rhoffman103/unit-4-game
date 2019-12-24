const engramImages = [
    'rare-engram.png',
    'legendary-engram.png',
    'prototype-engram.png',
    'exotic-engram.png',
    'uncommon-engram.png'
];

interface Engram {
    imageName: string;
    value: number;
};

interface ScoreboardClickObj {
    score: number;
    target: number;
    wins: number;
    losses: number;
    isNewGame: boolean;
}

class Engrams {
    engrams: Engram[] = [];

    constructor() {
        this.randomizeEngramValues(engramImages, 12);
        this.renderEngrams();
    };

    randomizeEngramValues(imgs: string[], maxValue: number) {
        let i = 1;
        let remainingNums: number[] = [];

        while (i <= maxValue) {
            remainingNums.push(i);
            i++;
        };

        this.engrams = imgs.map((img) => {
            const randNum = Math.floor(Math.random() * remainingNums.length);
            const newValue = remainingNums.splice(randNum, 1)[0];
            return <Engram> { imageName: img, value: newValue };
        });
    };

    handleClickLogic(currentTarget: EventTarget) {
        scoreboard.scoreClickHandler(
            currentTarget! as HTMLImageElement,
            (scoreboardObj: ScoreboardClickObj) => {
                if (scoreboardObj.isNewGame) {
                    console.log(scoreboardObj)
                    this.randomizeEngramValues(engramImages, 12);
                    this.renderEngrams();
                }
            }
        );
    };

    private renderEngrams() {
        let engramsDiv = document.getElementById('engrams')! as HTMLDivElement;
        let engramsFragment = document.createDocumentFragment();
        this.engrams.forEach(engram => {
            let img = document.createElement('img');
            img.setAttribute('class', 'clickable-engram engram-btn');
            img.setAttribute('src', "./assets/images/" + engram.imageName);
            img.setAttribute('alt', 'engram');
            img.setAttribute('value', engram.value.toString());
            img.addEventListener('click',(event) => {
                this.handleClickLogic(event.currentTarget!);
            });
            engramsFragment.appendChild(img);
        });
        engramsDiv.innerHTML = '';
        engramsDiv.appendChild(engramsFragment);
    };
};

class Scoreboard {
    score = 0;
    wins = 0;
    losses = 0;
    target = 0;

    constructor() {
        this.target = this.getRandomTarget();
        this.updateDomScoreboard();
    };

    readyNewGame() {
        this.target = this.getRandomTarget();
        this.score = 0;
        this.updateDomScoreboard();
    };

    scoreClickHandler(engramElement: HTMLImageElement, callback: Function) {
        const engramValue = engramElement.getAttribute('value') || 0;
        this.score += +engramValue;
        let isNewGame = false;
        
        if (this.score === this.target) {
            this.wins += 1;
            isNewGame = true;
            this.readyNewGame();
        }
        else if (this.score > this.target) {
            this.losses +=1;
            isNewGame = true;
            this.readyNewGame();
        }
        
        this.updateDomScoreboard();
        callback(<ScoreboardClickObj>{
            score: this.score,
            target: this.target,
            wins: this.wins,
            losses: this.losses,
            isNewGame
        });
    };

    private getRandomTarget(): number {
        let max = 100;
        let min = 20;
        return Math.ceil(Math.random() * (max - min)) + min;
    };

    private updateDomScoreboard() {
        document.getElementById('target')!.innerHTML = this.target.toString();
        document.getElementById('score')!.innerHTML = this.score.toString();
        document.getElementById('wins')!.innerHTML = this.wins.toString();
        document.getElementById('losses')!.innerHTML = this.losses.toString();
    };
};

const scoreboard = new Scoreboard();
new Engrams();