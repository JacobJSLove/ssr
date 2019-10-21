import express from 'express';
import render from './helpers/render';
import createStore from './helpers/createStore';

const app = express();


// express let go every route to react-router
app.use(express.static('public'));
app.get('*', (req, res) => {
    const store = createStore();

    res.send(render(req, store));
});

app.listen(3000, () => {
    console.log("Post 3000");
});