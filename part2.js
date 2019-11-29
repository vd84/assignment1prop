createClass = function (className, superClassList) {

    var object = {
        name: className,
        superClasses: superClassList,
        new: function () {



            var instance = {
                call: function (funcName, parameters) {
                    if(this.hasOwnProperty(funcName)){
                        return this[funcName](parameters);


                    } else {
                        //Check if parents has method
                        if (this.superClasses.length !== null) {
                            for (let i = 0; i < this.superClasses.length; i++) {
                                if (this.superClasses[i].call(funcName, parameters) !== undefined) {
                                    return this.superClasses[i].call(funcName, parameters);
                                }
                            }
                        };
                        return instance;

                    }

                    
                }
            };


        }



    }
    
};

// TEST
var class0 = createClass("Class0", null);
class0.func0 = function(arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func2 = function(arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func2", ["hello"]);
