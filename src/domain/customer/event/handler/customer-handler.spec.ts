import Customer from '../../entity/customer';
import Address from '../../value-object/address';
import CustomerCreatedEvent from '../customer-created-event';
import SendEmailWhenCustomerAddressIsChangedHandler from './send-email-when-customer-address-is-changed-handler';
import SendEmailWhenCustomerIsCreatedHandler from './send-email-when-customer-is-created-handler';
import SendSecundEmailWhenCustomerIsCreatedHandler from './send-secund-email-when-customer-is-created-handler';

describe('Customer Handler Unit Tests', () => {
  let spyConsoleLog: any;

  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    spyConsoleLog.mockRestore();
  });

  test('Send Email When Customer Is Created Handler', () => {
    const customer = new Customer('1', 'Custumer 1');
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    new SendEmailWhenCustomerIsCreatedHandler().handle(customerCreatedEvent);

    expect(spyConsoleLog).toHaveBeenCalledWith(
      'Esse é o primeiro console.log do evento: CustomerCreated'
    );
  });

  test('Send Secund Email When Customer Is Created Handler', () => {
    const customer = new Customer('1', 'Custumer 1');
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    new SendSecundEmailWhenCustomerIsCreatedHandler().handle(
      customerCreatedEvent
    );

    expect(spyConsoleLog).toHaveBeenCalledWith(
      'Esse é o segundo console.log do evento: CustomerCreated'
    );
  });

  test('Send Email When Customer Address Is Changed Handler', () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Rua 1', 123, '99999-999', 'Recife');
    customer.changeAddress(address);
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.address.toString(),
    });

    new SendEmailWhenCustomerAddressIsChangedHandler().handle(
      customerCreatedEvent
    );

    expect(spyConsoleLog).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer.id}, ${
        customer.name
      } alterado para: ${customer.address.toString()}`
    );
  });
});
