import Store from "./Services/Store.js";
import API from "./Services/API.js";
import { loadData } from "./Services/MenuData.js";
import Router from "./Services/Router.js";

// Link my web components
import { MenuPage } from "./components/MenuPage.js";
import { OrderPage } from "./components/OrderPage.js";
import { DetailsPage } from "./components/DetailsPage.js";
import ProductItem from "./components/ProductItem.js";
import CartItem from "./components/CartItem.js";

window.app = {}; 
app.store = Store;
app.router = Router;


window.addEventListener("DOMContentLoaded", () => {
    loadData();
    app.router.init();
    console.log(Store);
});

window.addEventListener("appcartchange", event => {
    const badge = document.getElementById("badge");
    const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
    badge.textContent = qty; 
    badge.hidden = qty == 0;
});