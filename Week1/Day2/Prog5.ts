[Yesterday 4:21 PM] Sundaramurthy, Thangaraj
class Employee

{

    empno:number;

    empname:string;

    age:number;

    salary:number;

    constructor(eno:number ,en:string , a:number , s:number)

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

let emp:Employee = new Employee(2222,"Bangalore",48, 342312.22);

emp.DisplayEmployee();