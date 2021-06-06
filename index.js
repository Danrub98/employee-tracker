const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
let tableInfo = [];

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_trackerDB",
});

connection.connect((err) => {
  if (err) throw err;
  runDecision();
});

const runDecision = () => {
  inquirer
    .prompt({
      name: "decision",
      type: "rawlist",
      message: "What do you want to do?",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Add employee",
        "Add department",
        "Add employee roles",
        "Update employee roles",
      ],
    })
    .then((answer) => {
      switch (answer.decision) {
        case "View departments":
          viewDeparment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Add employee":
          add_employee();
          break;
        case "Add employee roles":
          add_role();
          break;
        case "Add department":
          add_department();
          break;
        case "Update employee roles":
          updateInformation();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewDeparment = () => {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runDecision();
  });
};

const viewRoles = () => {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runDecision();
  });
};

 updateInformation = () => {
let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    inquirer.prompt([
        {
        name: "information",
        type: "rawlist",
        message: "Which role is going to be updated?",
        choices:[
        "title: answer.title",
        "salary: answer.salary",
        "department_id: answer.department_id",
                    ]
                    },
                ])
    console.table(res);
    runDecision();
  });
}; 



// const updateInformation = () => {
//     console.log ('Updating information');
//     const query = ("SELECT role.title, role.salary FROM role", function(err,res){
//         inquirer.prompt([
//             {
//             name: "information",
//             type: "rawlist",
//             message: "Which role is going to be updated?",
//             choices:[
//                 role.title
//             ]
//             },
//         ])
//     })
    
// }


const add_role = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the employee",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the Employee",
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the deparment ID",
      },
    ])

    .then((answer) => {
      const query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        (err) => {
          if (err) throw err;
          console.log("The update was made successfully!");
          console.log(query.sql);
          runDecision();
        }
      );
    });
};

const add_employee = () => {
  inquirer
    .prompt([
      {
        name: "employee_fname",
        type: "input",
        message: "What is the employee first name?",
      },
      {
        name: "employee_lname",
        type: "input",
        message: "What is the employee last name?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the role ID",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the manager ID?",
      },
    ])

    .then((answer) => {
      const query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.employee_fname,
          last_name: answer.employee_lname,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        (err) => {
          if (err) throw err;
          console.log("The update was made successfully!");
          console.log(query.sql);
          runDecision();
        }
      );
    });
};

const add_department = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "rawlist",
        message: "What is the employee deparment?",
        choices: ["Production", "Operation", "Finance"],
      },
    ])

    .then((answer) => {
      const query = connection.query(
        "INSERT INTO department SET ?",
        {
          department: answer.department,
        },
        (err) => {
          if (err) throw err;
          console.log("The update was made successfully!");
          console.log(query.sql);
          runDecision();
        }
      );
    });
};
