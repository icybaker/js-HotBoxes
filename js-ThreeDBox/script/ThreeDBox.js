class ThreeDBox extends ClickBox{
    constructor(box,buttons,initTime,incrementTime,spin,spinSpeed,origin){
        super(box,buttons);
        this._addProperties(box,buttons,initTime,incrementTime,spin,spinSpeed,origin);
        ClickBox.attachListenerB(box.leftButton,"click",this._ev_transformLeft);
        ClickBox.attachListenerB(box.rightButton,"click",this._ev_transformRight);        
        
    }
    _addProperties(box,buttons,initTime,incrementTime,spin,spinSpeed,origin){
        box.initContent = this._initContent;
        box.index = 0;
        box.buttons = buttons;
        box.initTime = initTime;
        box.incrementTime = incrementTime;
        box.spin = spin;
        box.spinSpeed = spinSpeed;
        box.origin = origin;
    }
    _initContent(box,content){
        var items = content.children, numItems = box.numItems;
        var indexCur = box.indexCur, contentWidth = box.maxContentWidth;
        var theta = 360/numItems, initTime = box.initTime; 
        box.theta = theta;
        if(box.origin == true){
            var origin = ThreeDBox.getOrigin((theta/2)*(Math.PI/180),contentWidth/2);
            box.origin = origin;
        }
        else{var origin = box.origin;}
        box.style.perspective = "200px";
        content.style.transformStyle = "preserve-3d";

        for(var i=0;i<numItems;i++){
            items[0].style.transformStyle = "preserve-3d";
            ClickBox.centerElement(items[i]);
            TweenMax.to(items[i],initTime,{rotationY:i*theta,transformOrigin:origin});
        }
    }
    static getOrigin(phi,w){
        var originZ = -w/Math.tan(phi);
        var origin = "50% 50% " + originZ + "px";
        console.log(origin);
        return origin;
    }
    _ev_transformLeft(evt){
        var box = evt.currentTarget.parentElement, content = box.content; 
        var tl = new TimelineMax(), numItems = box.numItems; 
        var origin = box.origin, theta = box.theta, incTime = box.incrementTime;
        if(box.index == 0){
            tl.add(TweenMax.set(content,{rotationY:(theta*numItems),transformOrigin:origin}));
            box.index = numItems - 1;
        }
        else{box.index = box.index - 1;}
        tl.add(TweenMax.to(content,incTime,{rotationY:(box.index*theta),transformOrigin:origin}));
    }
    _ev_transformRight(evt){
        var box = evt.currentTarget.parentElement, content = box.content; 
        var tl = new TimelineMax(), numItems = box.numItems; 
        var origin = box.origin, theta = box.theta, incTime = box.incrementTime;
        if(box.index == numItems-1){
            tl.add(TweenMax.set(content,{rotationY:-theta,transformOrigin:origin}));
            box.index = 0;
        }
        else{box.index = box.index + 1;}
        tl.add(TweenMax.to(content,incTime,{rotationY:(box.index*theta),transformOrigin:origin}));
    }
    static initBoxes(selector,{buttons = "auto",initTime = 3,incrementTime = 1,spin = false, spinSpeed = 15, origin = true}={}){
        var boxes = document.querySelectorAll(selector), numBoxes = boxes.length;
        var threeDBoxes = new Array(numBoxes);
        if(window.ThreeDBoxes == undefined){window.ThreeDBoxes = [];} 
        for(var i=0;i<numBoxes;i++){
            threeDBoxes[i] = new ThreeDBox(boxes[i],buttons,initTime,incrementTime,spin,spinSpeed,origin);
            threeDBoxes[i].box = boxes[i];
            window.ThreeDBoxes.push(threeDBoxes[i]);
        }

        return threeDBoxes;
    }
}