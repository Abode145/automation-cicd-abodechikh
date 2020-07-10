/// <reference types="cypress" />
import * as ClientHelper from '../helpers/clientHelper'
import * as LogOut from '../helpers/logOut'
import * as BillsHelper from '../helpers/bills'

//validToken
describe('testing backend', function(){
        
    afterEach(() =>{
        LogOut.LogOut(cy)
    })

    it('Create new client', function(){
        cy.validToken().then(( response => {

            
            ClientHelper.CreateClientRequest(cy)
        }))

    })

    it('Create and delete client', function(){
        cy.validToken().then(( response => {

            
            ClientHelper.CreateClientRequestAndDelete(cy)

        }))

    })

    it('Create new bill', function(){
        cy.validToken().then(( response => {

            BillsHelper.CreateBillRequest(cy)
            
        }))

    })

    it('Create new bill and edit it', function(){
        cy.validToken().then(( response => {

            BillsHelper.CreateBillRequestAndEditIt(cy)
            
        }))

    })
   //CreateBillRequestAndEditIt


})//CreateClientRequestAndEdit