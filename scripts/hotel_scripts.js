/*
* Description: Calculates room total and options
*
* Author: Neo
*/
"use strict";

//returns true/false depending on everyone can fit
function canRoomHoldCustomer(roomType, numAdults, numKids) {
    let fit = false;
    let adults = Number(numAdults);
    let kids = Number(numKids);

    //switch statement to check room vs amount of people
    switch(roomType) {
        case 'Queen':
            if(5 >= (adults + kids)) {
                fit = true;
            }
            break;
        case 'King':
            if(2 >= (adults + kids)) {
                fit = true;
            }
            break;
        case 'King Suite':
            if(4 >= (adults + kids)) {
                fit = true;
            }
            break;
        case '2-Bedroom Suite':
            if(6 >= (adults + kids)) {
                fit = true;
            }
            break;
        default:
            alert("Unexpected error.");
            break;
    }

    return fit;
}

//calculate the price of room based on room info array
function getRoomCost(roomType, checkInDate, numNights, arr) {
    let sum = 0;
    let nights = Number(numNights);

    //loop through array to see if room types match
    for(let i in arr) {
        if(roomType == arr[i].room) {
            sum = arr[i].outPrice * nights;
        }
    }

    return sum;
}

//return breakfast cost based on if included or not, free if senior
function getBreakfastCost(numAdults, numKids, numNights, code, breakfast) {
    if((breakfast) && (code == 'senior')) {
        return 0;
    }
    else if(breakfast) {
        let sum = ((Number(numAdults) * 6.96) + (Number(numKids) * 3.95)) * Number(numNights);
        return sum;
    }
    else {
        return 0;
    }
}

//calculate discount amount and return
function getDiscount(subtotal, code) {
    switch(code) {
        case 'none':
            subtotal = 0;
            break;
        case 'aaa':
            subtotal = subtotal * .10;
            break;
        case 'senior':
            subtotal = subtotal * .10;
            break;
        case 'military':
            subtotal = subtotal * .20;
            break;
    }

    return subtotal;
}

//reformat check in date by adding 1 day
function returnCheckInDate(startDate) {
    startDate = Date.parse(startDate);
    startDate = new Date(startDate + (1000 * 60 * 60 * 24));

    return startDate.toLocaleDateString();
}

//calculate the check out date
function returnCheckOutDate(startDate, numDays) {
    //get the check in date and parse it
    let d = Date.parse(startDate);
    let msec = 1000*60*60*24;

    //get the start date + amount of nights
    let duration = (Number(numDays) + 1) * msec;
    let endDate = new Date(d + duration);

    return endDate.toLocaleDateString();
}

//disables previous day from today in drop downs
function disablePreviousDays() {
    const currDate = new Date();
    const currMonth = currDate.getMonth() > 9 ? currDate.getMonth() + 1 : '0' + (currDate.getMonth() + 1);
    const currDay = currDate.getDate() > 9 ? currDate.getDate() : '0' + currDate.getDate();
    
    const dateStr = currDate.getFullYear() + '-' + currMonth + '-' + currDay;
    return dateStr;
}

window.onload = function() 
{
    //array of rooms and prices
    let roomInfo = [
        {room: "Queen", max: 5, inPrice: 250.00, outPrice: 150.00},
        {room: "King", max: 2, inPrice: 250.00, outPrice: 150.00},
        {room: "King Suite", max: 4, inPrice: 310.00, outPrice: 190.00},
        {room: "2-Bedroom Suite", max: 6, inPrice: 350.00, outPrice: 210.00}
    ];

    //grab room fields
    const checkInField = document.getElementById("checkInField");
    const nightsField = document.getElementById("nightsField");
    const roomTypeField = document.getElementById("roomTypeField");
    const breakfastBox = document.getElementById("breakfastBox");
    const adultField = document.getElementById("adultField");
    const childrenField = document.getElementById("childrenField");

    //grab error messages
    let roomMsg1 = document.getElementById("roomMsg1");
    let roomMsg2 = document.getElementById("roomMsg2");
    let roomMsg3 = document.getElementById("roomMsg3");
    let nightMsg = document.getElementById("nightMsg");
    
    //grab output fields
    let checkIn = document.getElementById("checkIn");
    let checkOut = document.getElementById("checkOut");
    let subTotal = document.getElementById("subTotal");
    let discTotal = document.getElementById("discTotal");
    let taxTotal = document.getElementById("taxTotal");
    let totalDue = document.getElementById("totalDue");
    
    checkInField.valueAsDate = new Date();
    checkInField.setAttribute('min', disablePreviousDays());

    //do calculations when button is clicked
    const calculateBtn = document.getElementById("calculateBtn");
    calculateBtn.onclick = function() {
        //required selection for discount
        let discOption = document.querySelector("input[name='discount']:checked");
        
        console.log(typeof checkInField.value);

        //check to see if they entered incorrect amount of nights
        if(nightsField.value <= 0) {
            return nightMsg.style.display = 'block';
        }
        else {
            nightMsg.style.display = 'none';
        }

        //check to see if the amount of people is greater than 6, display error msg3
        if(6 < (Number(adultField.value) + Number(childrenField.value))) {
            stayInfo.style.display = 'none';
            roomMsg2.style.display = 'none';
            return roomMsg3.style.display = 'block';
        }
        else {
            roomMsg3.style.display = 'none';
        }

        //check to see if they did not select a room
        if(roomTypeField.value == '0') {
            return roomMsg1.style.display = 'block';
        }
        else {
            roomMsg1.style.display = 'none';
        }

        //set results to fitCheck
        let fitCheck = canRoomHoldCustomer(roomTypeField.value, adultField.value, childrenField.value);

        //verifies if true, continue. if false, display error msg2
        if(fitCheck) {
            stayInfo.style.display = 'block';
            roomMsg2.style.display = 'none';
        }
        else {
            stayInfo.style.display = 'none';
            roomMsg3.style.display = 'none';
            return roomMsg2.style.display = 'block';
        }

        //customized the format
        let checkInDate = returnCheckInDate(checkInField.value);

        //get checkout date
        let checkOutDate = returnCheckOutDate(checkInField.value, nightsField.value);

        //calculate the value and return room cost
        let roomCost = getRoomCost(roomTypeField.value, checkInField.value, nightsField.value, roomInfo);

        //calculate the breakfast cost
        let breakfastCost = getBreakfastCost(adultField.value, childrenField.value, nightsField.value, discOption.value, breakfastBox.checked);

        //calculate the discount amount
        let discountCost = getDiscount(roomCost, discOption.value);

        //populate the stay info
        checkIn.value = checkInDate;
        checkOut.value = checkOutDate;
        subTotal.value = (roomCost + breakfastCost).toFixed(2);
        discTotal.value = discountCost.toFixed(2);
        let taxCost = (roomCost + breakfastCost - discountCost) * .12;
        taxTotal.value = taxCost.toFixed(2);
        totalDue.value = (roomCost + breakfastCost - discountCost + taxCost).toFixed(2);
    };
    
    var resetBtn = document.getElementById('resetBtn');
    // Bind Click Event Handler to Reset Buttom
    resetBtn.onclick = function() {
        roomMsg1.style.display = 'none';
        roomMsg2.style.display = 'none';
        roomMsg3.style.display = 'none';
        nightMsg.style.display = 'none';
        stayInfo.style.display = 'none';

        // Put cursor in First Name field
        document.getElementById('checkInField').focus();
    }
};