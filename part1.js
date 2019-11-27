
var myObject = {
    create: function (protList) {
        var instance = {
            protList: [],

            call: function (funcName, parameters) {
                //Check if this object has the method
                if(this.hasOwnProperty(funcName)){
                    console.log(func1(this, parameters));
                    return this[funcName](this, parameters);
                } else{
                    //check other cases ie , all the objects in the list protlist
                    for (i = 0; i< protList.length; i++){
                        if(protList[i].call(funcName, parameters) != null){
                            return protList[i].call(funcName, parameters);
                        } else{

                        }

                        console.log("looping through other objects");
                    }
                }
                copy.prototype = myObject;


            }

        };
        return instance;

    }
}


//Test code

var obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
/*var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", "hello") ;*/
console.log(obj0.call("func", "hello"))
