function VECTOR(__size){
    this.isVector=true;
    var b = [];
    if(Array.isArray(__size))b=__size.slice().reverse();
    else if(typeof __size == "object"&&(__size!==null&&__size!==undefined))b=__size.get()
    else if(__size!==null&&__size!==undefined)b=[0,0,0,0,0,0,0,0];
    else{
        b=Array(__size);
        for(var i=b.length-1;i>=0;i--)b[i]=0;
    }
    this.do = function(_func){
        //b.forEach(function(v,i){b[i]=_func(v);});
    }
    this.get = function(bit){
        if(bit!==null&&bit!==undefined)
            return b[bit];
        else
            return b.slice();
    }
    this.count = function(){
        return b.length;
    }
    this.set = function(bit,val){
        b[bit]=val;
    }
}

module.exports = {VECTOR:VECTOR};