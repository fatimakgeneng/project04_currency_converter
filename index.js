import inquirer from 'inquirer';
import chalk from 'chalk';
let apiLink = 'https://v6.exchangerate-api.com/v6/fe78ce5c061120f258285205/latest/PKR';
//Following ke baghair api nahi aye gi, api ka link aye ga 
//fetching Data
let fetchData = async (parameter) => {
    let fetchData = await fetch(parameter);
    let response = await fetchData.json();
    return response.conversion_rates; //.conversion_rates sirf conversion rates show karnay k liye lagaye
};
//Invoking function by storing it in the variable
let exchangeRates = await fetchData(apiLink); //await nahi lagaya tu pending aye ga
//Converting object to array
let contries = Object.keys(exchangeRates); //Object.keys is JavaScript's built in function
let firstCountry = await inquirer.prompt({
    type: 'list',
    name: 'name',
    message: 'Converting from',
    choices: contries // from above object
});
let userMoney = await inquirer.prompt({
    type: 'number',
    name: 'rupee',
    message: `Please enter the amount in ${chalk.green.bold(firstCountry.name)}:`,
});
let secondCountry = await inquirer.prompt({
    type: 'list',
    name: 'name',
    message: 'Converting to',
    choices: contries // from above object
});
//conversion rate
let conRate = `https://v6.exchangerate-api.com/v6/fe78ce5c061120f258285205/pair/${firstCountry.name}/${secondCountry.name}`;
//fetching data for conversion rate
let conRateData = async (parameter) => {
    let conRateData = await fetch(parameter);
    let response = await conRateData.json();
    return response.conversion_rate;
};
let ans = await conRateData(conRate);
let convertedRate = userMoney.rupee * ans;
console.log(`Your ${chalk.bold.greenBright(firstCountry.name)} ${chalk.bold.greenBright(userMoney.rupee)} in ${chalk.bold.greenBright(secondCountry.name)} is ${chalk.bold.greenBright(convertedRate)}`);
