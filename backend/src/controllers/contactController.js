import transporter from "../config/mail.js";

export const mailContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validation

        if (
            !name ||
            !email ||
            !message ||
            !name.trim() ||
            !email.trim() ||
            !message.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        if (name.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: "Name must be at least 3 characters.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address.",
            });
        }

        if (message.trim().length < 10) {
            return res.status(400).json({
                success: false,
                message: "Message must contain at least 10 characters.",
            });
        }

        // Email to you

        const ownerMail = {
            from: `"Portfolio Contact" <${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            replyTo: email,
            subject: `New Portfolio Contact from ${name}`,

            html: `
                <h2>New Portfolio Contact</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `,
        };

        // Confirmation email

        const confirmationMail = {
            from: `"Shamik Goswami" <${process.env.EMAIL}>`,
            to: email,
            subject: "Message Received",

            html: `
                <h2>Thank you for contacting me.</h2>

                <p>Hi <strong>${name}</strong>,</p>

                <p>
                    I have successfully received your message.
                    I'll get back to you as soon as possible.
                </p>

                <br>

                <p>
                    Regards,<br>
                    <strong>Shamik Goswami</strong>
                </p>
            `,
        };

        await Promise.all([
            transporter.sendMail(ownerMail),
            transporter.sendMail(confirmationMail),
        ]);

        res.status(200).json({
            success: true,
            message: "Message sent successfully.",
        });
    } catch (error) {
        console.error("Email error details:", {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode,
        });

        res.status(500).json({
            success: false,
            message: "Failed to send email.",
            error: error.message,
        });
    }
};