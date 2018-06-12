/* 
  Requirements:
  -------------------------------------------------------------
  - Every List Item Should Contain first name, last name, salary and position
  - Write the function That adds a new employee to the list (using Prompt or html input elements on your own)
  - Create the field that will indicate number of employees, and average salary after each entry of new row
  - Limit number of employees to 10
  - Add possibility to set the limit of employees
  - Disallow adding new employees when avg. salary reaches $ 2000
  - When Adding Employee, check existing employees first name/last name, disallow duplicates
*/


// Define UI Var
const $employeeList = document.querySelector('.employeeList');

const $averageSalary = document.querySelector('.averageSalary'),
      $employeeNumber = document.querySelector('.employeeNumber');

const $form = document.querySelector('#add-employee');
const $firstName = document.querySelector('#firstName'),
      $lastName = document.querySelector('#lastName'),
      $salary = document.querySelector('#salary'),
      $position = document.querySelector('#position');

const $addBtn = document.getElementsByClassName('addEmployee')[0];

let employeeArr;
let numberOfEmployees = 0;
const maxEmployees = 10;

// Load all event Listeners
loadEventListeners();

// Load all event Listeners
function loadEventListeners() {
  $form.addEventListener('submit', addEmployee);

}

// add employee
function addEmployee(e) {
  if (numberOfEmployees === 0) {
    employeeArr = [];
  }
  
  // creating new employee
  let employee = new Employee($firstName.value, $lastName.value, $salary.value, $position.value);

  // check for duplication
  if (numberOfEmployees > 0) {
    let isDuplicated = checkForDuplication(employee, employeeArr);

    console.log(isDuplicated);
    
    if (isDuplicated) {
      alert('the person is already in your list');
// ! --------------------
// після даного рядку перезавнтажує сторінку
// чому? не можу зрозуміти
// я лише хочу щоб мені не додавало працівника у список 
// ! --------------------
      return false;
    }
  }
  
  employeeArr.push(employee);
  numberOfEmployees ++;

  // updating the amount of employees
  $employeeNumber.textContent = numberOfEmployees;

  // average salary calculation
  let totalSal = salarySum(employeeArr);
  let averageSalary = totalSal / numberOfEmployees;

  // updating the amount of average salary
  $averageSalary.textContent = averageSalary;

  // creating and appending 'li' element to the Employee list
  let li = document.createElement('li');
  li.className = 'employeeListItem';
  li.innerHTML = `
    <span class="employeeCount">${numberOfEmployees}</span>
    <span class="employeeFirstName">${employee.firstName}</span>
    <span class="employeeLastName">${employee.lastName}</span>,
    <span class="employeeSalary">${employee.salary}</span>,
    <span class="employeePosition">${employee.position}</span>
  `
  $employeeList.appendChild(li);

  // clear input fields
  $firstName.value = '';
  $lastName.value = '';
  $salary.value = '';
  $position.value = '';

  // checking limit number of employees 
  if (numberOfEmployees === maxEmployees) {
    alert('you reached maximum number of employees');
    $addBtn.setAttribute('disabled', '');
    $addBtn.style.backgroundColor = 'rgb(19, 153, 37, .75)';
  }

  // checking average salary value
  if (averageSalary === 2000) {
    alert('you can\'t add more new employees, average salary is 2000');
    $addBtn.setAttribute('disabled', '');
    $addBtn.style.backgroundColor = 'rgb(19, 153, 37, .75)';
  }

  e.preventDefault();
}

// create new employee 
function Employee(firstName, lastName, salary, position) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.salary = salary;
  this.position = position;
}

// total salary calculation
function salarySum(employeesArr) {
  return employeesArr.reduce((sum, employee) => sum + parseInt(employee.salary), 0);

  /*
  another solution:

  function totalSalary(employeesArr) {
    let salarySum = 0;
    employeesArr.forEach(employee => {
      salarySum += parseInt(employee.salary);
    });
    return salarySum;
  }

  function totalSalary(employeesArr) {
    return employeesArr.reduce(function(sum, employee){
      return sum + parseInt(employee.salary);
    }, 0);
  } 
 */
}

// checking for duplication
function checkForDuplication(person, employeeArr) {
  let isDuplicated = false;

  let personFirstName = person.firstName.toLowerCase(),
      personLastName = person.lastName.toLowerCase();
    
  employeeArr.forEach(employee => {
    let employeeFirstName = employee.firstName.toLowerCase(),
        employeeLastName = employee.lastName.toLowerCase();

    // console.log(`Person: ${personFirstName} ${personLastName} => Employee ${employeeFirstName} ${employeeLastName}
    // `);
    
    if (personFirstName === employeeFirstName && personLastName === employeeLastName) {
      isDuplicated = true;
    }
  })
  
  return isDuplicated;
}





