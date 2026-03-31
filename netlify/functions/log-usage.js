// netlify/functions/log-usage.js

//const fetch = require('node-fetch');

//exports.handler = async (event) => {
//    const data = JSON.parse(event.body);

//    const response = await fetch('https://script.google.com/macros/s/AKfycbwTXYksaEAhemv1kF3Js7QKlpVBnA9N3XVdwnB-fhxnX-tB_D9rtfhyjMrJITbBrh8/exec', {
//        method: 'POST',
//        body: JSON.stringify({
//            domain: data.domain,
//            feature: data.feature,
//            info: data.info || ""
//        }),
//        headers: { 'Content-Type': 'application/json' }
//    });

//    return {
//        statusCode: 200,
//        body: JSON.stringify({ message: "Logged to Google Sheets" }),
//    };
//};
