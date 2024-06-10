//create a express server
 
//1.import express
import express from 'express';
//2. create an express instance
const app= express();
 
//3. create an endpoint using get/put/post/delete
app.get('/hello',(req,res)=>{
    //simply return a response
    res.write("HELLO response from the express server");
    res.write("End of the message");
    //end the message
    res.end();
});
 
//3.1 creating another endpoint  - http://localhost:3400/courses
app.get('/courses',(req,res)=>{
    var courses = ['angular','node','react','api','typescript'];
    // res.write(courses);
    // res.end();
 
    res.send(courses);
    //send() == write() + end()
});
 
//3.2 creating prod endpoint  - http://localhost:3400/prod
app.get('/prod',(req,res)=>{
    var product = {
        "id": "P100",
        "name" :"Laptop",
        "price":45670
    };
    res.send(product);
})
 
// 3.3 Creating an endpoint with path parameters - http://localhost:3400/users/1
//query string paramter  - ?
app.get('/users/:id',(req,res)=>{
    res.send('Good Evening !! '+ req.params.id)
})
 
//3.4 Creating an endpoint with query string param - http://localhost:3400/courses/byid?id=3
app.get('/courses/byid',(req,res)=>{
    const query = req.query.id;
    res.send('Good Evening User, you are enrolled in Angular with courseid as  - '+ query);
})

app.use(express.json())

//POST request
//3.5 an endpoint for a post request
app.post('/loginUser',(req,res)=>{
    console.log("To create a user login - pass the info as post body",req.body.user);
    //const object=req.body.user;
    //send a response
    //res.json({result:object"})
})

//4. Listen to a port no
//declare the port variable
const PORT = 3400;
 
app.listen(PORT,()=>{
    console.log(`Server is running at port no ${PORT}`);
});