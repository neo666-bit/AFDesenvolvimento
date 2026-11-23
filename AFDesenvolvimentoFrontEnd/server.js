import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {  dbName: 'AFDesenvolvimento' })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));


const transacaoSchema = new mongoose.Schema({
  descricao: { type: String, required: true, trim: true, minlength: 2 },
  valor:     { type: Number, required: true, min: 0.01 },
  tipo:      { type: String, required: true, enum: ['receita', 'despesa'] },
  categoria: { type: String, required: true, trim: true },
  data:      { type: String, required: true }
}, { collection: 'Transacoes', timestamps: true });

const Transacao = mongoose.model('Transacao', transacaoSchema, 'Transacoes');

app.get('/', (req, res) => res.json({ msg: 'API rodando' }));

app.post('/transacoes', async (req, res) => {
  const transacao = await Transacao.create(req.body);
  res.status(201).json(transacao);
});


app.get('/transacoes', async (req, res) => {
  const transacoes = await Transacao.find();
  res.json(transacoes);
});


app.put('/transacoes/:id', async (req, res) => {
  const transacao = await Transacao.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(transacao);
});


app.delete('/transacoes/:id', async (req, res) => {
  await Transacao.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Transação excluída' });
});


app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando em http://localhost:${process.env.PORT}`)
);