class Board {
    #size;
    #pairs_found = 0;
    #flipped_pieces = 0;
    #flipped_pos = [];
    #distributed_pairs = [];

    constructor(size){
        this.#size = size;
    }

    shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    generatePairs(){
        // Arrays of possible letters and placeholder for upcoming pairs
        let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"];
        let pairs = [];

        // Generation of letter pairs
        for (let i = 0; i < this.#size; i++){
            for (let j = 0; j < this.#size/2; j++){
                var current_pair = letters[i] + letters[j];
                pairs.push(current_pair);
                pairs.push(current_pair);
            }
        }

        // Shuffle the pairs and give them a position
        this.shuffle(pairs);
        this.#distributed_pairs = pairs;
    }
    
    flip(id){
        // Flips the card and revealing the other side

        // TODO: Niet alleen achtergrond anders, hele styling terug zetten.
        // TODO: Kijken of onclick terug gezet kan worden.

        // If two cards are flipped
        if (this.#flipped_pieces === 2){
            // If the same, make the cards green
            if (this.#distributed_pairs[this.#flipped_pos[0]] === this.#distributed_pairs[this.#flipped_pos[1]]){
                this.#pairs_found += 1;
                document.getElementById("item"+this.#flipped_pos[0]).style.backgroundColor = "#A4ED64";
                document.getElementById("item"+this.#flipped_pos[1]).style.backgroundColor = "#A4ED64";
            // If different, change colour back to gray
            } else {
                document.getElementById("item"+this.#flipped_pos[0]).style.backgroundColor = "#BFB8B7";
                document.getElementById("item"+this.#flipped_pos[0]).innerHTML = this.#flipped_pos[0];
                document.getElementById("item"+this.#flipped_pos[1]).style.backgroundColor = "#BFB8B7";
                document.getElementById("item"+this.#flipped_pos[1]).innerHTML = this.#flipped_pos[1];
            }
            this.#flipped_pieces = 0;
            this.#flipped_pos = [];
        } else {
        // Flip the card and remember it
            document.getElementById("item"+id).style.backgroundColor = "#F37462";
            document.getElementById(id+"content").innerHTML = this.#distributed_pairs[id];
            this.#flipped_pieces += 1;
            this.#flipped_pos.push(id);
        }
    }

    generateBoard(){
        // Generates a board of n*n size.
        // Every block is inside its own <div> and uses the function flip() when clicked on
        var margin = 97.4 / this.#size;
        var z = 0;

        this.generatePairs();

        for (let i = 0; i < this.#size; i++){
            document.write("<div class='row"+i+"'>");
            for (let j = 0; j < this.#size; j++){
                document.write("<style>#item"+z+"{background-color: #BFB8B7; border: 2px; border-color: black; border-style: solid; width: "+margin+"%; height: "+margin+"%; text-align: center; float: left;}</style>");
                document.write("<div id='item"+z+"' onclick='board.flip("+z+")'><p id='"+z+"content'>"+z+"</p></div>");
                z += 1;
            }
            document.write("</div>")
        }
    }
}