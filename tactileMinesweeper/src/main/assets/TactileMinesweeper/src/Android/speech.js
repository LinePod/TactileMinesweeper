function reveal() {
	console.log("revealing")
	revealTile(game, curTile.id)
	update()
	speakTile(curTile)
}

function markAsBomb() {
	console.log("marking")
	console.log(curTile)
	curTile.isMarked = true	
	speakTile(curTile)
	update()
}

function speak(text) {
	Android.speak(text);
}

function speakTile(t) {
	if(t.isMarked) {
		speak("marked")
		return
	}
	speak(t.threatCount)
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
        printSVG();
    } else if (speechInput.includes("reveal")){
        reveal();
        printSVG();
    }
}