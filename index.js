const express = require('express');
let questionList = require('./questions.json');

const app = express();

// serve static contents
app.use(express.static('static'));

//Gets products in JSON
//If we want to deal with it as a JS array we can parse the JSON string 
app.get("/questionsInJson", (req,res) => {
    //Same thing as below: res.send(JSON.stringify(productList));
    res.json(questionList);
});

app.get("/updateBtn", (req,res) => {
    let msg = "incorrect" + req.query.id;
    let z = 0;
    for (q of questionList){
        if(req.query.id == z && req.query.value == q.answerIndex)
            msg = "correct" + req.query.id;
        z++;
    }
    res.send(msg);
});

app.get("/submitBtn", (req,res) => {
    let msg = ""
    let grade = 0;
    let z = 0;
    for (q of req.query.values){
        if(q == "1")
        {
            grade++;
            msg += "You got question " + (z + 1) + " correct\n";
        }
        z++;
    }
    if (grade < 1)
        msg = "Unfortunately, you didn't get any questions correct, your grade is " + grade + "/" + (z) ;
    else
        msg += "\nYour grade is " + grade + "/" + (z);
    res.send(msg);
});

app.listen(80);