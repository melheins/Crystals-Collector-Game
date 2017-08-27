$(document).ready(function () {

    // Creates variable to hold the number of wins
    var numWins = 0;
    // Creates variable to hold the number of losses
    var numLosses = 0;
    // Creates variable to hold computer's chosen amount
    var computerNumber = 0;
    // Creates variable to hold user's total amount
    var userNumber = 0;
    //
    var crystalValuesUsed = [];
    //
    var crystalOptions = ["assets/images/crystals-ruby.png",
        "assets/images/crystals-diamond.png",
        "assets/images/crystals-topaz.png",
        "assets/images/crystals-emerald.png"];


    //
    function getRandomWithExclusions(arrayOfIndexesToExclude) {
        var rand = null;
        while (rand === null || arrayOfIndexesToExclude.includes(rand)) {
            rand = Math.floor((Math.random() * 12) + 1);
        }
        return rand;
    }

    //
    function reset() {
        computerNumber = 0;
        userNumber = 0;
        $("#crystals").text("");
        crystalValuesUsed = [];

        //Calculate Computer Number and display on screen, with a value of 19-120
        computerNumber = Math.floor((Math.random() * 101) + 19);
        $("#comp-number").text(computerNumber);
        $("#user-number").text(userNumber);

        // CRYSTALS
        for (var i = 0; i < crystalOptions.length; i++) {
            // Create an imageCrystal
            var imageCrystal = $("<img>");

            // Add css class ".crystal-image" to image
            imageCrystal.addClass("crystal-image");

            // Each imageCrystal will be given a src link to the crystal image
            imageCrystal.attr("src", crystalOptions[i]);

            // Calculate a random crystal value with a value on 1-12
            var crystalValue = getRandomWithExclusions(crystalValuesUsed);
            // Adds new crystal value to an array so it doesnt get used again
            crystalValuesUsed.push(crystalValue);
            imageCrystal.attr("data-crystalvalue", crystalValue);
            //console.log(crystalValuesUsed);

            // Add new image to page in crystals div
            $("#crystals").append(imageCrystal);
        }
    }

    //Initialize Game
    reset();

    // Every time a crystal is clicked, at its value to user amount and check win/loss conditions
    $("div#crystals").on("click", ".crystal-image", function () {
        // Grap the specific image click's value
        console.log("test")
        var crystalValue = ($(this).attr("data-crystalvalue"));
        crystalValue = parseInt(crystalValue);
        // Add user click value to user's amount
        userNumber += crystalValue;
        $("#user-number").text(userNumber);
        if (userNumber === computerNumber) {
            numWins++;
            $("#wins").text(numWins);
            //alert("You win!");
            $('#game').addClass('hidden');
            $('#congrats').removeClass('hidden');
            //reset();
        }
        else if (userNumber >= computerNumber) {
            numLosses++;
            $("#losses").text(numLosses);
            //alert("You lose!!");
            $('#game').addClass('hidden');
            $('#gameover').removeClass('hidden');
            //reset();
        }
    });

    //
    $(".btn-restartGame").click(function () {
        $('#game').removeClass('hidden');
        $('#gameover').addClass('hidden');
        $('#congrats').addClass('hidden');
        reset();
    });
});