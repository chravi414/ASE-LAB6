
const fs =  require('fs');
const yargs = require('yargs');

const customers = require('./customer.js');

// ------------ Begin - command configuration -----------------


const idOptions = {
    describe: 'Customer ID',
    demand : true,
    alias : 'i',
    type: 'number'
}

const nameOptions = {
    describe: 'Name of a Customer',
    demand : true,
    alias : 'n'
}

const emailOptions = {
    describe: 'Email ID of a Customer',
    demand : true,
    alias : 'e',
    type: 'email'
}

const nameUpdateOptions = {
  describe: 'Name of a Customer',
  demand : false,
  alias : 'n'
}

const emailUpdateOptions = {
  describe: 'Email ID of a Customer',
  demand : false,
  alias : 'e',
  type: 'email'
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
    .command('update', 'Update a Customer', {
      id: idOptions,
      name: nameUpdateOptions,
      email: emailUpdateOptions
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

else if(command === 'update') {
  console.log(argv);
  if (!argv.name && !argv.email) {
    return console.log('No details provided to update.Name or email required');
  }
  const customerUpdated = customers.updateCustomer(argv.id, argv.name, argv.email);
  const message = customerUpdated ? `Customer Updated \n id : ${customerUpdated.id} \n name : ${customerUpdated.name} \n email : ${customerUpdated.email} \n` : 'Customer not found';
  console.log(message);
}

else{
  console.log('command not recognized'); 
}
