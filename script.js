let currentStatusFilter = "All";

let currentFavoriteFilter = "All";


function addTask() {

    let input =
        document.getElementById("taskInput");

    let task =
        input.value.trim();

    let priority =
        document.getElementById("priorityInput").value;

    let category =
        document.getElementById("categoryInput").value;

    let dueDate =
        document.getElementById("dueDateInput").value;


    if (task == "") {

        alert("Please enter a task");

    }
    else {

        createTask(
            task,
            false,
            priority,
            category,
            dueDate,
            false
        );

        input.value = "";

        document.getElementById(
            "priorityInput"
        ).value = "Medium";

        document.getElementById(
            "categoryInput"
        ).value = "College";

        document.getElementById(
            "dueDateInput"
        ).value = "";

        saveTasks();

        applyFilters();
    }
}


function createTask(
    task,
    completed = false,
    priority = "Medium",
    category = "College",
    dueDate = "",
    favorite = false
) {

    let li =
        document.createElement("li");

    li.dataset.dueDate = dueDate;

    li.dataset.favorite = favorite;


    let checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = completed;


    let taskText =
        document.createElement("span");

    taskText.className = "task-text";

    taskText.innerText = task;


    let priorityText =
        document.createElement("span");

    priorityText.className =
        "priority " +
        priority.toLowerCase();

    priorityText.innerText = priority;


    let categoryText =
        document.createElement("span");

    categoryText.className = "category";

    categoryText.innerText = category;


    let dueDateText =
        document.createElement("span");

    dueDateText.className = "due-date";


    updateDueDateDisplay(
        dueDateText,
        dueDate,
        completed
    );


    let buttonContainer =
        document.createElement("span");

    buttonContainer.className =
        "task-buttons";


    /* Favorite Button */

    let favoriteButton =
        document.createElement("button");

    favoriteButton.className =
        "favorite-button";

    if (favorite == true) {

        favoriteButton.innerText = "★";

    }
    else {

        favoriteButton.innerText = "☆";
    }


    favoriteButton.onclick =
        function(event) {

            event.stopPropagation();


            if (
                li.dataset.favorite == "true"
            ) {

                li.dataset.favorite = "false";

                favoriteButton.innerText = "☆";

            }
            else {

                li.dataset.favorite = "true";

                favoriteButton.innerText = "★";
            }


            saveTasks();

            applyFilters();
        };


    /* Edit Button */

    let editButton =
        document.createElement("button");

    editButton.innerText = "Edit";


    editButton.onclick =
        function(event) {

            event.stopPropagation();


            let newTask =
                prompt(
                    "Edit task name:",
                    taskText.innerText
                );


            if (
                newTask == null ||
                newTask.trim() == ""
            ) {

                return;
            }


            let newPriority =
                prompt(
                    "Enter priority (High, Medium, Low):",
                    priorityText.innerText
                );


            if (newPriority == null) {

                return;
            }


            newPriority =
                newPriority.trim();


            if (
                newPriority != "High" &&
                newPriority != "Medium" &&
                newPriority != "Low"
            ) {

                alert(
                    "Priority must be High, Medium, or Low."
                );

                return;
            }


            let newCategory =
                prompt(
                    "Enter category (College, DSA, Project, Personal):",
                    categoryText.innerText
                );


            if (newCategory == null) {

                return;
            }


            newCategory =
                newCategory.trim();


            if (
                newCategory != "College" &&
                newCategory != "DSA" &&
                newCategory != "Project" &&
                newCategory != "Personal"
            ) {

                alert(
                    "Please enter a valid category."
                );

                return;
            }


            let newDueDate =
                prompt(
                    "Enter due date (YYYY-MM-DD) or leave empty:",
                    li.dataset.dueDate
                );


            if (newDueDate == null) {

                return;
            }


            taskText.innerText =
                newTask.trim();


            priorityText.innerText =
                newPriority;


            priorityText.className =
                "priority " +
                newPriority.toLowerCase();


            categoryText.innerText =
                newCategory;


            li.dataset.dueDate =
                newDueDate.trim();


            updateDueDateDisplay(
                dueDateText,
                li.dataset.dueDate,
                checkbox.checked
            );


            updateCount();

            saveTasks();

            applyFilters();
        };


    /* Delete Button */

    let deleteButton =
        document.createElement("button");

    deleteButton.innerText = "Delete";


    deleteButton.onclick =
        function(event) {

            event.stopPropagation();

            li.remove();

            updateCount();

            saveTasks();

            applyFilters();
        };


    /* Checkbox */

    checkbox.onchange =
        function() {

            if (checkbox.checked) {

                li.classList.add(
                    "completed"
                );

            }
            else {

                li.classList.remove(
                    "completed"
                );
            }


            updateDueDateDisplay(
                dueDateText,
                li.dataset.dueDate,
                checkbox.checked
            );


            updateCount();

            saveTasks();

            applyFilters();
        };


    /* Buttons */

    buttonContainer.appendChild(
        favoriteButton
    );

    buttonContainer.appendChild(
        editButton
    );

    buttonContainer.appendChild(
        deleteButton
    );


    /* Task */

    li.appendChild(checkbox);

    li.appendChild(taskText);

    li.appendChild(priorityText);

    li.appendChild(categoryText);

    li.appendChild(dueDateText);

    li.appendChild(buttonContainer);


    if (completed == true) {

        li.classList.add(
            "completed"
        );
    }


    document
        .getElementById("taskList")
        .appendChild(li);


    updateCount();
}


