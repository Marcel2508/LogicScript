(function(){
    //SETTING VARS:
    var OR, AND,NOT,XOR;
    if(process){
        var b = require("./base.js");
        OR=b.OR;
        AND=b.AND;
        NOT=b.NOT;
        XOR=b.XOR;
    }
    else{
        OR=window.OR;
        AND = window.AND;
        NOT = window.NOT;
        XOR=window.XOR;
    }
    //END SETTING VARS
    
    var s = function s2(_exfn){
        var tc = null;
        var ar = null;
        var f= {
            then:function(_tfn){
                
                if(ar){
                    _tfn.apply(null,ar);
                }
                else{
                    tc=_tfn;
                }
                return f;
            }
        };
        _exfn(function(){
            if(tc){
                tc.apply(null,arguments);
            }
            else{
                ar=arguments;
            }
        });
        return f;
    };

    function m(fns,_fn){
        var l = fns.length;
        var v = [];
        if(l==0)return _fn();
        var f=function(_afn){
            _afn().then(function(val){
                v.push(val);
                l--;
                if(l==0)_fn.apply(null,v);
            });
        };
        fns.forEach(f);
    }
    
    var HA = function HA(){
        var args = arguments;
        return s(function(_then){
            if(args.length==2){
                //VALUE, CARRY
                return _then(XOR.apply(null,args).value(),AND.apply(null,args).value());
            }
            else{
                throw new Error("INVALID ARGUMENT COUNT!");
            }
        });
    };
    var VA = function VA(){
        var args = arguments;
        return s(function(_then){
            if(args.length==3){
                HA(args[0],args[1]).then(function(v1,c1){
                    HA(v1,args[2]).then(function(v2,c2){
                        //Value, Carry
                        return _then(v2,OR(c1,c2).value());
                    });
                });
            }
            else{
                throw new Error("INVALID ARGUMENT COUNT!");
            }
        });
    };

    //D, A, B, C, X, Y
    var ALU = function ALU(d,a,b,c,x,y){
        var args = arguments;
        return s(function(_then){
            if(args.length==6){
                m([
                    AND.bind(null,NOT(d).value(),NOT(a).value(),NOT(b).value(),y),
                    AND.bind(null,NOT(d).value(),NOT(a).value(),b,NOT(y).value()),
                    AND.bind(null,a,y),
                    AND.bind(null,NOT(y).value(),b),
                    AND.bind(null,d,c)
                ],function(a1,a2,a3,a4,a5){
                    //ALL DONE
                    m([
                        OR.bind(null,a1,x,a2),
                        OR.bind(null,a3,a4)
                    ],
                    function(o1,o2){
                        VA(o1,o2,a5).then(function(v,c){
                            //VALUE, CARRY
                            return _then(v,c);
                        });
                    });
                });
            }
            else{
                throw new Error("INVALID ARGUMENT COUNT");
            }
        });
    };
    
    if(process)module.exports = {
        HA:HA,
        VA:VA,
        ALU:ALU
    };
    else{
        window.HA=HA;
        window.VA=VA;
        window.ALU=ALU
    }
})();