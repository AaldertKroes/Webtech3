function flip(){
    // Flips the card and revealing the other side
}

function generateBoard(n){
    // Generates a board of n*n size.
    // Every block is inside its own <div> and uses the function flip() when clicked on
    // TODO: styling

    for (let i = 0; i < n; i++){
        document.write("<style>.row"+i+"{border: 2px; border-color: black; border-style: solid; width: "+(100 - n)/n+"%; height: "+(100 - n)/n+"%; text-align: center; float: left; margin-right: 1%;}</style>")
        for (let j = 0; j < n; j++){
            document.write("<div class='row"+i+"' id='item"+j+"' onclick='flip()'><p>"+i,j+"</p></div>");
        }
        document.write("<br><br><br><br>")
    }
}