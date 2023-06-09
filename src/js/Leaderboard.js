export class Leaderboard {
    #player_scores = [["test",0],["test",0],["test",0],["test",0],["test",0]];

    constructor(...players){
        for (let i = 0; i < players.length; i++){
            this.#player_scores[i][0] = players[i];
        }
    }

    printPlayerScores(){
        document.write("<p>");
        for (let i = 0; i < this.#player_scores.length; i++){
            document.write(this.#player_scores[i][0]+" has "+this.#player_scores[i][1]+" points.<br>");
        }
        document.write("</p>");
    }
}