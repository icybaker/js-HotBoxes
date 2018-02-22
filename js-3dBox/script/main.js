
var SCR_W;
var SCR_H;

function init(){
    SCR_W = window.innerWidth;
    SCR_H = window.innerHeight;
    console.log("SCR_W = " + SCR_W + ", SCR_H = " + SCR_H);
}

function centerElement(id){
    //console.log(id);
    var mT, mL;
    var el = $(id);
    //el.css({"display" : "inline-block"})
    var w = el.width(), h = el.height();
    //console.log(typeof w)
    mT = (SCR_H/2) - (h/2);
    mL = (SCR_W/2) - (w/2);
    el.css({"margin-left" : mL, "margin-top" : mT})
    console.log("w = " + w + ", h = " + h);

}

function initCube(id,rotAxisZ,setTime,imgs){
    var cubeContainer = document.getElementById(id);
    var cube = document.createElement("div");
    cube.setAttribute("class","cube-struct");
    cubeContainer.appendChild(cube);

    var faces = createFaces(imgs,cube);
    var numFaces = faces.length;

    var dTheta = 360/numFaces;
    var theta = 0;

    var origin = "50% 50% " + rotAxisZ +"px";
    
    for(i=0;i<numFaces;i++){
        TweenMax.to(faces[i],setTime,{rotationY:theta,transformOrigin:origin});
        theta += dTheta;
    }

    

}

function createFaces(imgs,cube){//make sure input is an array
    console.log("number of images to create "+imgs.length);
    var faces = new Array(imgs.length);
    for(i=0;i<imgs.length;i++){
        var img = document.createElement("img");
        img.setAttribute("src", imgs[i]);
        img.setAttribute("class", "face");
        img.setAttribute("alt", "failed to load image");
        cube.appendChild(img);
        faces[i] = img;
    }
    return faces;
    
}