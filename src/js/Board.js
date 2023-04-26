class Board {
    #size;
    #options;

    constructor(size){
        this.#size = size;
    }
    
    flip(){
        // Flips the card and revealing the other side
    }

    generateBoard(){
        // Generates a board of n*n size.
        // Every block is inside its own <div> and uses the function flip() when clicked on
        // TODO: styling
        var margin = 100 / this.#size;

        for (let i = 0; i < this.#size; i++){
            document.write("<style>.row"+i+"{border: 2px; border-color: black; border-style: solid; width: "+margin+"%; height: "+margin+"%; text-align: center; float: left;}</style>")
            for (let j = 0; j < this.#size; j++){
                document.write("<div class='row"+i+"' id='item"+j+"' onclick='flip()'><p>"+i,j+"</p></div>");
            }
            document.write("<br><br><br><br>")
        }
    }
}