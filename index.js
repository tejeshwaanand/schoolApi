const express =require('express')
const app = express();
const schoolRoutes = require('./routes/schoolRoutes')
require('dotenv').config()
const PORT = 5000
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server is running");
  })

app.use('/api/schools',schoolRoutes);
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})


