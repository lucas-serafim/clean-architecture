import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "controle",
                price: 10.0
            });
        expect(response.status).toBe(200);

        expect(response.body.name).toBe("controle");
        expect(response.body.price).toBe(10.0);
    });

    it("should not create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "controle"
            });
        expect(response.status).toBe(500);
    });

    it("should list all product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "controle",
                price: 10.0
            });
        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "tv",
                price: 1000.0
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product1 = listResponse.body.products[0];
        expect(product1.name).toBe("controle");
        expect(product1.price).toBe(10.0);

        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("tv");
        expect(product2.price).toBe(1000.0);
    });
});