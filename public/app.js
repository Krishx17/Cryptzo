document.addEventListener('DOMContentLoaded', () => {
  const fetchAndRender = async () => {
    try {
      const response = await fetch('/api/tickers');
      // console.log(response)
      if(!response.ok){ 
          throw new Error(`HTTP error! status ${response.status}`);
      }
      const tickers = await response.json();
      // console.log(response);
      // console.log(tickers);
      const app = document.getElementById('app');
      app.innerHTML = ''
      const table = document.createElement('table');
      // alert("Page refreshed");
      const header = `
        <tr>
          <th>#</th>
          <th>Platform</th>
          <th>Last Traded Price</th>
          <th>Buy / Sell Price</th>
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
            <td>${"₹"+Number(ticker.last).toFixed(2)}</td>
            <td>${"₹"+Number(ticker.buy).toFixed(2)}</td>
            <td>${"₹"+Number(ticker.sell).toFixed(2)}</td>
            <td>${Number(ticker.volume).toFixed(2)}</td>
            <td>${ticker.base_unit}</td>
          </tr>
        `;
        table.innerHTML += row;
      });
    
      app.appendChild(table);
      function startTimer(duration, display) {
        let timer = duration, seconds;
        setInterval(function () {
            seconds = parseInt(timer, 10);

            display.textContent = seconds;

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }
    } catch (err) {
        console.error('Error fetching tickers : ', err);
    }
  }
  fetchAndRender();
  setInterval(fetchAndRender(), 60000);
});

