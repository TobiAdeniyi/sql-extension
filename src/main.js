const { db } = require("./db");


// Total number of employees
const totalNumberOfEmployees = async db => {
  const [results, _] = await db.query(`
    SELECT COUNT(*) AS "total number of employees"
    FROM employee_detail;
  `);

  console.log("> Number of employees");
  console.table(results);
}

// Higest earning employee and Job title
const higestEarningEmployeeAndJobTitle = async db => {
  const [results, _] = await db.query(`
    SELECT job_title, salary
    FROM current_job_detail
    WHERE salary = (
      SELECT MAX(salary)
      FROM current_job_detail
    );
  `);

  console.log("> Highest earning Employee");
  console.table(results);
}

// Count of Senior Developer Jobs
const countOfSeniorDeveloperJobs = async db => {
  const [results, _] = await db.query(`
    SELECT COUNT(*) AS "count of senior developer jobs"
    FROM current_job_detail
    WHERE job_title = "Senior Developer";
  `)

  console.log("> Number of Senior Dev jobs");
  console.table(results);
}

// Wage brackets
const wageBrackets = async db => {
  const [results, _] = await db.query(`
    SELECT
      job_title AS "Job Title",
      MAX(salary) AS "MAx Salary",
      MIN(salary) AS "Min Salary"
    FROM current_job_detail
    GROUP BY job_title;
  `);

  console.log("> Wage Brackets");
  console.table(results);
}

// Salaries of non-developer employees
const salariesOfNonDeveloperEmployees = async db => {
  const [results, _] = await db.query(`
    SELECT employee_id, salary, job_title
    FROM current_job_detail
    WHERE job_title NOT LIKE "%Developer%";
  `);

  console.log("> Salaries of non-developer employees");
  console.table(results);
}

const main = _ =>  {
  totalNumberOfEmployees(db);
  higestEarningEmployeeAndJobTitle(db);
  countOfSeniorDeveloperJobs(db);
  wageBrackets(db);
  salariesOfNonDeveloperEmployees(db);
}

main();
