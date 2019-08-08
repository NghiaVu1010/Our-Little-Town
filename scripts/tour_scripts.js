/*
* Description: Tour list of activities to do
*
* Author: Neo
*/
"use strict";

//search through the activities with the requirements
function findActivity(list, category, day) {
    let d = new RegExp(day);
    let found = false;
    let matchedActivity = "";

    //iterate over the entire array based on requirements
    for(let i in list) {
        if((category == list[i].category) && (d.exec(list[i].days))) {
            matchedActivity = matchedActivity + activityToString(list[i]) + "\n";
            found = true;
        }
    }

    if(found == true) {
        return "Activity found - <br>" + matchedActivity;
    }
    else {
        return "No matching activities found.";
    }
}

//create a string of all activities found
function activityToString(obj) {
    let str = 
        "Category: " + obj.category +
        " Title: " + obj.title +
        " Description: " + obj.description +
        " Price: " + obj.price +
        " Days: " + obj.days +
        "<br>";
    return str;
}

window.onload = function() 
{
    let activityList = 
    [
        {category: "Sightseeing", title: "Invisible Falls", description: "Come and possibly see the Invisible Falls!", price: 29.99, days: "SA, SU"},
        {category: "Sightseeing", title: "Niagara Falls", description: "A great big ol' waterfall!", price: 49.99, days: "MO, TU, FR"},
        {category: "Sightseeing", title: "Hoover Dam", description: "This historic site is great!", price: 39.99, days: "WE, TH"},
        {category: "Adventure", title: "Ziplining the Canyons", description: "Fly across the canyons!", price: 119.99, days: "SA, SU"},
        {category: "Adventure", title: "Scuba Diving", description: "Dive into the great beyond!", price: 149.99, days: "MO, TU, FR"},
        {category: "Adventure", title: "Swamp Exploration", description: "Get down and dirty in this crocodile infested waters!", price: 45.99, days: "WE, TH"},
        {category: "MusGal", title: "Amazing Science", description: "H20 is all you need!", price: 9.99, days: "SA, SU, MO, TU"},
        {category: "MusGal", title: "Agonist Gallery", description: "It's a gallery.", price: 14.99, days: "WE, TH, FR"},
        {category: "Park", title: "Central Park", description: "Visit this beautiful park!", price: 19.99, days: "WE, TH, FR"},
        {category: "Park", title: "Stanley Park", description: "A Luscious park!", price: 24.99, days: "SA, SU, MO, TU"}
    ];

    //grab each of the values and assigns value
    let categoryField = document.getElementById("categoryField");
    let dayField = document.getElementById("dayField");

    const searchBtn = document.getElementById("searchBtn");

    searchBtn.onclick = function() {

        let category = categoryField.value;
        let day = dayField.value;

        //verifies if they didn't select an option
        if (category == '0') {
            return errorMsg1.style.display = 'block';
        }
        else {
            errorMsg1.style.display = 'none';
        }

        if (day == '0') {
            return errorMsg2.style.display = 'block';
        }
        else {
            errorMsg2.style.display = 'none';
        }

        let found = findActivity(activityList, categoryField.value, dayField.value);

        document.getElementById("foundActivity").innerHTML = found;
    };
    
    var resetBtn = document.getElementById('resetBtn');
    // Bind Click Event Handler to Reset Buttom
    resetBtn.onclick = function() {
        errorMsg1.style.display = 'none';
        errorMsg2.style.display = 'none';
        // Put cursor in first field
        document.getElementById('pickUpField').focus();
    }
};