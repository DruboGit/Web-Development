document.getElementById('rightButton').onclick = function() {
    changeDay(1)
}

document.getElementById('leftButton').onclick = function(){
    changeDay(-1)
}

function changeDay(amount) {
    let monthLastDay = new Date(window.location.href.slice(-10).slice(0,4), window.location.href.slice(-10).slice(5,7),0).getDate()
    let currentDate = window.location.href.slice(-5)
    let newDate = ""
    newDate = `${currentDate.slice(0,2)}-${Number(currentDate.slice(-2)) + amount}`
    if (Number  (newDate.slice(-2)) > monthLastDay) {
        newDate = `${Number(currentDate.slice(0,2))+1}-01`
    }
    if (newDate.length == 4) {
        newDate = newDate.slice(0,3) + "0" + newDate.slice(-1)
    }
    window.location.href = window.location.href.slice(0,window.location.href.length-5)+newDate
}