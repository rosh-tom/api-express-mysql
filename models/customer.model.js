const sql = require('./db');

const Customer = function(customer) { 
    this.email = customer.email;
    this.name = customer.name; 
};


Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err) => {
        if (err) {
            console.log(`error ${err}`);
            result(err, null);
            return; 
        }
        console.log('created customer: ', {...newCustomer});
        result(null, {...newCustomer});
    });
}

Customer.getAll = result => { 
    sql.query("SELECT * FROM customers", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("customers: ", res); 
        result(null, res);
    });
}

Customer.getOne = (customerID, result) => {
    sql.query(`SELECT * FROM customers where id = ${customerID}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        } 
        if(res.length){
            console.log("Found: Customer: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not found"}, null);
    });
}

Customer.updateById = (id, customer, result) => {
    sql.query("UPDATE customers SET email = ?, name = ? WHERE id = ?", [customer.email, customer.name, id], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("updated customer: ", {id: id, ...customer});
        result(null, {id: id, ...customer});
        return;
    });
}

Customer.remove = (customerID, result) => {
    sql.query("DELETE FROM customers WHERE id  = ?", customerID, (err, res) => {
        if(err){
            console.log(`error: ${err}`);
            result(err, null);
            return;            
        }
        if(res.affectedRows == 0){
            console.log('error: Deleted Unsuccessfull!');
            result({kind: `not_found`}, null);
            return;
        }
        console.log(`Customer successfully deleted ${customerID}`);
        result(null, res);
        return;
    });
}

module.exports = Customer;
