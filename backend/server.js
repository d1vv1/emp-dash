import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/authRoutes.js";
import changeRoutes from "./routes/changeRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/auth', authRoutes);
app.use('/change', changeRoutes);


app.get(/^\/(?!auth|change).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on localhost port:${PORT}`);
})