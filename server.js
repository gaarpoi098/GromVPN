import express from "express";
import fetch from "node-fetch";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.static("./")); // чтобы сайт открывался

const TOKEN = "ВСТАВЬ_СЮДА_ТОКЕН"; // ← вставь свой токен


app.post("/create-invoice", async (req, res) => {
    const { months, amount } = req.body;

    try {
        const r = await fetch("https://pay.crypt.bot/api/createInvoice", {
            method: "POST",
            headers: {
                "Crypto-Pay-API-Token": TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                asset: "USDT",
                amount: amount,
                description: `GromService ${months} мес`,
                paid_btn_name: "openBot",
                paid_btn_url: "https://t.me/helppVpnBot_bot"
            })
        });

        const data = await r.json();

        res.json({
            url: data.result.pay_url
        });

    } catch {
        res.json({ error: true });
    }
});


app.listen(3000, () => {
    console.log("Сайт запущен 👉 http://localhost:3000");
});
