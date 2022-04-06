var completed = [];
var score = 0;
var charOne;

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
    document.getElementById("logo").style.width = "25vh";

    clearAll();

    // random characters    
    if (charOne == null) {
        charOne = generateRandom();
        fadeIn();
    } else {
        charOne = generateRandom();
        slideIn();


        // document.getElementById("myArtifact").style.opacity = 0;
        // slideIn();
    }


    setTimeout(function () {
        document.getElementById("censorBar").style.opacity = 1;
        setTimeout(function () {
            document.getElementById("myArtifact").src = "images/artifacts/" + charOne + ".png";
        }, 100)
    }, 200)

    setTimeout(function () {
        document.getElementById("charImage").style.visibility = "visible";
        document.getElementById("charImage").style.opacity = 1;
    }, 500);

}

function generateRandom() {
    var randomArtifact = Math.floor(Math.random() * (artifactList.length - 1));

    if (completed.includes(randomArtifact)) {
        console.log("MONKA");
        var monkaW = 0;
        while (completed.includes(randomArtifact)) {
            randomArtifact = Math.floor(Math.random() * (artifactList.length - 1))
            monkaW += 1;
            if (monkaW > 20) { //pretty sure the while loop should work fine but just in case OMEGALUL
                break;
            }
        }
    }
    //adds current character to completed
    completed.push(randomArtifact);

    return randomArtifact;
}

function checkWin(input) {


    console.log("Your Input:" + input);

    console.log("Actual:" + artifactList[charOne]);

    setTimeout(function () {
        document.getElementById("censorBar").style.opacity = 0;
    }, 300);

    //win
    if (input == artifactList[charOne]) {
        setTimeout(function () {
            score++;
            changeScore(score);
            slideUp();

            playerWinLose("win");
            setTimeout(function () {
            }, 300);
            play();
        }, 2000);
    } else {
        setTimeout(function () {
            playerWinLose("lose");
        }, 2000);
    }
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
    console.log(check);
    if (score == artifactList.length - 1 || check == "lose") {
        setTimeout(function () {
            document.getElementById("charImage").style.display = "none";
            document.getElementById("buttons").style.display = "none";

            //resets everything
            charOne = null;
            completed = [];
            score = 0;
            document.getElementById(check).style.display = "block";
            document.getElementById("finalscore").innerHTML = "Your final score: " + score;
            document.getElementById("currScore").innerHTML = "Score: " + score;
        }, 400);
    } else {
        play();
    }
}

function clearAll() {
    document.getElementById("win").style.display = "none";
    document.getElementById("lose").style.display = "none";
    document.getElementById("charImage").style.display = "block";
    document.getElementById("charImage").style.opacity = 0;
    document.getElementById("homeScreen").style.opacity = 0;
    setTimeout(function () {
        document.getElementById("homeScreen").style.display = "none";
    }, 300);
}





//animation stuff
function fadeIn() {
    document.getElementById("myArtifact").style.display = "block";
    document.getElementById("myArtifact").style.opacity = 0;

    setTimeout(function () {
        document.getElementById("myArtifact").style.opacity = 1;
        setTimeout(function () {

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

function slideUp() {
    document.getElementById("charImage").style.transform = "translateY(-20.5vh)"

}

function slideIn() {
    document.getElementById("charImage").style.opacity = "0";
    setTimeout(function () {
        document.getElementById("charImage").style.transform = "translateY(0)";
        setTimeout(function () {
            document.getElementById("charImage").style.opacity = "1";
        }, 400);
    }, 400);
}