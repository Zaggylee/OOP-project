const CART_ITEMS_CONTAINER = document.getElementById("cart-items-container");
const TOTAL_COST = document.getElementById("total-cost");

//product class

class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

//a cart item constructor inheriting properties from the product class
class cartItem extends Product {
  constructor(id, name, price, quantity) {
    super(id, name, price);
    this.quantity = quantity;
  }
  //method to calculate total price of item
  calculateCartItem() {
    return this.price * this.quantity;
  }
}

//a class to store all the shopping cart items
class shoppingCart {
  constructor(userShoppingCart) {
    this.userShoppingCart = userShoppingCart;
  }
  //a method to display all the items in the user shopping cart
  displayShoppingCartItems() {
    let userProducts = this.userShoppingCart.map((item) => {
      return `  <div class="flex justify-between border-b">
          <div>
            <h1 class="text-2xl font-semibold text-gray-400">${item.name}</h1>
            <button
            id=${item.id}
              class=" delete--btn bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer my-2"
            >
              <i class="bi bi-trash"></i>
            </button>
            <h4>${item.calculateCartItem()}</h4>
          </div>

          <div>
            <h3 class="text-2xl font-semibold text-right">${item.price}</h3>
            <div class="flex gap-4 items-center">
              <button
              id=${item.id}
                class=" increase--btn bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer"
              >
                <i class="bi bi-plus"></i>
              </button>
              <p>${item.quantity}</p>
              <button
              id=${item.id}
                class=" decrease--btn bg-orange-500 text-white p-1 rounded-md shadow-md mt-2 cursor-pointer"
              >
                <i class="bi bi-dash"></i>
              </button>
            </div>
          </div>
        </div>`;
    });
    CART_ITEMS_CONTAINER.innerHTML = userProducts.join("");

    //targetting all the buttons with class of increase--btn and decrease--btn
    const INCREASE_BTN = document.querySelectorAll(".increase--btn");
    const DECREASE_BTN = document.querySelectorAll(".decrease--btn");
    //targetting all the button with class of delete---btn
    const DELETE_BTN = document.querySelectorAll(".delete--btn");

    //foreach method allows you access the individual elements in an array
    INCREASE_BTN.forEach((item) => {
      //getting the value of the id attribute of each of the button
      let id_of_product = item.getAttribute("id");

      //adding a click event on each of the increase--btn button
      item.addEventListener("click", () =>
        this.increaseCartItems(id_of_product)
      );
    });

    DECREASE_BTN.forEach((item) => {
      let id_of_product = item.getAttribute("id");
      item.addEventListener("click", () =>
        this.decreaseCartItems(id_of_product)
      );
    });

    DELETE_BTN.forEach((item) => {
      let id_of_product = item.getAttribute("id");
      item.addEventListener("click", () => this.deleteCartItem(id_of_product));
    });
  }

  //a method to increase the quantity of an item
  increaseCartItems(id_of_product) {
    //use the for array method to go through all the products the user has in his cart
    this.userShoppingCart.forEach((item) => {
      //check if any product in the user shopping cart matches the id attribute of the product that is clicked
      if (item.id === id_of_product) {
        //increase the quantity of that product by 1
        item.quantity = item.quantity + 1;
      }
    });
    //then redisplay the product again with the updated quantity
    this.displayShoppingCartItems();
    //this recalculates total items left in cart
    this.calculateTotalItemsInCart();
  }

  //a method to decrease the quantity of an item
  decreaseCartItems(id_of_product) {
    this.userShoppingCart.forEach((item) => {
      if (item.id === id_of_product && item.quantity > 1) {
        item.quantity = item.quantity - 1;
      }
    });
    this.displayShoppingCartItems();
    this.calculateTotalItemsInCart();
  }

  //a method to delete an item from cart
  deleteCartItem(id_of_product) {
    let itemsLeftInCart = this.userShoppingCart.filter(
      (item) => item.id !== id_of_product
    );
    this.userShoppingCart = itemsLeftInCart;
    this.displayShoppingCartItems();
    this.calculateTotalItemsInCart();
  }

  //a method to calculate total cost of items in cart
  calculateTotalItemsInCart() {
    let total = 0;
    this.userShoppingCart.forEach((item) => {
      total = total + item.price * item.quantity;
    });
    TOTAL_COST.innerText = total;
  }
}

const cart = new shoppingCart([
  new cartItem("1", "iphone", 2000, 1),
  new cartItem("2", "samsung", 4000, 1),
  new cartItem("3", "techno", 5000, 1),
  new cartItem("4", "itel", 3000, 1),
]);
cart.displayShoppingCartItems();
cart.calculateTotalItemsInCart();
