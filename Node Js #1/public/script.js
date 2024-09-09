const textInput = document.getElementById("text");

function sendMessage() {
    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", "http://localhost:3000/sendMessage", true);

    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify({
        message: textInput.value
    }));

    console.log("post sent")
}