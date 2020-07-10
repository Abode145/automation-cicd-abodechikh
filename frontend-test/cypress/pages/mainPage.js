/// <reference types="cypress" />

import * as LoginPage from '../pages/loginPage'
import * as roomsPage from '../pages/roomsPage'
import * as clientsPage from '../pages/clientsPage'
import * as billsPage from '../pages/billsPage'
import * as reservationsPage from './reservationsPage'

//element
const titleMainPage = 'Testers Hotel'
const LogoutBtn = '.user > .btn'
const roomsBtn = ':nth-child(1) > .btn'
const clientsBtn = '.blocks > :nth-child(2) > .btn'
const billsBtn = ':nth-child(3) > .btn'
const reservationsBtn = ':nth-child(4) > .btn'


// funktioner
function CheckMainPage(cy){
    cy.title().should('eq', 'Testers Hotel')
    cy.contains('Tester Hotel Overview')
    cy.contains('Room')
    cy.contains('Clients')
    cy.contains('Bills')
    cy.contains('Reservations')
}


function performLogout(cy){
    cy.get(LogoutBtn).click()
    

}

function gotoRoomsPage(cy){
    cy.get(roomsBtn).click()
    roomsPage.checkRoomsPage(cy)
}

function gotoClientsPage(cy){
    cy.get(clientsBtn).click()
    clientsPage.checkClientsPage(cy)       
}

function gotoBillsPage(cy){
    cy.get(billsBtn).click()
    billsPage.checkBillsPage(cy)


}

function gotoReservationsPage(cy){
    cy.get(reservationsBtn).click()
    reservationsPage.checkReservationsPage(cy)
    

}

module.exports = {
    CheckMainPage,
    performLogout,
    gotoRoomsPage,
    gotoClientsPage,
    gotoBillsPage,
    gotoReservationsPage
}

