let myObject = {
    create: function (protListParameter) {
        let instance = {
            parentprototypeList: protListParameter,
            prototypeList: [],
            call: function (funcName, parameters) {
                //Check if this object has the method
                if (this.hasOwnProperty(funcName)) {
                    return this[funcName](parameters);
                } else {
                    //Check if parents has method
                    if (this.prototypeList.length > 0) {
                        for (let i = 0; i < this.prototypeList.length; i++) {
                            if (this.prototypeList[i].call(funcName, parameters) !== undefined) {
                                return this.prototypeList[i].call(funcName, parameters);
                            }
                        }
                    }
                }
            },
            //Cannot add prototype that introduces circular inheritance
            addPrototype: function (myObject) {
                if (myObject.prototypeList !== null) {

                    if (myObject.prototypeList.indexOf(this) !== -1) {
                        throw new DOMException("Cant use circular inheritence");
                    } else {
                        instance.prototypeList.push(myObject);


                    }


                }
            }

        };
        //Add parents to "prototypeList" if they dont introduce circular inheritance
        if (protListParameter !== null) {
            for (i = 0; i < protListParameter.length; i++) {
                if (protListParameter[i].prototypeList.indexOf(instance) !== -1) {
                    throw new DOMException("Cant use circular inheritence");
                } else {
                    instance.prototypeList.push(protListParameter[i]);
                }

            }
        }

        return instance;
    }

};


//Test code

var obj0 = myObject.create(null);
obj0.func = function (arg) {
    return "func0: " + arg;
};
var obj1 = myObject.create([obj0]);
obj0.addPrototype(obj1);
var obj2 = myObject.create([]);

var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

var obj0 = myObject.create(null);
obj0.func = function (arg) {
    return "func0: " + arg;
};
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);

var obj3 = myObject.create([obj2, obj1]);
//obj0.addProtoType(obj1);
var result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);


obj0 = myObject.create(null);
obj0.func = function (arg) {
    return "func0: " + arg;
};
result = obj0.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

