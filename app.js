var budgetController = (function() {

    var x = 23;
    
    var add = function(b) {
        return x + b;
    }

    return {
        publicTest: function(a) {
            return add(a);
        }
    }

})();


var UIController = (function() {

    //some code 


})();


var controller = (function(budgetCtrl, UICtrl){

    var z = budgetCtrl.publicTest(5);

    return {
        anotherPublicTest: function() {
            console.log(z);
        }
    }

})(budgetController, UIController);


























