
//Budget Controller
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

    // maintaining internal data structure by adding item
    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            //[1 2 3 4 5] nextId = 6
            //[1 2 4 6 8] nextId = 9 , the elements stored in the array are id's

            //that's why we will create id by going to last objectin our ds and retriving 
            // its id then adding 1 to it will boe our new id
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //adding newly created obj data to our internal data structure 
            data.allItems[type].push(newItem);
            //note here we have benefit of defining of exp and inc both 
            //as type and internal data structure having same name 
            //like we dont have to use if else to add created ds into our array

            //return the new object
            return newItem;

        },

        testing: function() {
            console.log(data);
        }
    }

})();

// UI Controller
var UIController = (function() {

    // Creating private data structure for class names reusabaility

    var DOMstrings = {
        inputTypes: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputTypes).value,   // will bring output as exp or inc
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },


        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create html string with placeholder text 

            if (type == 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

                //here for the sake of simplicity and to easily search that id, description, value we are using
                //%id% etc so as to replace the desired one and not to overide anything else

            } else if (type == 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the html into DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

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
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        // 2. Add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);

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


























