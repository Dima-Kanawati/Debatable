//Load express
const express = require('express');
const bodyParser = require('body-parser');

//Create the app. 
const app = express();

app.use(bodyParser.json())
app.use('/users/', require('./routers/usersRoutes'));
app.use('/debates', require('./routers/debateRoutes'));
app.use('/debates/debate/', require('./routers/endorsementsRoutes'));

//Listen on the port.
app.listen(3001, () => {
    console.log("The app is listeing on port 3001");
});

module.exports = {
    app
}