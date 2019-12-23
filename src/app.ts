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

    clickHandler(element: HTMLElement) {
        console.log(element.getAttribute('value'));
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
                this.clickHandler(event.currentTarget! as HTMLElement);
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
}

new Scoreboard();
new Engrams();