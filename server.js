const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permite peticiones desde tu frontend
app.use(bodyParser.json());

// Configura el transporte de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.titan.email',
  port: 587,
  secure: false,
  auth: {
    user: 'contacto@servi-web.com',
    pass: 'Serviweb2024.' // Cambia esto por la contraseña de tu correo
  }
});

// Ruta para enviar correos
app.post('/api/send-email', (req, res) => {
  const { name, email, service, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'contacto@servi-web.com',
    subject: `Consulta sobre ${service}`,
    text: `Nombre: ${name}\nEmail: ${email}\nServicio: ${service}\nMensaje: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
