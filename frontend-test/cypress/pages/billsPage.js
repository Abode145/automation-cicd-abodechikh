/// <reference types="cypress" />

//Element
const backBtn = ':nth-child(3) > .btn'

//funktioner

function checkBillsPage(cy){
    cy.contains('Create Bill')
}

function gotoMainPage(cy){
    cy.get(backBtn).click()

}
//export

module.exports = {
    checkBillsPage,
    gotoMainPage
}