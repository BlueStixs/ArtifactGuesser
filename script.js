var completed = [];

var charOne = Math.floor(Math.random() * (artifactList.length - 1));
var charTwo;

var score = 0;

function homePage() {
    document.location.reload();
}

function loadSite() {
    if (!localStorage.highScore) {
        localStorage.highScore = 0;
    }

    if (!localStorage.clickLink) {
        localStorage.clickLink = 0;
    }

    document.getElementById("highscore").innerHTML = "High Score: " + localStorage.highScore;
    document.getElementById("currScore").innerHTML = "Score: " + score;
}

function play() {

    clearAll();

    document.getElementById("logo").style.width = "25vh";

    // random characters    
    if (charTwo == null) {
        charTwo = generateRandom(charOne);
        fadeIn();
    } else {
        charOne = charTwo;
        charTwo = generateRandom(charOne);

        document.getElementById("image1").style.opacity = 0;
        slideLeft();
    }
    completed.push(charOne);

    makeCharInfoVisible()
    document.getElementById("image2").style.display = "none";

}

function generateRandom(charOne) {
    var charTwo = Math.floor(Math.random() * (artifactList.length - 1));

    if (charOne == charTwo || completed.includes(charTwo)) {
        var monkaW = 0;
        while (charOne == charTwo || completed.includes(charTwo)) {
            charTwo = Math.floor(Math.random() * (artifactList.length - 1))
            monkaW += 1;
            if (monkaW > 20) { //pretty sure the while loop should work fine but just in case OMEGALUL
                break;
            }
        }
    }
    //adds current character to completed
    completed.push(charTwo);

    return charTwo;
}

function addDecimals(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function checkWin(input) {
    document.getElementById("buttons").style.display = "none";

}

function changeScore(score) {
    scaleUp("currScore");
    document.getElementById("currScore").innerHTML = "Score: " + score;
    if (score > Number(localStorage.highScore)) {
        localStorage.highScore = score;
        scaleUp("highscore");
        document.getElementById("highscore").innerHTML = "High Score: " + localStorage.highScore;
    }
}

function playerWinLose(check) {
    if (score == artifactList.length - 1 || check == "lose") {
        setTimeout(function () {
            clearAll();
            //resets everything
            charOne = Math.floor(Math.random() * (artifactList.length - 1));
            charTwo = null;
            completed = [];
            score = 0;

            document.getElementById(check).style.display = "block";
            document.getElementById("finalscore").innerHTML = "Your final score: " + score;
            document.getElementById("currScore").innerHTML = "Score: " + score;
        }, 1000);
    } else {
        play();
    }
}

//If you're still reading this. STOP reading ONWARD 

function clearAll() {
    document.getElementById("logo").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.getElementById("lose").style.display = "none";
    document.getElementById("image1").style.display = "none";
    document.getElementById("image2").style.display = "none";
    document.getElementById("highscore").style.display = "none";
    document.getElementById("currScore").style.display = "none";
    document.getElementById("homeScreen").style.opacity = 0;
    setTimeout(function () {
        document.getElementById("homeScreen").style.display = "none";
    }, 300);
}
function makeCharInfoVisible() {
    document.getElementById("logo").style.display = "block";
    document.getElementById("image1").style.display = "block";
    document.getElementById("censorBar").style.display = "block";
    document.getElementById("image2").style.display = "block";
    document.getElementById("highscore").style.display = "block";
    document.getElementById("currScore").style.display = "block";
}

//animation stuff
function fadeIn() {
    document.getElementById("image1").style.opacity = 0;
    document.getElementById("image2").style.opacity = 0;
    document.getElementById("image1").src = artifactList[charOne][2];
    document.getElementById("image2").src = artifactList[charTwo][2];
    
    setTimeout(function () {
        document.getElementById("image1").style.opacity = 1;
        document.getElementById("image2").style.opacity = 1;
        setTimeout(function (){

            document.getElementById("buttons").style.display = "block";
        }, 300);
    }, 200);
}

function scaleUp(myId) {
    document.getElementById(myId).style.fontSize = "5vh";
    setTimeout(function () {
        document.getElementById(myId).style.fontSize = "3vh";
    }, 250);
}

function slideRight() {
    document.getElementById("image2").style.transform = "translateX(-60.5vh)"

}

function slideLeft() {
    setTimeout(function () {
        document.getElementById("image1").style.opacity = 1;
        document.getElementById("image2").style.opacity = 0;
        setTimeout(function () {
            document.getElementById("image1").src = artifactList[charOne][2];
        }, 100);
        setTimeout(function () {
            document.getElementById("image2").src = artifactList[charTwo][2];
            document.getElementById("image2").style.transform = "translateX(0)";
        }, 400);
        setTimeout(function () {
            document.getElementById("image2").style.opacity = 1;
            document.getElementById("buttons").style.display = "block";
        }, 1000);
    }, 400);


}