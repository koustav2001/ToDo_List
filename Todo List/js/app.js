const clear=document.querySelector('.clear')
const dateElement = document.getElementById('date')
const list = document.getElementById('list');
const input = document.getElementById('input')

//Class names

const check = "fa-check-circle"
const uncheck= "fa-circle-thin"
const line_through="lineThrough"

let LIST=[],id=0;
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
                    <p class="text" ${LINETHROUGH}>${todo}</p>
                    <i class="fa fa-trash-o de" job="delete" ${id}></i>
                   </li>  
                `;

    list.insertAdjacentHTML(position,item);
}
//add an item to the list use the enter key

document.addEventListener("keyup",function(event)
{
    if(event.keyCode == 13)
    {
        const data=input.value;
        if(data)
        {
            addTodo(data,id,false,false);
            LIST.push(
                {
                    name:data,
                    id:id,
                    done:false,
                    trash:false
                }
            );
            id++;
        }
        input.value="";
    }
});

function completeTodo(element)
{
 element.classList.toggle(check);
 element.classList.toggle(uncheck);
 element.parentNode.querySelector('.text').classList.toggle('LINETHROUGH')

LIST[element.id].done = LIST[element.id].done ?true:false;
}

function removeTodo(element)
{
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash=true;
}

list.addEventListener("click",function(event)
{
    let element = event.target;
    let elementJob=element.attributes.job.value;
    if(elementJob == 'complete')
    {
        completeTodo(element);
    }
    else if(elementJob == 'delete')
    {
        removeTodo(element);
    }
})