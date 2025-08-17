
   
console.log("script.js is loaded");

// the html page that is the document (it finds by id)
// we will add an event listener for that page

document.getElementById("login-form").addEventListener("submit", async function(event){
    event.preventDefault();
    console.log("Form Submitted");

    // to take the data from the user
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    // using POST method to send the data to the backend endpoint
    const res = await fetch("http://127.0.0.1:8000/register", {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({username, password}),  
        // JSON.stringify : this converts the js objects into json strings
    });

    const data = await res.json(); // this will convert the json strings back to js objects

    // now comes the error handling part
    if (!res.ok){
        console.log("You filled wrong details", data.detail);

    }else{
    console.log("Backend says", data.message);
    }

    document.getElementById("response").innerText = data.message;
    return false;

})

