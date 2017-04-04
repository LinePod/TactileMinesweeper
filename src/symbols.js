var cross = {
  draw: function(context, size) {
    context.moveTo(-5,-5);
    context.lineTo(5,5);
    context.moveTo(5,-5);
    context.lineTo(-5,5);
  }
};

var dot = {
	draw: function(context, size) {
		context.moveTo(-1,0);
		context.lineTo(0,1);
		context.lineTo(1,0);
		context.lineTo(0,-1);
		context.closePath();
	}
}

var emptySymbol = {
	draw : function(context, size){;}
};
