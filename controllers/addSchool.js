const connectDB = require('../config/db')

exports.addSchool = async (req,res)=>{
    try {
        const {name, address, latitude, longitude} = req.body;
        if(!name || !address || !latitude || !longitude){
            res.status(412).json({
                success:false,
                message:"Data is incomplete"
            })
            return;
            
        }

        connectDB.query(`insert into schools (name,address,latitude, 
            longitude) value('${name}','${address}',${latitude},${longitude});`,  (err, rows, fileds) =>{
                if (err) {
                    res.status(501).json({
                        success: false,
                        data: "internal server error",
                        message: err.message,
                    })
                    
                } else {
                    res.status(200).json({
                        success: true,
                        message: "data successfully inserted"
                    })
                    
                }
        })

    } catch (error) {
        console.log(error);
        res.status(501).json({
            success:false,
            data:"internal server error1",
            message:error.message
        })
        
    }

}
