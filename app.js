const http = require('http');
const fs = require('fs');
const path = require('path');

// List of fortunes
const fortunes = [
    "You will have a great day!",
    "Adventure awaits you.",
    "A new opportunity will come your way.",
    "You will find happiness in unexpected places.",
    "Today is a perfect day to start something new.",
    "Your hard work will soon pay off.",
    "You will meet someone who will change your life.",
    "Be open to new experiences.",
    "Good news will come your way soon.",
    "Trust your instincts; they will lead you to success."
];

// Create the server
const server = http.createServer((req, res) => {
    // Serve the main page
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
    // Handle fortune requests
    else if (req.method === 'POST' && req.url === '/getFortune') {
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ fortune: randomFortune }));
    }
    // Handle static files (CSS, JS)
    else if (req.method === 'GET') {
        const filePath = path.join(__dirname, 'public', req.url);
        const extname = path.extname(filePath);
        let contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'application/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.gif':
                contentType = 'image/gif';
                break;
            default:
                contentType = 'text/html';
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end(`Error: ${err.code}`);
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
