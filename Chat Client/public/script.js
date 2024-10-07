ipAdress = "localhost:3000"

let ids = []
let lastUser = ""
let usernmaeInput = document.getElementById("username")
let textInput = document.getElementById("messageInput")

function getMessage() {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4){
        JSON.parse(xmlhttp.responseText).forEach(messages => {
            if (ids.includes(messages.id)) return;
            let messageBox = document.createElement("div")
            document.getElementById("message").appendChild(messageBox)
            let timestamp = new Date(messages.time * 1000);
            let year = timestamp.getFullYear();
            let month = timestamp.getMonth();
            let day = timestamp.getDate();
            let hour = timestamp.getHours();
            let minute = timestamp.getMinutes();
     
            let time = `${(hour).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}, ${year}/${(month + 1).toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
            if (lastUser === messages.username) 
                messageBox.innerHTML = (`<b>${time}</b> : ${messages.message}`)
            else
                messageBox.innerHTML = (`<b class="topSpace">${messages.username}:</b> <p class="space"><b>${time}</b> : ${messages.message}</p>`)
            ids.push(messages.id)
            lastUser = messages.username
        });
        }
    };

    xmlhttp.open("GET", `http://${ipAdress}/getMessage`, true);
    xmlhttp.send();
};

function sendMessage() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `http://${ipAdress}/sendMessage`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "message": textInput.value,
        "username": usernmaeInput.value
    }))
}

getMessage()
setInterval(getMessage, 500);