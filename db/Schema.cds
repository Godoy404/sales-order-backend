using {managed} from '@sap/cds/common'; // Importa o aspecto managed do CDS

namespace sales; // Seria no nome do projeto

entity SalesOrderHeaders { // Tabela de cabeçalho do pedido
    key id         : UUID; // Chave primária do pedido
        // Inclui os atributos gerados pelo aspecto managed
        createdAt  : Timestamp  @cds.on.insert: $now; // Data de criação, preenchida automaticamente na inserção
        createdBy  : User       @cds.on.insert: $user; // Usuário que criou o registro, preenchido automaticamente na inserção
        modifiedAt : Timestamp  @cds.on.insert: $now   @cds.on.update: $now; // Data de modificação, preenchida automaticamente na inserção e atualização
        modifiedBy : User       @cds.on.insert: $user  @cds.on.update: $user; // Usuário que modificou o registro, preenchido automaticamente na inserção e atualização
}
