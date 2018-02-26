Preface: The word HotBox, here, could be replaced with any of the
object types within the HotBox Suite. Documentation for specific
HotBox types is mentioned several time below to be available via
a static method called _doc. A call to this method appears as 
follows:
    HotBox._doc();
But replace "HotBox" with whatever you're using. 
e.g. PopBox._doc();
The method will both return the documentation as a formatted string
and automatically print it to the console. This is especially useful
for creating the html structure for some relatively complex HotBoxes
as the base html block is copy and pastable from the _doc string. 

The HotBox Suite is a library of Javascript objects (HotBoxes)
designed to help streamline the creation of certain effect while
offering maximum flexibility to the user. All HotBox classes are
designed to effect only the style properties necessary to perform 
the intended task; any user CSS defined that is already under the 
control of the script will simply be overwritten, and most of the
time it wouldn't make sense to set these values anyway. 

In general, to create a HotBox a user must create a corresponding
html structure of divs, which may be obtained either in that class's 
README file or by calling the HotBox's static _doc method and printing 
the output. 

Once the html structure is created, the parent (outermost) div is 
given identification in the form of either an id or class. 
Then, at the bottom of the page in a <script> block, the HotBox's
static initBoxes method is called with (at least) a CSS selector
string as its input. This method will create a HotBox object out of
each of the elements with the given selector. You can call this method
as many times as you like in order to initialize different groups of
HotBoxes with different properties.

As mentioned, the only required argument to initialize a HotBox (or
several) is a single selector string. However, all HotBox objects
come with several optional input arguments, oftentimes for the sake
of controlling those CSS properties that are taken over by the script.
The specific arguments available for each type of HotBox may be obtained,
again, in the README for that specific HotBox or by calling its _doc 
method. For all HotBoxes, the syntax for setting optional arguments
is equivalent to the definition of a JS "Object".
i.e.
{some-property-name : some-value, some-other-property-name : some-other-value}
Where the "some-property-name" is the optional argument that you want to set
(it should be just the variable name, no quotes), and "some-value" is obviously
what you want to pass to that argument. The reason for this procedure is to 
allow for setting any number of optional variables, in any order (this is known
as named argument setting, as opposed to positional arguments). Arguments that
are not set are given a default value such that the objects are functional 
regardless of any omitted optional arguments.

Responsive Menu Hiding
Often a user would want to use the MenuButtonBox object as the button you press
to display a menu that collapses during mobile use. To do this, you can simply
use a MenuButtonBox as the label of a DropBox. The MenuButtonBox already defaults
to disappearing for desktop use, but it must also disable the standard functionality
of its DropBox Parent. I.e. it must ensure that the menu container it toggles during
mobile use will not be hidden for desktop use for any reason.