import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUsecCase from "./update.customer.usecase";

const address = new Address("Street", 123, "Zip", "City");

const customer = CustomerFactory.createWithAddress("Joao", address);

const input = {
    id: customer.id,
    name: "Joao Updated",
    address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: "City Updated"
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn()
    };
};

describe("Unit test for customer updade use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUsecCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});