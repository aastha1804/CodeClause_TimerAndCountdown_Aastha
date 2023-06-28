var countInterval;

function startCounter() {
    var time = document.getElementById("entry").value;
    var timeParts = time.split(":");
    if (timeParts.length !== 3) {
        alert("Please enter time in HH:MM:SS format");
        clearInterval(countInterval);
        return;
    }
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);
    var seconds = parseInt(timeParts[2]);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        alert("Invalid time format");
        clearInterval(countInterval);
        return;
    }
    var totalSeconds = hours * 3600 + minutes * 60 + seconds;
    resetNumbers(totalSeconds);
    clearInterval(countInterval);
    countInterval = setInterval(function () {
        if (totalSeconds <= 0) {
            clearInterval(countInterval);
            alert("Counter has stopped");
            return;
        }
        totalSeconds--;
        updateDisplay(totalSeconds);
        }, 1000);
}
function resetTime() {
    clearInterval(countInterval);
    resetNumbers(0);
}
function resetNumbers(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    document.querySelector("#hours .current").innerText = hours.toString().padStart(2, '0');
    document.querySelector("#minutes .current").innerText = minutes.toString().padStart(2, '0');
    document.querySelector("#seconds .current").innerText = seconds.toString().padStart(2, '0');
    document.querySelector("#hours .next").innerText = hours.toString().padStart(2, '0');
    document.querySelector("#minutes .next").innerText = minutes.toString().padStart(2, '0');
    document.querySelector("#seconds .next").innerText = seconds.toString().padStart(2, '0');
}

function updateDisplay(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    updateCounter("#hours", hours);
    updateCounter("#minutes", minutes);
    updateCounter("#seconds", seconds);
}

function updateCounter(counterId, value) {
    var counter = document.querySelector(counterId);
    var current = counter.querySelector(".current");
    var next = counter.querySelector(".next");

    next.classList.add("animate");

    setTimeout(function () {
        current.innerText = value.toString().padStart(2, '0');
        next.classList.remove("animate");

        if (value === 0) {
        next.innerText = "00";
        } else {
           next.innerText = (value - 1).toString().padStart(2, '0');
        }
    }, 500);
}