//By Joshua Wiens 10FEB2018
class DropBox {
    constructor(box,action,actionMobile){
        this.isMobile = this.checkMobile();
        this._initProperties(box);

        if(this.isMobile){DropBox.attachListener(box.label,actionMobile,this._ev_toggleList);}
        else{DropBox.attachListener(box.label,action,this._ev_toggleList);}
        DropBox.attachListener(box.contentArea,"click",this._ev_stopPropagation);

        this._initStyle(box,box.label,box.list);
    }
    checkMobile(){
        var W = window.innerWidth, H = window.innerHeight;
        if((W/H)>1){return false;}
        else{return true;}
    }
    _initProperties(box){
        box.label = box.children[0];
        box.list = box.children[1];
        box.contentArea = this._createContentArea(box,box.label,box.list);
        if(box.label.showMenu != true){box.label.showMenu = false;}//change show menu into a method at some point        
        box.dropTransform = this._transform;
        box.hideList = this.hideList;
        box.showList = this.showList;
        box.dropIsActive = false;
    }
    _createContentArea(box,label,list){
        var contentArea = document.createElement("div");
        box.appendChild(contentArea);
        contentArea.appendChild(label);
        contentArea.appendChild(list);
        return contentArea;
    }
    _initStyle(box,label,list){
        box.style.height = "auto";        
        if(window.getComputedStyle(label,null).cursor=="auto"){label.style.cursor="default";} 
        if(!label.showMenu){list.style.display = "none";}
        // else{list.style.display = "block";}
    }
    static attachListener(element,action,listenerFunction){
        element.addEventListener(action,listenerFunction,false);
    }
    _ev_toggleList(evt){
        var box = evt.currentTarget.parentElement.parentElement, isActive = box.dropIsActive;
        box.dropTransform(box,isActive);
        
    }
    _ev_stopPropagation(evt){
        evt.stopPropagation();
    }
    static _ev_hideAllLists(evt){
        var dropBoxes = evt.currentTarget.DropBoxes, numBoxes = dropBoxes.length, box;
        for(var i=0;i<numBoxes;i++){
            box = dropBoxes[i].box;
            if(box.dropIsActive){
                box.hideList(box);
            }
        }
    
    }
    hideList(box){
        box.dropTransform(box,true);
    }
    showList(box){
        box.dropTransform(box,false);
    }
    _transform(box,isActive){
        if(isActive){
            box.list.style.display = "none"; 
            box.dropIsActive = false;           
        }
        else{
            var numSiblings = box.siblings.length;
            for(var i=0;i<numSiblings;i++){
                box.siblings[i].list.style.display = "none";
                try{box.siblings[i].label.unpop(box.siblings[i].label,true);}
                catch{console.log("label has no popTransform method");}
                box.siblings[i].dropIsActive = false;
            }
            box.list.style.display = "block";
            box.dropIsActive = true;
        }
    }
    
    static initDropBoxes(selector,{action = "click",actionMobile = "click"}={}){
        var boxes = document.querySelectorAll(selector), numBoxes = boxes.length;
        var dropBoxes = new Array(numBoxes);
        if(window.DropBoxes == undefined){window.DropBoxes = [];}
        for(var i=0;i<numBoxes;i++){
            dropBoxes[i] = new DropBox(boxes[i],action,actionMobile);
            dropBoxes[i].box = boxes[i];
            window.DropBoxes.push(dropBoxes[i]);
            
        }
        var boxParent, numChildren;
        for(i=0;i<numBoxes;i++){
            dropBoxes[i].box.siblings = [];
            boxParent = dropBoxes[i].box.parentElement;
            numChildren = boxParent.children.length;
            for(var j=0;j<numChildren;j++){
                if(dropBoxes[i].box != boxParent.children[j] && boxParent.children[j].matches(selector)){
                    dropBoxes[i].box.siblings.push(boxParent.children[j]);
                }
            }
        }       
        if(window.DropBoxes.listenerAttached == undefined){
            DropBox.attachListener(window,"click",DropBox._ev_hideAllLists);
            window.DropBoxes.listenerAttached = true;
        }        
        
        return dropBoxes;
    }
    static _doc(){
        var docString = `To use the DropBox class, you simply need to link the DropBox.js file
        into your html file. 
        To create a DropBox object, first construct the following html:
        
        <div class="drop-box">
            <div class="db-label">This is a DropBox</div>
            <div class="db-list">
                <div class="db-list-item">
                </div>
            </div>
        </div>
        
        **it is recommended to copy and paste this html into your own code
        
        The class names are arbitrary and technically unnecessary, but for
        claritie's sake, I will refer to internal DropBox elements by their
        class names above. 
        The most basic application of the DropBox object may be constructed
        as new DropBox(element),(this is not the recommended initialization
        procedure; see next paragraph) where the element must have an internal
        structure such as depicted above. After the element has been made into
        a DropBox, the db-list element will initialize to invisible, and is
        togglable by clicking on the db-label element.
        The recommended procedure for initializing DropBoxes is to give the
        root element (drop-box element here) a class name and pass its selector
        string to the static DropBox method as follows: 
        
        DropBox.initDropBoxes(".drop-box");
        
        This method call will create DropBox objects out of every element on
        the page with a class name "drop-box" and returns a list of the 
        objects created, in the order that they appear in the page.  
        
        You can set any CSS you like on any of the elements, with the 
        exception of the db-list element whose style.display property is
        controlled by the script, and the height of the drop-box element
        which is set to the height of the db-label element to keep from 
        shifting surrounding elements when toggling the list. 
        To change the way the db-list element appears when visible you can
        alter the _ev_showList method.
        
        In order to control the positioning of the DropBox, adjust the CSS of
        the drop-box element, and to change the shape and internal formatting
        adjust the CSS of the db-label element. The CSS for anything inside
        the db-list element (which can literally be anything) is completely
        free for the user to play with, assuming it's not associated with any
        other CSS shifting tools.`;
        console.log(docString);
    }
}