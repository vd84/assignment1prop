createClass = function (className, superClassListParameter) {

    let object = {
        name: className,
        superClassList: [],
        new: function () {
            let instance = {
                call: function (funcName, parameters) {
                    console.log("fdsfds")
                    //Check if this object has the method
                    if (this.hasOwnProperty(funcName)) {
                        return this[funcName](parameters);
                    } else {
                        //Check if parents has method
                        if (this.superClassList.length > 0) {
                            for (let i = 0; i < this.superClassList.length; i++) {
                                if (this.superClassList[i].call(funcName, parameters) !== undefined) {
                                    return this.superClassList[i].call(funcName, parameters);
                                }
                            }
                        }
                    }
                },
                //Cannot add prototype that introduces circular inheritance
                addSuperClass: function (object) {
                    if (object.superClassList !== null) {
                        for (i = 0; i < object.superClassList.length; i++) {
                            console.log("in for loop")

                            if (object.superClassList.indexOf(this) !== -1) {
                                throw new DOMException("Cant use circular inheritence");
                            } else {
                                object.superClassList.push(superClassListParameter[i]);


                            }
                        }

                    }
                }

            };

            if (superClassListParameter !== null) {
                for (i = 0; i < superClassListParameter.length; i++) {
                    if (superClassListParameter[i].superClassList.indexOf(instance) !== -1) {
                        throw new DOMException("Cant use circular inheritence");
                    } else {
                        object.superClassList.push(superClassListParameter[i]);
                    }

                }
            }
            return instance;
            //Add parents to "prototypeList" if they dont introduce circular inheritance


        }
    }
    return object;

};

// TEST
var class0 = createClass("Class0", null);
class0.func0 = function (arg) {
    return "func0: " + arg;
};
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func2 = function (arg) {
    return "func2: " + arg;
};
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func2", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

