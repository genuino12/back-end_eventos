import express from "express";

const app =  express();
const host = "127.0.0.1";
const porta = 4000; 


app.use(express.json());
app.use('/evetno', ???????);

app.listen(porta,host, () => {
console.log(`Servidor Iniciado em https://${host}:${porta}`);
});