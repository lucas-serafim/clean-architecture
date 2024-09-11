import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductUseCase {

    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(product: Product[]): OutputListProductDto {
        return {
            products: product.map((current) => ({
                id: current.id,
                name: current.name,
                price: current.price
            }))
        };
    }
}