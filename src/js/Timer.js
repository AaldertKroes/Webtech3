/**
 * bugs:
 * - tijd moet nog stopgezet worden als het spel voorbij is.
 */
export class Timer{
    #time = new Date();
    #futureTime = new Date(2040, 10, 5)

    /**
     * start de timer voor het spel, word geupdate wanneer er een flip word gedaan
     */
   startTime() {
        const newTime = new Date();
        var timeDiff = newTime.getTime() - this.#time.getTime();

        var hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        var minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        var secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

        hoursDiff = this.checkTime(hoursDiff);
        minutesDiff = this.checkTime(minutesDiff);
        secondsDiff = this.checkTime(secondsDiff);


        document.getElementById('timer').innerHTML = "Time playing: " + hoursDiff + ":" + minutesDiff + ":" + secondsDiff;
           // setTimeout(startTime, 1000);
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

}
