console.log("Functions Demo");
 
function AF()
{
    console.log("I am Argument Function...");
}
 
 
function F1(af)
{
    console.log("I am Function F1");
    function Inner()
    {
        console.log("I am Function Inner....");
    }
    Inner();
    af();
    return Inner;
}
 
 
var RF = F1(AF);
RF();
 