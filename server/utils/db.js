import mysql from "mysql"

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "app_massive"
})

con.connect(function(err) {
    if (err) {
        console.log("Connection error")
    } else {
        console.log("Connected")
    }
})

export default con