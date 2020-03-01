
const fs =  require('fs');
const yargs = require('yargs');

const customers = require('./customer.js');

// ------------ Begin - command configuration -----------------


const idOptions = {
    describe: 'Customer ID',
    demand : true,
    alias : 'i'
}

const nameOptions = {
    describe: 'Name of a Customer',
    demand : true,
    alias : 'n'
}

const emailOptions = {
    describe: 'Email ID of a Customer',
    demand : true,
    alias : 'e'
}

const argv =  yargs

    .command('add','Add a new Customer',{
      id: idOptions,
      name: nameOptions,
      email: emailOptions
    })
    .command('list','List all Customers')
    .command('read','Get a Customer',{
      id: idOptions,
    })
    .command('remove','Remove a Customer',{
      id: idOptions,
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = yargs.argv._[0];


if (command === 'add'){
    var customer = customers.addCustomer(argv.id,argv.name,argv.email);
    if (customer){
      customers.logCustomer(customer);     //add a new customer
    } else{
      console.log("Customer already exists");
    }
}

else if (command === 'list') {
  var allCustomers = customers.getAll();
  console.log(`Printing ${allCustomers.length} customers(s).`);
  allCustomers.forEach((customer)=>{                                //list all Customers
    customers.logCustomer(customer);
  });
}

else if (command === 'read') {
   var customer = customers.getCustomer(argv.id);
   if(customer){
    customers.logCustomer(customer);                                //read a customer 
   }
   else {
    console.log("Customer not found");
   }
}
else if (command === 'remove') {
    var customerRemoved = customers.remove(argv.id);
    var message = customerRemoved ? 'Customer was removed' : 'Customer not found';
    console.log(message);
}

else{
  console.log('command note recognized'); 
}
