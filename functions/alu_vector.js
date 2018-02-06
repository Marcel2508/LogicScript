(function(){
    //SETTING VARS:
    var OR, AND,NOT,XOR,VA,HA,ALU,VECTOR;
    if(process){
        var b = require("./base.js");
        var a = require("./alu.js");
        var vec = require("./vector.js");
        OR=b.OR;
        AND=b.AND;
        NOT=b.NOT;
        XOR=b.XOR;
        VA=a.VA;
        HA=a.HA;
        ALU=a.ALU;
        VECTOR = vec.VECTOR;
    }
    else{
        OR=window.OR;
        AND = window.AND;
        NOT = window.NOT;
        XOR=window.XOR;
        VA=windows.VA;
        HA=window.HA;
        ALU=window.ALU;
        vector = window.VECTOR;
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
    };

    var r = function r(fns,_tfn,_vfn,_fn){
        var l = fns.length;
        var v = [];
        if(l==0)return _fn();
        var a = 0;
        var d = function(ff){
            ff().then(function(){
                var args = arguments;
                if(a<l){
                    var rr = _tfn(fns[a],args);
                    v.push(_vfn(args,a,l));
                    a++;
                    d(rr);
                }
                else{
                    //DONE:
                    _fn(v);
                }
            });
        };
        d(_tfn(fns[0],null));
    };
    
    //
    var VA2 = function VA2(v1,v2,c){
        var args = arguments;
        return s(function(_then){
            if(args.length==3 && typeof v1 == "object" && v1!=null && v1.isVector && typeof v2 == "object" && v2 !=null && v2.isVector){
                var fnc = v1.count();
                var ak = 0;
                r(Array(v1.count()).fill(VA),
                function(func,prevargs){
                        //xi,yi,ci
                    if(prevargs==null)return func.bind(null,v1.get(ak),v2.get(ak++),c);
                    return func.bind(null,v1.get(ak),v2.get(ak++),prevargs[1]);
                },function(a,i,l){
                    if(i+1==l)return [a[0],a[1]];
                    return a[0];
                },function(res){
                    var cr = res[res.length-1][1];
                    res[res.length-1]=res[res.length-1][0];
                    _then.apply(null,[new VECTOR(res),cr]);
                });
           }
            else{
                throw new Error("WRONG ARGUMENTS");
            }
        });
    };

    /* NOT YET IMPLEMENTED!
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
    };*/
    
    if(process)module.exports = {
        VA:VA2,
        //ALU:ALU2
    };
    else{
        window.HA=HA;
        window.VA2=VA2;
        window.ALU2=ALU2
    }
})();