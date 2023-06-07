import { Board } from './Board.js';
// import { Leaderboard } from './Leaderboard.js';
import { Timer } from './Timer.js';

const board = new Board(6);
const b = board.generateBoard();
document.getElementById('mainboard').innerHTML = b;
document.querySelectorAll('div.card').forEach ( card => card.addEventListener('click', evt => board.flip(evt.currentTarget.dataset.cardid)));


//aanmaken time
const timer = new Timer();

//eventlisteners
const el = document.getElementById('resetbutton');
el.addEventListener('click', () => timer.stop());
el.addEventListener('click', () => timer.reset());
el.addEventListener('click', () => board.resetBoard());
el.addEventListener('click', () => document.querySelectorAll('div.card').forEach ( card => card.addEventListener('click', evt => board.flip(evt.currentTarget.dataset.cardid))));

const board_size = document.getElementById("amount_rows");
board_size.addEventListener('input', () => board.setSize(board_size.value));

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
