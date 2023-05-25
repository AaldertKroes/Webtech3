import { Board } from './Board.js';
// import { Leaderboard } from './Leaderboard.js';
import { Timer } from './Timer.js';

//board aanmaken
// const board = new Board(2);
const board = new Board(6);
const b = board.generateBoard();
document.getElementById('mainboard').innerHTML = b;
const el = document.getElementById('resetbutton');
el.boardSize = document.getElementById("amount_rows").value;

//leaderboard aanmaken
// const leaderboard = new Leaderboard("bob","mart","koen","bas","tim");

//aanmaken time
const timer = new Timer();

//eventlisteners
el.addEventListener('click', () => timer.reset());
el.addEventListener('click', board.resetBoard);
document.querySelectorAll('div.card').forEach ( card => card.addEventListener('click', evt => board.flip(evt.currentTarget.dataset.cardid)));
