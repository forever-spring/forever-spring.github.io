function layoutPlanner() {
    var h=window.innerHeight;
    var w=window.innerWidth;
    var target=$("#outer-grid");
    if(h<w){
        target.addClass("side");
    }
    else{
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