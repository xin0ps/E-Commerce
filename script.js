$(document).ready(() => {
  let products = [];

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

 loadProductsByCategory();

});
