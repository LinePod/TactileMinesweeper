var options = {'cols':10, 'rows':10, 'mines':10}

var game = createGame(options)

var svg = d3.select("body")
.append("svg")
.attr("width", options.cols*20)
.attr("height", options.rows*20);

var defs = svg.append("defs")

var xPattern = defs.append("pattern")
	.attr("id", "x")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", 20)
	.attr("height", 20)
	.attr("patternUnits", "userSpaceOnUse");

xPattern
	.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", 20)
		.attr("y2", 20)
		.attr("stroke", "black")
		.attr("stroke-width", 2);

xPattern
	.append("line")
		.attr("x1", 0)
		.attr("y1", 20)
		.attr("x2", 20)
		.attr("y2", 0)
		.attr("stroke", "black")
		.attr("stroke-width", 2);

var curTile

var commands = {
	'mark': markAsBomb,
	'reveal': reveal
}

annyang.addCommands(commands)

console.log("staring speach recog")
annyang.start()

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
	var msg = new SpeechSynthesisUtterance(text);
	msg.rate = 1.2
	window.speechSynthesis.speak(msg);
}

function speakTile(t) {
	if(t.isMarked) {
		speak("marked")
		return
	}
	if(t.threatCount != 0) {
		speak(t.threatCount)
		return
	}
}

function cancelSpeech() {
	window.speechSynthesis.cancel();
}

svg.selectAll("g")
	.data(game.tiles)
	.enter()
	.append("circle")
	.attr("class", "tile")
	.attr("stroke", "black")
	.attr("cx",function(t) {
		return (t.id % game.cols) * 20 + 10
	})
	.attr("cy",function(t) {
		return (parseInt(t.id / game.cols)) * 20 + 10
	})
	.attr("opacity", 0)
	.on("mousedown", function(t) {
		reveal()
	})
	.on("mouseover", function(t) {
		curTile = t
		speakTile(t)
	})
	.on("mouseout", cancelSpeech);

function updateD3Elements() {
	svg.selectAll(".tile")
		.attr("opacity", function(t) {
			return (t.threatCount == 0 || !t.isRevealed) && !t.isMarked ? 0 : 100
			})
		.attr("stroke", function(t) {
			return t.isMarked == true ? "white" : "black"
		})
		.attr("fill", function(t) {
			if(t.isMarked) {
					return "url(#x)"
				}
			return "white"
		});
}

function update() {
	if(game.isDead) {
		revealMines(game)
		updateD3Elements()
		speak("Game over")
		window.location.reload(true)
	}
	updateD3Elements()
}
