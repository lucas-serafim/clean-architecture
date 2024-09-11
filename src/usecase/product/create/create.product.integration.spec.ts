import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";


describe("Test create product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect:  "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true
            }
        });

        sequelize.addModels([ProductModel]);

        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new CreateProductUseCase(productRepository);

        const input = {
            name: "controle",
            price: 10.0
        };

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });
})