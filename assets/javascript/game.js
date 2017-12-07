    // start hangman game!

    alert("Press ok to start game!");


    // list of different species of shark for hangman game.

    var fruitArray = ["apple", "strawberry", "peach", "grape", "banana", "cherry", "pineapple", "pear", "mango", "avocado", "grapefruit", "cantaloupe", "kiwifruit", "lemon", "watermelon", "raspberry", "papaya", "apricot", "blackberry", 'lime'];

    // using above array we choose a random word.
    var fruit = fruitArray[Math.floor(Math.random() * fruitArray.length)];


    // global variables

        var s;
        var count = 0;
        var answerArray = [];


    // filling the answer array with underscores as required
    // number of underscores correlates to the randomly selected word in the array

    function startUp() {
        for (var i = 0; i < fruit.length; i++) {
        answerArray[i] = "_";
     }

    /* // putting in a string
     s = answerArray.join(" ");
     $("#answer").text("s");*/
        }

    function letter() {
    var letter = $("#letter").val();

    if (letter.length > 0) {
        for (var i = 0; i < fruit.length; i++) {
            if (fruit[i] === letter) {
                answerArray[i] = letter;
            }
        }
        count++;
        $("#counter").text("No of clicks: " + count);
        $("#answer").text(answerArray.join(" "));
    }
    if (count > 5) {
        document.getElementById("stat").innerHTML = "You should have guessed it by now!";
    }
}


    (function () {
        "use strict";
        var availableLetters, words, guessInput, guess, guessButton, lettersGuessed, lettersMatched, output, man, letters, lives, currentWord, numLettersMatched, messages;

        function setup() {
            /* start config options */
            availableLetters = "abcdefghijklmnopqrstuvwxyz";
            lives = 5;
            words = ["apple", "strawberry", "peach", "grape", "banana", "cherry", "pineapple", "pear", "mango", "avocado", "grapefruit", "cantaloupe", "kiwifruit", "lemon", "watermelon", "raspberry", "papaya", "apricot", "blackberry", 'lime'];
            messages = {
                win: 'You win!',
                lose: 'Game over!',
                guessed: ' already guessed, please try again...',
                validLetter: 'Please enter a letter from A-Z'
            };
            /* end config options */

            lettersGuessed = lettersMatched = '';
            numLettersMatched = 0;

            /* choose a word */
            currentWord = words[Math.floor(Math.random() * words.length)];

            /* make #man and #output blank, create vars for later access */
            output = $("#output");
            man = $("#man");
            guessInput = $("#letter");

            man.text("You have " + lives +  "lives remaining");
            output.text("");

            document.getElementById("letter").value = '';

            /* make sure guess button is enabled */
            guessButton = $("guess");
            guessInput.style.display = 'inline';
            guessButton.style.display = 'inline';

            /* set up display of letters in current word */
            letters = document.getElementById("letters");
            letters.html('<li class="current-word">Current word:</li>');

            var letter, i;
            for (i = 0; i < currentWord.length; i++) {
                letter = '<li class="letter letter' + currentWord.charAt(i).toUpperCase() + '">' + currentWord.charAt(i).toUpperCase() + '</li>';
                letters.insertAdjacentHTML('beforeend', letter);
            }
        }

        function gameOver(win) {
            if (win) {
                output.text(messages.win);
                output.css('win');
            } else {
                output.text(messages.lose);
                output.classList.add('error');
            }

            guessInput.style.display = guessButton.style.display = 'none';
            guessInput.value = '';
        }

        /* Start game - should ideally check for existing functions attached to window.onload */
        window.onload = setup();

        /* buttons */
        document.getElementById("restart").onclick = setup;

        /* reset letter to guess on click */
        guessInput.onclick = function () {
            this.value = '';
        };

        /* main guess function when user clicks #guess */
        document.getElementById('hangman').onsubmit = function (e) {
            if (e.preventDefault) e.preventDefault();
            output.innerHTML = '';
            output.classList.remove('error', 'warning');
            guess = guessInput.value;

            /* does guess have a value? if yes continue, if no, error */
            if (guess) {
                /* is guess a valid letter? if so carry on, else error */
                if (availableLetters.indexOf(guess) > -1) {
                    /* has it been guessed (missed or matched) already? if so, abandon & add notice */
                    if ((lettersMatched && lettersMatched.indexOf(guess) > -1) || (lettersGuessed && lettersGuessed.indexOf(guess) > -1)) {
                        output.innerHTML = '"' + guess.toUpperCase() + '"' + messages.guessed;
                        output.classList.add("warning");
                    }
                    /* does guess exist in current word? if so, add to letters already matched, if final letter added, game over with win message */
                    else if (currentWord.indexOf(guess) > -1) {
                        var lettersToShow;
                        lettersToShow = document.querySelectorAll(".letter" + guess.toUpperCase());

                        for (var i = 0; i < lettersToShow.length; i++) {
                            lettersToShow[i].classList.add("correct");
                        }

                        /* check to see if letter appears multiple times */
                        for (var j = 0; j < currentWord.length; j++) {
                            if (currentWord.charAt(j) === guess) {
                                numLettersMatched += 1;
                            }
                        }

                        lettersMatched += guess;
                        if (numLettersMatched === currentWord.length) {
                            gameOver(true);
                        }
                    }
                    /* guess doesn't exist in current word and hasn't been guessed before, add to lettersGuessed, reduce lives & update user */
                    else {
                        lettersGuessed += guess;
                        lives--;
                        man.innerHTML = 'You have ' + lives + ' lives remaining';
                        if (lives === 0) gameOver();
                    }
                }
                /* not a valid letter, error */
                else {
                    output.classList.add('error');
                    output.innerHTML = messages.validLetter;
                }
            }
            /* no letter entered, error */
            else {
                output.classList.add('error');
                output.innerHTML = messages.validLetter;
            }
            return false;
        };
    }());

