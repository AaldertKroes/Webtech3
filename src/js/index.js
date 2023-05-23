import { Board } from './Board.js';
// import { Leaderboard } from './Leaderboard.js';
import { Timer } from './Timer.js';

const board = new Board(6);
// const leaderboard = new Leaderboard("bob","mart","koen","bas","tim");
const timer = new Timer();

const b = board.generateBoard();
document.getElementById('mainboard').innerHTML = b;
document.querySelectorAll('div.card').forEach ( card => card.addEventListener('click', evt => board.flip(evt.currentTarget.dataset.cardid)));