/* Due Date */

function updateDueDateDisplay(
    element,
    dueDate,
    completed
) {

    element.innerText = "";

    element.classList.remove(
        "overdue"
    );


    if (dueDate == "") {

        return;
    }


    element.innerText =
        "Due: " +
        formatDate(dueDate);


    if (completed == false) {

        let today =
            getTodayString();


        if (dueDate < today) {

            element.innerText +=
                " - Overdue";

            element.classList.add(
                "overdue"
            );
        }
    }
}


function getTodayString() {

    let today =
        new Date();

    let year =
        today.getFullYear();

    let month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    let day =
        String(
            today.getDate()
        ).padStart(2, "0");


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );
}


function formatDate(date) {

    let parts =
        date.split("-");


    return (
        parts[2] +
        "/" +
        parts[1] +
        "/" +
        parts[0]
    );
}


/* Dashboard */

function updateCount() {

    let list =
        document.getElementById(
            "taskList"
        ).children;


    let totalTasks =
        list.length;

    let completedTasks =
        0;

    let overdueTasks =
        0;


    for (
        let i = 0;
        i < list.length;
        i++
    ) {

        let checkbox =
            list[i].querySelector(
                "input[type='checkbox']"
            );


        if (checkbox.checked) {

            completedTasks++;
        }


        let dueDate =
            list[i].dataset.dueDate;


        if (
            dueDate != "" &&
            dueDate < getTodayString() &&
            checkbox.checked == false
        ) {

            overdueTasks++;
        }
    }


    let pendingTasks =
        totalTasks -
        completedTasks;


    document.getElementById(
        "taskCount"
    ).innerText =
        "Total Tasks: " +
        totalTasks +
        " | Completed: " +
        completedTasks;


    document.getElementById(
        "totalNumber"
    ).innerText =
        totalTasks;


    document.getElementById(
        "completedNumber"
    ).innerText =
        completedTasks;


    document.getElementById(
        "pendingNumber"
    ).innerText =
        pendingTasks;


    document.getElementById(
        "overdueNumber"
    ).innerText =
        overdueTasks;


    updateProgress(
        totalTasks,
        completedTasks
    );
}


function updateProgress(
    totalTasks,
    completedTasks
) {

    let progress = 0;


    if (totalTasks > 0) {

        progress =
            Math.round(
                (completedTasks /
                    totalTasks) * 100
            );
    }


    document.getElementById(
        "progressFill"
    ).style.width =
        progress + "%";


    document.getElementById(
        "progressText"
    ).innerText =
        progress + "%";
}


/* Save */

