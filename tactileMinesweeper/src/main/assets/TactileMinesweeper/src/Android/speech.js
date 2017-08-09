function reveal() {
	console.log("revealing")
	revealTile(game, curTile.id)
	if (!isGameOver(game)){
        update()
        printSVG();
    }
	speakTile(curTile)

}



function markAsBomb() {
	console.log("marking")
	console.log(curTile)
	curTile.isMarked = true	
	speakTile(curTile)
	update()
    printSVG();
}

function speak(text) {
    console.log("speaking text " + text)
	Android.speak(text);
}

function speakTile(t) {
	if(t.isMarked) {
		speak("marked")
		return
	}
	if (t.threatCount!== undefined){
	    if (t.threatCount != 0){
	        speak(t.threatCount)
	    }
	}
	return
}

function cancelSpeech() {
	//window.speechSynthesis.cancel();
}


function handleSpeech(speechInput){
    speechInput = speechInput.toLowerCase();
    console.log("received " + speechInput);


    if (speechInput.includes("mark")){
        markAsBomb();
    } else if (speechInput.includes("reveal") || speechInput.includes("review")){
        reveal();
    }
}