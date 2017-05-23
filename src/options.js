var options = {'cols':15, 
               'rows':15,
               'mines':5}

var symbolType = {
	'unknown' : empty,
	'noThreats' : dot,
	'marked' : miniPlateau,
	'surroundingThreats': d3.symbolCircle
}