function saveTasks() {

    let tasks = [];

    let list =
        document.getElementById(
            "taskList"
        ).children;


    for (
        let i = 0;
        i < list.length;
        i++
    ) {

        let checkbox =
            list[i].querySelector(
                "input[type='checkbox']"
            );


        let taskText =
            list[i].querySelector(
                ".task-text"
            );


        let priorityText =
            list[i].querySelector(
                ".priority"
            );


        let categoryText =
            list[i].querySelector(
                ".category"
            );


        let task = {

            text:
            taskText.innerText,

            completed:
            checkbox.checked,

            priority:
            priorityText.innerText,

            category:
            categoryText.innerText,

            dueDate:
            list[i].dataset.dueDate,

            favorite:
                list[i].dataset.favorite == "true"
        };


        tasks.push(task);
    }


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


/* Load */

function loadTasks() {

    let savedTasks =
        localStorage.getItem(
            "tasks"
        );


    if (savedTasks != null) {

        let tasks =
            JSON.parse(
                savedTasks
            );


        for (
            let i = 0;
            i < tasks.length;
            i++
        ) {

            let priority =
                tasks[i].priority;


            if (priority == null) {

                priority = "Medium";
            }


            let category =
                tasks[i].category;


            if (category == null) {

                category = "College";
            }


            let dueDate =
                tasks[i].dueDate;


            if (dueDate == null) {

                dueDate = "";
            }


            let favorite =
                tasks[i].favorite;


            if (favorite == null) {

                favorite = false;
            }


            createTask(
                tasks[i].text,
                tasks[i].completed,
                priority,
                category,
                dueDate,
                favorite
            );
        }
    }


    updateCount();

    applyFilters();
}


/* Clear All */

function clearAll() {

    let confirmDelete =
        confirm(
            "Are you sure you want to delete all tasks?"
        );


    if (
        confirmDelete == true
    ) {

        document
            .getElementById(
                "taskList"
            )
            .innerHTML = "";


        updateCount();

        saveTasks();

        applyFilters();
    }
}


/* Clear Completed */

function clearCompleted() {

    let list =
        document.getElementById(
            "taskList"
        ).children;


    let completedFound =
        false;


    for (
        let i = list.length - 1;
        i >= 0;
        i--
    ) {

        let checkbox =
            list[i].querySelector(
                "input[type='checkbox']"
            );


        if (checkbox.checked) {

            completedFound = true;

            list[i].remove();
        }
    }


    if (completedFound == false) {

        alert(
            "There are no completed tasks."
        );

        return;
    }


    updateCount();

    saveTasks();

    applyFilters();
}


/* Status Filters */

function showAll() {

    currentStatusFilter = "All";

    applyFilters();
}


function showActive() {

    currentStatusFilter = "Active";

    applyFilters();
}


function showCompleted() {

    currentStatusFilter = "Completed";

    applyFilters();
}


/* Search */

function searchTasks() {

    applyFilters();
}


/* Category */

function filterByCategory() {

    applyFilters();
}


/* Favorite */

function filterByFavorite() {

    currentFavoriteFilter =
        document.getElementById(
            "favoriteFilter"
        ).value;

    applyFilters();
}


/* Main Filter */

function applyFilters() {

    let search =
        document.getElementById(
            "searchInput"
        ).value.toLowerCase();


    let selectedCategory =
        document.getElementById(
            "categoryFilter"
        ).value;


    let list =
        document.getElementById(
            "taskList"
        ).children;


    for (
        let i = 0;
        i < list.length;
        i++
    ) {

        let taskText =
            list[i]
                .querySelector(
                    ".task-text"
                )
                .innerText
                .toLowerCase();


        let taskCategory =
            list[i]
                .querySelector(
                    ".category"
                )
                .innerText;


        let checkbox =
            list[i].querySelector(
                "input[type='checkbox']"
            );


        let isFavorite =
            list[i].dataset.favorite ==
            "true";


        let matchesSearch =
            taskText.includes(search);


        let matchesCategory =
            selectedCategory == "All" ||
            taskCategory == selectedCategory;


        let matchesStatus =
            true;


        if (
            currentStatusFilter == "Active"
        ) {

            matchesStatus =
                checkbox.checked == false;
        }


        if (
            currentStatusFilter == "Completed"
        ) {

            matchesStatus =
                checkbox.checked == true;
        }


        let matchesFavorite =
            currentFavoriteFilter == "All";


        if (
            currentFavoriteFilter ==
            "Favorite"
        ) {

            matchesFavorite =
                isFavorite;
        }


        if (
            matchesSearch &&
            matchesCategory &&
            matchesStatus &&
            matchesFavorite
        ) {

            list[i].style.display =
                "list-item";

        }
        else {

            list[i].style.display =
                "none";
        }
    }
}


/* Sort */

function getPriorityValue(
    priority
) {

    if (
        priority == "High"
    ) {

        return 1;
    }


    if (
        priority == "Medium"
    ) {

        return 2;
    }


    return 3;
}


function sortTasks() {

    let sortType =
        document.getElementById(
            "sortInput"
        ).value;


    let taskList =
        document.getElementById(
            "taskList"
        );


    let tasks =
        Array.from(
            taskList.children
        );


    if (
        sortType == "default"
    ) {

        applyFilters();

        return;
    }


    if (
        sortType == "priority"
    ) {

        tasks.sort(
            function(a, b) {

                let priorityA =
                    a.querySelector(
                        ".priority"
                    ).innerText;


                let priorityB =
                    b.querySelector(
                        ".priority"
                    ).innerText;


                return (
                    getPriorityValue(
                        priorityA
                    ) -
                    getPriorityValue(
                        priorityB
                    )
                );
            }
        );
    }


    if (
        sortType == "date"
    ) {

        tasks.sort(
            function(a, b) {

                let dueA =
                    a.dataset.dueDate;


                let dueB =
                    b.dataset.dueDate;


                if (dueA == "") {

                    return 1;
                }


                if (dueB == "") {

                    return -1;
                }


                return dueA.localeCompare(
                    dueB
                );
            }
        );
    }


    for (
        let i = 0;
        i < tasks.length;
        i++
    ) {

        taskList.appendChild(
            tasks[i]
        );
    }


    saveTasks();

    applyFilters();
}


/* Reset Filters */

function resetFilters() {

    currentStatusFilter = "All";

    currentFavoriteFilter = "All";


    document.getElementById(
        "searchInput"
    ).value = "";


    document.getElementById(
        "categoryFilter"
    ).value = "All";


    document.getElementById(
        "favoriteFilter"
    ).value = "All";


    document.getElementById(
        "sortInput"
    ).value = "default";


    applyFilters();
}


/* Dark Mode */

function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );


    let darkMode =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "darkMode",
        darkMode
    );


    updateThemeButton();
}


