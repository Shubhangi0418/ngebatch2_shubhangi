function Employee(eno ,en , a , s)
{
    this.empno=eno;
    this.empname = en;
    this.age=a;
    this.salary=s;
 
    this.DisplayEmployee = function ()
    {
        console.log("::::::::::::Employee Details:::::::::::::")
        console.log("Employee No : ",this.empno);
        console.log("Employee Name : ",this.empname);
        console.log("Employee Age : ",this.age);
        console.log("Employee Salary : ",this.salary);
    };
}
 
let emp1 = new Employee();  
emp1.empno = 1111;
emp1.empname = "Accenture";
emp1.age = 44;
emp1.salary = 23456.66;
emp1.DisplayEmployee();
let emp2 = new Employee(2222,"Bangalore",48, 342312.22);
emp2.DisplayEmployee();