const connectDB = require('../config/db')

exports.listSchool = async (req,res)=>{
    try {
        const {longitude,latitude, page=1, limit=10} = req.query;
        const lati = parseFloat(latitude);
        const longi = parseFloat(longitude);

        if(!lati || !longi){
            res.status(412).json({
                success:false,
                message:"no data found",
            });
            return;
        }

        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const offset = (parsedPage - 1) * parsedLimit;

        // Validate pagination inputs
        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage < 1 || parsedLimit < 1) {
            res.status(400).json({
                success: false,
                message: "Invalid pagination parameters",
            });
            return;
        }

        //query
        const query = `
            SELECT *, 
                   POWER(latitude - ${lati}, 2) + POWER(longitude - ${longi}, 2) AS dis 
            FROM schools 
            ORDER BY dis 
            LIMIT ${parsedLimit} 
            OFFSET ${offset};
        `;
        
        connectDB.query(query,(err, rows)=>{
            if(err){
                console.log(err);
                res.status(501).json({
                    success: false,
                    data: "Internal server error",
                    message: err.message,
                });
            }
            else{
                res.status(200).json({
                    success: true,
                    data: rows,
                    message: "Data retrieved successfully",
                });
            }

        });


    } catch (err) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message,
        });
    }
} 