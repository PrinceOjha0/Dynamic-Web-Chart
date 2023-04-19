
// const chart= document.querySelector("#chart").getContext('2d');
//create new chart instance
// new Chart(chart,{
//     type:'line',
//     data:{
//         labels:['jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'],
//         datasets: [
//             {
//             label:'BTC',
//             data:[29374,33537,49631,59095,36684,33572,39974,48847,48116,61004],
//             borderColor:'red',
//             borderwidth:2
//         },
//         {
//             label:'ETH',
//             data:[31504,35537,48001,582095,36504,33575,39974,48847,48116,61004],
//             borderColor:'blue',
//             borderwidth:2
//         },
//     ]
// }, 
// options:{
//     responsive:true
//   }
// })
// Define the API endpoint and parameters
// const apiEndpoint = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart";
// const params = "vs_currency=inr&days=30";

// // Use fetch() to retrieve the data
// fetch(apiEndpoint + "?" + params)
//   .then(response => response.json())
//   .then(data => {
//     // Extract the BTC prices from the data
//     const prices = data.prices.map(price => price[1]);

//     // Create a new Chart.js chart instance
//     const ctx = document.getElementById("chart").getContext("2d");
//     const chart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: Array.from({ length: prices.length }, (_, i) => i),
//         datasets: [{
//           label: "BTC Price (Inr)",
//           data: prices,
//           borderColor: "red",
//           borderWidth: 2
//         }]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             id: "rupees",
//             type: "linear",
//             position: "right",
//             ticks: {
//               callback: function (value, index, values) {
//                 return "₹" + value.toLocaleString();
//               }
//             }
//           }
//         }
//       }
      
//     });
//   })
//   .catch(error => {
//     console.error(error);
//   });

// Define the WebSocket URL
const socketUrl = "wss://ws.coincap.io/prices?assets=bitcoin";

// Create a new Chart.js chart instance
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "BTC Price (usd)",
      data: [],
      borderColor: "red",
      borderWidth: 2
    }]
  },
  options: {
    responsive: true
  }
});

// Open a WebSocket connection to the CoinGecko API
const socket = new WebSocket(socketUrl);
socket.addEventListener("open", event => {
  console.log("WebSocket connection opened");
});

// Handle incoming WebSocket messages and update the chart data
socket.addEventListener("message", event => {
  const data = JSON.parse(event.data);
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets[0].data.push(data.bitcoin);
  chart.update();
});



