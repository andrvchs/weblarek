import "./scss/styles.scss";
import { Catalog } from "./components/models/Catalog";
import { Basket } from "./components/models/Basket";
import { Buyer } from "./components/models/Buyer";
import { apiProducts } from "./utils/data";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { Communication } from "./components/communication/communication";

const api = new Api(API_URL);
  const communication = new Communication(api);

const catalog = new Catalog();

catalog.setProducts(apiProducts.items);

console.log("Каталог: массив товаров", catalog.getProducts());

const firstProduct = apiProducts.items[0];

console.log("Каталог: товар по ID", catalog.getProduct(firstProduct.id));

catalog.setSelectedProduct(firstProduct);

console.log("Каталог: выбранный товар", catalog.getSelectedProduct());

const basket = new Basket();

console.log("Корзина: товары до добавления", basket.getProducts());

basket.addProduct(firstProduct);

console.log("Корзина: товары после добавления", basket.getProducts());

console.log("Корзина: количество товаров", basket.getCount());

console.log("Корзина: общая стоимость", basket.getTotal());

console.log("Корзина: наличие товара", basket.hasProduct(firstProduct.id));

basket.removeProduct(firstProduct);

console.log("Корзина: после удаления товара", basket.getProducts());

basket.clear();

console.log("Корзина: после очистки", basket.getProducts());

const buyer = new Buyer();

console.log("Покупатель: начальные данные", buyer.getData());

console.log("Покупатель: ошибки валидации пустых данных", buyer.validate());

buyer.setData({
  payment: "card",
  email: "test@mail.ru",
  phone: "+79999999999",
  address: "Москва, ул. Пушкина, д. 10",
});

console.log("Покупатель: сохранённые данные", buyer.getData());

buyer.setData({
  email: "new@mail.ru",
});

console.log("Покупатель: данные после изменения только email", buyer.getData());

console.log("Покупатель: ошибки после заполнения", buyer.validate());

buyer.clear();

console.log("Покупатель: данные после очистки", buyer.getData());

console.log("Покупатель: ошибки после очистки", buyer.validate());
async function loadProducts() {
  try {
    const data = await communication.getAllItems();

    catalog.setProducts(data.items);

    console.log("Каталог с сервера:", catalog.getProducts());
  } catch (error) {
    console.error("Ошибка при загрузке каталога:", error);
  }
}

loadProducts();