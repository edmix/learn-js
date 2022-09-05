let ulDOM = document.querySelector("#list");


newElement = (e) => {
    e.preventDefault();
    let itemDOM = document.querySelector("#task");
    if(itemDOM.value.trim() == null || itemDOM.value.trim() == "")
    {
        showToaster(document.querySelector(".toast.error"));
    }
    else
    {
        let btnDOM = document.createElement("button");
        btnDOM.setAttribute('class', 'btn-close ms-auto');
        btnDOM.setAttribute('aria-label', 'Close');

        let spanDOM = document.createElement('span');
        spanDOM.setAttribute("class", "hide");
        spanDOM.innerHTML = "✔";
        
        btnDOM.setAttribute('onclick', 'removeElement(event, this)');
        let liDOM = document.createElement("li");
        liDOM.innerHTML = itemDOM.value;
        liDOM.setAttribute('onclick', 'crossElement(this)')
        liDOM.appendChild(btnDOM);
        liDOM.prepend(spanDOM);
        ulDOM.prepend(liDOM);
        showToaster(document.querySelector(".toast.success"));
    }   
    itemDOM.value = "";
}

for(li of ulDOM.children)
{
    li.setAttribute('onclick', 'crossElement(this)');
}

for(btn of document.querySelectorAll(".btn-close"))
{
    btn.setAttribute('onclick', 'removeElement(event, this)');
}

for(toast of document.querySelectorAll("#liveToast"))
{
    toast.setAttribute("onclick", "hideToaster(this);")
}

hideToaster = (th) => {
    console.log("clicked");
    if(th.getAttribute('class') == "toast success show")
    {
        th.setAttribute('class', "toast success hide");
    }
    if(th.getAttribute('class') == "toast error show")
    {
        th.setAttribute('class', "toast error hide");
    }
}

showToaster = (th) => {
    console.log("clicked");
    if(th.getAttribute('class') == "toast success hide")
    {
        th.setAttribute('class', "toast success show");
    }
    if(th.getAttribute('class') == "toast error hide")
    {
        th.setAttribute('class', "toast error show");
    }
}

removeElement = (e, th) => {
    e.preventDefault();
    ulDOM.removeChild(th.parentElement);
}

crossElement = (th) => {
    let spanDOM = th.querySelector("span");
    if(th.style.textDecoration != "line-through")
    {
        th.style.textDecoration = "line-through";
        th.style.backgroundColor = "cadetblue";
        spanDOM.setAttribute("class", "show");
    }
    else 
    {
        th.style.textDecoration = "none";
        th.style.backgroundColor = "";
        spanDOM.setAttribute("class", "hide");
    }
}