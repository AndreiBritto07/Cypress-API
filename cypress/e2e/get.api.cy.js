/// <reference types="cypress" />

describe('Buscar dispositivo', () => {    
    
    it('buscar dispositivo específico', () => {

        const id_device = '7'
        
       cy.buscarDeviceEspecifico(id_device)
            .then((response) => {
                expect(response.status).equal(200);
                expect(response.body.id).equal(id_device);
                expect(response.body.name).equal('Apple MacBook Pro 16');
                expect(response.body).not.empty;
                expect(response.body.data).not.empty;
                expect(response.body.data.year).not.string;
                expect(response.body.data.year).equal(2019);
                expect(response.body.data.price).not.string;
                expect(response.body.data.price).equal(1849.99);
                expect(response.body.data['CPU model']).equal('Intel Core i9');
                expect(response.body.data['Hard disk size']).equal('1 TB');
        });                
        
    });

    it('buscar dispositivo inexistente', () => {

    const id_device = 'inexistente'
        
       cy.buscarDeviceEspecifico(id_device)
            .then((response) => {
                expect(response.status).equal(404);
                expect(response.body.error)
                    .equal(`Object with id=${id_device} was not found.`);         
        });                            
    });
}); 