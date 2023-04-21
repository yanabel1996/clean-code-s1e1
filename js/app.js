//Problem: User interaction does not provide the correct results.
//TODO: Add interactivity so the user can manage daily tasks.
// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");
var addButton=document.querySelector(".add");
var incompleteTaskHolder=document.getElementById("incomplete-tasks");
var completedTasksHolder=document.getElementById("completed-tasks");

var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    var checkBox=document.createElement("input");

    var label=document.createElement("label");

    var editInput=document.createElement("input");

    var editButton=document.createElement("button");

    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");

    label.innerText=taskString;
    label.className='task-title';

    listItem.className = "item";

    checkBox.type="checkbox";
    checkBox.className="checkbox";
    editInput.type="text";
    editInput.className="task";

    editButton.innerText="Edit";
    editButton.classList.add("edit", "button");

    deleteButton.classList.add("delete", "button");
    deleteButtonImg.src='./asserts/remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.task');
    var label=listItem.querySelector(".task-title");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("item--edit");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("item--edit");
};


var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem);

}


var taskCompleted=function(){
    console.log("Complete Task...");

    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");

    //When the checkbox is unchecked
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");

    var checkBox=taskListItem.querySelector(".checkbox");
    var editButton=taskListItem.querySelector(".edit");
    var deleteButton=taskListItem.querySelector(".delete");

    editButton.onclick=editTask;

    deleteButton.onclick=deleteTask;

    checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}


//Issues with usability don't get seen until they are in front of a human tester.

//TODO: prevent creation of empty tasks.

//TODO: Change edit to save when you are in edit mode.