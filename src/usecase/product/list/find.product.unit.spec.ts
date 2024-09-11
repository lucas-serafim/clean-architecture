import Product from "../../../domain/product/entity/product";
import { ListProductUseCase } from "./list.product.usecase";

const product = new Product("123", "controle", 10.0);
const product2 = new Product("123", "tv", 1000.0);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
        create: jest.fn(),
        update: jest.fn()
    }
};

describe("Unit test for list product usecase", () => {
    it("should list a product", async () => {
        const mockRepository = MockRepository();
        const usecase = new ListProductUseCase(mockRepository);

        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toBe(product.id);
        expect(output.products[0].name).toBe(product.name);
        expect(output.products[0].price).toBe(product.price);

        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });
})