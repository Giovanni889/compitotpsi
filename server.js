const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let nextTicketId = 1;

let parkingTickets = {}; 


app.post('/entrata', (req, res) => {
    const ticketId = nextTicketId++;
    const currentTime = new Date();
    parkingTickets[ticketId] = { id: ticketId, ingresso: currentTime };
    res.json({ id: ticketId, ingresso: currentTime });
});


app.put('/uscita/:ticketId', (req, res) => {
    const ticketId = parseInt(req.params.ticketId);
    const ticket = parkingTickets[ticketId];
    if (ticket) {
        const currentTime = new Date();
        const durata = Math.abs(currentTime - ticket.ingresso) / 36e5; 
        const cost = durata * 2.50; 
        res.json({ uscita: currentTime, durata: durata.toFixed(2), costo: cost.toFixed(2) });
    } else {
        res.status(404).json({ error: 'Biglietto non trovato' });
    }
});


app.get('/statoparcheggio', (req, res) => {
    const postiDisponibili = 100 - Object.keys(parkingTickets).length;
    res.json({ posti_disponibili: postiDisponibili });
});


app.delete('/elimina-biglietti', (req, res) => {
    parkingTickets = {};
    delete parkingTickets[ticketId]; 
    nextTicketId = 1;
    res.json({ message: 'nod i biglietti sono stati eliminati' });
});

const PORT = 3000;
app.listen(PORT, () => {
});