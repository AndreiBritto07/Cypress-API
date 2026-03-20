/// <reference types="cypress" />

describe('Cadastro de dispositivo', () => {    
    
    it('cadastrar novo dispositivo', () => {

        const body = {
	            "name": "Apple Alterado",
	            "data": {
		            "year": 2026,
		            "price": 1999.99,
		            "CPU model": "Intel Core i11",
		            "Hard disk size": "2 TB"
	                    }
                }
        const dataAtual = new Date().toISOString().slice(0, 16)

        cy.cadastrarDevice(body)
            .then((response) => {
                expect(response.status).equal(200);
                expect(response.body.id).not.empty;                
                //expect(response.body.createdAt.slice(0, 16)).equal(dataAtual);
                expect(response.body.name).equal("Apple Alterado");
                expect(response.body.data).not.empty;
                expect(response.body.data.year).equal(2026);
                expect(response.body.data.price).equal(1999.99);
                expect(response.body.data['CPU model']).equal("Intel Core i11");
                expect(response.body.data['Hard disk size']).equal("2 TB");
        });
    });

    it('cadastrar um dispositivo sem mandar dados', () => {
        cy.cadastrarDevice('')
            .then((response) => {
                expect(response.status).equal(400);
                expect(response.body.error).equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.');
        });
    });
}); 