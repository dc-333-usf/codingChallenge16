//Task 1: Set Up the Project Structure.

//Task 2: Fetch Products with .then()
const API_URL = 'https://www.course-api.com/javascript-store-products'; //create a constant for the API URL so it can be accessed easier

function fetchApi() { //create a function to fetch the API
    return fetch(API_URL) //return a promise for the API
    .then (response => { //then for the response
        if (!response.ok) { //if it does not come back as okay (not a 20x status code)
            throw new Error(`HTTP error: ${response.status}`); //throw an http error
        }
        return response.json(); //if it does come back as okay, return a promise that corresponds to a JavaScript object
    })
    .catch (error => { //if there's another error that isn't from a failed response
        console.error(`Fetch Failed:`, error.message); //log an error
        throw error; //stops the code execution
    })
}

function fetchProductsThen() { //now create a function to get the products and log their names
    const container = document.getElementById('product-container'); //set a constant for the container in the HTML

    fetchApi() //use the function we created earlier to fetch the API 
        .then (data => { //once the promise is successfully resolved, for the parsed JSON data
            data.forEach (n => { //each instance of the array of products from the API
                const div = document.createElement('div'); //create a div element
                div.innerHTML = `<h3>${n.fields.name}</h3>`; //take the name from fields in the API
                container.appendChild(div); //and append that to the container
            });
        })
        .catch (err => { //for any errors
            container.innerHTML = `<p style="color:red;">Failed to fetch names: ${err.message}</p>`; //change the HTML of the container to display an error
        });
}


//Task 5: Reusable Error Handler.
function handleError(error) { //create a function to handle errors, taking "error" as the argument
    console.error(`An error occurred: ${error.message}`); //when this function is executed, console log the error, including the error message
    throw error; //throw the error to stop execution
}