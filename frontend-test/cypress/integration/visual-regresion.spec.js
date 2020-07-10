/// <reference types="cypress" />

import * as targets from '../target/targets'
import * as loginPage from '../pages/loginPage'
import * as mainPage from '../pages/mainPage'
import * as roomsPage from '../pages/roomsPage'
import * as clientsPage from '../pages/clientsPage'
import * as billsPage from '../pages/billsPage'
import * as reservationsPage from '../pages/reservationsPage'


describe("Visual-regression test suite", function(){

    beforeEach(() =>{
        cy.visit(targets.url)
        loginPage.checkLoginPage(cy) //Checkar varje gång man loggar in
    })

    it("percy - Room Navigation", function(){
        cy.percySnapshot('Login-page')
        loginPage.performLogin(cy)
        mainPage.CheckMainPage(cy) 
        cy.percySnapshot('Main-page')
        mainPage.gotoRoomsPage(cy) //Assertions sker innuti funktionen
        cy.percySnapshot('Rooms-page')
        roomsPage.gotoMainPage(cy) 
        mainPage.CheckMainPage(cy)
        mainPage.gotoClientsPage(cy) //assertions sker innuti funktionen
        cy.percySnapshot('Clients-page')
        clientsPage.gotoMainPage(cy)
        mainPage.CheckMainPage(cy)
        mainPage.gotoBillsPage(cy) //assertions sker innuti funktionen
        cy.percySnapshot('Bills-page')
        billsPage.gotoMainPage(cy)
        mainPage.CheckMainPage(cy)
        mainPage.gotoReservationsPage(cy) //assertions sker innuti funktionen
        cy.percySnapshot('Reservations-page')
        reservationsPage.gotoMainPage(cy)
        mainPage.CheckMainPage(cy)
        mainPage.performLogout(cy)
        loginPage.checkLoginPage(cy)
    })

})