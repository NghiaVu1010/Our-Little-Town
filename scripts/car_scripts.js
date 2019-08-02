/*
* Description: Calculates car rental
*
* Author: Neo
*/
"use strict";

//return price based on car selection and number of days
function calculateRental(numDays, carType) {
    let sum;
    
    //calculates price based on number of days & car type
    switch(carType) {
        case '1':
            sum = numDays * 29.99;
            break;
        case '2':
            sum = numDays * 39.99;
            break;
        case '3':
            sum = numDays * 49.99;
            break;
        case '4':
            sum = numDays * 59.99;
            break;
        default:
            alert("Unexpected error.")
            break;
    }

    return Number(sum);
}

//return the cost of selected options per day
function calculateOptions(numDays, toll, gps, road) {
    let sum = 0;

    //add options selected and return cost
    if(toll){sum += 3.95 * numDays};
    if(gps){sum += 2.95 * numDays};
    if(road){sum += 3.95 * numDays};

    return sum;
}

//calculate if the renter is under 25
function calculateAgeSurcharge(numDays, carType, age) {
    //check to see if yes, then add more money
    if(age == 'yes') {
        ageMsg.style.display = 'none';
        return calculateRental(numDays, carType) * .30;
    }
    else {
        return 0;
    }
}

//calculate the return date of the car
function returnDate(numDays, startDate) {
    //get the return date for the car
    let d = Date.parse(startDate);
    let msec = 1000*60*60*24;

    let duration = (Number(numDays) + 1) * msec;
    let endDate = new Date(d + duration);

    return endDate.toDateString();
}

window.onload = function() 
{
    //grab each of the values and assigns value
    let carType = document.getElementById("carTypeField");
    let pickUp = document.getElementById("pickUpField");
    let days = document.getElementById("daysField");

    let tollTag = document.getElementById("tollTagBox");
    let gps = document.getElementById("gpsBox");
    let roadside = document.getElementById("roadsideBox");

    let rentalTotal = document.getElementById("rentalTotal");
    let optionsTotal = document.getElementById("optionsTotal");
    let underTotal = document.getElementById("underTotal");
    let ageMsg = document.getElementById("ageMsg");

    let allCosts = document.getElementById("allCosts");
    let totalDue = document.getElementById("totalDue");
    let returnDue = document.getElementById("returnDue");

    const calculateBtn = document.getElementById("calculateBtn");

    calculateBtn.onclick = function () {    
        let ageOption = document.querySelector("input[name='age']:checked");

        //verifies if they didn't select an option
        if (ageOption == undefined) {
            return ageMsg.style.display = 'block';
        }
        else {
            allCosts.style.display = 'block';
        }

        //calls each functions and catches values
        let rentDue = calculateRental(days.value, carType.value);
        let optionDue = calculateOptions(days.value, tollTag.checked, gps.checked, roadside.checked);
        let underDue = calculateAgeSurcharge(days.value, carType.value, ageOption.value);
        let returnDay = returnDate(days.value, pickUp.value);

        //populate the rental info
        rentalTotal.value = rentDue.toFixed(2);
        optionsTotal.value = optionDue.toFixed(2);
        underTotal.value = underDue.toFixed(2);

        totalDue.value = (rentDue + optionDue + underDue).toFixed(2);
        returnDue.value = returnDay;
    };
    
    var resetBtn = document.getElementById('resetBtn');

    // Bind Click Event Handler to Reset Buttom
    resetBtn.onclick = function() {
        ageMsg.style.display = 'none';
        allCosts.style.display = 'none';

        // Put cursor in first field
        document.getElementById('pickUpField').focus();
    }
};