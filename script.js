// Array to store added employees
let employees = [];

// Function to generate a unique ID
function generateID() {
  if (employees.length === 0) {
    return 1;
  } else {
    const maxID = Math.max(...employees.map((employee) => employee.id));
    return maxID + 1;
  }
}

// Function to add an employee
function addEmployee(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const profession = document.getElementById("profession").value;
  const age = document.getElementById("age").value;

  if (name === "" || profession === "" || age === "") {
    document.getElementById("errorMessage").textContent =
      "Error : Please make sure all fields are filled before adding an employee!";
    document.getElementById("successMessage").textContent = "";
  } else {
    const employee = {
      id: generateID(),
      name: name,
      profession: profession,
      age: age,
    };

    employees.push(employee);

    document.getElementById("employeeList").innerHTML = "";
    employees.forEach((employee) => {
      const employeeDiv = document.createElement("div");
      employeeDiv.innerHTML = `<div class="employeeContainer"><div class="employeeDetails">${employee.id}. &nbsp;&nbsp;&nbsp;&nbsp;Name: ${employee.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Profession: ${employee.profession}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Age: ${employee.age}</div><button class="deleteButton" data-id="${employee.id}">Delete User</button></div>`;
      document.getElementById("employeeList").appendChild(employeeDiv);
    });

    document.getElementById("errorMessage").textContent = "";
    document.getElementById("successMessage").textContent =
      "Success : Employee Added!";

    document.getElementById("name").value = "";
    document.getElementById("profession").value = "";
    document.getElementById("age").value = "";
  }
}

// Function to delete an employee
function deleteEmployee(event) {
  if (event.target.classList.contains("deleteButton")) {
    const id = parseInt(event.target.getAttribute("data-id"));
    employees = employees.filter((employee) => employee.id !== id);
    event.target.parentNode.remove();

    document.getElementById(
      "deleteMessage"
    ).textContent = `Employee with ID No. ${id} deleted successfully.`;
    document.getElementById("undeleteMessage").textContent = "";

    setTimeout(() => {
      document.getElementById("deleteMessage").textContent = "";
    }, 2000);
  }
}

// Event listener for form submission
document.getElementById("employeeForm").addEventListener("submit", addEmployee);

// Event listener for delete button
document
  .getElementById("employeeList")
  .addEventListener("click", deleteEmployee);