function updateThemeButton() {

    let button =
        document.getElementById(
            "themeButton"
        );


    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        button.innerText = "☀️";

    }
    else {

        button.innerText = "🌙";
    }
}


function loadTheme() {

    let savedTheme =
        localStorage.getItem(
            "darkMode"
        );


    if (
        savedTheme == "true"
    ) {

        document.body.classList.add(
            "dark-mode"
        );
    }


    updateThemeButton();
}


/* Export */

function exportTasks() {

    let savedTasks =
        localStorage.getItem(
            "tasks"
        );


    if (
        savedTasks == null ||
        savedTasks == "[]"
    ) {

        alert(
            "There are no tasks to export."
        );

        return;
    }


    let blob =
        new Blob(
            [savedTasks],
            {
                type: "application/json"
            }
        );


    let url =
        URL.createObjectURL(blob);


    let link =
        document.createElement("a");


    link.href = url;

    link.download =
        "my-todo-tasks.json";


    link.click();


    URL.revokeObjectURL(url);
}


/* Import */

function importTasks(event) {

    let file =
        event.target.files[0];


    if (!file) {

        return;
    }


    let reader =
        new FileReader();


    reader.onload =
        function(e) {

            try {

                let importedTasks =
                    JSON.parse(
                        e.target.result
                    );


                if (
                    !Array.isArray(
                        importedTasks
                    )
                ) {

                    throw new Error(
                        "Invalid file"
                    );
                }


                localStorage.setItem(
                    "tasks",
                    JSON.stringify(
                        importedTasks
                    )
                );


                document
                    .getElementById(
                        "taskList"
                    )
                    .innerHTML = "";


                loadTasks();


                alert(
                    "Tasks imported successfully!"
                );

            }
            catch (error) {

                alert(
                    "Invalid task file."
                );
            }
        };


    reader.readAsText(file);

    event.target.value = "";
}


/* Start App */

loadTasks();

loadTheme();


document
    .getElementById("taskInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (
                event.key == "Enter"
            ) {

                addTask();
            }

        }
    );