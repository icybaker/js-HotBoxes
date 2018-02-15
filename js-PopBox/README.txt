The PopBox object allows the user to easily create elements that
"Pop" upon given mouse events. The standard PopBox operates slightly
differently from mobile to desktop.
For desktop, the PopBox will pop on mouseover and revert on 
mouseout, unless the PopBox is clicked, which freezes the 
popped styling until clicked again.
For mobile, the PopBox will toggle its popped styling simply by
clicking, since there is no such thing as mouseover.
The constructor has the following form:

constructor(box,{initColors = ["black","white"],popColors = ["white","black"]}={}){

Where the contents of the curly braces represent optional
arguments which are set using the following syntax:

{initColors:["color","backgroundColor"],popColors:["color","backgroundColor"]}

These colors default to black and white, where the popped style
is simply an inversion of the color and backgroundColor.

You can create a PopBox directly by using the 'new' operator
and providing the necessary arguments, but the recommended
procedure for initializing 1 or many PopBoxes is to use the 
PopBox's static method: initPopBoxes as follows:

PopBox.initPopBoxes(selector,{optional args});

Where selector can be any CSS selector string. Calling this 
method will create PopBoxes out of every element corresponding 
to the selector string given. Proper use of selector strings
allows the user to set different rules for different groups
of PopBoxes very efficiently.

The user may apply any CSS to the PopBox with the obivous 
exceptions of color and background-color.