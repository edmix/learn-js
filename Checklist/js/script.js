let ulDOM = document.querySelector("#list");

if (localStorage.getItem("items") == null) {
    var items = [];
    items.push(JSON.stringify({ text: "3 Litre Su İç", crossed: false }));
    items.push(JSON.stringify({ text: "En Az 5 Saat Kodlama Yap", crossed: true }));
    items.push(JSON.stringify({ text: "Yemek Yap", crossed: false }));
    items.push(JSON.stringify({ text: "50 Sayfa Kitap Oku", crossed: false }));
    items.push(JSON.stringify({ text: "Ödevleri Yap", crossed: false }));
    localStorage.setItem("items", JSON.stringify(items));
}

newElement = (e) => {
    e.preventDefault();
    let itemDOM = document.querySelector("#task");
    if (itemDOM.value.trim() == null || itemDOM.value.trim() == "") {
        showToaster(document.querySelector(".toast.error"));
    }
    else {
        let liDOM = document.createElement("li");
        liDOM.innerHTML = itemDOM.value;
        liDOM.setAttribute('onclick', 'crossElement(this)')

        let spanDOM = document.createElement('span');
        spanDOM.setAttribute("class", "hide");

        checkDOM = document.createElement("i");
        checkDOM.setAttribute("class", "fa-solid fa-check mx-1");
        spanDOM.appendChild(checkDOM);

        let btnDOM = document.createElement("button");
        btnDOM.setAttribute('class', 'btn-close ms-auto');
        btnDOM.setAttribute('aria-label', 'Close');
        btnDOM.setAttribute('onclick', 'removeElement(event, this)');

        liDOM.appendChild(btnDOM);
        liDOM.prepend(spanDOM);

        items = JSON.parse(localStorage.getItem("items"));
        items.push(JSON.stringify({ text: itemDOM.value, crossed: false }));
        localStorage.setItem("items", JSON.stringify(items));

        ulDOM.prepend(liDOM);
        showToaster(document.querySelector(".toast.success"));
    }
    itemDOM.value = "";
}

var pushElement = (item) => {
    let liDOM = document.createElement("li");
    liDOM.innerHTML = item.text;
    liDOM.setAttribute('onclick', 'crossElement(this)')

    let spanDOM = document.createElement('span');
    spanDOM.setAttribute("class", "hide m-3");
    checkDOM = document.createElement("i");
    checkDOM.setAttribute("class", "fa-solid fa-check mx-1");
    spanDOM.appendChild(checkDOM);

    let btnDOM = document.createElement("button");
    btnDOM.setAttribute('class', 'btn-close ms-auto');
    btnDOM.setAttribute('aria-label', 'Close');
    btnDOM.setAttribute('onclick', 'removeElement(event, this)');

    liDOM.appendChild(btnDOM);
    liDOM.prepend(spanDOM);
    ulDOM.prepend(liDOM);
    if (item.crossed) {
        liDOM.click();
    }
}

removeElement = (e, th) => {
    e.preventDefault();

    items = JSON.parse(localStorage.getItem("items"));
    let innerText = th.parentElement.textContent;
    items = items.filter(item => JSON.parse(item).text != innerText);

    localStorage.setItem("items", JSON.stringify(items));

    ulDOM.removeChild(th.parentElement);
}

crossElement = (th) => {
    let spanDOM = th.querySelector("span");
    if (th.style.textDecoration != "line-through") {
        th.style.textDecoration = "line-through";
        th.style.backgroundColor = "#B1E1FF";
        spanDOM.setAttribute("class", "show");

        items = JSON.parse(localStorage.getItem("items"));
        for (let i = 0; i < items.length; i++) {
            if (JSON.parse(items[i]).text == th.textContent) {
                item = JSON.parse(items[i]);
                item.crossed = true;
                items[i] = JSON.stringify(item);
                localStorage.setItem("items", JSON.stringify(items));
                break;
            }
        }

    }
    else {
        th.style.textDecoration = "none";
        th.style.backgroundColor = "";
        spanDOM.setAttribute("class", "hide");

        for (let i = 0; i < items.length; i++) {
            if (JSON.parse(items[i]).text == th.textContent) {
                item = JSON.parse(items[i]);
                item.crossed = false;
                items[i] = JSON.stringify(item);
                localStorage.setItem("items", JSON.stringify(items));
                break;
            }
        }
    }
}

items = JSON.parse(localStorage.getItem("items"));

for (item of items) {
    pushElement(JSON.parse(item));
}


for (li of ulDOM.children) {
    li.setAttribute('onclick', 'crossElement(this)');
}

for (btn of document.querySelectorAll(".btn-close")) {
    btn.setAttribute('onclick', 'removeElement(event, this)');
}

for (toast of document.querySelectorAll("#liveToast")) {
    toast.setAttribute("onclick", "hideToaster(this);")
}

hideToaster = (th) => {
    console.log("clicked");
    if (th.getAttribute('class') == "toast success show") {
        th.setAttribute('class', "toast success hide");
    }
    if (th.getAttribute('class') == "toast error show") {
        th.setAttribute('class', "toast error hide");
    }
}

showToaster = (th) => {
    console.log("clicked");
    if (th.getAttribute('class') == "toast success hide") {
        th.setAttribute('class', "toast success show");
    }
    if (th.getAttribute('class') == "toast error hide") {
        th.setAttribute('class', "toast error show");
    }
}



function submitOnEnter(event) {
    if (event.code == "Enter") {
        newElement(event);
    }
}

document.querySelector("input#task").addEventListener("keypress", submitOnEnter);