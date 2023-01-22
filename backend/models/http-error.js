//MAX SHWARZMULLER - SIMPLY CUSTOM HTTP ERROR FOR DEBUGGING
class HttpError extends Error{  //available in modern js 
    constructor(message,errorCode){
        super(message);   //add a message property, calling superclass constructor ("Error class")
        this.code = errorCode;
    }
}

module.exports = HttpError;  