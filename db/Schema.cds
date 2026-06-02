using {managed} from '@sap/cds/common'; // Importa o aspecto managed do CDS

namespace sales; // Seria no nome do projeto

entity SalesOrderHeaders : managed { // Tabela de cabeçalho do pedido
    key id : UUID; // Chave primária do pedido
}
