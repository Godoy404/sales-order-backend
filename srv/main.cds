using {sales} from '../db/Schema'; // Importa o schema do banco de dados

service MainService {
    entity SalesOrderHeaders as projection on sales.SalesOrderHeaders; // Projeta a entidade SalesOrderHeaders como SalesOrders
    entity Products          as projection on sales.Products; // Projeta a entidade Products como Products
    entity Customers         as projection on sales.Customers; // Projeta a entidade Customers como Customers
}
