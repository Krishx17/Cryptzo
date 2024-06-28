document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/tickers');
      console.log(response)
      if(!response.ok){ 
          throw new Error(`HTTP error! status ${response.status}`);
      }
      const tickers = await response.json();
      // console.log(response);
      console.log(tickers);
      const app = document.getElementById('app');
      const table = document.createElement('table');
      const header = `
        <tr>
          <th>#</th>
          <th>Platform</th>
          <th>Last Traded Price</th>
          <th>Buy/Sell Price</th>
          <th>Sell</th>   
          <th>Volume</th>
          <th>Base Unit</th>
        </tr>
      `;
      table.innerHTML = header;
    
      tickers.forEach(ticker => {
        const row = `
          <tr>
            <td>${ticker.id}</td>
            <td>${ticker.name}</td>
            <td>${ticker.last}</td>
            <td>${ticker.buy}</td>
            <td>${ticker.sell}</td>
            <td>${ticker.volume}</td>
            <td>${ticker.base_unit}</td>
          </tr>
        `;
        table.innerHTML += row;
      });
    
      app.appendChild(table);
    } catch (err) {
        console.error('Error fetching tickers : ', err);
    }
  });
