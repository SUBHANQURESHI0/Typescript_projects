import * as readline from "readline-sync"

function calculator() : void {
    console.log("=== SIMPLE CALCULATOR===")

    const num1 : number = parseFloat(readline.question("Enter the first number : "))

    const operator : string = readline.question("Enter the Operator (+, -, *, /) :")

    const num2 : number = parseFloat(readline.question("Enter the second number :"))

    let result : number;

    switch(operator){
        case "+":
            result = num1 + num2;
            break
        case "-":
            result = num1 - num2;
            break
        case "*":
            result = num1 * num2;
            break
        case "/":
            if (num2 == 0){
                console.log("Error : Division by zero is not allowed")
                return
            }
            result = num1 / num2 
            break
        default: 
           console.log("Invalid Operation")
           return     
    }
console.log(`Result: ${num1} ${operator} ${num2} = ${result} `)
}


calculator()

