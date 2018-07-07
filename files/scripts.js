function layoutPlanner() {
    var h=window.innerHeight;
    var w=window.innerWidth;
    var target=$("#outer-grid");
    if(h<w){
        target.removeClass("top");
        target.addClass("side");
    }
    else{
        target.removeClass("side");
        target.addClass("top");
    }
}

function styleLink() {
    var elems=$("nav a");
    $.each(elems,(key, val)=>{
        if(window.location.href === val.href){
            val.className="selected"
        }
    });
}

function setSizePos() {
    skills=$(".skills");
    skillWrapper=skills.parents(".skillWrapper");
    frame=skillWrapper.parent();
    pos=skillWrapper.position();
    if(frame.hasClass("side")){
        skills.css("top",pos.top);
        skills.css("left",pos.left+5);
        skills.css("height",window.innerHeight);
        skills.css("width",window.innerWidth * 0.83);
    }
    if(frame.hasClass("top")){
        skills.css("top",pos.top+5);
        skills.css("left",pos.left);
        skills.css("height",frame.css("height").slice(0,-2)-205);
        skills.css("width",window.innerWidth);
    }
}

function hideSkills(e) {
    $(e.target).parent().removeClass("show");
}

function showSkills(e) {
    var skills=$(e.target).next();
    skills.addClass("show");
    setSizePos();
    skills.children("button").click(hideSkills);
}

function eduWset(itms){
    var width=itms.parent().css("width");
    width=width.slice(0,-2);
    if(Number(width) < 500){
        itms.css("width",Number(width)-2);
    }
    else{
        itms.css("width", 500);
    }
}

function goBack(){
    var showing=$(".show");
    var toShow=showing.prev();
    showing.removeClass("show");
    toShow.addClass("show");
    slider();
}
function goForward(){
    var showing=$(".show");
    var toShow=showing.next();
    showing.removeClass("show");
    toShow.addClass("show");
    slider();
}
function slider(){
    var prev=$("#prev");
    var next=$("#next");
    var wrks=$(".wrkItem");
    prev.click(goBack);
    next.click(goForward);
    console.log(wrks);
    console.log(wrks.index(".show"));
    /*console.log(wrks.length);
    console.log(wrks.index(".show"));*/
    if(wrks.index(".show")==0 && wrks.index(".show")==wrks.length-1){
        //console.log("only item");
        prev.addClass("disabled");
        next.addClass("disabled");
        prev.off("click");
        next.off("click");
    }
    else if(wrks.index(".show")==0){
        //console.log("first item");
        prev.addClass("disabled");
        next.removeClass("disabled");
        prev.off("click");
    }
    else if(wrks.index(".show")==wrks.length-1){
        //console.log("last item");
        next.addClass("disabled");
        prev.removeClass("disabled");
        next.off("click");
    }
    else{
        //console.log("middle items");
        prev.removeClass("disabled");
        next.removeClass("disabled");
    }
}

function init(){
    layoutPlanner();
    styleLink();
    if(window.location.href.indexOf("skill.html") !== -1){
        var openers=$(".skillGroup > h3");
        openers.click(showSkills);
    }
    if(window.location.href.indexOf("edu.html") !== -1){
        var itms=$(".eduItem");
        eduWset(itms);
    }
    if(window.location.href.indexOf("work.html") !== -1){
        slider();
    }
}