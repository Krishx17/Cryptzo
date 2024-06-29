document.addEventListener("DOMContentLoaded", () => {
  const fetchAndRender = async () => {
    try {
      const response = await fetch("/api/tickers");
      // console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! status ${response.status}`);
      }
      const tickers = await response.json();
      // console.log(response);
      console.log(tickers);
      const bestPrice = document.getElementById("best-price-info");
      const avgBuy = tickers[0].buy;
      bestPrice.innerHTML = "₹" + avgBuy;

      const app = document.getElementById("app");
      app.innerHTML = "";
      const table = document.createElement("table");
      // alert("Page refreshed");
      const header = `
        <tr>
          <th>#</th>
          <th>Platform</th>
          <th>Last Traded Price</th>
          <th>Buy / Sell Price</th>
          <th>Difference</th>
          <th>Savings</th>
        </tr>
      `;
      table.innerHTML = header;

      tickers.forEach((ticker) => {
        const row = `
          <tr>
            <td>${ticker.id}</td>
            <td>${ticker.name}</td>
            <td>${"₹" + Number(ticker.last).toFixed(2)}</td>
            <td>${"₹" + ticker.buy + "  /  ₹" + ticker.sell}</td>
            <td class="${(ticker.sell - ticker.buy)/100 > 0 ? 'positive' : 'negative'}">${(ticker.sell - ticker.buy) / 100 > 0 ? "" : "- "}${Number((ticker.sell - ticker.buy) / 100).toFixed(2) + " %"}</td>
            <td class="${(ticker.sell - ticker.buy) > 0 ? 'positive' : 'negative'}">${(ticker.sell - ticker.buy) > 0 ? '▲' : '▼'}${"₹" + Number(ticker.sell - ticker.buy).toFixed(2)}</td>
          </tr>
        `;
        table.innerHTML += row;
      });

      // <td class="${profitLoss >= 0 ? 'positive' : 'negative'}">₹${Math.abs(profitLoss).toFixed(2)} ${profitLoss >= 0 ? '▲' : '▼'}</td>

      app.appendChild(table);

    } catch (err) {
      console.error("Error fetching tickers : ", err);
    }
  };

  let count = 60;
  const updateTimer = () => {
    const timerDisplay = document.getElementById("indicator");
    
    if (timerDisplay) { 
      timerDisplay.textContent = count + " seconds remaining";
      count--;
      if (count == 0) {
        count = 60;
      }
    }
  };

  fetchAndRender();
  setInterval(fetchAndRender, 60000); 
  setInterval(updateTimer, 1000); 
});


