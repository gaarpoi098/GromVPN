/* ---------- ТАРИФЫ ---------- */

const tariffs = [
    { id: 1, name: "1 месяц", rub: 250, stars: 150 },
    { id: 3, name: "3 месяца", rub: 600, stars: 350 },
    { id: 6, name: "6 месяцев", rub: 1050, stars: 500 },
    { id: 12, name: "12 месяцев", rub: 1800, stars: 1000 }
];

let selected = tariffs[0];

const container = document.getElementById("tariffs");

tariffs.forEach(t => {
    const el = document.createElement("div");
    el.className = "tariff";
    el.innerHTML = `
        <h3>${t.name}</h3>
        <p>${t.rub} ₽</p>
        <p>⭐ ${t.stars}</p>
    `;

    el.onclick = () => {
        document.querySelectorAll(".tariff").forEach(x => x.classList.remove("active"));
        el.classList.add("active");
        selected = t;
    };

    container.appendChild(el);
});

container.firstChild.classList.add("active");


/* ---------- CRYPTOBOT ОПЛАТА ---------- */
/*
  В CryptoBot можно создавать инвойс ссылкой:

  https://t.me/CryptoBot?start=invoice-XXXX

  Вместо XXXX вставь свои invoice templates в боте.
*/

const invoiceLinks = {
    1: "https://t.me/CryptoBot?start=invoice_1m",
    3: "https://t.me/CryptoBot?start=invoice_3m",
    6: "https://t.me/CryptoBot?start=invoice_6m",
    12: "https://t.me/CryptoBot?start=invoice_12m"
};

document.getElementById("cryptoPay").onclick = () => {
    window.open(invoiceLinks[selected.id], "_blank");
};


/* ---------- STARS ---------- */

document.getElementById("starsPay").onclick = () => {
    alert(
        `Отправьте подарок @uulest на ${selected.stars} ⭐\n\nПосле отправки пришлите чек в @helppVpnBot_bot`
    );
};


/* ---------- СНЕГ ---------- */

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flakes = Array.from({length: 120}).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3,
    s: Math.random() * 2 + 1
}));

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";

    flakes.forEach(f => {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
        ctx.fill();

        f.y += f.s;
        if(f.y > canvas.height) f.y = 0;
    });

    requestAnimationFrame(draw);
}

draw();
