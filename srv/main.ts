import cds, { Service } from '@sap/cds';
import { Customers, SalesOrderHeaders, SalesOrderItems } from '@models/sales';
const { SELECT } = cds.ql;

export default (service: Service) => {
    service.after('READ', 'Customers', (result: Customers) => {
        result.forEach(customer => {
            if (!customer.email?.includes('@')) {
                customer.email = `${customer.email}@gmail.com`;
            }
        });
    });
    service.before('CREATE', 'salesOrders', async (request: any) => {
        const params = request.data;
        console.log(params);
        if (!params.customer_id) {
            return request.reject(400, 'Customer ID invalido');
        }
        const customerQuery = SELECT.one.from('sales.customers').where({ id: params.customer_id });
        const customer = await cds.run(customerQuery);
        console.log(customer);
        if (!customer) {
            return request.reject(400, 'Customer ID não encontrado');
        }
        if (!params.items || params.items.length === 0) {
            return request.reject(400, 'A ordem de venda deve conter pelo menos um item');
        }

        const productIds: string[] = params.items.map((item: any) => item.product_id);
        const products = await cds.run(SELECT.from('sales.products').where({ id: productIds }));
        const dbProducts = (products as any[]).map((product: any) => product.id);
        if (productIds.some((productId: any) => !dbProducts.includes(productId))) {
            return request.reject(400, 'Um ou mais produtos não encontrados');
        }
        if ((products as any[]).some((product: any) => product.stock <= 0)) {
            return request.reject(400, 'Um ou mais produtos estão sem estoque');
        }
    });
    service.after('CREATE', 'salesOrdersHeaders', async (results: any) => {
        const headerAsArray = Array.isArray(results) ? results : [results];
        for (const header of headerAsArray) {
            const items = (header.items || []) as any[];
            if (items.length === 0) continue;

            const productsData = items.map(item => ({
                id: String(item.product_id),
                quantity: Number(item.quantity)
            }));

            const productIds: string[] = productsData.map(p => p.id);
            const products = await cds.run(SELECT.from('sales.products').where({ id: productIds }));
            const productsMap = new Map((products as any[]).map((p: any) => [String(p.id), p]));

            for (const pd of productsData) {
                const foundProduct = productsMap.get(pd.id);
                if (!foundProduct) continue;
                const newStock = (foundProduct.stock ?? 0) - pd.quantity;
                await cds.update('sales.products').where({ id: foundProduct.id }).with({ stock: newStock });
            }
        }
    });
}


