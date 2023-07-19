//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from 'pusher';
import Cors from 'cors';

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1637473",
    key: "adf104b13a45b45f0b23",
    secret: "0794042ead46123d2c27",
    cluster: "mt1",
    useTLS: true
  });

//middleware

app.use(express.json())

app.use(Cors())

// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', '*')
//     next()
// })


//DB Config
const connection_url = "mongodb+srv://mayankrai627:JFuskPQ1KhHr6unm@cluster0.kvazxkx.mongodb.net/?retryWrites=true&w=majority"
  
mongoose.connect(connection_url, {
  // userCreateIndex:true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ????

const db = mongoose.connection


db.once('open',()=>{
    console.log("DB Connected")
    const msgCollection = db.collection ('messagecontents')
    const changeStream = msgCollection.watch()
    changeStream.on('change',(change) =>{
        console.log("A change occured" ,   change)

        if(change.operationType == 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages' , 'inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        }
        else{
            console.log('Error triggering Pusher')
        }
    })
})



//api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.get('/messages/sync', (req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(200).send(data)
        }
    })
})

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
