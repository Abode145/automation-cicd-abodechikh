/// <reference types="cypress" />

import * as mainPage from '../pages/mainPage' //Något fel här?

//Element
const backBtn = ':nth-child(3) > .btn'
const createClientBtn = 'h2 > .btn'
const createClientNameTxtfield = ':nth-child(1) > input'
const createClientEmailTxtfield = ':nth-child(2) > input'
const createClientTelephoneTxtfield = ':nth-child(3) > input'
const createClientSaveBtn = '.blue'

//funktioner
function checkClientsPage(cy){
    cy.contains('Create Client')

}

function gotoMainPage(cy){
    cy.get(backBtn).click()
    //mainPage.CheckMainPage(cy) //Denna funkar inte heller precis som rooms page

}

function createNewClient(cy, name, email, telephoneNum){
    cy.get(createClientBtn).click()
    cy.contains('New Client')
    cy.get(createClientNameTxtfield).type(name)
    cy.get(createClientEmailTxtfield).type(email)
    cy.get(createClientTelephoneTxtfield).type(telephoneNum)
    cy.get(createClientSaveBtn).click()
    checkClientsPage(cy)
    cy.contains(name)
    cy.contains('Email: ' + email)
    cy.contains('Telephone: ' + telephoneNum)
}

//export

module.exports = {
    checkClientsPage,
    gotoMainPage,
    createNewClient
}