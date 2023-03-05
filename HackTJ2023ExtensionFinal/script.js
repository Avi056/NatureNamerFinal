// // Create a port for communicating with the native app
// const port = chrome.runtime.connectNative('naturething');

// // Listen for messages from the native app
// port.onMessage.addListener((response) => {
//   // Print the response to the console
//   console.log(response);
// });

// // Send a message to the native app
// port.postMessage({ action: 'run_python_script' });

// // Set up the Native Messaging connection
// chrome.runtime.onConnectNative.addListener((port) => {
//   // Listen for messages from the port
//   port.onMessage.addListener((message) => {
//     if (message.action === 'run_python_script') {
//       // Run the Python script and capture the output
//       const spawn = require('child_process').spawn;
//       const process = spawn('python', ['newesttester.py']);

//       let output = '';
//       process.stdout.on('data', (data) => {
//         output += data;
//       });

//       // Send the output back to the port
//       process.on('exit', () => {
//         port.postMessage(output);
//       });
//     }
//   });
// });

// const express = require('express');
// const app = express();
// // const $ = require('jquery');
// var jsdom = require('jsdom');
// $ = require('jquery')(new jsdom.JSDOM().window);

// app.get('/', (req, res) => {
  //   res.send('Hello, world!');
  // });
  
  // const fileInput = document.getElementById('imageUpload')
  
  // fileInput.addEventListener('change',(event) => {
    //   const file = event.target.files[0]
    //   const url = URL.createObjectURL(file)
    
    //   chrome.downloads.download({
      //     url: url,
      //     filename: fine.name,
      //     saveAs: true
      //   })
      // })
      
      // // Connect to the native messaging host
      // const port = chrome.runtime.connectNative('com.example.myapp');
      
      // // Listen for a response from the native messaging host
      // port.onMessage.addListener((response) => {
        //   console.log(`Received response: ${response}`);
        // });
        
        // // Send a message to the native messaging host to execute the Python script
        // port.postMessage({ text: 'newesttester.py' });
        
        
var plant=''

$('#plantname').text(plant)

$(document).ready(function() {
    $('#button').click(function() {
      plant = document.getElementById('pname').value
      $('#plantname').text(plant)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            {code: '$("body").html()'},
            async function(html) {
                await $.ajax({
                    type: "POST",
                    url: "https://api.openai.com/v1/completions",
                    headers: {
                      // "Authorization": "Bearer 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",
                      "Authorization": "Bearer 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",
                      "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                      "prompt": "give me information on "+plant,
                      "max_tokens": 128,
                      "temperature": 0.5,
                      "model": "text-davinci-003"
                    }),
  
                    success: function(data) {
                      // Handle the API response here
                      console.log("success")
                      var temp = data.choices[0].text
                      console.log(temp)
                      temp = temp.replace(/\.[^.!?]+$/,".")
                      console.log(temp)
                      $('#outputtemp').text(temp)
                    },
                    error: function(error) {
                      // Handle any errors here
                      console.log('error')
                      console.log(error)
                    }
                  });
                  await $.ajax({
                    type: "POST",
                    url: "https://api.openai.com/v1/completions",
                    headers: {
                      // "Authorization": "Bearer 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",
                      "Authorization": "Bearer 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",
                      "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                      "prompt": "is "+plant+" harmful, toxic, or unsafe to humans naturally? state yes or no.",
                      "temperature": 0.5,
                      "model": "text-davinci-003"
                    }),
  
                    success: function(data) {
                      // Handle the API response here
                      console.log("success")
                      var temp = data.choices[0].text
                      $('#harmresponse').text(temp)
                      // console.log(temp)
                      // let firstemp=[]
                      // if(plant.includes('.')==true){
                      //   firstemp = temp.match(/(Yes|No).*?\.\w*\./)
                      // }
                      // else{
                      //   firstemp = temp.match(/(Yes|No).*?\./)
                      // }
                      // console.log(firstemp)
                      // var firstempe = firstemp[0]
                      // console.log(firstempe)
                      // $('#harmresponse').text(firstempe)

                      // var secondtemp=temp.replace(firstemp[0],"")
                      // let secondtempe=secondtemp.match(/(Yes|No).*?\.$/)
                      // var secondtempee = secondtempe[0]
                      // console.log(secondtempee)
                      // $('#weedresponse').text(secondtempee)
                      // console.log(temp)
                      // var counter = temp.split(".").length-1
                      // if(counter%2==1){
                      //   counter-=1
                      // }
                      // var firstindex = 
                      // let firstemp=temp.match(/(Yes|No).*?\.([^a-z])/)
                      // var firstempe = firstemp[0].slice(0,firstemp[0].length-2)
                      // $('#harmresponse').text(firstempe)
                      // console.log(firstempe)

                      // // let firsttemp=temp.match(/(Yes|No).*?\./)
                      // // console.log(firsttemp[0])
                      // // $('#harmresponse').text(firsttemp[0])
                      // var secondtemp=temp.replace(firstemp[0],"")
                      // let secondtempe=secondtemp.match(/(Yes|No).*?\./)
                      // var secondtempee = secondtemp[0].slice(2,secondtempe[0].length-1) 
                      // // console.log(secondtemp)
                      // // console.log(secondtempe[0])
                      // console.log(secondtempee)
                      // $('#weedresponse').text(secondtempee)
                    },
                    error: function(error) {
                      // Handle any errors here
                      console.log('error')
                      console.log(error)
                    }
                  });
                  await $.ajax({
                    type: "POST",
                    url: "https://api.openai.com/v1/completions",
                    headers: {
                      // "Authorization": "Bearer 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",
                      "Authorization": "Bearer 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",
                      "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                      "prompt": "is"+plant+" a weed or an invasive species? state yes or no.",
                      "max_tokens": 128,
                      "temperature": 0.5,
                      "model": "text-davinci-003"
                    }),
  
                    success: function(data) {
                      // Handle the API response here
                      console.log("success")
                      var temp = data.choices[0].text
                      $('#weedresponse').text(temp)
                    },
                    error: function(error) {
                      // Handle any errors here
                      console.log('error')
                      console.log(error)
                    }
                  });
                })
            });
        });
    });