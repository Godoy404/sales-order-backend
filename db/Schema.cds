using {managed} from '@sap/cds/common'; // Importa o aspecto managed do CDS

namespace sales; // Seria no nome do projeto

entity SalesOrderHeaders : managed { // Tabela de cabeçalho do pedido
    key id          : UUID; // Chave primária do pedido
        customer    : Association to Customers; // Associação com a entidade Customers
        totalAmount : Decimal(15, 2); // Valor total do pedido
        items       : Composition of many SalesOrderItems
                          on items.header = $self; // Composição de itens do pedido
}

entity SalesOrderItems {
    key id       : UUID;
        header   : Association to SalesOrderHeaders; // Associação com a entidade SalesOrderHeaders
        product  : Association to Products; // Associação com a entidade Products
        quantity : Integer; // Quantidade do item
        price    : Decimal(15, 2); // Preço do item
}

entity Customers {
    key id        : UUID; // Chave primária do cliente
        firstName : String(20); // Nome do cliente
        lastName  : String(50); // Sobrenome do cliente
        email     : String(100); // Email do cliente
}

entity Products {
    key id    : UUID; // Chave primária do produto
        name  : String(255); // Nome do produto
        price : Decimal(15, 2); // Preço do produto
}
