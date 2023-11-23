const { request, response } = require('express');
const nodeMailer = require('nodemailer');

const envioCorreo = (req = request, resp = response) => {
    let body = req.body;

    let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587, // Aquí debería ser 'port' en lugar de 'post'
        auth: {
            user: 'propiedadhorizontalcominuniex@gmail.com',
            pass: 'ebxm eobf cheq bhby',
        }
    });

    const opciones = {
        from: 'Propiedad Horizontal',
        subject: body.asunto,
        to: body.email,
        text: body.mensaje
    };

    config.sendMail(opciones, function (error, result) {
        if (error) {
            console.error("Error al enviar el correo:", error);
            return resp.json({ ok: false, msg: error.message }); // Muestra el mensaje de error
        }
        return resp.json({
            ok: true,
            msg: result
        });
    });
    
}

module.exports = {
    envioCorreo
};
