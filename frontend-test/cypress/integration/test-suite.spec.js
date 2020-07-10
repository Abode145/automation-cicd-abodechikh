/// <reference types="cypress" />

import * as targets from '../target/targets'
import * as loginPage from '../pages/loginPage'
import * as mainPage from '../pages/mainPage'
import * as roomsPage from '../pages/roomsPage'
import * as clientsPage from '../pages/clientsPage'
import * as billsPage from '../pages/billsPage'
import * as reservationsPage from '../pages/reservationsPage'
import faker from 'faker'


//Test suite
describe("PO - regression test suite", function(){

    beforeEach(() =>{
        cy.visit(targets.url)
        loginPage.checkLoginPage(cy) //Checkar varje gång man loggar in
    })

    //Test case 
    it("TC - Valid Login", function(){
        
        loginPage.performLogin(cy)
        mainPage.CheckMainPage(cy)
        mainPage.performLogout(cy)
        loginPage.checkLoginPage(cy)
    })

    it("TC - Room Navigation", function(){
        loginPage.performLogin(cy)
        mainPage.CheckMainPage(cy) 
        mainPage.gotoRoomsPage(cy) //Assertions sker innuti funktionen
        roomsPage.gotoMainPage(cy) 
        mainPage.CheckMainPage(cy)
        mainPage.gotoClientsPage(cy) //assertions sker innuti funktionen
        clientsPage.gotoMainPage(cy)
        mainPage.CheckMainPage(cy)
        mainPage.gotoBillsPage(cy) //assertions sker innuti funktionen
        billsPage.gotoMainPage(cy)
        mainPage.CheckMainPage(cy)
        mainPage.gotoReservationsPage(cy) //assertions sker innuti funktionen
        reservationsPage.gotoMainPage(cy)
        mainPage.CheckMainPage(cy)
        mainPage.performLogout(cy)
        loginPage.checkLoginPage(cy)

    })


    it("TC - Edit room price error message", function(){
        loginPage.performLogin(cy)
        mainPage.CheckMainPage(cy)
        mainPage.gotoRoomsPage(cy) //Assertions sker innuti funktionen
        roomsPage.gotoeditFirstRoom(cy) //Assertions sker innuti funktionen
        roomsPage.changePriceAndSave(cy, '0') //Assertion sker innuti. oavsett om man sätter in 0 eller en valid siffra
        mainPage.performLogout(cy)
        loginPage.checkLoginPage(cy)
    })

    it("TC - Edit room price happy path", function(){
        loginPage.performLogin(cy)
        mainPage.CheckMainPage(cy)
        mainPage.gotoRoomsPage(cy) //Assertions sker innuti funktionen
        roomsPage.gotoeditFirstRoom(cy) //Assertions sker innuti funktionen
        let randomPrice = faker.random.number()
        roomsPage.changePriceAndSave(cy, randomPrice) //Assertion sker innuti. oavsett om man sätter in 0 eller en valid siffra
        mainPage.performLogout(cy)
        loginPage.checkLoginPage(cy)
    })

    it("TC - Edit roomnumber and floor", function(){
        loginPage.performLogin(cy)
        mainPage.CheckMainPage(cy)
        mainPage.gotoRoomsPage(cy) //Assertions sker innuti funktionen
        roomsPage.gotoeditFirstRoom(cy) //Assertions sker innuti funktionen
        let floorNumber = faker.random.number()
        let roomNumber = faker.random.number()
        roomsPage.changeRoomAndFloor(cy, floorNumber, roomNumber) //Assertion sker innuti. oavsett parameter
        mainPage.performLogout(cy)
        loginPage.checkLoginPage(cy)
    })

    it("TC - Create new client", function(){
        loginPage.performLogin(cy)
        mainPage.CheckMainPage(cy)
        mainPage.gotoClientsPage(cy) //assertions sker innuti funktionen
        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()
        let email = faker.internet.email()
        let telephoneNumber = faker.phone.phoneNumber()
        clientsPage.createNewClient(cy, firstName + ' ' + lastName, email, telephoneNumber) //Assertions sker innuti oavsett inmattning i parameterna.
        mainPage.performLogout(cy)
        loginPage.checkLoginPage(cy)
    })


})