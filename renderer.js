// renderer.js

const apiKey = 'c003949dc4363eda3f8e234f';
const apiUrl = 'https://v6.exchangerate-api.com/v6/' + apiKey + '/latest/USD';

// Function to convert currency
function convertCurrency(fromCurrency, toCurrency, amount) {
  // Fetch the exchange rates from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Extract exchange rates from the API response
      const exchangeRates = data.conversion_rates;

      // Check if the 'toCurrency' is in the exchange rates data
      if (exchangeRates.hasOwnProperty(toCurrency)) {
        // Calculate the converted amount using the exchange rate
        const conversionRate = exchangeRates[toCurrency];
        const convertedAmount = amount * conversionRate;

        // Display the converted amount
        document.getElementById('result').textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`;
      } else {
        console.error(`Conversion rate for ${toCurrency} not found.`);
        // Handle the case where the target currency is not in the exchange rates data
      }
    })
    .catch(error => {
      console.error('Error fetching currency conversion data:', error);
      // Handle errors here, such as displaying an error message to the user
    });
}

// Add an event listener for the conversion button
document.getElementById('convertButton').addEventListener('click', () => {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = parseFloat(document.getElementById('amount').value);

  convertCurrency(fromCurrency, toCurrency, amount);
});
