const express=require('express')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.json())

var {google}=require('googleapis')
const credentials=require('./credentials.json')
const auth=new google.auth.JWT(credentials.client_email,null
    ,credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'],null)

google.options({auth})
const sheets=google.sheets('v4')
/*auth.authorize((err,token)=>{
    console.log(token)
})*/

const spreadsheetId='1whVd5WrTsB3YF8czM9YyFWndQ9DsCimhHjGxbcuhHPo'
app.get('/response',function(req,res){
    sheets.spreadsheets.values.get({
        spreadsheetId,
        range:'response!bc'//b and c columns
    }, function(err,response){
        if(err){
            console.log(err);
        }
        res.send(JSON.stringify(response.data.values));
    });
})


app.listen(3000)
