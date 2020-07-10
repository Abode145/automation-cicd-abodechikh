
const Endpoint_logOut = 'http://localhost:3000/api/logout'
function LogOut(cy){
    
    //Post to create new client
    cy.request({
        method:"POST",
        url: Endpoint_logOut,
        headers: {
            'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }

    }).then((response => {
        expect(response.status).to.eq(200) //only verify if status = OK
    }))

}

module.exports = {
    LogOut

}