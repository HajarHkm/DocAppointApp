 
  var sql= require("mssql");
  var dbConfig={
    server:"localhost\\SQLEXPRESS",
    database: "doctorsdb",
    user: "hajar",
    password:"hajar",
    port: 49170

  };

  function getclient() {
    var conn = new sql.ConnectionPool(dbConfig);

    conn.connect().then(function() {
        console.log("connected");
        var req=new sql.Request(conn);

       
        req.query("INSERT INTO client VALUES ('imane','imanejelti','woman',21,'no','imane@gmail.com','bluuu')").then(function(recordset){
            console.log(recordset);
            conn.close();

        })
        .catch(function(err){
            console.log(err);
            conn.close();
        });
    })
    .catch(function(err){
         console.log(err);
    });
  }
  getclient();





