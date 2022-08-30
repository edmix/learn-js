let input_name = prompt("Adinizi girin: ");

nameDOM = document.querySelector("#myName");

nameDOM.innerHTML = input_name;
nameDOM.style.textTransform = "capitalize";

function showTime() {
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    if(hour < 10) hour = "0" + hour;
    if(minute < 10) minute = "0" + minute;
    if(second < 10) second = "0" + second;
    document.querySelector("#myClock").innerHTML = hour + ":" + minute + ":" + second + "    " + date + "/" + month + "/2022"; 
    setTimeout(showTime, 1000);
}

showTime();