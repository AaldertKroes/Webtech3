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

const card_color_el = document.getElementById("card_color")
const open_color_el = document.getElementById("open_color")
const found_color_el = document.getElementById("found_color")
card_color_el.addEventListener('input', () => board.changeCardColor(card_color_el.value))
open_color_el.addEventListener('input', () => board.changeOpenCardColor(open_color_el.value))
found_color_el.addEventListener('input', () => board.changeFoundCardColor(found_color_el.value))
const card_content = document.getElementById("contents_card");
card_content.addEventListener('input', () => board.changeCardContent(card_content.value));

const card_color_picker = document.getElementById("card_color");
card_color_picker.addEventListener('input', () => board.changeCardColor(card_color_picker.value));
