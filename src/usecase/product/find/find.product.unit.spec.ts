import Product from "../../../domain/product/entity/product";
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product("123", "controle", 10.0);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("Unit test find product use case", () => {

    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        };

        const response = await usecase.execute(input);

        const output = {
            id: "123",
            name: "controle",
            price: 10.0
        };

        expect(response).toEqual(output);
    });

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        };

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("Product not found");
    });
});