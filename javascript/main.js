/* Show and hide sidebar */
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const sidebar = document.querySelector("aside");
menuBtn.addEventListener("click", () => {
  sidebar.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  sidebar.style.display = "none";
});
// change theme
const themeBtn = document.querySelector(".theme-btn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  themeBtn.querySelector("span:first-child").classList.toggle("active");
  themeBtn.querySelector("span:last-child").classList.toggle("active");
});
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

// // Define the WebSocket URL
// const socketUrl = "wss://ws.coincap.io/prices?assets=bitcoin";

// // Create a new Chart.js chart instance
// const ctx = document.getElementById("chart").getContext("2d");
// const chart = new Chart(ctx, {
//   type: "line",
//   data: {
//     labels: [],
//     datasets: [{
//       label: "BTC Price (usd)",
//       data: [],
//       borderColor: "red",
//       borderWidth: 2
//     }]
//   },
//   options: {
//     responsive: true
//   }
// });

// // Open a WebSocket connection to the CoinGecko API
// const socket = new WebSocket(socketUrl);
// socket.addEventListener("open", event => {
//   console.log("WebSocket connection opened");
// });

// // Handle incoming WebSocket messages and update the chart data
// socket.addEventListener("message", event => {
//   const data = JSON.parse(event.data);
//   chart.data.labels.push(new Date().toLocaleTimeString());
//   chart.data.datasets[0].data.push(data.bitcoin);
//   chart.update();
// });

// Define the chart configurations for each chart type
const chartConfigs = {
  line: {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "BTC Price (usd)",
          data: [],
          borderColor: "red",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
    },
  },
  bar: {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "BTC Price (usd)",
          data: [],
          backgroundColor: "blue",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
    },
  },
  bar: {
    type: "pie",
    data: {
      labels: [],
      datasets: [
        {
          label: "BTC Price (usd)",
          data: [],
          backgroundColor: "Yellow",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
    },
  },
};

// Create a new Chart.js chart instance with the default line chart configuration
const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, chartConfigs.line);

// Get a reference to the dropdown element
const dropdown = document.getElementById("chart-type");

// Add an event listener to the dropdown to update the chart instance
dropdown.addEventListener("change", (event) => {
  // Get the selected chart type
  const chartType = event.target.value;

  // Update the chart instance with the selected chart configuration
  chart.config.type = chartConfigs[chartType].type;
  chart.config.data = chartConfigs[chartType].data;
  chart.config.options = chartConfigs[chartType].options;
  chart.update();
});

// Open a WebSocket connection to the CoinCap API
const loadChartData = ((name)=>{
  console.log(name);

  const socketUrl = `wss://ws.coincap.io/prices?assets=${name}`;
  const socket = new WebSocket(socketUrl);
  console.log(socket);
  
  socket.addEventListener("open", (event) => {
    console.log("WebSocket connection opened");
  });
  
  // Handle incoming WebSocket messages and update the chart data
  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    console.log(event);
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(data[`${name}`]);

    chart.update();
  });
})




const investmentContainer = document.querySelector(".investment-container");



const formatedDate = ((id)=>{
  const date = new Date(id);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);

  return formattedDate;
})

async function fetchData() {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`);
    const data = await response.json();
    console.log(data.length);
    console.log(data);
    data.map((item) => {
      const investmentElement = document.createElement('div');
      investmentElement.className = 'investment col-14';
      investmentElement.innerHTML = `
        <img src="${item.image}">
        <h4>${item.name}</h4>
        <div class="date-time">
           
            <small class="text-muted">${ formatedDate( item.ath_date)}</small>
        </div>
        <div class="bonds">
          <p>${item.market_cap_rank}</p>
          <small class="text-muted">Rank</small>
        </div>                    
        <div class="amount">
          <h4>${item.current_price}</h4>
          <small class="danger">${item.ath_change_percentage}</small>
        </div>
      `;
      investmentContainer.appendChild(investmentElement);

      // Add event listener to investment container
      investmentElement.addEventListener('click', () => {
        loadChartData(item.id)
        console.log(`You clicked on ${item.name}!`);
        // Add code to do something when container is clicked
      });
    });
  } catch (error) {
    console.error(error);
  }
}

fetchData();
