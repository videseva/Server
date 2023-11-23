const express = require('express');
const cors = require('cors');

//Creamos el serveidor.
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/api'));




app.get("/",(req,res)=>{
    res.send("Hola mundo");
})

app.listen(4000, () => {
    console.log("El servidor esta escuchando prerfectamente")
})
