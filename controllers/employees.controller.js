const Employee = require('../models/Employee.model');

// Get all employees
module.exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) {
    return res.status(404).send('No employees found');
  }
  res.status(200).send(employees);
}

// Add new employee
module.exports.addEmployee = async (req, res) => {

  const { name, email, phone, address, sin, hire_date, pay_frequency, dob } = req.body;

  try {

    const employee = new Employee({
      name,
      email,
      phone,
      address,
      sin,
      hire_date,
      pay_frequency,
      dob
    });

    const validationErrors = await employee.validateSync();
    if (validationErrors) {
      console.log({ validationErrors });
      return res.status(400).json({
        success: false,
        message: validationErrors.message
      });
    }

    // check if employee with this SIN already exists
    employeeExists = await Employee.findOne({ sin });
    if (employeeExists) {
      return res.status(400).json({
        success: false,
        message: 'Employee with this SIN already exists'
      });
    }

    await employee.save();
    res.status(200).send(employee);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
}