
import express, { Request, Response } from "express"
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { ListProductUseCase } from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (request: Request, response: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());

    try {
        const productDto = {
            name: request.body.name,
            price: request.body.price
        }

        const output = await usecase.execute(productDto);
        response.send(output);
    } catch (error) {
        response.status(500).send(error)
    }
});

productRoute.get("/", async (request: Request, response: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());

    try {
        const output = await usecase.execute({});
        response.send(output);
    } catch (error) {
        response.status(500).send(error);
    }
});