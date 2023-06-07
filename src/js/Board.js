import { Timer } from './Timer.js';

export class Board {
    #size = 2;
    #score = 0;
    #pairs_found = 0;
    #locked_pos = []; //array met posities van kaarten die open staan
    #flipped_pieces = 0;
    #flipped_pos = [];//zijn posities van kaarten die zijn gevonden en open staan
    #distributed_pairs = [];
    #pair_images = {};
    #card_color = document.getElementById("card_color").value;
    #open_color = document.getElementById("open_color").value;
    #found_color = document.getElementById("found_color").value;
    #timer = null;
    /**
     * Constructor of the Board class
     * @param {int} size to generate a size*size board.
     */
    constructor(size){

        this.#size = size;
        this.#timer = new Timer();
    }

    /**
     * If a pair is found, change the background colour to green and increment this.#pairs_found.
     * The divs remain locked and can no longer be clicked on.
     */
    found(){
        this.#pairs_found += 1;
        document.getElementById("found_pairs").innerHTML = `<p id='found_pairs'>Found pairs: ${this.getPairsFound()}</p>`;
        document.getElementById(`item${this.#flipped_pos[0]}`).style.backgroundColor = this.#found_color;
        document.getElementById(`item${this.#flipped_pos[1]}`).style.backgroundColor = this.#found_color;
        if (this.#pairs_found === (this.#size * this.#size)/2) {document.getElementById("game_completed").innerHTML = `You have found all ${(this.#size * this.#size)/2} pairs. Congratulations!`;}

        this.#score += 50;
    }



    /**
     * If a pair is not found, change the background colour back to gray.
     * The cards are unlocked and can be clicked on again.
     */
    notFound(){
        let card1 = document.getElementById("item"+this.#flipped_pos[0]);
        let card2 = document.getElementById("item"+this.#flipped_pos[1]);

        card1.style.backgroundColor = this.#card_color;
        card1.innerHTML = `<p id='${this.#flipped_pos[0]}content'>${this.#flipped_pos[0]}</p>`;

        card2.style.backgroundColor = this.#card_color;
        card2.innerHTML = `<p id='${this.#flipped_pos[1]}content'>${this.#flipped_pos[1]}</p>`;
    
        this.#locked_pos.pop();
        this.#locked_pos.pop();
        this.#score -= 5;
    }


    /**
     * reset het board voor een nieuwe game
     */
    resetBoard(size){
        const board = new Board(size.currentTarget.boardSize);
        const b = board.generateBoard();

        //document.getElementById('mainboard').innerHTML = "";
        document.getElementById('mainboard').innerHTML = b;
        document.querySelectorAll('div.card').forEach ( card => card.addEventListener('click', evt => board.flip(evt.currentTarget.dataset.cardid)));

        board.#pairs_found = 0;
        document.getElementById("found_pairs").innerHTML = `<p id='found_pairs'>Found pairs: ${board.getPairsFound()}</p>`;

        document.getElementById("game_completed").innerHTML = "";
    }


    /**
     * Shuffle all positions in an array once.
     * The array given in the parameter gets shuffled, a new array is not returned.
     * @param {array} array An array with all the items that need to be shuffled.
     */
    shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    /**
     * Generate an array of pairs. Pairs are two instances of a 2-letter combination. ex: "AA, DE, FC".
     * A number of combinations equal to half the amount of cards is generated so every combination exists twice.
     */
    generatePairs(){
        // Arrays of possible letters and placeholder for upcoming pairs
        let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"];
        let pairs = [];

        // Generation of letter pairs
        for (let i = 0; i < this.#size; i++){
            for (let j = 0; j < this.#size/2; j++){
                let current_pair = letters[i] + letters[j];
                pairs.push(current_pair);
                pairs.push(current_pair);
                // fetch('http://picsum.photos/300/300')
                //     .then(res => this.#pair_images[current_pair] = res.url);
            }
        }

        // Shuffle the pairs and give them a position | Comment for easier testing
        this.shuffle(pairs);
        this.#distributed_pairs = pairs;
    }

    changeCardColor(color){
        this.#card_color = color;
        for(let i = 0; i < this.#distributed_pairs.length; i++){
            if(!this.#locked_pos.includes(this.#distributed_pairs[i])){
                document.getElementById(`item${i}`).style.backgroundColor = this.#card_color;
            }
        }
    }
    changeOpenCardColor(color){
        this.#open_color = color;
        for(let i = 0; i < this.#flipped_pos.length; i++){
            document.getElementById(`item${this.#flipped_pos[i]}`).style.backgroundColor = this.#open_color
        }
    }
    changeFoundCardColor(color){
        this.#found_color = color;
        for(let i = 0; i < this.#locked_pos.length; i++){
            if(!this.#flipped_pos.includes(this.#locked_pos[i])){
                document.getElementById(`item${this.#locked_pos[i]}`).style.backgroundColor = this.#found_color;
            }
        }
    }
    
    /**
     * When a card is clicked, the card gets flipped and the value (letter combination) is shown and the card is locked.
     * If two cards are clicked, check whether it's a pair or not.
     * @param {int} id id of the clicked card.
     */
    flip(id){
        // Flips the card and revealing the other side
        
        // If two cards are flipped
        if (this.#flipped_pieces === 2){
            // If the same, make the cards green
            if (this.#distributed_pairs[this.#flipped_pos[0]] === this.#distributed_pairs[this.#flipped_pos[1]]){
                this.found();
                
            // If different, change colour back to gray
            } else {
                this.notFound();
            }
            this.#flipped_pieces = 0;
            this.#flipped_pos = [];
        } else if (!this.#locked_pos.includes(id)) {
            // Flip the card and remember it
            if(Object.keys(this.#pair_images).length !== 0){document.getElementById("item"+id).innerHTML = `<img id='${id}content' src='${this.#pair_images[this.#distributed_pairs[id]]}' alt='${this.#distributed_pairs[id]}'>`;}
            else if(Object.keys(this.#pair_images).length === 0){
                let currentCard = document.getElementById(`item${id}`)
                currentCard.innerHTML = `<p id="${id}content">${this.#distributed_pairs[id]}</p>`;
                currentCard.style.backgroundColor = this.#open_color;
            }
            this.#flipped_pieces += 1;
            this.#flipped_pos.push(id);
            this.#locked_pos.push(id);
        }  
        
        // if (!this.#locked_pos.includes(id)) {
        //     // Flip the card and remember it
        //     if(this.#pair_images.length !== 0){document.getElementById("item"+id).innerHTML = `<img id='${id}content' src='${this.#pair_images[this.#distributed_pairs[id]]}' alt='${this.#distributed_pairs[id]}'>`;}
        //     this.#flipped_pieces += 1;
        //     this.#flipped_pos.push(id);
        //     this.#locked_pos.push(id);

        //     if (this.#flipped_pieces === 2){
        //         setTimeout(() => {
        //             // If the same, make the cards green
        //             if (this.#distributed_pairs[this.#flipped_pos[0]] === this.#distributed_pairs[this.#flipped_pos[1]]){
        //                 this.found();
                        
        //             // If different, change colour back to gray
        //             } else {
        //                 this.notFound();
        //             }
        //             this.#flipped_pieces = 0;
        //             this.#flipped_pos = [];
        //         }, 1500);
        //     }
        // }
    }

    /**
     * Generates a board of n*n size, based on this.#size.
     * @returns A string with HTML code that shows the entire board with its values.
     */
    generateBoard(){
        var margin = 97.4 / this.#size;
        var z = 0;

        this.generatePairs()
        let naam = '';

        for (let i = 0; i < this.#size; i++){
            naam += (`<div class='row${i}'>`);
            for (let j = 0; j < this.#size; j++){
                naam += (`<style>#item${z}{background-color: ${this.#card_color}; border: 2px; border-color: black; border-style: solid; width: ${margin}%; text-align: center; float: left;}</style>`);
                naam += (`<div class="card" id='item${z}' data-cardid='${z}'><p id='${z}content'>${z}</p></div>`);
                z += 1;
            }
            naam += ("</div>");
        }
        return naam
    }

    /**
     * Returns the amount of pairs found.
     * @returns {int} amount of pairs found.
     */
    getPairsFound(){return this.#pairs_found;}
    getDistributedPairs(){return this.#distributed_pairs;}
}