import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/authRoutes.js";
import changeRoutes from "./routes/changeRoutes.js";

const app = express();
const PORT = process.env.PORT || 5173;
const ipAddress = process.env.IP_ADDRESS || '192.168.0.73';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/auth', authRoutes);
app.use('/change', changeRoutes);

// Debug: log all registered routes after setup
app._router && app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        // routes registered directly on the app
        console.log('Route:', middleware.route.path);
    } else if (middleware.name === 'router') {
        // router middleware
        middleware.handle.stack.forEach((handler) => {
            if (handler.route) {
                console.log('Route:', handler.route.path);
            }
        });
    }
});

app.get(/^\/(?!auth|change).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, ipAddress,  () => {
    console.log(`Server listening on ${ipAddress}:${PORT}`);
})