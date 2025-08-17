


console.log("script is loaded");

// document is the global variable that represents the entire html or webpage
// async keyword is used in front of function to make sure they will return a PROMISE
// await cannot be used without async ,but the vice-versa is not true
// async just marks the function, that it will return a promise


document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    console.log("Form Submitted");


    // take the data from the user
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    /// api call or http request
    
    const res = await fetch("http://127.0.0.1:8000/register", {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            username : username,
            password : password
        })
    })
    
    console.log("response object", res);
    const data =  await res.json();

    if (!res.ok){
        console.log("Backend says:", data.detail);
        document.getElementById("response").innerText = "Failed to register.";
    }else{
        console.log("Backend says:", data.message);
        document.getElementById("response").innerText = "User registered successfully.";

    }

  

    return false;
    
});



