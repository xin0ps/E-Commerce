
$(document).ready(() => {
  let products = [];
 let order=[];
 var orderProduct;

  const loginuser = async () => {
    try {
      const email = $("#email").val();
      const password = $("#password").val();

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      console.log(data);
      
      window.location.replace("products.html")
   
    } catch (error) {
      $("#error").removeClass('hidden')
      console.error(error);
    }
  };

  const registeruser = async () => {
    try {
      const name = $("#name").text();
      const email = $("#email").text();
      const password = $("#password").text();

      

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      console.log("succes register");
    } catch (error) {
      console.error(error);
    }
  };

  $("#login").click(loginuser);

  $("#signup").click(registeruser);

  $("#hamb").click(function () {
    $("#menu").toggleClass("hidden");
  });

  $("#menu").on("click", "p", function () {
    var selectedValue = $(this).text();
    $("#category").text(selectedValue);
    loadProductsByCategory();
    $("#menu").toggleClass("hidden");
  });

  const loadProductsByCategory = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const category = $("#category").text();

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const data = await response.json();
      products=data

      let productsHTML = "";
      if (category === "All Categories") {
        data.product.forEach((product) => {
          let imagesHTML = "";

          product.gallery.forEach((image) => {
            imagesHTML += `<div class="border-2 border-[bg-black] slide flex-none w-[400px] h-[400px"> <img class=" h-200 w-200 justify-center" src="${image}" alt=""></div>`;
          });

          productsHTML += `
                    <div class="slider-container relative w-full mx-auto overflow-hidden flex flex-col gap-2">
                        <div class="flex overflow-x-auto w-full px-5 snap-x gap-2 border-1 border-[bg-black]">
                            ${imagesHTML}
                        </div>
                        <p class="text-center text-xl font-sans">${product.description}</p>
                        <p class="text-center text-xl font-bold font-sans">$${product.price}</p>
                    </div>`;
        });

       
      } else {
        data.product.forEach((product) => {
          if (product.category === category) {
            let imagesHTML = "";

            product.gallery.forEach((image) => {
              imagesHTML += `<div class="border-2 border-[bg-black] slide flex-none w-[400px] h-[400px"> <img class=" h-200 w-200 justify-center" src="${image}" alt=""></div>`;
            });
  
            productsHTML += `
                      <div class="slider-container relative w-full mx-auto overflow-hidden flex flex-col gap-2">
                          <div class="flex overflow-x-auto w-full px-5 snap-x gap-2 border-1 border-[bg-black]">
                              ${imagesHTML}
                          </div>
                          <p class="text-center text-xl font-sans">${product.description}</p>
                          <p class="text-center text-xl font-bold font-sans">$${product.price}</p>
                      </div>`;
          }
          });

      
      }

      $("#products").html(productsHTML);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  $("#products").on("click", ".slider-container", function () {
    let selectedProduct;
    const index = $(this).index();
    const category = $("#category").text();
   
if(category==="All Categories"){
    selectedProduct = products.product[index];
}

else{
  mappedPr=products.product.filter(pr=>pr.category===category)
  selectedProduct=mappedPr[index];
}

   orderProduct=selectedProduct;
   console.log(orderProduct.title);

    $("#sizediv").html(selectedProduct.size.map(size=>`<div class="h-8 w-16 justify-center text-center flex border-[black] border-2">${size}</div>`));
    $("#colordiv").html(selectedProduct.colors.map(color=>`<div class="h-8 w-16 justify-center text-center bg-[${color}] flex border-[black] border-2"></div>`));
    $("#product-brand").text(selectedProduct.brand);
    $("#product-title").text(selectedProduct.title);
    $("#product-images").html(selectedProduct.gallery.map(image => `<div class="border-2 border-[bg-black] slide flex-none w-[400px] h-[400px]"> <img class=" h-400 w-400 justify-center" src="${image}" alt=""></div>`).join(''));
    $("#product-description").text(selectedProduct.description);
    $("#product-price").text(`$${selectedProduct.price}`);
   
    $("#product-details").removeClass("hidden");
    

    const productDetails = document.getElementById("product-details");
    productDetails.style.position = "fixed";
    productDetails.style.top = "50%";
    productDetails.style.left = "50%";
    productDetails.style.transform = "translate(-50%, -60%)";
    productDetails.style.zIndex = "99"
});

function az(productId) {
  var counterValue = parseInt($("#counter-" + productId).text()); 
  if (counterValue > 1) {
      counterValue--; 
      $("#counter-" + productId).text(counterValue); 
  }
}

function art(productId) {
  var counterValue = parseInt($("#counter-" + productId).text()); 
  counterValue++; 
  $("#counter-" + productId).text(counterValue); 
}
  


$("#orders").click(() => {
  order.forEach(selectedProduct => {
      const sizeDivContent = selectedProduct.size.map(size => `<div class=" flex h-8 w-16 justify-center text-center flex border-[black] border-2">${size}</div>`).join('');
      const colorDivContent = selectedProduct.colors.map(color => `<div  flex class="h-8 w-16 justify-center text-center bg-[${color}] flex border-[black] border-2"></div>`).join('');
      
      
      const cartItemDiv = `
      <div class="cart-item mt-[10px] flex flex-col gap-4 ">
      <div id="product-images" class="flex overflow-x-auto w-full px-10 gap-2 border-1 border-grey">
          ${selectedProduct.gallery.map(image => `
      
                  <div class="border-2 border-black slide flex-none w-400 h-400">
                      <img class="h-64 w-64justify-center" src="${image}" alt="">
                  </div>`).join('')}
 
          </div>

          <div class="flex justify-between items-center w-full">
          <div class="flex items-center  gap-10">
              <button onclick="az(${orderProduct.id})" class="bg-gray-200 border-2 border-[black] w-8 h-8 flex justify-center items-center last">-</button>
              <p id="counter-${orderProduct.id}" class="font-bold">1</p>
              <button onclick="art(${orderProduct.id})" class="bg-gray-200 border-2 border-[black] w-8 h-8 flex justify-center items-center last">+</button>
          </div>
      </div>

          <p id="product-brand">${selectedProduct.brand}</p>
          <p id="product-title">${selectedProduct.title}</p>
          <div id="sizediv" class="flex font-bold font-sans text-sm gap-2">SIZE:${sizeDivContent}</div>
          <div id="colordiv" class="flex font-bold font-sans text-sm gap-2">COLOR:${colorDivContent}</div>
          <p id="product-price" class="font-bold font-sans text-sm">PRICE:$${selectedProduct.price}</p>
      </div>
  `;
      
  
      
      $("#cart").append(cartItemDiv)
    });
  
    const cart = document.getElementById("cart");
    if (cart.scrollHeight > cart.clientHeight) {
        
        cart.style.maxHeight = "100vh";
        cart.style.overflowY = "auto";
    } else {
        
        cart.style.maxHeight = "";
        cart.style.overflowY = "hidden";
    }

   
    cart.classList.remove("hidden");
    cart.style.position = "fixed";
    cart.style.top = "50%"; 
    cart.style.left = "50%";
    cart.style.transform = "translate(-50%, -60%)";
    cart.style.zIndex = "99";

    
   
});






$("#addtocart").click(()=>{
order.push(orderProduct);
});

$("#backproducts").click(()=>{
  $("#product-details").addClass("hidden");

});

$("#back").click(()=>{
  $("#cart").addClass("hidden");
});

 loadProductsByCategory();

});


