const Customer = require("../models/customer.model");

exports.create = (req, res) => {
    if (!req.body.name || !req.body.email){
        return res.status(400).send({ 
            message: 'Content can not be empty!'
        });
    }

    const customer = new Customer({
        email: req.body.email,
        name: req.body.name
    });  

    Customer.create(customer, (err, data) => {
        if (err){
            res.status(500).send({
                type: "error",
                msg: err.message || 'Some error occured while creating the customer.'
            }); 
        }
        else{
            res.send({ msg: 'new data inserted', data });
        }
    }); 
    
};

exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Some error occured while retrieving customers"
            });
        }else{
            res.send(data);
        } 
    });
};

exports.findOne = (req, res) => {
    Customer.getOne(req.params.id, (err, data) => {
        if(err){
            if(err.kind == "not found"){
                res.status(404).send({
                    message: `Not found customer with id of ${req.params.id}.`
                });
            }
        }else{
            res.send(data);
        }
    });  
};

exports.update = (req, res) => {
    if(!req.body.name || !req.body.email){
        res.status(400).send({
            message: 'Content can not be empty!'
        });
        return;
    }
    Customer.updateById(req.params.id, new Customer(req.body), (err, data) => {
        if(err){
            if(err.kind == "not_found"){
                res.status(400).send({
                    message: `Not found customer with id of ${req.params.id}`
                }); 
                return;
            }else if(err.errno == 1062){
                res.status(400).send({
                    message: `Customer already exist.`
                });
                return;
            }else{
                res.status(500).send({
                    message: `Error updating customer with id of ${req.params.id} : ${err}`
                });
                return;
            }
        }
        else{
            res.send(data);
            return;
        }
    });
} 
exports.delete = (req, res) => {
    Customer.remove(req.params.id, (err, data) => {
        if(err){
            if(err.kind == 'not_found'){
                res.status(404).send({
                    message: `No customer with the id of ${req.params.id} found. please check your brain.`
                });
                return;
            }else{
                res.status(500).send({
                    message: `Could not delete customer with the id of ${req.params.id}`
                });
                return;
            }
        }else{ 
            res.send({
                message: `Customer successfully deleted`
            });
            return;
        }
    });
}

