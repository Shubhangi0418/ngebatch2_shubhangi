class Employee1
{
    empno:number;
    empname:string;
    age:number;
    salary:number;
    dob:Date;
    permanentemployee:boolean;
    constructor(eno ,en , a , s)
    {
        this.empno=eno;
        this.empname = en;
        this.age=a;
        this.salary=s;
    }
    DisplayEmployee()
    {
        console.log("::::::::::::Employee Details:::::::::::::")
        console.log("Employee No : ",this.empno);
        console.log("Employee Name : ",this.empname);
        console.log("Employee Age : ",this.age);
        console.log("Employee Salary : ",this.salary);
    }
}
let emp = new Employee1(2222,"Bangalore",48, 342312.22);
emp.DisplayEmployee();