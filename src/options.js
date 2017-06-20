var options = {'cols':15, 
               'rows':15,
               'mines':20}

var symbolType = {
	'unknown' : empty,
	'noThreats' : dot,
	'marked' : miniPlateau,
	'surroundingThreats': d3.symbolCircle
}
