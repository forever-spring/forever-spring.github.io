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
    skills.children("button").off("click");
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

function createProgress(){
    var wrks=$(".wrkItem");
    var progress=$("#progress");
    var nwrks=wrks.length;
    progress.html("");
    for(var i=0;i<nwrks;i++){
        progress.append(`<p class="progressNode" id="Node${i}"></p>`);
    }
    $("#Node0").addClass("highlighted");
}
function findInd(jqobj,select){
    let res;
    jqobj.each((ind,elem)=>{
        if($(elem).hasClass(select)){
            res=ind;
        }
    });
    return res;
}
function goBack(){
    var wrks=$(".wrkItem");
    var showing=findInd(wrks,"show");
    if(showing>0){
        $(wrks[showing]).removeClass("show");
        $(wrks[showing-1]).addClass("show");
        $("#Node"+`${showing}`).removeClass("highlighted");
        $("#Node"+`${showing-1}`).addClass("highlighted");
    }
    slider();
}
function goForward(){
    var wrks=$(".wrkItem");
    var showing=findInd(wrks,"show");
    if(showing<wrks.length-1){
        $(wrks[showing]).removeClass("show");
        $(wrks[showing+1]).addClass("show");
        $("#Node"+`${showing}`).removeClass("highlighted");
        $("#Node"+`${showing+1}`).addClass("highlighted");
    }
    slider();
}
function slider(){
    var prev=$("#prev");
    var next=$("#next");
    var wrks=$(".wrkItem");
    var showInd=findInd(wrks,"show");
    prev.off("click");
    next.off("click");
    prev.click(goBack);
    next.click(goForward);
    if(showInd==0 && showInd==wrks.length-1){
        prev.addClass("disabled");
        next.addClass("disabled");
        prev.off("click");
        next.off("click");
    }
    else if(showInd==0){
        prev.addClass("disabled");
        next.removeClass("disabled");
        prev.off("click");
    }
    else if(showInd==wrks.length-1){
        next.addClass("disabled");
        prev.removeClass("disabled");
        next.off("click");
    }
    else{
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
        createProgress();
        slider();
    }
}