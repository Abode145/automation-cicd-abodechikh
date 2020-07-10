/// <reference types="cypress" />

import * as targets from '../target/targets'

//Element
const titleLoginPage = 'Testers Hotel'
const usrnameTxtField = ':nth-child(1) > input'
const pwdTxtField = ':nth-child(2) > input'
const loginBtn = '.btn'


//Action


function checkLoginPage(cy) {
    cy.title().should('eq', titleLoginPage)
    cy.contains('Login')
    
}

function performLogin(cy){
    cy.get(usrnameTxtField).type(targets.userName)
    cy.get(pwdTxtField).type(targets.password)
    cy.get(loginBtn).click()
}

//export
module.exports =
{
    checkLoginPage,
        performLogin
}