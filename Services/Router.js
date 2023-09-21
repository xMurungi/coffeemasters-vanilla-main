const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                const url = event.target.getAttribute("href"); 
                Router.go(url);
            });
        });
        // Event handler for URL changes
        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route, false);
            console.log(event.state.route);
        });

        // checking initial url 
        Router.go(location.pathname);

    },
    go: (route, addToHistory = true) => {
        console.log(`Going to ${route}`);

        if(addToHistory){
            history.pushState( { route }, ``, route );
        };


        let pageElement = null; 

        switch(route){
            case "/":
                pageElement = document.createElement("menu-page");
                break;

            case "/order":
                pageElement = document.createElement("order-page");
                break;
            default:
                if(route.startsWith("/product-")){
                    pageElement = document.createElement("details-page");
                    const paramId = route.substring(route.lastIndexOf("-")+1); 
                    pageElement.dataset.productId = paramId;
                }else{
                    pageElement = document.createElement("h1");
                    pageElement.textContent = "Not Found";
                };    
        };

        if(pageElement){
            const main = document.querySelector("main");
            main.innerHTML = "";
            main.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        }

    }
};

console.log(window.history);
export default Router; 