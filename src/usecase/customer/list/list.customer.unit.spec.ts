import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const address1 = new Address("Street", 123, "Zip", "City");
const address2 = new Address("Street2", 321, "Zip2", "City2");

const customer1 = CustomerFactory.createWithAddress("Joao", address1);
const customer2 = CustomerFactory.createWithAddress("Maria", address2);

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn()
    };
};

describe("Unit test for list customer usecase", () => {
    it("should list a customer", async () => {
        const mockRepository = MockRepository();
        const useCase = new ListCustomerUseCase(mockRepository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.Address.street);

        expect(output.customers.length).toBe(2);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.Address.street);
    });
});