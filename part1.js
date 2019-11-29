var myObject = {
    create: function (protList) {
        var instance = {
            protList: [],
            call: function (funcName, parameters) {
                //Check if this object has the method
                if (this.hasOwnProperty(funcName)) {
                    return this[funcName](parameters);
                } else {
                    if (protList != null) {
                        for (i = 0; i < protList.length; i++) {
                            if (protList[i].call(funcName, parameters) != null) {
                                return protList[i].call(funcName, parameters);
                            }
                        }
                    }

                }

            }
        }
        return instance;
    }

}


//Test code
var obj0 = myObject.create(null);
obj0.func = function (arg) {
    return "func0: " + arg;
};
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function (arg) {
    return "func2: " + arg;
};
var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

obj0 = myObject.create(null);
obj0.func = function (arg) {
    return "func0: " + arg;
};
obj1 = myObject.create([obj0]);
obj2 = myObject.create([]);
obj3 = myObject.create([obj2, obj1]);
result = obj3.call("test", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

obj0 = myObject.create(null);
obj0.func = function (arg) {
    return "func0: " + arg;
};
result = obj0.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);
