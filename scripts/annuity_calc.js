/*
* Description: Calculates annuity payment
*
* Author: Neo
*
* @param discountRate (Number) - The discount rate for Annuity
* @param annuityRate (Number) - Calculations done to get the end rate
* @param annuityPayment (Number) - Present value of annuity
*
*/
"use strict";

window.onload = function() 
{
    const calcAnnuityBtn = document.getElementById("calcAnnuityBtn");
    calcAnnuityBtn.onclick = calculateAnnuityValue;
    
    const incorrectNum = document.getElementById("incorrectNum");

    function calculateAnnuityValue() {
        //grab each of the values and assigns value
        let annuity = parseFloat(document.getElementById("annuityForm").value);
        let discountRate = parseFloat(document.getElementById("discountRateForm").value);
        let length = parseFloat(document.getElementById("annuityLengthForm").value);
        let answer = document.getElementById("answer");

        if (annuity <= 0 || discountRate <= 0 || length <= 0) {
            return incorrectNum.style.display = 'block';
        }
        else {
            incorrectNum.style.display = 'none';
        }

        discountRate = discountRate / 100;

        //do annuity calculations based on formula: P = PMT x ((1 - (1 / (1 + r) ^ n)) / r)
        let annuityRate = 1 / Math.pow(1 + discountRate, length);
        annuityRate = (1 - annuityRate) / discountRate;

        //assign value and insert to field
        let annuityPayment = annuity * annuityRate;
        answer.value = annuityPayment.toFixed(2);
    }

    var resetBtn = document.getElementById('resetBtn');

    // Bind Click Event Handler to Reset Buttom
    resetBtn.onclick = function() {
        incorrectNum.style.display = 'none';

        // Put cursor in First Name field
        document.getElementById('annuityForm').focus();
    }
};