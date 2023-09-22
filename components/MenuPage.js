export class MenuPage extends HTMLElement{
    constructor(){
        super();
        this.root = this.attachShadow( {mode: `open`} );

        console.log(this.root);
        const styles = document.createElement("style");
        this.root.appendChild(styles);

        async function loadCSS(){
            const CSS = await fetch("/components/MenuPage.css");
            const result = await CSS.text();
            styles.textContent = result;
        }
        loadCSS();
    }

    // when component is attached to the Callback
    connectedCallback(){
        const template = document.getElementById("menu-page-template");
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        window.addEventListener("appmenuchange", () => {
            this.render();
        });
        this.render();
    }

    render(){
        if(app.store.menu){
            this.root.querySelector("#menu").innerHTML = "";
            for(let category of app.store.menu){
                const liCategory = document.createElement("li");
                liCategory.innerHTML = `
                <h3>${category.name}</h3>
                <ul class="category"></ul>
                `;
                this.root.querySelector("#menu").appendChild(liCategory);

                category.products.map(menuproducts => {
                    const items = document.createElement("product-item");
                    items.dataset.menuproducts = JSON.stringify(menuproducts);
                    liCategory.querySelector(".category").appendChild(items);
                });
            }
        }else{
            this.root.querySelector("#menu").innerHTML = "Loading...";
        }
    }
}

customElements.define("menu-page", MenuPage);  