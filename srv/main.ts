import { Service } from '@sap/cds';
import { Customers } from '@models/sales';

export default (service: Service) => {
    service.after('READ', 'Customers', (result: Customers) => {
        result.forEach(customer => {
            if (!customer.email?.includes('@')) {
                customer.email = '${customer.email}@gmail.com';
            }
        });
    });
};



// import { Customer, Custumers } from '@models/Sales';

// const customer: Customer = {
//     email: 'teste@teste.com',
//     firstName: 'Marcelo',
//     lastName: 'Godoy',
//     id: '1234'
// };

// const customers: Custumers = [customer];

// const funcao = (variable: string) => console.log(variable);

// funcao('Hello World');
