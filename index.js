const express =require('express');
const bodyparser =require('body-parser');
const mysql =require('mysql2');
const cors =require('cors');
const app=express();
app.use(cors());
app.use(bodyparser.json());
var mySqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'usermodel',
    port:'3306'
});
mySqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection is succeeded')
    else
    console.log('DB connection is failed'+JSON.stringify(err,undefined,2))
})
// get all data

app.get('/user/all',(req,res)=>{
    let qr=`select * from userdetails`;
    mySqlConnection.query(qr,(err,result)=>{
if(err){
    console.log(err,'errs')
}
if(result.length>0){
    res.send({
    message:'all user data',
    data:result
    })
}else{
    res.send({
        message:' data not found'
    })
}

    })
});

    // Add a new user  
app.post('/user/create', function (req, res) {
  
    let lastName=  req.body.lastName;
    let firstName= req.body.firstName;
    let email= req.body.email;
    let phoneNumber=req.body.phoneNumber;
    let role= req.body.role;
    let state=req.body.state;
    console.log("req.body",req.body)
    if (!req.body) {
    return res.status(400).send({ error:true, message: 'Please provide user' });
    }
    let qr=`insert into userdetails( lastName, firstName, email, phoneNumber, role, state) values('${lastName}','${firstName}','${email}',
    '${phoneNumber}','${role}','${state}')`;
    mySqlConnection.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
    else{
            res.send({
                message:'data inserted'
            });
        }
    })  

  
    });    
    //  Update user with id
    app.put('/user/update/:id', function (req, res) {
    let user_id =req.params['id'];
    if (!user_id || !req.body) {
    return res.status(400).send({ error: user, message: 'user_id is not present' });
    }
    mySqlConnection.query("UPDATE userdetails SET lastName=?, firstName=?, email=?, phoneNumber=?, role=?, state=? WHERE id = ?", [req.body.lastName,req.body.firstName,
        req.body.email,req.body.phoneNumber,req.body.role,req.body.state, user_id], function (error, results, fields) {
    if (error) throw error;
    return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
    });
app.listen(3000,()=>{
    console.log("server is running..")
})