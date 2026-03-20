/// <reference types="cypress" />

describe('Exclusão de dispositivo', () => {    
    
    it('Excluir dispositivo', () => {

        const body_post = {
	            "name": "Apple Alterado",
	            "data": {
		            "year": 2026,
		            "price": 1999.99,
		            "CPU model": "Intel Core i11",
		            "Hard disk size": "2 TB"
	                    }
                }

            cy.cadastrarDevice(body_post)
                .then((response_post) => {
                    expect(response_post.status).equal(200);
                
            cy.request({                
                method: 'DELETE',
                url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
                failOnStatusCode: false,
                
            }).as('deleteDeviceResult');
            
            // validações do delete
            cy.get('@deleteDeviceResult').then((response_del) => {
                    expect(response_del.status).equal(200);
                    expect(response_del.body.message)
                        .equal(`Object with id = ${response_post.body.id} has been deleted.`);
            });
        });
    });
    it('Excluir dispositivo não existente', () => {
        const id_inexistente = 9999999999999; // ID que não existe

        cy.request({                
            method: 'DELETE',
            url: `/objects/${id_inexistente}`,
            failOnStatusCode: false,
        }).as('deleteNonExistentDeviceResult');
        // validações do delete para ID inexistente
        cy.get('@deleteNonExistentDeviceResult').then((response_del_nonexistent) => {
                expect(response_del_nonexistent.status).equal(404);
                expect(response_del_nonexistent.body.error)
                    .equal(`Object with id = ${id_inexistente} doesn't exist.`);
        });

    });

    it('Excluir dispositivo existente qua não pode ser exluido', () => {
        const id_existente_proibido = 1; // ID que não existe

        cy.request({                
            method: 'DELETE',
            url: `/objects/${id_existente_proibido}`,
            failOnStatusCode: false,
        }).as('deleteNonExistentDeviceResult');
        // validações do delete para ID inexistente
        cy.get('@deleteNonExistentDeviceResult').then((response_del_nonexistent) => {
                expect(response_del_nonexistent.status).equal(405);
                expect(response_del_nonexistent.body.error)
                    .equal(`${id_existente_proibido} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`);
        });

    });


});