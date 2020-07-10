const faker = require('faker')
const Endpoint_PostClient = 'http://localhost:3000/api/client/new'
const Endpoint_GetClients = 'http://localhost:3000/api/clients'
const Endpoint_GetClient = 'http://localhost:3000/api/client/'


    const name = faker.name.firstName()
    const email = faker.internet.email()
    const phone = faker.phone.phoneNumber()

    const payload = {
    "name": name,
    "email": email,
    "telephone":phone
    }
  



function getRequestLastCreatedClientWithAssertions(cy){
    cy.request({
        method:"GET",
        url: Endpoint_GetClients,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        
    }).then((response => {
        const AmountOfClients = response.body.length //how much the length of the array is.
        const ResponseAsString = JSON.stringify(response.body[AmountOfClients - 1]) //Only checks last created customer.
        expect(ResponseAsString).to.have.string(payload.name) //Verify correct new customer is created.
        expect(ResponseAsString).to.have.string(payload.email)
        expect(ResponseAsString).to.have.string(payload.telephone)

    }))

}

function CreateClientRequest(cy){
    
    //Post to create new client
    cy.request({
        method:"POST",
        url: Endpoint_PostClient,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body:payload

    }).then((response => {
        expect(response.status).to.eq(200) //only verify if status = OK
        getRequestLastCreatedClientWithAssertions(cy)
    }))

}



function deleteRequestAfterGet(cy){
    cy.request({
        method:"GET",
        url: Endpoint_GetClients,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        
    }).then((response => {
        let LastId = response.body[response.body.length -1].id
        cy.request({
            method: "DELETE",
            url: Endpoint_GetClient+LastId,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },

        }).then((response => {
            expect(response.status).to.eq(200) //OK if deleted.
        }))

    }))

}


function CreateClientRequestAndDelete(cy){
    
    //Post to create new client
    cy.request({
        method:"POST",
        url: Endpoint_PostClient,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body:payload

    }).then((response => {
        expect(response.status).to.eq(200) //only verify if status = OK
        getRequestLastCreatedClientWithAssertions(cy)
        
    }))
    deleteRequestAfterGet(cy)
}
/*
function PutRequestAfterGet(cy){
    cy.request({
        method:"GET",
        url: Endpoint_GetClients,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        
    }).then((response => {
        let LastId = response.body[response.body.length -1].id
        let LastClientCreatedDate = response.body[response.body.length -1].created
        const name2 = faker.name.firstName()
        const email2 = faker.internet.email()
        const phone2 = faker.phone.phoneNumber()

        const payload2 = {
        "name": name2,
        "id":LastId,
        "created": LastClientCreatedDate,
        "email": email2,
        "telephone":phone2
        }
            cy.request({
            method: "PUT",
            url: Endpoint_GetClient+LastId,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body: payload2
            

        }).then((response => {
            expect(response.status).to.eq(200) //OK if deleted.
            cy.log(JSON.stringify(payload))
        }))

    }))

}

function CreateClientRequestAndEdit(cy){
    
    //Post to create new client
    cy.request({
        method:"POST",
        url: Endpoint_PostClient,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body:payload

    }).then((response => {
        expect(response.status).to.eq(200) //only verify if status = OK
        getRequestLastCreatedClientWithAssertions(cy)
        cy.log(JSON.stringify(payload))
        
    }))
    PutRequestAfterGet(cy)
}
*/

module.exports = {
    getRequestLastCreatedClientWithAssertions,
    CreateClientRequest,
    CreateClientRequestAndDelete
    //,CreateClientRequestAndEdit

}