$(document).ready(() => {




const loginuser = async () => {
    try {
   
        const email = $("#email").val();
        const password = $("#password").val();

        const response = await fetch("http://localhost:5000/api/auth/login",{

        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({

            
            email:email,
            password:password
        }),


        });

        if(!response.ok){
            throw new Error();
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error(error);
    }
  };



  const registeruser = async () => {
    try {
        const name = $("#name").val();
        const email = $("#email").val();
        const password = $("#password").val();

        const response = await fetch("http://localhost:5000/api/auth/register",{

        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({

            name:name,
            email:email,
            password:password
        }),


        });

        if(!response.ok){
            throw new Error();
        }

        


    } catch (error) {
        console.error(error);
    }
  };





  $("#login").click(loginuser);


  $("#signup").click(registeruser);

  
});
