//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 
var util = require ("util");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//quranontology.cloudapp.net
//Connection config
var dbConfig = {
    user: 'hajar',
    password: 'hajar',
    server: 'localhost\\SQLEXPRESS',
    database: 'doctorsdb'  
};

var connection = new sql.ConnectionPool(dbConfig, function (err) {
    if (err)
        throw err; 
});

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});// works before post to allow..

app.get('/login', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    var request = new sql.Request(connection);
    quer="select * from "+req.query.doc+" where email='"+req.query.email+"' and password='"+req.query.password+"'";
    console.log("query:"+quer);
    request.query(quer, function (err, result) {
        if (err) 
            return next(err);
        var data = {};
        data["user"] = result.recordset;
        if (data["user"] != []) i=1;
        res.send(data);  
    }); 
}); 

app.get('/doctors', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    var request = new sql.Request(connection);
    request.query("select * from doc where city='"+req.query.city+"'and specialty='"+req.query.specialty+"'", function (err, result) {
        if (err) 
            return next(err);

        var data = {};
        data["user"] = result.recordset;
        res.send(data);      
    }); 
}); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.post('/register', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);

    var request = new sql.Request(connection);
    
    var sqlq = "INSERT INTO "+req.query.doc+" (firstname,lastname,email,password) VALUES";
    sqlq+= util.format("('%s','%s','%s','%s')",req.body.firstname,req.body.lastname,req.body.email,req.body.password);
    console.log("query: "+sqlq);
    //"INSERT INTO client (firstname,lastname,email,password,docpatient,city,specialty) VALUES (req.body.firstname,req.body.lastname,req.body.email,req.body.password,req.body.docpatient,req.body.city,req.body.specialty)"
    request.query(sqlq, function (err, result) 
    {
       /* if(!req.body.firstname || !req.body.lastname ) 
        {
        return res.send({"status": "error", "message": "missing a parameter"});}*/
        if (err) console.log(err);
        else return res.send(req.body);    

    }); 
}); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.post('/appoint', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);

    var request = new sql.Request(connection);

    
    var sqlq = "INSERT INTO appoint (docid,docpat,status,date) VALUES";
    sqlq+= util.format("('%d','%d','%s','%s')",req.body.docid,req.body.docpat,req.body.status,req.body.date);
    console.log("query: "+sqlq);
    //"INSERT INTO client (firstname,lastname,email,password,docpatient,city,specialty) VALUES (req.body.firstname,req.body.lastname,req.body.email,req.body.password,req.body.docpatient,req.body.city,req.body.specialty)"
    request.query(sqlq, function (err, result) 
    {
        console.log("hello");
        if (err) console.log(err);
        else return res.send(req.body);    

    }); 
}); 

app.get('/duplicate', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    var duplicate="select * from appoint where date in (SELECT date FROM appoint where date='"+req.query.date+"') and docid in (SELECT docid FROM appoint where docid='"+req.query.docid+"')";

    var request = new sql.Request(connection);
    request.query(duplicate, function (err, result) 
    {
        console.log(duplicate);
        if (err) 
            return next(err);

        var data = {};
        data["user"] = result.recordset;
        res.send(data);      
    }); 
}); 

app.get('/appoints', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    var duplicate="select * from appoint where docpat="+req.query.docpat;

    var request = new sql.Request(connection);
    request.query(duplicate, function (err, result) 
    {
        console.log(duplicate);
        if (err) 
            return next(err);

        var data = {};
        data["user"] = result.recordset;
        res.send(data);      
    }); 
}); 





app.put('/register', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.query);

    var request = new sql.Request(connection);
    console.log("prob "+req.query.id)
    //"INSERT INTO client (firstname,lastname,email,password,docpatient,city,specialty) VALUES (req.body.firstname,req.body.lastname,req.body.email,req.body.password,req.body.docpatient,req.body.city,req.body.specialty)"
    request.query("UPDATE doc set firstname='"+req.body.firstname+"', lastname='"+req.body.lastname+"', email='"+req.body.email+"', adress='"+req.body.adress+"', password='"+req.body.password+"', city='"+req.body.city+"', specialty='"+req.body.specialty+"' WHERE id='"+req.query.id+"'", function (err, result) 
    {

       /* if(!req.body.firstname || !req.body.lastname ) 
        {
        return res.send({"status": "error", "message": "missing a parameter"});}*/
        if (err) console.log(err);
        else return res.send(req.body);    

    }); 
}); 

app.put('/dispo', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.query);

    var request = new sql.Request(connection);
    sqlq="UPDATE doc set dispo='"+req.body.dispo+"' WHERE id="+req.query.id;
    console.log("query: "+sqlq);
    //"INSERT INTO client (firstname,lastname,email,password,docpatient,city,specialty) VALUES (req.body.firstname,req.body.lastname,req.body.email,req.body.password,req.body.docpatient,req.body.city,req.body.specialty)"
    request.query(sqlq, function (err, result) 
    {

       /* if(!req.body.firstname || !req.body.lastname ) 
        {
        return res.send({"status": "error", "message": "missing a parameter"});}*/
        if (err) console.log(err);
        else return res.send(req.body);    

    }); 
}); 

app.put('/jsregister', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.query);

    var request = new sql.Request(connection);
    console.log("prob "+req.query.mail)
    //"INSERT INTO client (firstname,lastname,email,password,docpatient,city,specialty) VALUES (req.body.firstname,req.body.lastname,req.body.email,req.body.password,req.body.docpatient,req.body.city,req.body.specialty)"
    request.query("UPDATE doc set firstname='"+req.body.firstname+"', lastname='"+req.body.lastname+"', email='"+req.body.email+"', adress='"+req.body.adress+"', password='"+req.body.password+"', city='"+req.body.city+"', specialty='"+req.body.specialty+"' WHERE email='"+req.query.mail+"'", function (err, result) 
    {

       /* if(!req.body.firstname || !req.body.lastname ) 
        {
        return res.send({"status": "error", "message": "missing a parameter"});}*/
        if (err) console.log(err);
        else return res.send(req.body);    

    }); 
}); 






var server = app.listen(5000, function () {
    console.log('Server is running..'); 
});