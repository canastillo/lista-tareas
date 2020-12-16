var btnAdd = document.getElementById("btnAdd");
var btnDelete = document.getElementById("btnDelete");
var val;

btnAdd.addEventListener("click", addTask);
btnDelete.addEventListener("click", deleteFinishedTasks);
window.addEventListener("load", isEmpty());

function addTask(){
    var task = document.getElementById("bar");

    if (task.value == '') alert("¡Escribe una tarea!");
    else{

        var list = document.getElementById("list");
        
        var element = document.createElement("li"), //li
        box = document.createElement("input"),      //checkbox
        pha = document.createElement("input"),      //caja tarea
        content = task.value,                       //tarea
        icons = document.createElement("div"),      //iconos
        save = document.createElement("input");     //guardar
        
        var editIcon = '<i class="fas fa-pencil-alt" id="edit" onClick="editTask(this)"></i>',
        deleteIcon = '<i class="fas fa-trash" id="delete" onClick="deleteTask(this.parentNode.parentNode,this.parentNode.parentNode.parentNode)"></i>';
        
        box.setAttribute("type", "checkbox");
        pha.setAttribute("type", "text");
        box.setAttribute("onchange", "check(this, this.parentNode);");
        
        pha.setAttribute("value", content);
        pha.setAttribute("readonly", true);
        pha.classList.add("text");
        
        icons.classList.add("icons");
        icons.innerHTML = editIcon + deleteIcon;
        
        save.setAttribute("type", "button");
        save.setAttribute("value", "Guardar");
        save.setAttribute("onclick", "saveTask(this)");
        save.classList.add("btnSave");
        save.classList.add("hidden");
        
        element.appendChild(box);
        element.appendChild(pha);
        element.appendChild(icons);
        element.appendChild(save);
        element.classList.add("task");
        
        list.appendChild(element);
        isEmpty();
        
        task.value = "";
        task.focus();
    }
}

function isEmpty(){
    var notif = document.getElementById("notif");
    var list = document.getElementById("list");
    var e = list.children.length == 0 ? true : false;

    if(e){
        notif.classList.add("empty");
        notif.classList.remove("noempty");
    }
    else{
        notif.classList.remove("empty");
        notif.classList.add("noempty");
    }
}

function check(chb, li){
    if (chb.checked){
        li.children[1].classList.add("done");
        btnDelete.classList.remove("hidden");
    }
     else{
        li.children[1].classList.remove("done");
        if (!checkFinishedTasks()) btnDelete.classList.add("hidden")
    }
}

function editTask(icon){
    var text = icon.parentNode.parentNode.children[1]; //<input text>
    text.classList.add("editing");
    text.toggleAttribute("readonly");
    text.focus();

    val = text.value;
    text.value = '';
    text.value = val;

    editingTask(icon);
}

function deleteTask(li, ul){
    ul.removeChild(li);
    isEmpty();
}

function editingTask(icon){
    icon.parentNode.classList.add("hidden");
    icon.parentNode.parentNode.children[3].classList.remove("hidden");
}

function saveTask(btn){
    if (btn.parentNode.children[1].value != ""){
        btn.parentNode.children[1].toggleAttribute("readonly");
        btn.parentNode.children[1].classList.remove("editing");
        btn.parentNode.children[2].classList.remove("hidden");
        btn.classList.add("hidden");
    }
    else{
        alert("No puedes dejar una tarea vacía");
        btn.parentNode.children[1].focus();
        btn.parentNode.children[1].value = val;
    }
}

function deleteFinishedTasks(){
    var list = document.getElementById("list");
    var tasks = [].slice.call(list.children);
    
    tasks.forEach( task =>{
        if(task.children[1].classList.contains("done")) 
        list.removeChild(task);
    })

    if (!checkFinishedTasks()) btnDelete.classList.add("hidden")
    isEmpty();
}

function checkFinishedTasks(){
    var list = document.getElementById("list");
    for(var  i=0; i<list.children.length; i++){
        if(list.children[i].children[1].classList.contains("done")) return true;
    }
    
    return false;
}