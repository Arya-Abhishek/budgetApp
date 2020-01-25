
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

    var calcTotal = function(type) {
        var sum = 0;
        
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });

        data.totals[type] = sum;

    };

    // Internal Data Structure
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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

        deleteItem: function(type, id) {
            var ids, index;

            //id = 6
            //data.allItems[type][id];
            //ids = [1 2 4 6 8] after deleting 6, ids = [1 2 4  8]
            //index = 3

            //creating a new array consisting of ids because we will fetch our data 
            //and delete it according to the ids array 
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function() {
            
            // calculate total income and expenses
            // Note: we are creating the total function outside return because we didn't
            // to make it public
            calcTotal('inc');
            calcTotal('exp');

            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
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
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputTypes).value,   // will bring output as exp or inc
                description: document.querySelector(DOMstrings.inputDescription).value,
                //here we have done conversion of value to integer value so as to do calc because otherwise its in 
                //string format the amount stored
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },


        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create html string with placeholder text 

            if (type == 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

                //here for the sake of simplicity and to easily search that id, description, value we are using
                //%id% etc so as to replace the desired one and not to overide anything else

            } else if (type == 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the html into DOM 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription +', '+ DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();

        },

        displayBudget: function(obj) {
            /*obj passed in the function

                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            */
           document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
           document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
           document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

           if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
           } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
           }
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

        document.querySelector(DOM.container).addEventListener('click', CtrlDeleteItem);
    };

    var updateBudget = function() {
        // created separate function to calc and update the budget 
        // as otherwise we have to again code it after remocing the element form our list

        // 1. Calculate the budget 
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var CtrlAddItem = function() {
        var input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. calculate and update budget
            updateBudget();
        };
       
    };
    
    var CtrlDeleteItem = function(event) {
        var itemID, splitId, type, Id;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID) {

            //inc-1

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item form the user interface
            UICtrl.deleteListItem(itemID);

            // 3. calculate and update then show the new budget
            updateBudget();
            // That's why we coded budget function separately so that we don't have to create 
            //the function for both addItem and deleteItem
            
        }

    };
    
    return {
        init: function() {
            console.log('application is started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
           
            setupEventListener();
        } 
    };

})(budgetController, UIController);

controller.init();


























