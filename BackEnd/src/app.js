// const express = require('express');
// const aiRoutes = require('./routes/ai.routes')
// const cors = require('cors')

// const app = express()

// app.use(cors())


// app.use(express.json())

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

// app.use('/ai', aiRoutes)

// module.exports = app


const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

const allowedOrigins = [
  'https://code-reviewer-one-wine.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/ai', aiRoutes);

module.exports = app;

