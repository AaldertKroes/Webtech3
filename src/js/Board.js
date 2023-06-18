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
    #card_content = 'number';
    #card_color = document.getElementById("card_color").value;
    #open_color = document.getElementById("open_color").value;
    #found_color = document.getElementById("found_color").value;
    #picture_type = "none";
    #timer = null;
    
    /**
     * Constructor of the Board class
     * @param {number} size to generate a size*size board.
     */
    constructor(size){

        this.#size = size;
        this.#timer = new Timer();
    }

    gameCompleted(){
        const duration = 6 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 30, zIndex: 0 };

        function randomInRange(min, max) {return Math.random() * (max - min) + min;}

        const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {return clearInterval(interval);}

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
        }, 250);
    }

    /**
     * If a pair is found, change the background colour to green and increment this.#pairs_found.
     * The divs remain locked and can no longer be clicked on.
     */
    found(){
        let all_pairs = (this.#size * this.#size)/2;
        this.#pairs_found += 1;
        document.getElementById("found_pairs").innerHTML = `<p id='found_pairs'>Found pairs: ${this.getPairsFound()}</p>`;
        document.getElementById(`item${this.#flipped_pos[0]}`).style.backgroundColor = this.#found_color;
        document.getElementById(`item${this.#flipped_pos[1]}`).style.backgroundColor = this.#found_color;
        if (this.#pairs_found === all_pairs) {
            document.getElementById("game_completed").innerHTML = `You have found all ${all_pairs} pairs. Congratulations!`;
            this.gameCompleted();
        }

        this.#score += 50;
    }



    /**
     * If a pair is not found, change the background colour back to gray.
     * The cards are unlocked and can be clicked on again.
     */
    notFound(){
        let content = this.#card_content;
        let card1 = document.getElementById(`item${this.#flipped_pos[0]}`);
        let card2 = document.getElementById(`item${this.#flipped_pos[1]}`);

        card1.style.backgroundColor = this.#card_color;
        card1.innerHTML = `<p id='${this.#flipped_pos[0]}content'>${(content === "number" && content !== "select" ? this.#flipped_pos[0] : content)}</p>`;

        card2.style.backgroundColor = this.#card_color;
        card2.innerHTML = `<p id='${this.#flipped_pos[1]}content'>${(content === "number" && content !== "select" ? this.#flipped_pos[1] : content)}</p>`;
    
        this.#locked_pos.pop();
        this.#locked_pos.pop();
        this.#score -= 5;
    }


    /**
     * Resets the board for a new game.
     * This can also set the board size and whether pictures need to be shown or not.
     */
    resetBoard(){
        this.#pairs_found = 0;
        this.#locked_pos = []; //array met posities van kaarten die open staan
        this.#flipped_pieces = 0;
        this.#flipped_pos = [];//zijn posities van kaarten die zijn gevonden en open staan
        this.#distributed_pairs = [];
        this.#pair_images = {};
        
        const b = this.generateBoard();

        document.getElementById('mainboard').innerHTML = b;
        document.getElementById("found_pairs").innerHTML = `<p id='found_pairs'>Found pairs: 0</p>`;
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
                if(this.#picture_type === 'random'){
                    fetch('http://picsum.photos/300/300')
                    .then(res => this.#pair_images[current_pair] = res.url);
                } else {
                    this.#pair_images = {};
                }
            }
        }

        // Shuffle the pairs and give them a position | Comment for easier testing
        this.shuffle(pairs);
        this.#distributed_pairs = pairs;
    }

    changeCardColor(color){
        this.#card_color = color;
        for(let i = 0; i < this.#size**2; i++){
            if(!this.#locked_pos.includes(`${i}`)){
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

    changeCardContent(content){
        this.#card_content = content;
        let number = 0;
        for(let i = 0; i < this.#distributed_pairs.length; i++){
            if(!this.#locked_pos.includes(this.#distributed_pairs[i])){document.getElementById(`${i}content`).innerHTML = (this.#card_content === "number" && this.#card_content !== "select" ? number : this.#card_content);}
            number++;
        }
    }
    
    /**
     * When a card is clicked, the card gets flipped and the value (letter combination) is shown and the card is locked.
     * If two cards are clicked, check whether it's a pair or not.
     * @param {number} id id of the clicked card.
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
            let current_card = document.getElementById(`item${id}`);
            let card_letters = this.#distributed_pairs[id];
            let img_src = this.#pair_images[this.#distributed_pairs[id]];

            if(Object.keys(this.#pair_images).length !== 0){current_card.innerHTML = `<img id='${id}content' src='${img_src}' alt='${card_letters}'>`;}
            else if(Object.keys(this.#pair_images).length === 0){
                current_card.innerHTML = `<p id="${id}content">${card_letters}</p>`;
                current_card.style.backgroundColor = this.#open_color;
            }
            this.#flipped_pieces += 1;
            this.#flipped_pos.push(id);
            this.#locked_pos.push(id);
        }
    }

    /**
     * Generates a board of n*n size, based on this.#size.
     * @returns A string with HTML code that shows the entire board with its values.
     */
    generateBoard(){
        let margin = 97.4 / this.#size;
        let z = 0;


        this.generatePairs()
        let naam = '';

        for (let i = 0; i < this.#size; i++){
            naam += (`<div class='row${i}'>`);
            for (let j = 0; j < this.#size; j++){
                naam += (`<style>#item${z}{background-color: ${this.#card_color}; border: 2px; border-color: black; border-style: solid; text-align: center; float: left;}</style>`);
                naam += (`<div class="card" id='item${z}' data-cardid='${z}'><p id='${z}content'>${z}</p></div>`);
                z += 1;
            }
            naam += ("</div>");
        }
        return naam;
    }

    /**
     * Returns the amount of pairs found.
     * @returns {number} amount of pairs found.
     */
    getPairsFound(){return this.#pairs_found;}
    getDistributedPairs(){return this.#distributed_pairs;}

    getSize(){return this.#size;}
    setSize(size){this.#size = size;}

    setPictureType(type){this.#picture_type = type;}

    getScore(){return this.#score;}

    getCardColor(){return this.#card_color;}
    getOpenColor(){return this.#open_color;}
    getFoundColor(){return this.#found_color;}
}