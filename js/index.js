var title = document.getElementById("title");
var titleError = document.getElementById("titleError");
var description = document.getElementById("description");
var descError = document.getElementById("descError");
var todoContainer = document.getElementById("todoContainer");
var addButton = document.getElementById("add");
var currentCard = null;
var searchInput = document.getElementById("search");

function titleValid() {
    var titleRegEx = /^[A-Za-z ]{6,}$/; 
    if (titleRegEx.test(title.value)) {
        titleError.classList.add("d-none");
        return true;
    } else {
        titleError.classList.remove("d-none");
        return false;
    }
    }

    function descValid() {
    var descRegEx = /^.{20,}$/; 
    if (descRegEx.test(description.value)) {
        descError.classList.add("d-none");
        return true;
    } else {
        descError.classList.remove("d-none");
        return false;
    }
    }

    function addTodo(event) {
        event.preventDefault();
    var isTitleValid = titleValid();
    var isDescValid = descValid();

    if (isTitleValid && isDescValid) {
        if (currentCard) {
            var cardTitle = currentCard.querySelector("h3");
            var cardDescription = currentCard.querySelector("p");

            cardTitle.textContent = title.value;
            cardDescription.textContent = description.value;

            addButton.textContent = "Add";
            currentCard = null;
            alert("Todo updated successfully!");
            title.value = "";
        description.value = "";
        } else {
            var card = document.createElement("div");
        card.className = ("todoCard py-4 px-3");
        
        var row = document.createElement("div");
        row.classList.add("row");

        var col9 = document.createElement("div");
        col9.className = ("col-9");

        var cardTitle = document.createElement("h3");
        cardTitle.textContent = title.value;
        col9.appendChild(cardTitle);

        var cardDescription = document.createElement("p");
        cardDescription.textContent = description.value;
        col9.appendChild(cardDescription);

        var col3 = document.createElement("div");
        col3.className = ("col-3 actions");

        // ! check function
        var check = document.createElement("a");
        check.href = "#";
        var checkIcon = document.createElement("i");
        checkIcon.className = "fa-solid fa-check";
        check.appendChild(checkIcon);

        check.addEventListener("click", function () {
            card.style.backgroundColor = "#4caf50";
            cardTitle.style.textDecoration = "line-through";
            cardDescription.style.textDecoration = "line-through";
        });
        }
        

        // edit function
        var edit = document.createElement("a");
        edit.href = "#";
        var editIcon = document.createElement("i");
        editIcon.className = "fa-solid fa-pencil";
        edit.appendChild(editIcon);
        edit.addEventListener("click", function () {
            title.value = cardTitle.textContent;
            description.value = cardDescription.textContent;
            addButton.textContent = "Update";
                currentCard = card;
        });

        // delete function
        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        var deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash";
        deleteLink.appendChild(deleteIcon);
        
        deleteLink.addEventListener("click", function () {
            currentCard = card;
            card.remove();
            alert("Todo deleted successfully!");
        });

        col3.appendChild(check);
        col3.appendChild(edit);
        col3.appendChild(deleteLink);

        row.appendChild(col9);
        row.appendChild(col3);

        card.appendChild(row);

        todoContainer.appendChild(card);



        title.value = "";
        description.value = "";

        console.log("Todo added successfully!");
        alert("Todo added successfully!");
    } else {
        console.log("Validation failed.");
    }
}
// search function 
        function searchTodos() {
            var searchInput = document.getElementById("search").value.toLowerCase();
            var cards = todoContainer.querySelectorAll(".todoCard");
        
            cards.forEach(function (card) {
                var cardTitle = card.querySelector("h3").textContent.toLowerCase();
        
                if (cardTitle.includes(searchInput)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none"; 
                }
            });
        }