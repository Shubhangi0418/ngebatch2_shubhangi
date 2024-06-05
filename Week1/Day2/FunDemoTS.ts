console.log("Functions Demo");
 
let AF = function ()
{
    console.log("I am Argument Function...");
};
 
 
let F2 = function (af)
{
    console.log("I am Function F1");
    let Inner = function ()
    {
        console.log("I am Function Inner....");
    };
    Inner();
    af();
    return Inner;
};
 
 
var RF = F2(AF);
RF();