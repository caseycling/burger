//Import the connection from connection.js
var connection = require('./connection')

//Generates question marks for MySQL query
//Since we need question marks in our query (to avoid sequel injection), this function will determine how many are needed and return them as a string
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

//ORM object
var orm = {
    //Select all from table
    selectAll: function (tableInput, cb) {
        //Build and enter query
        var queryString = "SELECT * FROM " + tableInput + ";"
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        })
    },
    //Create new burger in the table
    insertOne: function (table, cols, vals, cb) {
        //Build and enter query
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString)

        connection.query(queryString, vals, function () {
            if (err) {
                throw err
            }

            cb(result);
        })
    },
    //Update burger devoured status
    updateOne: function (table, objColVals, condition, cb) {
        //Build and enter query
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals)
        queryString += " WHERE "
        queryString += condition

        console.log(queryString)
        connection.query(queryString, function(err, result) {
            if(err) {
                throw err
            }

            cb(result)
        })
    }
}

//Export orm for model
module.exports = orm;