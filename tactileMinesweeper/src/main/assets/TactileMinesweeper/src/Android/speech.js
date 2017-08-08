function reveal() {
	console.log("revealing")
	revealTile(game, curTile.id)
	update()
	speakTile(curTile)
    printSVG();
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
	if (t.threatCount!==
	undefined){
	    speak(t.threatCount)
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
    } else if (speechInput.includes("reveal")){
        reveal();
    }
}