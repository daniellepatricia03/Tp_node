import express from 'express';
import routesparticipants from './src/routes/routesparticipants.js';
import routesclassement from './src/routes/routesclassement.js';


const app = express();

app.use(express.json());
app.use('/participants', routesparticipants);
app.use('/classement', routesclassement);


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

export default app;
