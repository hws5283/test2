//REQUIRES NODEJS AND MONGODB NODEJS DRIVER FOR CONNECTION ***
const {MongoClient} = require('mongodb');   //what we use for connecting to dbs - requires use of mongoDB nodejs driver
var result = null;
async function main(){
    const uri = "mongodb+srv://hws5283:test123@pointdata.7oisrrw.mongodb.net/?retryWrites=true&w=majority"  //mongodb user client (not mongodb credentials)
    const client = new MongoClient(uri);
    //await - block further execution until this operation is  done
   try{
    await client.connect();
    //find point document
    await findOneListingByName(client, "Lake Leonard")  //get result 

    //update command
    //await updatePointByName(client, "Test Point", {description:"changed description", imgSource: "changed source"})
    
    //adding entry to db - testing connection - Crud SUCCESFUL
    /*
    await createEntry(client,{
        name:"Test Point",
        description:"test point description",
        imgSource:"https://res.cloudinary.com/dog5jmb4w/image/upload/v1666634628/sample.jpg",
        xPoint: 55,
        yPoint: 90
    })
    */

   }catch(e){
    console.error(e);
   }finally{
    await client.close();
   }
}

main().catch(console.error);  //call main

async function updatePointByName(client, nameOfPoint, updatedPoint){
    const result = await client.db("pointData").collection("pointInformation").updateOne
    ({name: nameOfPoint}, {$set: updatedPoint});
    //only altered document data will be changed *
    console.log(`${result.matchedCount} documents matched`);
}

//read operation cRud
async function findOneListingByName(client, nameOfPoint){
    const result = await client.db("pointData").collection("pointInformation").findOne({name:nameOfPoint});   //get result from query 

    if(result){
        console.log("found result");
        console.log(result);            //display result document
        console.log(result.name);
    }else{
        console.log("No entry found");
    }
}

async function createEntry(client, newPointData){
    //inserts ONE document into the collection 
    const result = await client.db("pointData").collection("pointInformation").insertOne
    (newPointData);

    console.log("enw listing added");
}

/*
async function listDatabases(client){
    const databaseList = await client.db().admin().listDatabases();
    console.log(databaseList);
    
}
    
*/  
