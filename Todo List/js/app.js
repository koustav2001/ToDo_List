const clear=document.querySelector('.clear')
const dateElement = document.getElementById('date')
const list = document.getElementById('list');
const input = document.getElementById('input')

//Class names

const check = "fa-check-circle";
const uncheck= "fa-circle-thin";
const line_through="lineThrough";

let LIST=[],id=0;

//get item from local storage
let data = localStorage.getItem("TODO");
// add item to the local storage(must be written everywhere where we update the LIST)
localStorage.setItem("TODO",JSON.stringify(LIST));

if(data)
{
 //id data is present parse it
 LIST=JSON.parse(data);
 id=LIST.length; //set id to the last one of the list
 loadList(LIST);//load list to user interface
}
else
{
//if data is not present
 LIST=[];
 id=0;
}

function loadList(array)
{
    array.forEach(item => {
        addTodo(item.name,item.id,item.done,item.trash);
    });
}

clear.addEventListener("click",function()
{
    localStorage.clear();
    location.reload();
})

const options = {weekday:"long",month:"short",day:"numeric"};

const today=new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US",options);

function addTodo(todo,id,done,trash)
{
    if(trash)
    {
        return;
    }
    const DONE= done?check:uncheck;
    const LINETHROUGH = done?line_through:"";

    const position="beforeend";
    const item = `<li class="item">
                     <i class="fa ${DONE} co" job="complete" ${id}></i>
                    <p class="text ${LINETHROUGH}">${todo}</p>
                    <i class="fa fa-trash-o de" job="delete" ${id}></i>
                   </li>  
                `;

    list.insertAdjacentHTML(position,item);
}

//addTodo("Cofee",0,true,false);
//add an item to the list use the enter key

document.addEventListener("keyup",function(event)
{
    if(event.keyCode == 13)
    {
        const toDo=input.value;
        if(toDo)
        {
            addTodo(toDo,id,false,false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            // add item to the local storage(must be written everywhere where we update the LIST)
            localStorage.setItem("TODO",JSON.stringify(LIST));

            id++;
        }
        input.value="";
    }
});

function completeTodo(element)
{
 element.classList.toggle(check);
 element.classList.toggle(uncheck);
 element.parentNode.querySelector(".text").classList.toggle(line_through);

   LIST[element.id].done = LIST[element.id].done ?true:false;
}

function removeTodo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash=true;
}

list.addEventListener("click",function(event)
{
    let element = event.target;//return clicked element inside the list
    let elementJob=element.attributes.job.value;//complete or delete
    if(elementJob == 'complete')
    {
        completeTodo(element);
    }
    else if(elementJob == 'delete')
    {
        removeTodo(element);
    }
    // add item to the local storage(must be written everywhere where we update the LIST)
    localStorage.setItem("TODO",JSON.stringify(LIST));
})
