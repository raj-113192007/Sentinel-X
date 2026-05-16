import express from 'express';
import cors from 'cors';
import net from 'net';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Common ports to scan (matching your app.py)
const COMMON_PORTS = [21, 22, 23, 25, 53, 80, 110, 443, 3306, 3389];

const checkPort = (host, port) => {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        const timeout = 1000;

        socket.setTimeout(timeout);
        
        socket.on('connect', () => {
            socket.destroy();
            resolve({ port, status: 'OPEN' });
        });

        socket.on('timeout', () => {
            socket.destroy();
            resolve({ port, status: 'CLOSED' });
        });

        socket.on('error', () => {
            socket.destroy();
            resolve({ port, status: 'CLOSED' });
        });

        socket.connect(port, host);
    });
};

app.get('/scan-ports', async (req, res) => {
    const { target } = req.query;
    if (!target) return res.status(400).json({ error: 'Target required' });

    console.log(`Scanning ${target}...`);
    
    try {
        const promises = COMMON_PORTS.map(port => checkPort(target, port));
        const results = await Promise.all(promises);
        const openPorts = results.filter(r => r.status === 'OPEN').map(r => r.port);
        
        res.json({
            target,
            openPorts,
            allResults: results
        });
    } catch (err) {
        res.status(500).json({ error: 'Scan failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Sentinel-X Backend running on http://localhost:${PORT}`);
});
