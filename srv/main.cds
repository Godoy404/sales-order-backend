using {sales} from '../db/Schema'; // Importa o schema do banco de dados

service MainService {
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders; // Projeta a entidade SalesOrderHeaders como SalesOrders
}
