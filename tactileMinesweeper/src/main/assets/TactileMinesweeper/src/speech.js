var commands = {
	'mark': markAsBomb,
	'reveal': reveal
}

//annyang.addCommands(commands)

console.log("staring speach recog")
//annyang.start()

function reveal() {
	console.log("revealing")
	revealTile(game, curTile.id)
	if (!isGameOver(game)){
	    update()
	}
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
	var msg = new SpeechSynthesisUtterance(text);
	msg.rate = 1.2
	window.speechSynthesis.speak(msg);
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
	window.speechSynthesis.cancel();
}
