class ThreeDBox {
    constructor(box,buttons,initTime,incrementTime,spin,spinSpeed){
        this.isMobile = this.checkMobile();
        this._createCore(box,buttons);
        this._initStyles(box);
        this._initProperties(box,initTime,incrementTime,spin,spinSpeed);
        ThreeDBox.attachListener(box.faces[0],"load",this._initGeometry);
        // box.centerElement = this.centerElement;
    }
    checkMobile(){
        var W = window.innerWidth, H = window.innerHeight;
        if((W/H)>1){return false;}
        else{return true;}
    }
    _createCore(box,buttons){
        if(buttons == "off"){
            box.faces = Array.from(box.children);
            box.rotator = document.createElement("div");
            var numFaces = box.faces.length;
            for(var i=0;i<numFaces;i++){
                box.rotator.appendChild(box.faces[i]);
            }
            box.appendChild(box.rotator);
            box.rotator.setAttribute("class","rotator");
        }
        if(buttons == "on"){
            box.faces = Array.from(box.children);
            box.rotator = document.createElement("div");
            box.buttons = {left : document.createElement("div"),right : document.createElement("div")}
            var numFaces = box.faces.length;
            for(var i=0;i<numFaces;i++){
                box.rotator.appendChild(box.faces[i]);
            }
            box.rotator.setAttribute("class","rotator");
            box.buttons.left.setAttribute("class","rotate-button-left");
            box.buttons.right.setAttribute("class","rotate-button-right");
            // console.log(box.buttons);
            box.appendChild(box.buttons.left);
            box.appendChild(box.rotator);
            box.appendChild(box.buttons.right);            
        }
        if(buttons == "user"){
            var contents = Array.from(box.children);
            box.faces = [];
            box.rotator = document.createElement("div");
            box.buttons = {left : "",right : ""};
            var numContents = contents.length;
            for(var i=0;i<numContents;i++){
                if(i == 0){
                    box.buttons.left = contents[i];
                }
                else{
                    if(i == (numFaces-2)){box.button.right = contents[i];}
                    else{
                        box.rotator.appendChild(contents[i]);
                        box.faces.push(contents[i]);
                    } 
                }
            }
            box.rotator.setAttribute("class","rotator");
            box.appendChild(box.rotator);
            // console.log(box);
        }
    }

    _initStyles(box){
        var numFaces = box.faces.length;
        console.log(box);
        if(box.clientHeight < 40 || box.clientHeight > .5*window.innerHeight){var height = .3*window.innerHeight;}
        else{var height = box.clientHeight;}
        console.log(window.innerHeight);
        console.log(height);        
        box.style.position = "relative";
        box.style.perspective = "200px";        
        box.rotator.style.position = "relative";
        box.rotator.style.transformStyle = "preserve-3d";
        // box.rotator.style.display = "inline-block";        
        box.rotator.style.height = height+"px";
         for(var i=0;i<numFaces;i++){
            box.faces[i].style.position = "absolute";
            box.faces[i].style.height = height+"px";  
            box.faces[i].style.transformStyle = "preserve-3d"; 
        } 
    }
    _initProperties(box,initTime,incrementTime,spin,spinSpeed){
        box.initTime = initTime;
        box.incrementTime = incrementTime;
        box.spin = spin;
        box.spinSpeed = spinSpeed;
    }
    static attachListener(element,action,listenerFunction){
        element.addEventListener(action,listenerFunction,false);
    }

    _initGeometry(evt){
        var box = evt.currentTarget.parentElement.parentElement, rotator = box.rotator, faces = box.faces, numFaces = faces.length;
        var maxWidth = 0;
        // console.log(faces[numFaces-1].clientWidth);
        for(var i=0;i<numFaces;i++){
            if(faces[i].clientWidth > maxWidth){maxWidth = faces[i].clientWidth;}
        }
        
        rotator.style.width = 2*maxWidth+"px";
        ThreeDBox.centerElement(rotator);
        for(i=0;i<numFaces;i++){
            ThreeDBox.centerElement(faces[i]);
        }
        ThreeDBox.init3D(box,rotator,faces,maxWidth);
    }
    static centerElement(element){
        var parent = element.parentElement, w = element.clientWidth, W = parent.clientWidth;
        element.style.left = ((W-w)/2)+"px";
    }
    static init3D(box,rotator,faces,maxWidth){
        var numFaces = faces.length, theta = 360/numFaces, origin = ThreeDBox.getOrigin((theta/2)*(Math.PI/180),maxWidth/2);
        // console.log(origin);
        for(var i=0;i<numFaces;i++){
            TweenMax.to(faces[i],box.initTime,{rotationY:(i*theta),transformOrigin:origin});
        }
        box.origin = origin;
        if(box.spin){
            var spr = 60/box.spinSpeed;
            TweenMax.to(rotator,spr,{rotationY:360,transformOrigin:origin,ease:Power0.easeNone}).repeat(-1).delay(box.initTime);
        }
    }
    static getOrigin(phi,w){
        var originZ = -w/Math.tan(phi);
        var origin = "50% 50% " + originZ + "px";
        // console.log(origin);
        return origin;
    }

    static initThreeDBoxes(selector,{buttons = "off",initTime = 3,incrementTime = 1,spin = false, spinSpeed = 15}={}){
        var boxes = document.querySelectorAll(selector), numBoxes = boxes.length;
        var threeDBoxes = new Array(numBoxes);
        if(window.ThreeDBoxes == undefined){window.ThreeDBoxes = [];} 
        for(var i=0;i<numBoxes;i++){
            threeDBoxes[i] = new ThreeDBox(boxes[i],buttons,initTime,incrementTime,spin,spinSpeed);
            threeDBoxes[i].box = boxes[i];
            window.ThreeDBoxes.push(threeDBoxes[i]);
        }

        return threeDBoxes;
    }
    static _doc(){

    }
}