
const express = require('express');
const cors = require('cors');
//const userRoutes = require('./routes/userRoutes');
const rolRoutes = require('./routes/rolRoutes');
const authRoutes = require('./routes/authRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const profesionalRoutes = require('./routes/profesionalRoutes');
const calificacionRoutes = require('./routes/calificacionRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Rutas
//app.use('/api/users', userRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/profesionales', profesionalRoutes);
app.use('/api/calificaciones', calificacionRoutes);


app.get('/', (req, res) => {
  res.send('API funcionando con MongoDB Local');
});

module.exports = app;
