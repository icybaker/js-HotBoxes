The ClickBox class allows the user to generate an interactive
content box. By default, the box will take each element within
the box and place them into a "contentContainer" which is the
same size as the box itself. You can use your own buttons by 
placing elements (to be used as buttons) as first and last 
elements within the ClickBox and setting the optional buttons
variable to "user" (or actually anything other than "auto").

The automatic buttons are full height bars with corresponding
arrow characters. These bars are also PopBoxes by default, 
meaning PopBox.js is a dependancy for using the ClickBox.
As well, the latch-on-click functionality for these instances
of the PopBox class is disabled, so they will pop on mouseover
and unpop on mouseout regardless of being clicked or not.

I created the ClickBox as a foundation for other more specialized
HotBox content boxes, which are subclasses of the ClickBox class.
The idea is to use whatever you want as the content items, the
ClickBox will lay out the structure for you, and then the subclasses
provides any extra necessary styling or property setting, and most
importantly transformRight and transformLeft methods which may then
be attached to right and left buttons, respectively, via event 
listeners.   