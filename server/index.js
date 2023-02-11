const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: "password",
    database: "Calculator",
});

const ans = (num1, num2, operation) => {
    if (operation == "+") {
        return parseInt(num1) + parseInt(num2);
    }
    else if (operation == "-") {
        return parseInt(num1) - parseInt(num2);
    }
    else if (operation == "*") {
        return parseInt(num1) * parseInt(num2);
    }
    else {
        if (num2 != 0) {
            return parseInt(num1) / parseInt(num2);
        }
        else {
            return 0;
        }
    }
}

app.post('/create', (req, res) => {
    console.log(req.body);
    const num1 = req.body.num1;
    const num2 = req.body.num2;
    const operation = req.body.operation;

    const answer = ans(num1, num2, operation);
    console.log(req.body, ans);
    db.query("INSERT INTO calculated_values (number1, number2, operation, answer) VALUES (?,?,?,?)",
        [num1, num2, operation, answer],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        });
});

app.put("/update", (req, res) => {
    const num1 = req.body.num1;
    const operation = req.body.operation;

    const answer = ans(num1, num2, operation);

    db.query("UPDATE SET calculated_values operation=?,answer=? where num1=?"), [operation, answer, num1],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
})

app.get('/calculations', (req, res) => {
    db.query("SELECT * FROM calculated_values", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(5050, () => {
    console.log("Server running");
});

console.log("Hellow word");