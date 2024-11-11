const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

// Create
app.post('/microservico', (req, res) => {
    const url = 'http://localhost:3000/api/users'; 

    axios.post(url, req.body)
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        res.status(500).send(error.message);
      });
});

app.post('/function', (req, res) => {
    const url = 'https://funccloudjs.azurewebsites.net/api/criarAtividade';

    axios.post(url, req.body)
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        res.status(500).send(error.message);
      });
});

// Read All
app.get('/microservico', (req, res) => {
    const url = 'http://localhost:3000/api/users';  

    axios.get(url)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

app.get('/function', (req, res) => {
  const url = 'https://funccloudjs.azurewebsites.net/api/consultarAtividade';

  axios.get(url)
    .then(response => {
      res.status(response.status).send(response.data);
    })
    .catch(error => {
      res.status(error.response ? error.response.status : 500).send(error.message);
    });
});

// Update
app.put('/microservico/:id', (req, res) => {
  const { id } = req.params;
  const url = `http://localhost:3000/api/users/${id}`;

  axios.put(url, req.body)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

app.put('/function/:id/:title', (req, res) => {
  const { id, title } = req.params;
  const url = `https://funccloudjs.azurewebsites.net/api/atualizarAtividade?Id=${id}&Title=${title}`;

  axios.put(url, req.body)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

// Delete
app.delete('/microservico/:id', (req, res) => {
  const { id } = req.params;
  const url = `http://localhost:3000/api/users/${id}`;

  axios.delete(url)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
});

app.delete('/function/:id', (req, res) => {
  const { id } = req.params;
  const url = `https://funccloudjs.azurewebsites.net/api/deletarAtividade?id=${id}`;

  axios.delete(url)
    .then(response => {
      res.status(response.status).send(response.data);
    })
    .catch(error => {
      res.status(error.response ? error.response.status : 500).send(error.message);
    });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
