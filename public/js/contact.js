(function() {
    "use strict";
    

    let form = document.querySelector('#contact-form');

    document.querySelector("#send-contact").addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        let formValid=true
        if (!form.checkValidity()) {
          formValid = false;    
        }
        form.classList.add('was-validated')
        if(formValid){
            sendTheEmail();
        }
    });

function sendTheEmail() {
    console.log("You clicked the submit button.");
    let firstName = document.querySelector("#contact-first").value;
    let lastName = document.querySelector("#contact-last").value;
    let mail = document.querySelector("#contact-email-addr").value;
    let message = document.querySelector("#contact-question").value;
   
    let obj = {
        sub: "Someone submitted a contact form!",
        txt: `${document.querySelector("#contact-first").value}
        ${document.querySelector("#contact-last").value} 
        sent you a message that reads
        ${document.querySelector("#contact-question").value}. 
        They're email address is  
             ${document.querySelector("#contact-email-addr").value
        }`,
    };

    fetch("/mail", {
        method: "POST",
        headers: {
        "Content-type": "application/json",
        },
        body: JSON.stringify(obj),
    })
        .then((r) = r.json())
        .then((response) => {
        document.querySelector ("#contact-button-response").innerHTML =
        response.result;
        })
        .then(() => {
        setTimeout (() => {
            document. querySelector ("#contact-button-response").innerHTML = "";
         }, "5000");
        });
        
    // console.log(obj);
//     console.log("First Name: " + firstName);
//     console.log("Last Name: " + lastName);
//     console.log("Email: " + mail);
//     console.log("Message: " + message);
 }
})();
