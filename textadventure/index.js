const readline = require("readline");
const chalk = require("chalk");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(story) {
    if (story.q != undefined) {
        rl.question(chalk.blue(story.q), answer => {
            console.log(chalk.yellow(answer));
            if (story.answers[answer]) {
                askQuestion(story.answers[answer]);
            } else {
                console.log(
                    chalk.red("Sorry, i don't understand. Come again...")
                );
                askQuestion(story);
            }
        });
    } else {
        rl.close();
    }
}

var story = {
    q: "Welcome to The Land Of Wizards! Would you like to play?",
    answers: {
        yes: {
            q:
                "You are alone in a dark forest and facing a fork in the road. Which direction do you turn?",
            answers: {
                left: {
                    q:
                        "There's a scary wizard! He asks you a tough question. What's 1+1?",
                    answers: {
                        "2": "congratulations!"
                    }
                },
                right: "This was not the right choice. Goodbye!"
            }
        },
        no: "Alright then. Enjoy your day!"
    }
};
askQuestion(story);
