const base = require("./functions/base.js");
const arithmetic = require("./functions/alu.js");
const vector = require("./functions/vector.js");
const alu_vector = require("./functions/alu_vector.js");

/*base.AND(true,true,false,true).true(()=>{
    console.log("TRUE");
}).false(()=>{
    console.log("FALSE");
});

arithmetic.HA(false,true).then((v,c)=>{
    console.log("VALUE:",v,"\nCARRY:",c);
});*/

/*
arithmetic.ALU(0,0,0,0,0,0).then(function(v,c){
    console.log("VALUE:",v,"\nCARRY:",c);
});*/


function to8bit(a){
    return [a&128,a&64,a&32,a&16,a&8,a&4,a&2,a&1];
}

function to8bitS(a){
    if(a>-129&&a<128){
        if(a<0){
            a
        }
        else
            return [a&128,a&64,a&32,a&16,a&8,a&4,a&2,a&1];
    }
    else{
        throw new Error("INVALID RANGE!");
    }
}

function from8bit(a){
    var b = 0;
    a.get(0)?b+=128:null;
    a.get(1)?b+=64:null;
    a.get(2)?b+=32:null;
    a.get(3)?b+=16:null;
    a.get(4)?b+=8:null;
    a.get(5)?b+=4:null;
    a.get(6)?b+=2:null;
    a.get(7)?b+=1:null;
    return b;
}
function from8bitS(a){
    var b = 0;
    a.get(0)?b-=128:null;
    a.get(1)?b+=64:null;
    a.get(2)?b+=32:null;
    a.get(3)?b+=16:null;
    a.get(4)?b+=8:null;
    a.get(5)?b+=4:null;
    a.get(6)?b+=2:null;
    a.get(7)?b+=1:null;
    return b;
}


alu_vector.VA(new vector.VECTOR(to8bit(77)),new vector.VECTOR(to8bit(3)),0).then((r,c)=>{
    console.log(from8bit(r),c);
});