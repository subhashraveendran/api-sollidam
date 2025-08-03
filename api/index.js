export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sollidam API - Coordinate Encoding Documentation</title>
    <link rel="icon" type="image/png" href="/api/favicon.ico">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            color: #333333;
        }
        .header {
            background: #000000;
            color: #ffffff;
            padding: 20px 30px;
            border-radius: 0;
            margin-bottom: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 2em;
            font-weight: 700;
        }
        .header-button {
            display: inline-block;
            background: #ffffff;
            color: #000000;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 6px;
            font-size: 1em;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }
        .header-button:hover {
            background: #f0f0f0;
        }
        .container {
            background: #ffffff;
            padding: 40px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-top: 80px;
            max-width: 900px;
            margin-left: auto;
            margin-right: auto;
        }
        .subtitle {
            text-align: center;
            color: #666666;
            margin-bottom: 40px;
            font-size: 1.1em;
        }
        .section {
            margin: 30px 0;
            padding: 25px;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            background-color: #fafafa;
        }
        .section h2 {
            color: #000000;
            margin-top: 0;
            margin-bottom: 20px;
            font-size: 1.5em;
            border-bottom: 2px solid #000000;
            padding-bottom: 10px;
        }
        .method {
            background: #000000;
            color: #ffffff;
            padding: 6px 12px;
            border-radius: 4px;
            font-weight: bold;
            display: inline-block;
            margin-right: 15px;
            font-size: 0.9em;
        }
        .url {
            font-family: 'Courier New', monospace;
            background: #f5f5f5;
            border: 1px solid #d0d0d0;
            padding: 12px;
            border-radius: 4px;
            margin: 15px 0;
            word-break: break-all;
            font-size: 0.95em;
        }
        .step {
            background: #ffffff;
            border-left: 4px solid #000000;
            padding: 15px 20px;
            margin: 15px 0;
            border-radius: 0 4px 4px 0;
        }
        .step h4 {
            margin: 0 0 10px 0;
            color: #000000;
            font-size: 1.1em;
        }
        .example {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 20px;
            border-radius: 4px;
            margin: 15px 0;
        }
        .example h4 {
            margin: 0 0 15px 0;
            color: #000000;
        }
        .response {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 20px;
            border-radius: 4px;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            white-space: pre-wrap;
        }
        .response h4 {
            margin: 0 0 15px 0;
            color: #000000;
        }
        .note {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .note h3 {
            margin: 0 0 15px 0;
            color: #000000;
        }
        .note ul {
            margin: 0;
            padding-left: 20px;
        }
        .note li {
            margin: 8px 0;
        }
        .footer {
            text-align: center;
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid #e0e0e0;
            color: #666666;
            font-size: 0.9em;
        }
        .test-link {
            display: inline-block;
            background: #000000;
            color: #ffffff;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
            margin: 10px 5px;
            font-size: 0.9em;
        }
        .test-link:hover {
            background: #333333;
        }
        .main-app-link {
            display: inline-block;
            background: #000000;
            color: #ffffff;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 15px 5px;
            font-size: 1.1em;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }
        .main-app-link:hover {
            background: #333333;
        }
        .parameter {
            font-weight: bold;
            color: #000000;
        }
        .code {
            font-family: 'Courier New', monospace;
            background: #f5f5f5;
            padding: 2px 4px;
            border-radius: 2px;
            font-size: 0.9em;
        }
        .main-app-section {
            background: #fafafa;
            color: #000000;
            padding: 30px;
            border: 2px solid #000000;
            border-radius: 8px;
            margin: 30px 0;
            text-align: center;
        }
        .main-app-section h2 {
            color: #000000;
            border-bottom: 2px solid #000000;
        }
        .main-app-section p {
            color: #333333;
            font-size: 1.1em;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Sollidam API</h1>
        <a href="https://sollidam.vercel.app" class="header-button" target="_blank">Try Main Application</a>
    </div>
    
    <div class="container">
        <div class="main-app-section">
            <h2>Try the Main Application</h2>
            <p>Experience Sollidam with our user-friendly GUI featuring interactive maps, location sharing, and real-time coordinate conversion.</p>
            <a href="https://sollidam.vercel.app" class="main-app-link" target="_blank">Launch Sollidam App</a>
        </div>
        
        <div class="section">
            <h2>API Overview</h2>
            <p>This API provides bidirectional conversion between geographic coordinates and 3-word addresses within Tamil Nadu, India. The system uses a 3-meter resolution grid for precise location encoding.</p>
        </div>

        <div class="section">
            <h2>Endpoint 1: Convert Words to Coordinates</h2>
            <p><span class="method">GET</span> Convert a 3-word address to geographic coordinates</p>
            
            <div class="url">https://api-sollidam.vercel.app/api/lookup?words=word1.word2.word3</div>
            
            <div class="step">
                <h4>Step 1: Prepare the Request</h4>
                <p>Format your 3-word address with dots as separators: <span class="code">word1.word2.word3</span></p>
            </div>
            
            <div class="step">
                <h4>Step 2: Make the API Call</h4>
                <p>Send a GET request to the endpoint with the <span class="parameter">words</span> parameter</p>
            </div>
            
            <div class="example">
                <h4>Example Request:</h4>
                <p><span class="code">GET https://api-sollidam.vercel.app/api/lookup?words=blue.sky.cloud</span></p>
                <a href="/api/lookup?words=blue.sky.cloud" class="test-link" target="_blank">Test This Example</a>
            </div>
            
            <div class="response">
                <h4>Response Format:</h4>
{
  "lat": 8.795380650062402,
  "long": 77.53822544897345
}</div>
            
            <div class="step">
                <h4>Step 3: Interpret the Response</h4>
                <ul>
                    <li><span class="parameter">lat</span>: Latitude in decimal degrees (North/South position)</li>
                    <li><span class="parameter">long</span>: Longitude in decimal degrees (East/West position)</li>
                    <li>Coordinates are within Tamil Nadu, India bounds</li>
                    <li>Precision: 6+ decimal places for high accuracy</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <h2>Endpoint 2: Convert Coordinates to Words</h2>
            <p><span class="method">GET</span> Convert geographic coordinates to a 3-word address</p>
            
            <div class="url">https://api-sollidam.vercel.app/api/lookup?location=latitude,longitude</div>
            
            <div class="step">
                <h4>Step 1: Prepare the Coordinates</h4>
                <p>Format coordinates as: <span class="code">latitude,longitude</span> (comma-separated, no spaces)</p>
            </div>
            
            <div class="step">
                <h4>Step 2: Make the API Call</h4>
                <p>Send a GET request to the endpoint with the <span class="parameter">location</span> parameter</p>
            </div>
            
            <div class="example">
                <h4>Example Request:</h4>
                <p><span class="code">GET https://api-sollidam.vercel.app/api/lookup?location=11.0168,76.9558</span></p>
                <a href="/api/lookup?location=11.0168,76.9558" class="test-link" target="_blank">Test This Example</a>
            </div>
            
            <div class="response">
                <h4>Response Format:</h4>
{
  "words": "moon.visitor.point"
}</div>
            
            <div class="step">
                <h4>Step 3: Interpret the Response</h4>
                <ul>
                    <li><span class="parameter">words</span>: 3-word address separated by dots</li>
                    <li>Format: <span class="code">word1.word2.word3</span></li>
                    <li>Words are from a predefined dictionary</li>
                    <li>Each word combination represents a unique 3-meter grid cell</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <h2>Error Handling</h2>
            <div class="step">
                <h4>Invalid Input Format</h4>
                <div class="response">
{
  "error": "Invalid location format. Please use: latitude,longitude"
}</div>
            </div>
            
            <div class="step">
                <h4>Out of Bounds</h4>
                <div class="response">
{
  "error": "Location is outside of Tamil Nadu"
}</div>
            </div>
            
            <div class="step">
                <h4>Invalid Words</h4>
                <div class="response">
{
  "error": "Invalid 3-word address"
}</div>
            </div>
            
            <div class="step">
                <h4>Missing Parameters</h4>
                <div class="response">
{
  "error": "Please provide either a \"location\" or \"words\" query parameter."
}</div>
            </div>
        </div>

        <div class="note">
            <h3>Technical Specifications</h3>
            <ul>
                <li><strong>Geographic Coverage:</strong> Tamil Nadu, India only</li>
                <li><strong>Grid Resolution:</strong> 3 meters per grid cell</li>
                <li><strong>Coordinate System:</strong> WGS84 (decimal degrees)</li>
                <li><strong>Word Dictionary:</strong> 3,000 predefined words</li>
                <li><strong>Response Format:</strong> JSON</li>
                <li><strong>HTTP Methods:</strong> GET only</li>
                <li><strong>Rate Limiting:</strong> Standard Vercel limits apply</li>
            </ul>
        </div>

        <div class="note">
            <h3>Usage Guidelines</h3>
            <ul>
                <li>All coordinates must be within Tamil Nadu bounds (approximately 8.088°N to 13.794°N, 76.267°E to 80.270°E)</li>
                <li>Words are case-insensitive but returned in lowercase</li>
                <li>Use dots (.) to separate words, not spaces or other characters</li>
                <li>Coordinates should be in decimal degrees format (e.g., 11.0168, not 11°01'00.8"N)</li>
                <li>The API is stateless - each request is processed independently</li>
            </ul>
        </div>

        <div class="footer">
            <p>API Base URL: <strong>https://api-sollidam.vercel.app</strong></p>
            <p>Main Application: <strong><a href="https://sollidam.vercel.app" target="_blank">sollidam.vercel.app</a></strong></p>
            <p>Built with 💖 for Heros on Wheels</p>
            <p><a href="https://github.com/subhashraveendran/sollidam" target="_blank">github.com/subhashraveendran/sollidam</a> (opensource)</p>
            <p>For support or questions, please refer to the API documentation above.</p>
        </div>
    </div>
</body>
</html>`;
  
  res.status(200).send(html);
} 