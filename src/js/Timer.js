/**
 * bugs:
 * - tijd moet nog stopgezet worden als het spel voorbij is.
 */
export class Timer{
    #time = null;
    #interval = null;

    constructor() {
        this.#time = new Date();
        this.#interval = setInterval(() => this.startTime(),1000)
    }


    /**
     * start de timer voor het spel, word geupdate wanneer er een flip word gedaan
     */
   startTime() {
        const newTime = new Date();
        let timeDiff = newTime.getTime() - this.#time.getTime();

        let hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        let minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

        hoursDiff = this.checkTime(hoursDiff);
        minutesDiff = this.checkTime(minutesDiff);
        secondsDiff = this.checkTime(secondsDiff);

        document.getElementById('timer').innerHTML = "Time playing: " + hoursDiff + ":" + minutesDiff + ":" + secondsDiff;
    }

    /**
     * vult tijdwaarden aan (0:0:0 word 00:00:00)
     * @param i
     * @returns {string}
     */
    checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

    /**
     * reset de tijd (nieuwe date word aangemaakt en rekent vanuit dat moment verder)
     */
    reset(){
        document.getElementById("timer").innerHTML = "Time playing: 00:00:00"
        this.#time = new Date();
    }

    /**
     * stopt de tijd
     */
    stop(){
        clearInterval(this.#interval);
    }
}
