import { Board } from './Board.js';
// import { Leaderboard } from './Leaderboard.js';
import { Timer } from './Timer.js';

if(localStorage.getItem("token") === null){window.location.replace("http://localhost:9000/html/login.html");}

const board = new Board(6);
const b = board.generateBoard();
document.getElementById('mainboard_child').innerHTML = b;
document.querySelectorAll('div.card').forEach ( card => card.addEventListener('click', evt => board.flip(evt.currentTarget.dataset.cardid)));

// Start timer
const timer = new Timer();

// Fetch top 5 players for the leaderboard
fetch('http://localhost:8000/scores', {method:'GET', headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}})
.then(res => res.json())
.then(json => json.sort((a,b) => {if(a.score < b.score){return 1}}))
.then(sorted => {
    let loopLength = (sorted.length >= 5 ? 5 : sorted.length);
    let leaderboardPlayers = '<p id="players">';
    for(let i = 0; i < loopLength; i++){
        leaderboardPlayers += `${sorted[i].username} | ${sorted[i].score}<br>`;
    }
    document.getElementById("leaderboard_player_scores").innerHTML = `${leaderboardPlayers}</p>`;
})

//**********************************************************eventlisteners******************************************************************
//***********************************************************reset button*******************************************************************
const el = document.getElementById('resetbutton');
el.addEventListener('click', () => timer.stop());
el.addEventListener('click', () => timer.reset());
el.addEventListener('click', () => board.resetBoard());
el.addEventListener('click', () => document.querySelectorAll('div.card').forEach ( card => card.addEventListener('click', evt => board.flip(evt.currentTarget.dataset.cardid))));

//************************************************************board size********************************************************************
const board_size = document.getElementById("amount_rows");
board_size.addEventListener('input', () => board.setSize(board_size.value));

//***********************************************************card colors********************************************************************
const card_color_el = document.getElementById("card_color")
card_color_el.addEventListener('input', () => board.changeCardColor(card_color_el.value))

const open_color_el = document.getElementById("open_color")
open_color_el.addEventListener('input', () => board.changeOpenCardColor(open_color_el.value))

const found_color_el = document.getElementById("found_color")
found_color_el.addEventListener('input', () => board.changeFoundCardColor(found_color_el.value))

//***********************************************************card content*******************************************************************
const card_content = document.getElementById("contents_card");
card_content.addEventListener('input', () => board.changeCardContent(card_content.value));

//***********************************************************picture type*******************************************************************
const picture_type = document.getElementById("pictures_shown");
picture_type.addEventListener('input', () => board.setPictureType(picture_type.value));

//************************************************************log out **********************************************************************
const logout_button = document.getElementById("logOutButton");
logout_button.addEventListener('click', () => {
    localStorage.clear();
    window.location.replace("http://localhost:9000/html/login.html");
});