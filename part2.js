createClass = function (className, superClassListParameter) {

    var customClass = {
        name: className,
        objectSuperClassList: [],
        getObjectSuperClass: function () {
            return this.objectSuperClassList;

        },
        new: function () {
            console.log(this);
            console.log(superClassListParameter)
            //Populate superclass list
            if (superClassListParameter !== null) {
                if (superClassListParameter.length > 0) {
                    for (i = 0; i < superClassListParameter.length; i++) {
                        if (superClassListParameter[i].getObjectSuperClass().indexOf(customClass) !== -1) {
                            throw new DOMException("Cant use circular inheritence");
                        } else {
                            this.objectSuperClassList.push(superClassListParameter[i]);
                        }
                    }
                }
            }
            const thisInstance = this;
            let instanceSuperClassList = this.objectSuperClassList;


            let instance = {
                call: function (funcName, parameters) {
                    //Check if this customClass has the method
                    if (thisInstance.hasOwnProperty(funcName)) {
                        return thisInstance[funcName](parameters);
                    } else {
                        //Check if superclasses has method
                        if (instanceSuperClassList !== null) {
                            if (instanceSuperClassList.length > 0) {
                                for (let i = 0; i < instanceSuperClassList.length; i++) {
                                    if (instanceSuperClassList[i].new().call(funcName, parameters) !== undefined) {
                                        return instanceSuperClassList[i].new().call(funcName, parameters);
                                    }
                                }
                            }
                        }
                    }
                },
            };
            return instance;


        },
        //Cannot add superclass that introduces circular inheritance
        addSuperClass: function (object) {
            if (object.objectSuperClassList.indexOf(this) !== -1) {
                throw new DOMException("Cant use circular inheritence");
            } else {
                this.objectSuperClassList.push(object);


            }
        }
    };
    return customClass;

};

// TEST
class0 = createClass("Class0", null);
class1 = createClass("Class1", [class0]);
class2 = createClass("Class2", []);
class2.func = function (arg) {
    return "func2: " + arg;
};
class3 = createClass("Class3", [class2, class1]);
obj3 = class3.new();
result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);


