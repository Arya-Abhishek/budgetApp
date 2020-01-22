var budgetController = (function() {

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Internal Data Structure
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: [],
            inc: []
        }
    };




})();


var UIController = (function() {

    // Creating private data structure for class names reusabaility

    var DOMstrings = {
        inputTypes: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputTypes).value,   // will bring output as exp or inc
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };


})();

// Global App Controller
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListener = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', CtrlAddItem);

        document.addEventListener('keypress', function(event) {

        if (event.keyCode === 13 || event.which === 13) {
            CtrlAddItem();
        }

    });
    }

    var CtrlAddItem = function() {

        // 1. Get the field input data
        var z = UICtrl.getInput();
        console.log(z);

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget 

        // 5. Display the budget on the UI
        
    }   
    
    return {
        init: function() {
            console.log('application is started.');
            setupEventListener();
        } 
    }

})(budgetController, UIController);

controller.init();


























