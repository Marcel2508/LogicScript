(function(){
    //USED FOR CALL LIKE TRUE/FALSE
    var s = function s(state){
        var f= {
            true:function(_fn){
                if(state==true)_fn();
                return f;
            },
            false:function(_fn){
                if(state==false)_fn();
                return f;
            },
            then:function(_fn){
                _fn(state);
                return f;
            },
            value:function(){
                return state;
            }
        };
        return f;
    }
    
    var OR = function OR(){
        for(var i=0;i<arguments.length;i++){
            if(arguments[i])return s(true);
        }
        return s(false);
    }
    
    var AND = function AND(){
        for(var i=0;i<arguments.length;i++){
            if(!arguments[i])return s(false);
        }
        return s(true);
    }
    
    var NOT = function NOT(n){
        return n?s(false):s(true);
    }
    
    var XOR = function XOR(){
        var f=0;
        for(var i=0;i<arguments.length;i++){
            if(arguments[i]){
                f++;
            }
        }
        if(f>1)return s(false);
        if(f==1)return s(true);
        else return s(false);
    }
    
    if(process)module.exports = {
        AND: AND,
        OR: OR,
        NOT: NOT,
        XOR: XOR
    };
    else{
        window.XOR=XOR;
        window.OR=OR;
        window.NOT = NOT;
        window.AND=AND;
    }
})();