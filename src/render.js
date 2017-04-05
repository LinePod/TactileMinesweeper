var options = {'cols':15, 'rows':15, 'mines':60}

var game = createGame(options)

var svg = d3.select("body")
.append("svg")
.attr("width", options.cols*20)
.attr("height", options.rows*20);

var curTile

var symbolType = {
	'unknownOrNoThreats' : empty,
	'marked' : cross,
	'surroundingThreats': d3.symbolCircle
}

var d3Tiles = svg.selectAll(".tile")
	.data(game.tiles)
	.enter()
	.append("path")
	.attr("d", d3.symbol().type(symbolType['unknownOrNoThreats']))
	.attr("fill", "white")
	.attr("stroke", "black")
	.attr("transform", function(t) { 
		return "translate(" + ((t.id % game.cols) * 20 + 10) + "," + 
			((parseInt(t.id / game.cols)) * 20 + 10) + ")"; })

var hoverTiles = svg.selectAll(".hoverBox")
	.data(game.tiles)
	.enter()
	.append("rect")
	.attr("class", "hoverBox")
	.attr("opacity", 0)
	.attr("width", 20)
	.attr("height", 20)
	.attr("x", function(t) { 
		return (t.id % game.cols) * 20
	})
	.attr("y", function(t) {
		return parseInt(t.id / game.cols) * 20
	})
	.on("mousedown", function(t) {
		reveal()
	})
	.on("mouseover", function(t) {
		curTile = t
		speakTile(t)
	})
	.on("mouseout", cancelSpeech);

function updateD3Elements() {
	d3Tiles
		.attr("d", d3.symbol()
			.type(function(t) {
			if(t.isMarked) {return symbolType['marked'];}
			else if(t.isRevealed && t.threatCount != 0) {return symbolType['surroundingThreats'];}
			return symbolType['unknownOrNoThreats']
			})
		);
}

function update() {
	updateD3Elements()
	if(game.isDead) {
		revealMines(game)
		speak("Game over")
		window.location.reload(true)
	}
}
