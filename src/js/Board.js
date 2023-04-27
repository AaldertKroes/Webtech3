class Board {
    #size;
    #flipped_pieces = 0;
    #flipped_pos = [];
    #options = ['AA','AB','AC','BA','BB','BC','CA','CB','CA'];

    constructor(){
        this.#size = 6;
    }
    
    flip(x){
        // Flips the card and revealing the other side

        // If two cards are flipped, unflip them
        if (this.#flipped_pieces === 2){
            document.getElementById("item"+this.#flipped_pos[0]).style.backgroundColor = "#BFB8B7";
            document.getElementById("item"+this.#flipped_pos[1]).style.backgroundColor = "#BFB8B7";
            this.#flipped_pieces = 0;
            this.#flipped_pos = [];
        } else {
        // Flip the card and remember it
            document.getElementById("item"+x).style.backgroundColor = "#F37462";
            this.#flipped_pieces += 1;
            this.#flipped_pos.push(x);
        }
    }

    generateBoard(){
        // Generates a board of n*n size.
        // Every block is inside its own <div> and uses the function flip() when clicked on
        var margin = 97.4 / this.#size;
        var z = 0;

        for (let i = 0; i < this.#size; i++){
            //document.write("<style>.row"+i+"{border: 2px; border-color: black; border-style: solid; width: "+margin+"%; height: "+margin+"%; text-align: center; float: left;}</style>")
            document.write("<div class='row"+i+"'>");
            for (let j = 0; j < this.#size; j++){
                document.write("<style>#item"+z+"{background-color: #BFB8B7; border: 2px; border-color: black; border-style: solid; width: "+margin+"%; height: "+margin+"%; text-align: center; float: left;}</style>");
                document.write("<div id='item"+z+"' onclick='board.flip("+z+")'><p>"+z+"</p></div>");
                z += 1;
            }
            document.write("</div>")
//            document.write("<br><br><br><br>")
        }
    }
}