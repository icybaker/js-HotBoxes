//By Joshua Wiens 22 FEB 2018
class ClickBox {
    constructor(box,buttons){
        this.isMobile = this.checkMobile();
        this._createStructure(box,buttons);
        this._initProperties(box);
        this._initStyles(box,buttons);
        ClickBox.attachListenerC(box,"load",this._ev_adjustSizes);
    }
    checkMobile(){
        var W = window.innerWidth, H = window.innerHeight;
        if((W/H)>1){return false;}
        else{return true;}
    }
    _createStructure(box,buttons){
        var content = Array.from(box.children), contentContainer = document.createElement("div"); 
        console.log(content);
        if(buttons == "auto"){
            var leftButton = document.createElement("div"), rightButton = document.createElement("div");
            leftButton.appendChild(document.createElement("div"));
            rightButton.appendChild(document.createElement("div"));
            leftButton.children[0].innerHTML = "<b>&#8249;</b>";
            rightButton.children[0].innerHTML = "<b>&#8250;</b>";
        }
        else{
            var leftButton = content.shift(), rightButton = content.pop();
        }
        var numItems = content.length;
        for(var i=0;i<numItems;i++){
            contentContainer.appendChild(content[i]);
        }
        leftButton.setAttribute("class","left-button");
        rightButton.setAttribute("class","right-button");
        new PopBox(leftButton,["rgba(0,0,0,.6)","rgba(0,0,0,.2)"],["white","rgba(0,0,0,.6)"]);
        new PopBox(rightButton,["rgba(0,0,0,.6)","rgba(0,0,0,.2)"],["white","rgba(0,0,0,.6)"]);
        box.appendChild(contentContainer);
        box.appendChild(leftButton);
        box.appendChild(rightButton);
    }
    _initProperties(box){
        box.leftButton = box.children[1];
        box.content = box.children[0];
        box.rightButton = box.children[2];

        box.numItems = box.content.children.length;
        box.i = 0;
        box.maxContentWidth = 0;
    }
    _initStyles(box,buttons){
        //highly recommended to set the height yourself
        if(box.clientHeight < 40 || box.clientHeight > .9*window.innerHeight){var height = .3*window.innerHeight;}
        else{var height = box.clientHeight;}
        box.style.position = "relative";
        box.style.height = height+"px";
        var contentItems = box.content.children, numItems = contentItems.length;
        for(var i=0;i<numItems;i++){
            contentItems[i].style.position = "absolute";
            contentItems[i].style.height = height+"px";
        }
        if(buttons == "auto"){
            var leftB = box.leftButton, rightB = box.rightButton;
            var leftTB = box.leftButton.children[0],rightTB = box.rightButton.children[0];
            leftB.style.position = "absolute";
            leftB.style.left = "0px";
            leftB.style.top = "0px";
            leftB.style.height = "100%";
            leftB.style.width = "15%";
            leftTB.style.position = "absolute";
            leftTB.style.top = "50%";
            leftTB.style.left = "50%";
            leftTB.style.transform = "translate(-50%,-50%)";
            

            rightB.style.position = "absolute";
            rightB.style.right = "0px";
            rightB.style.top = "0px";
            rightB.style.height = "100%";
            rightB.style.width = "15%";
            rightTB.style.position = "absolute";
            rightTB.style.top = "50%";
            rightTB.style.left = "50%";
            rightTB.style.transform = "translate(-50%,-50%)";
        }
    }
    static attachListenerB(element,action,listenerFunction){
        element.addEventListener(action,listenerFunction,false);
    }
    static attachListenerC(element,action,listenerFunction){
        element.addEventListener(action,listenerFunction,true);
    }
    _ev_adjustSizes(evt){
        var box = evt.currentTarget, numItems = box.numItems;
        var contentItem = evt.target, itemWidth = contentItem.clientWidth;
        // console.log(itemWidth);
        if(itemWidth > box.maxContentWidth){box.maxContentWidth = itemWidth;}
        
        box.i++;
        if(box.i == numItems){ClickBox._initGeometry(box);}
    }
    static _initGeometry(box){
        var content = box.content, width = box.maxContentWidth;
        var leftB = box.leftButton, rightB = box.rightButton;
        var leftTB = leftB.children[0], rightTB = rightB.children[0];
        box.style.width = width+"px";
        content.style.height = "100%";
        content.style.width = "100%";

        leftTB.style.fontSize = 2*leftB.clientWidth+"px";

        rightTB.style.fontSize = 2*rightB.clientWidth+"px";
        
        
    }

    static initClickBoxes(selector,{buttons = "auto"}={}){
        var boxes = document.querySelectorAll(selector), numBoxes = boxes.length;
        var clickBoxes = new Array(numBoxes);
        if(window.ClickBoxes == undefined){window.ClickBoxes = [];}
        for(var i=0;i<numBoxes;i++){
            clickBoxes[i] = new ClickBox(boxes[i],buttons);
            clickBoxes[i].box = boxes[i];
            window.ClickBoxes.push(clickBoxes[i]);
        }

        return clickBoxes;

    }
    static _doc(){
        var docString = ``;
        console.log(docString);
        return docString;
    }
}

