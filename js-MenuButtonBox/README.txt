The MenuButtonBox is the classic 3 bar menu button that appears on
mobile sites in place of the navigation items. The default 
MenuButtonBox has 3 gray bars and a transparent background; when
clicked it will transform the bars into a white X shape and switch
the background to black. This of course may be changed via optional
parameters "initColors" and "popColors" as with the PopBox class.
The perceptive reader may wonder why the PopBox class isn't simply
applied to the MenuButtonBox class; the reason is becasue the PopBox
class expects an element containing text and manipulates the color,
and background-color properties of the element. The MenuButtonBox 
must instead manipulate the background color of parent and children
elements, so the algorithm is just so different that it's worth it
to simply build in the Pop functionality.

A key ingradient to the MenuButtonBox is still missing though, did
you notice? The menu! Unlike the case of the PopBox incompatibillity,
this is a perfect chance to apply the DropBox object, where the 
MenuButtonBox is the db-label element. 
E.g.
   <div class="drop-box">
        <div class="menu-button-box"></div>
        <div class="db-list">
            <div class="db-list-item">
            this is a db-list-item
            </div>
        </div>
    </div>
Using this method, initialize the MenuButtonBox first, because remember
the DropBox adjusts its dimensions to the dimensions of its label. so
it is imperitive that the label (or whatever is serving in the label 
position) has its dimensions set before initializing the DropBox.