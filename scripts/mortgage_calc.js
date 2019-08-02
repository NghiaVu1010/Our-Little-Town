/*
* Description: Calculates mortgage payment
*
* Author: Neo
*
* @param monthlyRate (Number) - Calculate the rate according to formula
* @param totalPayments (Number) - Total number of payments (in months)
* @param mortgageRate (Number) - Rate based on formula
* @param mortgagePayment (Number) - Monthly payments based on loan and rate
*
*/
"use strict";

window.onload = function() 
{
    const calcMortgageBtn = document.getElementById("calcMortgageBtn");
    calcMortgageBtn.onclick = calculateMortgagePayment;
    
    function calculateMortgagePayment() {
        //grab each of the values and assigns value
        let loan = parseFloat(document.getElementById("loanForm").value);
        let interest = parseFloat(document.getElementById("interestRateForm").value);
        let length = parseFloat(document.getElementById("lengthForm").value);
        let monthlyPayment = document.getElementById("monthlyPayment");
        let totalLoan = document.getElementById("totalLoan");

        if (loan <= 0 || interest <= 0 || length <= 0) {
            return incorrectNum.style.display = 'block';
        }
        else {
            incorrectNum.style.display = 'none';
        }

        //do mortgage calculations based on formula
        let monthlyRate = ((interest / 100) / 12) + 1;
        let totalPayments = length * 12;
        let mortgageRate = 1 - Math.pow(monthlyRate, -totalPayments);
        mortgageRate = (monthlyRate - 1) / mortgageRate;
    
        //assign value and insert to field for monthly payments
        let mortgagePayment = mortgageRate * loan;
        monthlyPayment.value = mortgagePayment.toFixed(2);
        
        //assign value and insert to field for total payments
        totalLoan.value = (mortgagePayment * totalPayments).toFixed(2);
    }

    var resetBtn = document.getElementById('resetBtn');

    // Bind Click Event Handler to Reset Buttom
    resetBtn.onclick = function() {
        incorrectNum.style.display = 'none';

        // Put cursor in First Name field
        document.getElementById('loanForm').focus();
    }
};