const HttpError = require("../models/http-error");

//some test data to use during development - these will be stored in mongodb 
let DUMMY_POINTS = [

    {
        xPoint: 80,
        yPoint: -20
    },
    {
        xPoint: 90,
        yPoint: -50
    },
    {
        xPoint: 15,
        yPoint: 40
    }
   
]

const getCoordinates = (req,res,next) =>{
    const points = DUMMY_POINTS;
    if(!points){
        throw new HttpError('coordinates not found', 404)
    }
    res.json({points});
};

exports.getCoordinates = getCoordinates;