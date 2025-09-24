import readline from "readline-sync"


// Step 1 : Define Difficulty levek
enum Difficulty {
    Easy = "Easy",
    Medium  = "Medium",
    Hard = "Hard"
}
// Step 2: Set of rules for each difficulty level
const difficultyConfig : Record<Difficulty, {min:number, max:number, attempts: number}> = {
    [Difficulty.Easy] : {min : 1, max : 10, attempts:7},
    [Difficulty.Medium] : {min : 1, max : 50, attempts : 5},
    [Difficulty.Hard] : {min : 1, max : 100, attempts : 3},
}
// Step 3: Blueprint of each result
interface GameResult{
    round : number
    difficulty : Difficulty
    success : boolean
    attemptUsed : number
    score : number
}
// Step 4 : Function to generate a random number
function getRandomNumber(min : number, max : number) : number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// Step 5 : Play one round of the game 
function playRound(round : number, difficulty:Difficulty):GameResult{
    const {min, max, attempts} = difficultyConfig[difficulty];
    const randomNumber = getRandomNumber(min,max);
    let remainAttempts = attempts;
    console.log(`\n Round ${round} - Difficulty : ${difficulty}`)
    console.log(`I have chosen a number between ${min} and ${max}. You have ${attempts} attempts.`)

    while(remainAttempts > 0){
        const guess = parseInt(readline.question(`Enter your guess (Attempts Left : ${attempts} attempts)`))
        if(guess === randomNumber){
        console.log(`Congratulations! you have won this round`)
        return{
            round,
            difficulty,
            success: true,
            attemptUsed : attempts - remainAttempts + 1 ,
            score : 10,
        }
    } else if(guess > randomNumber){
        console.log("Too High")
    } else {
        console.log("Too Low")
    }
      remainAttempts --
    }
   
      console.log(`Out of Attempts! the correct number was ${randomNumber}`) 
   
    

    return{
        round,
        difficulty,
        success : false,
        attemptUsed : attempts,
        score : 0
    }
}
//  Step 6 : Ask player to choose difficulty 
function selectDifficulty(): Difficulty{
    const choices = Object.values(Difficulty)
    const index = readline.keyInSelect(choices, "Choose a difficulty level: ", {cancel : false})
    return choices[index] as Difficulty
}
// Step 7 : main game loop
function main() : void{
    console.log("Welcome to the Multi-round Number Guessing Game!");
    let round = 1;
    const results : GameResult[] = [];

    let playAgain : string | boolean = true
    while(playAgain){
        const difficulty = selectDifficulty()
        const result = playRound(round, difficulty)
        results.push(result)
                                        //    0
        const totalScore = results.reduce((sum,r)=>sum + r.score, 0)
        console.log(`Current Score : ${totalScore}`);

        playAgain = readline.keyInYN("Do you want to play another round? ");
        round ++
    }

    console.log("\n Game Summary : ");
    results.forEach((res)=>{
        console.log(`Round ${res.round} | Difficulty ${res.difficulty} 
            | ${res.success ? "Win": "Lose"} | Attempts : ${res.attemptUsed}
            | Score : ${res.score}`)      
    })
    const finalScore = results.reduce((sum,r)=> sum + r.score, 0)
    console.log(`Final Score for all the rounds: ${finalScore}`)
    console.log("Thank You for Playing")
}

// Calling the main function
main()