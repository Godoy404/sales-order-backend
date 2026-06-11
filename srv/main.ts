import { Customer, Custumers } from '@models/Sales';

const customer: Customer = {
    email: 'teste@teste.com',
    firstName: 'Marcelo',
    lastName: 'Godoy',
    id: '1234'
};

const customers: Custumers = [customer];

const funcao = (variable: string) => console.log(variable);

funcao('Hello World');