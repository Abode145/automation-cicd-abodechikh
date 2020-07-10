/// <reference types="cypress" />

import * as MainPageFuncs from '../pages/mainPage' //Är det något fel här? kan ej importera in funktionen nedan. CheckMainPage()

//Element
const backBtn = ':nth-child(3) > .btn'
const editFirstRoomBtn = ':nth-child(1) > .action > img'
const editFirstRoomEditBtn = '.menu > :nth-child(1)'
const editPageSaveBtn = '.blue'
const editPagePriceTxtfield = ':nth-child(7) > input'
const editPageNumberTxtfield = ':nth-child(4) > input'
const editPageFloorTxtfield = ':nth-child(5) > input'


//funktioner
function checkRoomsPage(cy) {
    cy.contains('Create Room')
   
}

function checkEditRoomPage(cy){
    cy.contains('Delete')
    cy.contains('ID')
   cy.contains('Save')
   cy.contains('Back')
}

function gotoMainPage(cy){
    cy.get(backBtn).click()
    //MainPageFuncs.CheckMainPage(cy) //varför funkar inte denna?
}




function gotoeditFirstRoom(cy){
    cy.get(editFirstRoomBtn).click()
    cy.get(editFirstRoomEditBtn).click()
    checkEditRoomPage(cy)

}

function changePriceAndSave(cy, PriceNumber){
    cy.get(editPagePriceTxtfield).clear()
    cy.get(editPagePriceTxtfield).type(PriceNumber)
    cy.get(editPageSaveBtn).click()
    if (PriceNumber == '0') {
        cy.contains('Price must be greater than 0')
    }else{
        checkRoomsPage(cy)
    }

}

function changeRoomAndFloor(cy, newFloor, newRoomNumber){
    cy.get(editPageNumberTxtfield).clear()
    cy.get(editPageNumberTxtfield).type(newRoomNumber)
    cy.get(editPageFloorTxtfield).clear()
    cy.get(editPageFloorTxtfield).type(newFloor)
    cy.get(editPageSaveBtn).click()
    cy.contains('Floor '+ newFloor + ', Room ' + newRoomNumber)

}

//export

module.exports = {
    checkRoomsPage,
    gotoMainPage,
    gotoeditFirstRoom,
    changePriceAndSave,
    changeRoomAndFloor

}