/// <reference types="cypress" />

//Element
const backBtn = ':nth-child(3) > .btn'

//funktioner

function checkReservationsPage(cy){
    cy.contains('Create Reservation')
}

function gotoMainPage(cy){
    cy.get(backBtn).click()

}

//export

module.exports = {
    checkReservationsPage,
    gotoMainPage
}