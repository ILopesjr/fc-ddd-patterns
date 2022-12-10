import EventInterface from "../../@shared/event/event.interface";

export default class CustomerChangedAddressEvent implements EventInterface{
  dataTimeOccurred: Date;
  eventData: any;

  constructor(customer: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = customer;
  }
}