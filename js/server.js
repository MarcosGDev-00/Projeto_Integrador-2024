// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// app.post('/index.html', (req, res) => {
//     const { name, email, message } = req.body;

//     // Configuração do transporte de email
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'marcosgabriel20061216@gmail.com', // Seu email
//             pass: '@marquin2006#' // Sua senha
//         }
//     });

//     const mailOptions = {
//         from: email,
//         to: 'marcosgabriel20061216@gmail.com', // Email destinatário
//         subject: `Mensagem de ${name}`,
//         text: message
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return res.status(500).send(error.toString());
//         }
//         res.status(200).send('Email enviado com sucesso');
//     });
// });

// app.listen(port, () => {
//     console.log(`Servidor rodando na porta ${port}`);
// });
