import { IBuyer,IBuyerErrors } from "../../types";

export class Buyer {
  private payment: IBuyer["payment"] = "";
  private email: string = "";
  private phone: string = "";
  private address: string = "";

  setData(data: Partial<IBuyer>): void {
    Object.assign(this, data);
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clear(): void {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
  }

  validate(): IBuyerErrors {
    const errors: IBuyerErrors = {};

    if (!this.payment) {
      errors.payment = "Не выбран способ оплаты";
    }

    if (!this.email) {
      errors.email = "Укажите электронную почту";
    }

    if (!this.phone) {
      errors.phone = "Укажите номер телефона";
    }

    if (!this.address) {
      errors.address = "Укажите адресс доставки";
    }

    return errors;
  }
}
