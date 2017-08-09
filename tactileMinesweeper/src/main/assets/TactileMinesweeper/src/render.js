var game = createGame(options)
var lastHoveredElement = null
var linepodNS = "http://hpi.de/baudisch/linepod";
const linepodVersion = "linepod:version";
const lastTimestamp = "linepod:lastTimestamp";

d3.namespaces.linepod = linepodNS;


var svg = d3.select("body")
.append("svg")
.attr("version", 1.1)
.attr("id","svg")
.attr("xmlns","http://www.w3.org/2000/svg")
.attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
.attr("width", 200)
.attr("height", 270)
.attr("y",paperA4Yoffset)
.attr("viewBox", "0 0 " + (options.cols*20 + 100) + " " + options.rows*20)
.attr("preserveAspectRatio", "xMinYMin meet");
//.attr("width", options.cols*20 + 100)
//.attr("height", options.rows*20);

var defs = svg.append("defs")


defs.append("pattern")
	.attr("id", "triggerPlateau")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", 100)
	.attr("height", 10)
	.attr("patternUnits", "userSpaceOnUse")
	.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", 100)
		.attr("height", 10)
		.attr("stroke", "black")
		.attr("fill", "white");


//if we want to trigger the speech input by tapping on a special area on the paper
function triggerSpeechInput(){

    Android.triggerSpeechInput();

}

//plateau to trigger the speech input

svg.append("rect")
.attr("x", options.cols*20)
.attr("y",0)
.attr("id", "speechTrigger")
.attr("width", 100)
.attr("height", 100)
.attr("fill", function(){return "url(#triggerPlateau)";})
.attr("stroke", function(){return "black"})
.on("click",triggerSpeechInput);

var ctrlDown = false

// To mark a field hold ctrl and click
window.onmousemove = function(e) {
	if(!e) e = window.event;
	if(e.ctrlKey) {ctrlDown = true}
	else {ctrlDown = false}
}


// Keeping track of mouse over current Tile
var curTile

// Create visible tile representations
var renderTiles = svg.selectAll(".tile")
	.data(game.tiles)
	.enter()
	.append("path")
	.attr("d", d3.symbol().type(symbolType['unknown']))
	.attr("fill", "white")
	.attr("stroke", "black")
	.attr("transform", function(t) { 
		return "translate(" + ((t.id % game.cols) * 20 + 10) + "," + 
			((parseInt(t.id / game.cols)) * 20 + 10) + ")"; })

// Create hoverTiles for determining mouseposition and speechoutput
var hoverTiles = svg.selectAll(".hoverBox")
	.data(game.tiles)
	.enter()
	.append("rect")
	.attr("class", "hoverBox")
	.attr("stroke", "none")
	.attr("fill", "white")
	.attr("width", 20)
	.attr("height", 20)
	.attr(lastTimestamp, Date.now())
	.attr("x", function(t) { 
		return (t.id % game.cols) * 20
	})
	.attr("y", function(t) {
		return parseInt(t.id / game.cols) * 20
	})

	.on("mouseover", function(t) {
		curTile = t
		var el = d3.select(this);
		console.log(el.attr(lastTimestamp));
        if (Date.now() - el.attr(lastTimestamp) > 200){
            speakTile(t)
        }
	})
	.on("mouseout", cancelSpeech)

.on("mousedown", function(t) {
  		if(ctrlDown) {
  			markAsBomb()
  		}
  		else {
  		reveal()
  		}
  	})
// Update visual tiles
function updateD3Elements() {
	renderTiles
		.attr("d", d3.symbol()
			.type(function(t) {
			if(t.isMarked) 
				{return symbolType['marked'];}
			if(t.isRevealed && t.threatCount != 0) 
				{return symbolType['surroundingThreats'];}
			if(t.isRevealed && t.threatCount == 0) 
				{return symbolType['noThreats'];}
			return symbolType['unknown'];})
		)
		.attr(linepodVersion, svgVersionNr);
		printSVG();
}

function update() {
	updateD3Elements()
	if(game.isDead) {
		revealMines(game)
		speak("Game over")
		window.location.reload(true)
	}
	if(isSafe(game)) {
		speak("Congratulations! You won!")
		window.location.reload(true)
	}
}
