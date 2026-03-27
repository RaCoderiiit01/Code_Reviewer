require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // Keep Render free tier alive (pings every 14 minutes to prevent spin-down)
    if (process.env.RENDER_EXTERNAL_URL) {
        setInterval(() => {
            const url = process.env.RENDER_EXTERNAL_URL;
            require('https').get(url, (res) => {
                console.log(`Keep-alive ping sent. Status: ${res.statusCode}`);
            }).on('error', (err) => {
                console.error('Keep-alive ping failed:', err.message);
            });
        }, 14 * 60 * 1000); // every 14 minutes
    }
})