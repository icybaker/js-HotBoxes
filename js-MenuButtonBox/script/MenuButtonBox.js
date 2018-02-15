class MenuButtonBox {
    constructor(box,desktopOff,initColors,popColors){
        this.isMobile = this.checkMobile();
        this._initProperties(box,initColors,popColors);
        
        
        if(!this.isMobile && desktopOff){
/*if NOT mobile (desktop) and you do want the button to be invisible*/
            box.style.display = "none";
            box.showMenu = true;//tell DropBox list to default to visible
        }
        else{
/* In the case of mobile, or user set desktopOff:true */
            this._initButtonStyles(box,box.buttonColors);
            this._initBars(box,box.barColors);
            MenuButtonBox.attachListener(box,"click",this._ev_togglePop);
            MenuButtonBox.attachListener(box,"click",this._ev_stopPropagation);
            box.showMenu = false;
        }
    }
    checkMobile(){
        var W = window.innerWidth, H = window.innerHeight;
        if((W/H)>1){return false;}
        else{return true;}
    }
    _initProperties(box,initColors,popColors){
        box.buttonColors = [initColors[0],popColors[0]];
        box.barColors = [initColors[1],popColors[1]];
        box.menubuttonIsActive = false;
    }
    _initButtonStyles(box,buttonColors){
        if(window.getComputedStyle(box,null).position == "static"){
            box.style.position = "relative";
        }
        if(window.getComputedStyle(box,null).height == "0px"){
            box.style.height = "40px";
        }
        box.style.width = box.style.height;
        box.style.backgroundColor = buttonColors[0];
        box.menuButtonTransform = this._transform;
    }
    _initBars(box,barColors){
        box.bars = [document.createElement("div"),document.createElement("div"),document.createElement("div")];
        for(var i=0;i<3;i++){
            box.appendChild(box.bars[i]);
        }
        this._initBarStyles(box.bars,barColors);
    }
    _initBarStyles(bars,barColors){
        for(var i=0;i<3;i++){
            bars[i].style.position = "absolute";
            bars[i].style.height = "12%";
            bars[i].style.width = "80%";
            bars[i].style.top = ((i+1)*16+i*12)+"%";
            bars[i].style.left = "10%";
            bars[i].style.backgroundColor = barColors[0];
        }
        
    }
    static attachListener(element,action,listenerFunction){
        element.addEventListener(action,listenerFunction,false);
    }
    _ev_togglePop(evt){
        var box = evt.currentTarget, bars = box.bars, isActive = box.menubuttonIsActive;
            box.menuButtonTransform(box,isActive);
    }
    _ev_stopPropagation(evt){
        evt.stopPropagation();
    }
    static _ev_unpopAll(evt){
        var menuButtonBoxes = evt.currentTarget.MenuButtonBoxes, numBoxes = menuButtonBoxes.length, box;
        for(var i=0;i<numBoxes;i++){
            box = menuButtonBoxes[i].box;
            if(box.menubuttonIsActive){
            box.menuButtonTransform(box,box.menubuttonIsActive)
            } 
        }

        
    }
    _transform(box,isActive){
        var bars = box.bars;
        if(isActive){
            box.style.backgroundColor = box.buttonColors[0];
            for(var i=0;i<3;i++){
                bars[i].style.backgroundColor = box.barColors[0];
            }

            TweenMax.to(bars[0],.5,{rotationZ:0,transformOrigin:"50% 50% 0%"});
            TweenMax.to(bars[2],.5,{rotationZ:0,transformOrigin:"50% 50% 0%"});

            TweenMax.to(bars[0],.5,{top:"16%"}).delay(.5);
            TweenMax.set(bars[1],{display:"block"}).delay(.5);
            TweenMax.to(bars[2],.5,{top:"72%"}).delay(.5);

            box.menubuttonIsActive = false;
        }
        else{
            box.style.backgroundColor = box.buttonColors[1];
            for(var i=0;i<3;i++){
                bars[i].style.backgroundColor = box.barColors[1];
            }

            TweenMax.to(bars[0],.5,{top:"44%"});
            TweenMax.set(bars[1],{display:"none"});
            TweenMax.to(bars[2],.5,{top:"44%"});

            TweenMax.to(bars[0],.5,{rotationZ:45,transformOrigin:"50% 50% 0%"}).delay(.5);
            TweenMax.to(bars[2],.5,{rotationZ:-45,transformOrigin:"50% 50% 0%"}).delay(.5);
            
            box.menubuttonIsActive = true;
        }
    }
    static initMenuButtonBox(selector,{desktopOff = true,buttonColor1 = "transparent",buttonColor2 = "black",barColor1 = "darkgray",barColor2 = "white",initColors = [buttonColor1,barColor1],popColors=[buttonColor2,barColor2]}={}){
        var boxes = document.querySelectorAll(selector), numBoxes = boxes.length;
        var menuButtonBoxes = new Array(numBoxes);
        if(window.MenuButtonBoxes == undefined){window.MenuButtonBoxes = [];} 
        for(var i=0;i<numBoxes;i++){
            menuButtonBoxes[i] = new MenuButtonBox(boxes[i],desktopOff,initColors,popColors);
            menuButtonBoxes[i].box = boxes[i];
            window.MenuButtonBoxes.push(menuButtonBoxes[i]);
        }
        if(window.MenuButtonBoxes.listenerAttached == undefined){
            MenuButtonBox.attachListener(window,"click",MenuButtonBox._ev_unpopAll);
            window.MenuButtonBoxes.listenerAttached = true;            
        }

        return menuButtonBoxes;
    }
    static _doc(){
        var docString = `The MenuButtonBox is the classic 3 bar menu button that appears on
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
        position) has its dimensions set before initializing the DropBox.`;
        console.log(docString);
        return docString;
    }
}