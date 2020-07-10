const faker = require('faker')
const Endpoint_PostBill = 'http://localhost:3000/api/bill/new'
const Endpoint_GetBills = 'http://localhost:3000/api/bills'
const Endpoint_GetBill = 'http://localhost:3000/api/bill/'


    const Price = faker.random.number()
    const Price2 = faker.random.number()
    const payload = {
        "value":Price
        ,"paid": faker.random.boolean()
        }

    
        
    function getRequestLastCreatedBillWithAssertions(cy){

        cy.request({ 
            method:"GET",
            url:Endpoint_GetBills,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'                
            }

        }).then((response => {
            const AmountOfBills = response.body.length //how much the length of the array is.
            const ResponseAsString = JSON.stringify(response.body[AmountOfBills - 1]) //Only put last bill in string.
            expect(ResponseAsString).to.have.string(payload.value)
        }))
    }

    function CreateBillRequest(cy){
        //creates new bill.
        cy.request({
            method:"POST",
            url: Endpoint_PostBill,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:payload
    
        }).then((response => {
            expect(response.status).to.eq(200) //only verify if status = OK. more verification below
            
           
        }))
        //Verifies last created bill.
        getRequestLastCreatedBillWithAssertions(cy)
    }
    
    function EditBill(cy, created){
        //Get request.
        cy.request({ 
            method:"GET",
            url:Endpoint_GetBills,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'                
            }

        }).then((response => {
            let LastId = response.body[response.body.length -1].id //Put last created bill in string
            expect(response.status).to.eq(200)
        cy.request({
            method: "PUT",
            url: Endpoint_GetBill+LastId, //Uses last bill to edit
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            //Svårt att få in dessa i en const då id och created kommer från olika ställen
            body: {"value": Price2, "id": LastId, "created":created, "paid": faker.random.boolean()} //When PUT request, it sends ID and created also.
        })
        }))

    }
    
        
    function CreateBillRequestAndEditIt(cy){
        //Creates new bill
        cy.request({
            method:"POST",
            url: Endpoint_PostBill,
            headers: {
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'
            },
            body:payload
    
        }).then((response => {
            let createdDate = response.body.created
            cy.log(payload)
            cy.log(createdDate)
            expect(response.status).to.eq(200) //only verify if status = OK
            EditBill(cy, createdDate) //Here it uses the function above to edit last created. So this is used after we create one.

        }))
        //Get request to verify last bill
        cy.request({ 
            method:"GET",
            url:Endpoint_GetBills,
            headers:{
                'X-User-Auth': JSON.stringify(Cypress.env().loginToken),
                'Content-Type': 'application/json'                
            }

        }).then((response => {
            const AmountOfBills = response.body.length
            const ResponseAsString = JSON.stringify(response.body[AmountOfBills - 1])
            expect(response.status).to.eq(200)
            expect(ResponseAsString).to.have.string(Price2)
        }))
    }
  
    module.exports = {
        CreateBillRequest,
        CreateBillRequestAndEditIt
    
    }