import Scoreboard from './components/Scoreboard';
import EngramList from './components/EngramList';

const engramImages = [
    'rare-engram.png',
    'legendary-engram.png',
    'prototype-engram.png',
    'exotic-engram.png',
    'uncommon-engram.png'
];

new Scoreboard();
new EngramList(engramImages);