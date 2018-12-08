# Review Questions

## What is Node.js?
Node is a runtime environment that allows us to run javascript outside of the browser. So now we can use javascript to do things that used to only be able to be done by C, C++, Java, Python, Ruby, C# and other programming languages.
## What is Express?
Express is a barebones framework for node that helps us create applications and get a server up and running quickly. Since it is barebones it gives more flexibilty then other frameworks.
## Mention two parts of Express that you learned about this week.
We learned about middleware and routes. Middleware are fucntions that can be added as a 3rd party or built in function that adds some logic or modification before the call hits the server. Routes help us partition our application into sub-applications to make more modular and easier to read code.
## What is Middleware?
Middleware are functions that can be added as a 3rd party or built in function that adds some logic or modification before the call hits the server.
## What is a Resource?
A Resource is any and all data that comes back from a server.
## What can the API return to help clients know if a request was successful?
A status code such as 200 or a json message saying the api call was succesful or by returning whatver a successful api call would return.
## How can we partition our application into sub-applications?
We can partition our application into sub-applications by using routes. To use routes we need to create a new file and set a variable to express  and express.Router(). then we use the router variable like router.get or router.update. we need to also make sure the endpoints are just the last bit of it like / or /:id and the export the file in module exports. In the index where are server is we have to require the route and use middleware .use to set the endpoint for all the routes and put the required route variable as the second argument
## What is express.json() and why do we need it?
Without express.json() we wouldnt be able to parse the info coming from req.body and use it in our server functions.