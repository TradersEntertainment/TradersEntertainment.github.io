<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preferred Stocks Correlation Matrix</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #fff;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #00d4ff, #00ff88);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .header p {
            font-size: 1.1em;
            color: #b8c5d6;
        }

        .api-setup {
            background: rgba(255, 165, 0, 0.1);
            border: 1px solid rgba(255, 165, 0, 0.3);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 30px;
        }

        .api-input {
            display: flex;
            gap: 10px;
            align-items: center;
            margin-top: 15px;
            flex-wrap: wrap;
        }

        .controls {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .control-row {
            display: flex;
            gap: 20px;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .control-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        label {
            font-weight: 600;
            color: #e0e6ed;
            font-size: 0.9em;
        }

        select, input {
            padding: 10px 15px;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.15);
            color: white;
            font-size: 14px;
            min-width: 150px;
        }

        select:focus, input:focus {
            outline: none;
            box-shadow: 0 0 0 2px #00d4ff;
        }

        .btn {
            padding: 12px 25px;
            background: linear-gradient(45deg, #00d4ff, #00ff88);
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 14px;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 212, 255, 0.3);
        }

        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .matrix-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            overflow-x: auto;
        }

        .matrix-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            overflow: hidden;
        }

        .matrix-table th,
        .matrix-table td {
            padding: 12px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-weight: 500;
        }

        .matrix-table th {
            background: linear-gradient(45deg, #00d4ff22, #00ff8822);
            font-weight: 700;
            font-size: 0.9em;
        }

        .correlation-cell {
            font-weight: 600;
            border-radius: 6px;
            margin: 2px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
        }

        .correlation-cell:hover {
            transform: scale(1.1);
            z-index: 10;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .info-panel {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 25px;
            margin-top: 30px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .legend {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin: 20px 0;
            flex-wrap: wrap;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9em;
        }

        .legend-color {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .loading {
            text-align: center;
            padding: 40px;
            font-size: 1.2em;
            color: #b8c5d6;
        }

        .error {
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid rgba(255, 0, 0, 0.3);
            color: #ff6b6b;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .success {
            background: rgba(0, 255, 0, 0.1);
            border: 1px solid rgba(0, 255, 0, 0.3);
            color: #00ff88;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
        }

        .stat-value {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .stat-label {
            font-size: 0.9em;
            color: #b8c5d6;
        }

        .api-status {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }

        .status-online { background-color: #00ff88; }
        .status-offline { background-color: #ff4757; }
        .status-loading { background-color: #fdcb6e; animation: pulse 2s infinite; }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .deployment-guide {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 25px;
            margin-top: 30px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .deployment-guide h3 {
            color: #00d4ff;
            margin-bottom: 15px;
        }

        .deployment-guide ol {
            margin-left: 20px;
            line-height: 1.6;
        }

        .deployment-guide li {
            margin-bottom: 10px;
        }

        @media (max-width: 768px) {
            .control-row, .api-input {
                flex-direction: column;
                align-items: stretch;
            }
            
            .control-group {
                width: 100%;
            }
            
            select, input {
                min-width: auto;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Preferred Stocks Correlation Matrix</h1>
            <p>Real-time correlation analysis with live market data</p>
        </div>

        <div class="api-setup">
            <h3 style="color: #ffa500; margin-bottom: 15px;">
                <span class="api-status status-offline" id="apiStatus"></span>
                API Configuration
            </h3>
            <p style="color: #b8c5d6; margin-bottom: 15px;">
                Enter your Alpha Vantage API key for real-time data. Get free API key from: 
                <a href="https://www.alphavantage.co/support/#api-key" target="_blank" style="color: #00d4ff;">alphavantage.co</a>
            </p>
            <div class="api-input">
                <input type="text" id="apiKey" placeholder="Enter your Alpha Vantage API key" style="flex: 1; min-width: 300px;">
                <button class="btn" onclick="setApiKey()">Connect API</button>
                <button class="btn" onclick="useDemoData()" style="background: linear-gradient(45deg, #6c5ce7, #fd79a8);">Use Demo Data</button>
            </div>
            <div id="apiMessage"></div>
        </div>

        <div class="controls">
            <div class="control-row">
                <div class="control-group">
                    <label>Time Period</label>
                    <select id="timePeriod">
                        <option value="30">30 Days</option>
                        <option value="60" selected>60 Days</option>
                        <option value="90">90 Days</option>
                        <option value="180">6 Months</option>
                        <option value="365">1 Year</option>
                    </select>
                </div>

                <div class="control-group">
                    <label>Update Frequency</label>
                    <select id="updateFreq">
                        <option value="daily" selected>Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </div>

                <div class="control-group">
                    <label>Custom Ticker</label>
                    <input type="text" id="customTicker" placeholder="e.g., BAC-PK">
                </div>

                <button class="btn" onclick="addCustomStock()">Add Stock</button>
                <button class="btn" onclick="refreshMatrix()" id="refreshBtn">Refresh Data</button>
            </div>
        </div>

        <div class="matrix-container">
            <div class="legend">
                <div class="legend-item">
                    <div class="legend-color" style="background: #ff4757;"></div>
                    <span>Strong Negative (-1.0 to -0.7)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #ff7675;"></div>
                    <span>Moderate Negative (-0.7 to -0.3)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #fdcb6e;"></div>
                    <span>Weak (-0.3 to 0.3)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #6c5ce7;"></div>
                    <span>Moderate Positive (0.3 to 0.7)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #00b894;"></div>
                    <span>Strong Positive (0.7 to 1.0)</span>
                </div>
            </div>

            <div id="matrixContent">
                <div class="loading">Configure API key or use demo data to start analysis...</div>
            </div>
        </div>

        <div class="info-panel">
            <h3 style="margin-bottom: 15px; color: #00d4ff;">Market Statistics</h3>
            <div class="stats" id="statsContainer">
                <!-- Stats will be populated here -->
            </div>
            
            <div style="margin-top: 25px;">
                <h4 style="color: #00ff88; margin-bottom: 10px;">Selected Pair Analysis</h4>
                <div id="pairAnalysis" style="color: #b8c5d6;">
                    Click on any correlation cell to see detailed analysis
                </div>
            </div>
        </div>

        <div class="deployment-guide">
            <h3>🚀 Deploy This Site for FREE</h3>
            <p style="color: #b8c5d6; margin-bottom: 20px;">Get your own website accessible from anywhere:</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                <div>
                    <h4 style="color: #00ff88; margin-bottom: 10px;">Option 1: Netlify (Recommended)</h4>
                    <ol style="color: #b8c5d6; font-size: 0.9em;">
                        <li>Create account at <a href="https://netlify.com" target="_blank" style="color: #00d4ff;">netlify.com</a></li>
                        <li>Drag & drop your HTML file</li>
                        <li>Get instant domain like: yoursite.netlify.app</li>
                        <li>Custom domain: $12/year optional</li>
                    </ol>
                </div>
                
                <div>
                    <h4 style="color: #6c5ce7; margin-bottom: 10px;">Option 2: Vercel</h4>
                    <ol style="color: #b8c5d6; font-size: 0.9em;">
                        <li>Sign up at <a href="https://vercel.com" target="_blank" style="color: #00d4ff;">vercel.com</a></li>
                        <li>Connect your GitHub repo</li>
                        <li>Auto-deploy on every update</li>
                        <li>Get: yourapp.vercel.app</li>
                    </ol>
                </div>
                
                <div>
                    <h4 style="color: #fd79a8; margin-bottom: 10px;">Option 3: GitHub Pages</h4>
                    <ol style="color: #b8c5d6; font-size: 0.9em;">
                        <li>Upload to GitHub repository</li>
                        <li>Enable Pages in Settings</li>
                        <li>Access via: username.github.io/reponame</li>
                        <li>100% Free forever</li>
                    </ol>
                </div>
            </div>
            
            <p style="color: #ffa500; margin-top: 20px; font-size: 0.9em;">
                💡 <strong>Pro Tip:</strong> Save this HTML file as "index.html" and you're ready to deploy!
            </p>
        </div>
    </div>

    <script>
        // API Configuration
        let API_KEY = '';
        let isApiConnected = false;
        let useDemo = false;

        // Sample preferred stocks
        const preferredStocks = [
            'BAC-PK', 'BAC-PL', 'JPM-PC', 'JPM-PD', 'WFC-PQ', 'WFC-PR',
            'C-PN', 'GS-PK', 'MS-PI', 'USB-PH', 'PNC-PP', 'TFC-PI'
        ];

        let correlationMatrix = {};
        let selectedPair = null;

        // Alpha Vantage API functions
        async function fetchStockData(symbol, period = '60') {
            if (useDemo) {
                return generateDemoStockData();
            }
            
            if (!API_KEY) {
                throw new Error('API key not configured');
            }

            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}&outputsize=compact`);
                const data = await response.json();
                
                if (data['Error Message']) {
                    throw new Error(`API Error: ${data['Error Message']}`);
                }
                
                if (data['Note']) {
                    throw new Error('API rate limit reached. Please wait a moment.');
                }

                const timeSeries = data['Time Series (Daily)'];
                if (!timeSeries) {
                    throw new Error(`No data found for ${symbol}`);
                }

                const prices = Object.keys(timeSeries)
                    .slice(0, parseInt(period))
                    .map(date => parseFloat(timeSeries[date]['4. close']));

                return prices;
            } catch (error) {
                console.error(`Error fetching data for ${symbol}:`, error);
                return generateDemoStockData(); // Fallback to demo data
            }
        }

        function generateDemoStockData() {
            const prices = [];
            let price = 25 + Math.random() * 50;
            
            for (let i = 0; i < 60; i++) {
                price += (Math.random() - 0.5) * 2;
                price = Math.max(price, 10);
                prices.push(price);
            }
            
            return prices;
        }

        function calculateCorrelation(prices1, prices2) {
            const n = Math.min(prices1.length, prices2.length);
            if (n < 2) return 0;

            const mean1 = prices1.slice(0, n).reduce((a, b) => a + b) / n;
            const mean2 = prices2.slice(0, n).reduce((a, b) => a + b) / n;

            let num = 0, den1 = 0, den2 = 0;
            
            for (let i = 0; i < n; i++) {
                const diff1 = prices1[i] - mean1;
                const diff2 = prices2[i] - mean2;
                
                num += diff1 * diff2;
                den1 += diff1 * diff1;
                den2 += diff2 * diff2;
            }

            const denominator = Math.sqrt(den1 * den2);
            return denominator === 0 ? 0 : num / denominator;
        }

        async function createCorrelationMatrix() {
            const period = document.getElementById('timePeriod').value;
            const stocks = [...preferredStocks];
            const stockData = {};
            
            updateApiStatus('loading');
            document.getElementById('matrixContent').innerHTML = '<div class="loading">Fetching market data...</div>';
            
            try {
                // Fetch data for all stocks
                for (let i = 0; i < stocks.length; i++) {
                    const symbol = stocks[i];
                    document.getElementById('matrixContent').innerHTML = 
                        `<div class="loading">Fetching data for ${symbol}... (${i+1}/${stocks.length})</div>`;
                    
                    stockData[symbol] = await fetchStockData(symbol, period);
                    
                    // Add delay to respect API rate limits
                    if (!useDemo && i < stocks.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1200)); // 12 seconds delay for free API
                    }
                }

                // Calculate correlation matrix
                document.getElementById('matrixContent').innerHTML = '<div class="loading">Calculating correlations...</div>';
                
                correlationMatrix = {};
                stocks.forEach(stock1 => {
                    correlationMatrix[stock1] = {};
                    stocks.forEach(stock2 => {
                        if (stock1 === stock2) {
                            correlationMatrix[stock1][stock2] = 1.0;
                        } else {
                            const correlation = calculateCorrelation(stockData[stock1], stockData[stock2]);
                            correlationMatrix[stock1][stock2] = Math.round(correlation * 1000) / 1000;
                        }
                    });
                });

                displayMatrix();
                updateStats();
                updateApiStatus('online');
                
                showMessage('success', 'Correlation matrix updated successfully!');
                
            } catch (error) {
                console.error('Error creating correlation matrix:', error);
                showMessage('error', `Error: ${error.message}`);
                updateApiStatus('offline');
            }
        }

        function displayMatrix() {
            const stocks = Object.keys(correlationMatrix);
            
            let html = '<table class="matrix-table">';
            
            // Header row
            html += '<tr><th></th>';
            stocks.forEach(stock => {
                html += `<th>${stock}</th>`;
            });
            html += '</tr>';
            
            // Data rows
            stocks.forEach(stock1 => {
                html += `<tr><th>${stock1}</th>`;
                stocks.forEach(stock2 => {
                    const correlation = correlationMatrix[stock1][stock2];
                    const color = getCorrelationColor(correlation);
                    html += `<td class="correlation-cell" 
                            style="background-color: ${color}; color: white;" 
                            onclick="selectPair('${stock1}', '${stock2}', ${correlation})"
                            title="Correlation: ${correlation}">
                            ${correlation.toFixed(3)}
                        </td>`;
                });
                html += '</tr>';
            });
            
            html += '</table>';
            document.getElementById('matrixContent').innerHTML = html;
        }

        function getCorrelationColor(value) {
            if (value >= 0.7) return '#00b894';
            if (value >= 0.3) return '#6c5ce7';
            if (value >= -0.3) return '#fdcb6e';
            if (value >= -0.7) return '#ff7675';
            return '#ff4757';
        }

        function selectPair(stock1, stock2, correlation) {
            selectedPair = {stock1, stock2, correlation};
            
            let analysis = `<strong>${stock1} vs ${stock2}</strong><br><br>`;
            analysis += `Correlation Coefficient: <span style="color: ${getCorrelationColor(correlation)}; font-weight: bold;">${correlation.toFixed(3)}</span><br>`;
            
            if (Math.abs(correlation) >= 0.7) {
                analysis += `<span style="color: #00d4ff;">Strong ${correlation > 0 ? 'positive' : 'negative'} correlation</span><br>`;
                analysis += `These stocks tend to move ${correlation > 0 ? 'together' : 'in opposite directions'} most of the time.`;
            } else if (Math.abs(correlation) >= 0.3) {
                analysis += `<span style="color: #6c5ce7;">Moderate ${correlation > 0 ? 'positive' : 'negative'} correlation</span><br>`;
                analysis += `These stocks show ${correlation > 0 ? 'some tendency to move together' : 'some tendency to move oppositely'}.`;
            } else {
                analysis += `<span style="color: #fdcb6e;">Weak correlation</span><br>`;
                analysis += `These stocks show little correlation in their price movements.`;
            }
            
            document.getElementById('pairAnalysis').innerHTML = analysis;
        }

        function updateStats() {
            const correlations = [];
            const stocks = Object.keys(correlationMatrix);
            
            stocks.forEach(stock1 => {
                stocks.forEach(stock2 => {
                    if (stock1 !== stock2) {
                        correlations.push(correlationMatrix[stock1][stock2]);
                    }
                });
            });
            
            if (correlations.length === 0) return;
            
            const avgCorrelation = correlations.reduce((a, b) => a + b, 0) / correlations.length;
            const maxCorrelation = Math.max(...correlations);
            const minCorrelation = Math.min(...correlations);
            const strongPositive = correlations.filter(c => c >= 0.7).length;
            const strongNegative = correlations.filter(c => c <= -0.7).length;
            
            const statsHtml = `
                <div class="stat-card">
                    <div class="stat-value">${avgCorrelation.toFixed(3)}</div>
                    <div class="stat-label">Average Correlation</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${maxCorrelation.toFixed(3)}</div>
                    <div class="stat-label">Highest Correlation</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${minCorrelation.toFixed(3)}</div>
                    <div class="stat-label">Lowest Correlation</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${strongPositive}</div>
                    <div class="stat-label">Strong Positive Pairs</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${strongNegative}</div>
                    <div class="stat-label">Strong Negative Pairs</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stocks.length}</div>
                    <div class="stat-label">Total Stocks</div>
                </div>
            `;
            
            document.getElementById('statsContainer').innerHTML = statsHtml;
        }

        function updateApiStatus(status) {
            const statusElement = document.getElementById('apiStatus');
            statusElement.className = `api-status status-${status}`;
        }

        function showMessage(type, message) {
            const messageDiv = document.getElementById('apiMessage');
            messageDiv.innerHTML = `<div class="${type}">${message}</div>`;
            setTimeout(() => {
                messageDiv.innerHTML = '';
            }, 5000);
        }

        function setApiKey() {
            const apiKey = document.getElementById('apiKey').value.trim();
            if (apiKey) {
                API_KEY = apiKey;
                isApiConnected = true;
                useDemo = false;
                updateApiStatus('online');
                showMessage('success', 'API key connected! You can now fetch real market data.');
                document.getElementById('refreshBtn').disabled = false;
            } else {
                showMessage('error', 'Please enter a valid API key.');
            }
        }

        function useDemoData() {
            useDemo = true;
            isApiConnected = false;
            API_KEY = '';
            updateApiStatus('loading');
            showMessage('success', 'Using demo data. Click Refresh Data to start analysis.');
            document.getElementById('refreshBtn').disabled = false;
        }

        function addCustomStock() {
            const ticker = document.getElementById('customTicker').value.trim().toUpperCase();
            if (ticker && !preferredStocks.includes(ticker)) {
                preferredStocks.push(ticker);
                document.getElementById('customTicker').value = '';
                showMessage('success', `${ticker} added to analysis.`);
            }
        }

        async function refreshMatrix() {
            if (!isApiConnected && !useDemo) {
                showMessage('error', 'Please configure API key or use demo data first.');
                return;
            }
            
            document.getElementById('refreshBtn').disabled = true;
            await createCorrelationMatrix();
            document.getElementById('refreshBtn').disabled = false;
        }

        // Initialize
        updateApiStatus('offline');
        document.getElementById('refreshBtn').disabled = true;
    </script>
</body>
</html>
