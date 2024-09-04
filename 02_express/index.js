import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

app.post('/teas', (req, res) => {
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).send(newTea);
});

app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
}); 

//get tea
app.get("/teas/:id", (req, res) => {
    const { id } = req.params;
    const tea = teaData.find((t) => t.id === Number(id));
    if (tea) {
        res.status(200).send(tea);
    } else {
        res.status(404).send({ error: "Tea not found" });
    }
})

//update tea
app.put("/teas/:id", (req, res) => {
    const tea = teaData.find((t) => t.id === Number(req.params.id));
    if (tea) {
        const { name, price } = req.body;
        tea.name = name;
        tea.price = price;
        res.status(200).send(tea);
    } else {
        res.status(404).send({ error: "Tea not found" });
    }
});

//delete tea
app.delete("/teas/:id", (req, res) => {
    const tea = teaData.findIndex((t) => t.id === Number(req.params.id));
    if (tea) {
        const index = teaData.indexOf(tea);
        teaData.splice(index, 1);
        res.status(200).send(tea);
    } else {
        res.status(404).send({ error: "Tea not found" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})