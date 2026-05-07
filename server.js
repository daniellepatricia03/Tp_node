import express from 'express';
import routesparticipants from './src/routes/routesparticipants.js';
import routesclassement from './src/routes/routesclassement.js';
import challengeRoutes from "./src/routes/challenges.routes.js";


const app = express();

app.use(express.json());
app.use('/participants', routesparticipants);
app.use('/classement', routesclassement);
app.use("/challenges", challengeRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default app;
