import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const API_URL ="https://zozor54-whois-lookup-v1.p.rapidapi.com/";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{

  res.render("index.ejs");
})


app.post("/get", async (req, res) => {
    const domainname = req.body.dm;
    console.log(domainname);

    try {
        
      const result = await axios.get(API_URL,{
        params: {
          domain: domainname,
          format: 'json',
        _forceRefresh: '0'
               },
               headers: {
                'x-rapidapi-key': '694ec89f46msh3b4691244d5d3e6p1ef530jsn565b744f5ab6',
                'x-rapidapi-host': 'zozor54-whois-lookup-v1.p.rapidapi.com'
              }
      });
     
      res.render("index.ejs",
        {
          server:result.data.server,
          name:result.data.name,
          created:result.data.created,
          expires:result.data.expires,
          ns:result.data.nameserver,
          ips:result.data.ips,
          ws:result.data.whoisserver,
          rawdata: result.data.rawdata,
               });

    } 
    catch (error) {
 res.status(404).send(error.message);
}
});


app.listen(3000,()=>{console.log("Server started");});