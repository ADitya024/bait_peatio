// Common , for routing.
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var ticker = require("./Ticker");
const request = require('request');



//MiddleWAre function.
router.use(bodyParser.urlencoded({ extended: true }));


// router.get("/btc/:fiat",function(req,res){
//         var curriency = req.params.fiat;
//     //     send a request to blockchain
//     request('https://blockchain.info/de/ticker', (error, response, body) => {
//      // parse the json answer and get the current bitcoin value
//         const data = JSON.parse(body)
//         //value = (parseInt(data.THB.buy, 10) + parseInt(data.THB.sell, 10)) / 2;
//        // console.log("BTC Rates : "+data.USD)
//         // console.log(" Currency "+curriency+"\n\r BODY :"+body);
//         if(curriency === 'USD'){
//             // console.log(data.USD);
//             res.send(data.USD);
//         }else if(curriency === "EUR"){
//             // console.log(data.EUR);
//             res.send(data.EUR);
//         }
//     });
// });

// router.get("/btc",function(req,res){
//     var curriency = req.param.fiat;
// //     send a request to blockchain
// request('https://blockchain.info/de/ticker', (error, response, body) => {
//  // parse the json answer and get the current bitcoin value
//     const data = JSON.parse(body)
//     //value = (parseInt(data.THB.buy, 10) + parseInt(data.THB.sell, 10)) / 2;
//   //  console.log("BTC Rates : "+data.USD)
//    console.log("static btc rates api."+body);
//      res.send(data);

// });
// });



router.get("/:crypto/:curriency",function(req,res){
try {
    var crypto = req.params.crypto;
    var curriency = req.params.curriency;
    console.log("Dynamic Crypto and fiat")
    switch (crypto) {
        case 'btc':
        request('https://blockchain.info/de/ticker', (error, response, body) => {
            // parse the json answer and get the current bitcoin value
               const data = JSON.parse(body)
               switch (curriency) {
                case "USD":
                res.status(200).send(data.USD);                    
                    break;
                case "EUR":
                res.status(200).send(data.EUR);
                    break;
                case "*":
                res.status(200).send(data);
                    break;
                default: 
                 res.status(404).send({"status":false,message : "Not available in provided curriency"});
                    break;
                }
 
           });

            break;
    
            // case ETH
            case 'eth':

            break; 


        default:res.status(404).send({"status":false,message : "Specify Crypto , to get ticker"});
            break;
    }

} catch (error) {
    
}
});















module.exports = router;