const fetch = require('node-fetch');
const express = require('express');
const app= express();

const port = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send('Server Started');
});

app.get('/api/:org',(req,res)=>{
    const org=req.params.org;
    const giturl=`https://api.github.com/orgs/${org}/repos`;
    const list =[];
    fetch(giturl)
    .then(response =>{
        return response.json();
    })
    .then(json =>{
        json.forEach(element => {
            console.log(element.name);
            list.push(element.name);
        });
        res.send(list);  
    });
});

app.get('/api/all',(req,res)=>{
    const giturl='https://api.github.com/organizations';
    //const altgiturl=https://api.github.com/search/users?q=type:org
    fetch(giturl)
    .then(response=>{
        return response.json();
    })
    .then(json=>{
        res.send(json);
    });
});

app.listen(port,()=>{
    console.log('Listening at '+port);
});