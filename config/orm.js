var connection = require("../config/connection.js");

let orm = {

    selectAll: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    insertOne: function (table, cols, vals, cb) {

        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ",";
        queryString += "devoured"
        queryString += ") ";
        queryString += "VALUES (";
        queryString += "?";
        queryString += ",";
        queryString += "?";
        queryString += ") ";

        console.log(queryString);

        vals.push("0");
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    updateOne: function (table, objColVals, condition, cb) {

        const queryString = `
        
            UPDATE ${table}
            SET ${objColVals.devourParm} = ?
            WHERE ${objColVals.idParm} = ? 
        
        `;

        connection.query(queryString, condition, (err, result) => {
            if (err) throw err;

            cb(result);
        });
    },

    clearAll: function (table, cb) {
        var queryString = `
        
                
        DELETE FROM
        ${table}
        WHERE devoured = 1
        `;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }


}

module.exports = orm;