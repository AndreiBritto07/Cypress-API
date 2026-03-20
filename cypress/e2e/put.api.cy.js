/// <reference types="cypress" />

describe('Exclusão de dispositivo', () => {    
    
    it('Excluir dispositivo', () => {

        const body_post = {
	            "name": "Apple PUT Alterado",
	            "data": {
		            "year": 2026,
		            "price": 1999.99,
		            "CPU model": "Intel Core i11",
		            "Hard disk size": "2 TB"
	                    }
                }

        const body_put = {
	            "name": "Apple PUT PUT Update",
	            "data": {
		            "year": 2026,
		            "price": 8999.99,
		            "CPU model": "Intel Core z11",
		            "Hard disk size": "4 TB"
	                    }
                }                
       
            cy.request({                
                method: 'POST',
                url: '/objects',
                failOnStatusCode: false,
                body: body_post
            }).as('postDeviceResult');
            
            //pegando o result do cadastro
            // para pegar o id
            cy.get('@postDeviceResult')
                .then((response_post) => {
                    expect(response_post.status).equal(200);
                    expect(response_post.body.name).equal(body_post.name);
                
            cy.request({                
                method: 'PUT',
                url: `/objects/${response_post.body.id}`,
                failOnStatusCode: false,
                body: body_put
            }).as('putDeviceResult');
            
            // validações do put
            cy.get('@putDeviceResult').then((response_put) => {
                    expect(response_put.status).equal(200);
                    expect(response_put.body.name).equal(body_put.name);
                    expect(response_put.body.data.price).equal(body_put.data.price);
                    expect(response_put.body.data['CPU model']).equal(body_put.data['CPU model']);
                    expect(response_put.body.data['Hard disk size']).equal(body_put.data['Hard disk size']);
            });
        });
    });
});