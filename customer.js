const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchCustomers = () => {
  try {                          //if data won't exist
    var customerData = fs.readFileSync('customer-data.json')
    return JSON.parse(customerData);
  } catch(e){
    return [];
  }
};

var saveCustomers = (customers) => {
  fs.writeFileSync('customer-data.json',JSON.stringify(customers));
};


// ------------------End of Reusable functions ---------------------


//  to add a new Customer
var addCustomer = (id,name,email) => {   
    var customers = fetchCustomers();
    var customer = {id,name,email}

    var existingCustomer =  customers.filter((customer) => { // to check if customer already exists
      return customer.id === id;
    });

    if (existingCustomer.length === 0){
      customers.push(customer);
      saveCustomers(customers);
      return customer;
    }
  };


//to list all the customers

var getAll = () => {
    return fetchCustomers();
};


// to read a customer

var getCustomer = (id) => {
    
    var customers = fetchCustomers();

    var getCustomers =  customers.filter((customer) => {  // to check if customer exists and return customer
      return customer.id === id;
    });

    return getCustomers[0]

};


// to delete a customer

var remove = (id) => {

    var customers = fetchCustomers(); // reusable func

// will return all other customer other than "customer to be removed"

    var filteredCustomers =  customers.filter((customer) => { 
      return customer.id !== id;
    });

    saveCustomers(filteredCustomers); //save new customers array

    return customers.length !== filteredCustomers.length
    
};

const updateCustomer = (id,name,email) => {
  var customers = fetchCustomers();

  const index = customers.findIndex(c => {
      return c.id === id;
  });
console.log(index);
  if (index >= 0) {
    customers[index].name = name ? name : customers[0].name;
    customers[index].email = email ? email : customers[0].email;
    saveCustomers(customers);
    return customers[index];
  }
}

// function just to print out customer to screen

var logCustomer = (customer) => { 
  console.log('--');
  console.log(`Id: ${customer.id}`);
  console.log(`Name: ${customer.name}`);
  console.log(`Email: ${customer.email}`);
};


module.exports = {
  addCustomer, getAll, remove, getCustomer, logCustomer, updateCustomer
};
