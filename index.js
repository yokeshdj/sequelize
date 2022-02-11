const {sequelize,User} = require("./models");
const express = require('express');
const app = express();

app.use(express.json());

app.listen(5000,async ()=>{
    await sequelize.authenticate();
    console.log("Server started");
    // await sequelize.sync();
})

app.post('/userdet',async (req,res)=>{
    const {firstName,lastName,email} = req.body;
    try {
        const newUser = await User.create({firstName,lastName,email})
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.json("failed");
    }
})

app.get('/userdet',async (req,res) =>{
    // const {id} = req.params;
    try {
        const usersData = await User.findAll();
        // console.log(usersData);
        res.json(usersData)
    } catch (error) {
        res.json("failed")
    }
})


app.put('/userdet/:id',async (req,res) => {
    const {firstName,lastName,email} = req.body;
    const {id} = req.params;
    try {
        await User.update({lastName}, {
            where: {id}
          });
        res.json("Success")
    } catch (error) {
        res.json("failed")
    }
})


app.delete('/userdet/:id',async (req,res) => {
    const {id} = req.params;
    try {
        await User.destroy({
            where :{id}
          });
        res.json("Success")
    } catch (error) {
        res.json("failed")   
    }
})