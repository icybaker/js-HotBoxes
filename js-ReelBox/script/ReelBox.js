//By Joshua Wiens 22 FEB 2018
class ReelBox extends ClickBox {
    constructor(box,buttons){
        super(box,buttons);
        this._addProperties(box);
        // this._initContent(box,box.content);
        ClickBox.attachListenerB(box.leftButton,"click",this._ev_transformLeft);
        ClickBox.attachListenerB(box.rightButton,"click",this._ev_transformRight);

    }
    _addProperties(box){
        box.indexCur = 0;
        console.log(box);        
        box.itemCur = box.content.children[box.indexCur];
        box.itemNxt = box.content.children[box.indexCur];
        box.initContent = this._initContent;
        /*this method is run by ClickBox, because ClickBox alone
        will not do anything to the content. It does however, 
        expect there to be an initContent method assigned to the 
        box as a property and will call it. The reason it is done 
        this way is because ClickBox already waits until every item
        in the content container has loaded, and it is likely that
        the initialization of the content container will also be
        dependant on the loaded size of the content items, so it
        makes sense to simply call an arbitrary initContent method
        at the same time.*/

    }
    _initContent(box,content){
        var items = content.children, numItems = box.numItems; 
        var indexCur = box.indexCur, contentWidth = box.maxContentWidth;
        box.style.overflow = "hidden";        
        for(var i=0;i<numItems;i++){
            if(i != indexCur){items[i].style.display = "none";}
            else{
                items[i].style.left = ((contentWidth-items[i].clientWidth)/2)+"px";
            }
        }
    }
    _ev_transformLeft(evt){
        var box = evt.currentTarget.parentElement, content = box.content, items = content.children;
        var itemCur = box.itemCur, indexCur = box.indexCur, numItems = box.numItems;
        var W = box.maxContentWidth, wCur = itemCur.clientWidth, marginCur = (W-wCur)/2; 
        if(indexCur == numItems-1){
            var itemNxt = items[0];
            box.indexCur = 0; 
        }
        else{
            var itemNxt = items[indexCur+1];
            box.indexCur = indexCur + 1;
        }
        itemNxt.style.display = "block";
        var wNxt = itemNxt.clientWidth, marginNxt = (W-wNxt)/2;
        console.log(marginNxt);
        itemNxt.style.left = (W+marginNxt)+"px";
        
        TweenMax.to(itemCur,1,{left:-(marginCur+wCur)+"px"});
        var tlCur = new TimelineMax();
        tlCur.to(itemNxt,1,{left:marginNxt+"px"}).set(itemCur,{display:"none"});

        box.itemCur = itemNxt;
    }
    _ev_transformRight(evt){
        var box = evt.currentTarget.parentElement, content = box.content, items = content.children;
        var itemCur = box.itemCur, indexCur = box.indexCur, numItems = box.numItems;
        var W = box.maxContentWidth, wCur = itemCur.clientWidth, marginCur = (W-wCur)/2; 
        if(indexCur == 0){
            var itemNxt = items[numItems-1];
            box.indexCur = numItems - 1; 
        }
        else{
            var itemNxt = items[indexCur-1];
            box.indexCur = indexCur - 1;
        }
        itemNxt.style.display = "block";
        var wNxt = itemNxt.clientWidth, marginNxt = (W-wNxt)/2;
        console.log(marginNxt);
        itemNxt.style.left = -(marginNxt+wCur)+"px";
        
        TweenMax.to(itemCur,1,{left:(W+marginCur)+"px"});
        var tlCur = new TimelineMax();
        tlCur.to(itemNxt,1,{left:marginNxt+"px"}).set(itemCur,{display:"none"});

        box.itemCur = itemNxt;
    }
    static initReelBoxes(selector,{buttons = "auto"}={}){
        var boxes = document.querySelectorAll(selector), numBoxes = boxes.length;
        var reelBoxes = new Array(numBoxes);
        if(window.ReelBoxes == undefined){window.ReelBoxes = [];}
        for(var i=0;i<numBoxes;i++){
            reelBoxes[i] = new ReelBox(boxes[i],buttons);
            reelBoxes[i].box = boxes[i];
            window.ReelBoxes.push(reelBoxes[i]);
        }

        return reelBoxes;

    }
    static _doc(){
        var docString = `reel`;
        console.log(docString);
        return docString;
    }
}