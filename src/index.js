const express = require("express")
const path = require("path")
const app = express()

// const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
//const publicPath = __dirname;

console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
//app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(publicPath))


const distPath = path.join(__dirname, 'dist');





// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})
app.get('/games', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});
app.get('/word', (req, res) => {
    res.sendFile(path.join( distPath,'word.html'));
 });
 app.get('/img', (req, res) => {
    res.sendFile(path.join(distPath, 'imgpuzzle.html'));
 });
 app.get('/menj', (req, res) => {
    res.sendFile(path.join(distPath, 'menja.html'));
 });
 app.get('/bubb', (req, res) => {
    res.sendFile(path.join(distPath, 'bubble.html'));
 });
 app.get('/tic', (req, res) => {
    res.sendFile(path.join(distPath, 'tic.html'));
 });
 app.get('/stick', (req, res) => {
    res.sendFile(path.join(distPath, 'stick.html'));
 });



// app.get('/home', (req, res) => {
//     res.render('home')
// })
const dataStore = [];

app.post('/signup', async (req, res) => {
  /*  const data = {
        name: req.body.name,
        password: req.body.password,
    };
    dataStore.push(data);*/
    try {
        const checking = await LogInCollection.findOne({ name: req.body.name });

        if (checking) {
            if (checking.password === req.body.password) {
                return res.send("User details already exist");
            } else {
                // Handle the case where the user name exists but the password is different
                return res.send("User name already exists with a different password");
            }
        } else {
            console.log(dataStore);
            await LogInCollection.insertMany([data]);
            return res.status(201).render("home", {
                naming: req.body.name
            });
        }
    } catch (error) {
        return res.send("Wrong inputs");
    }
});



app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.name });
        const data = {
            name: req.body.name,
            password: req.body.password,
        };
        dataStore.push(data);

        if (!check) {
            return res.send("User not found");
        }

        if (check.password === req.body.password) {
            return res.redirect('/games');
        } else {
            return res.send("Incorrect password");
        }
    } catch (e) {
        return res.send("Error occurred: wrong details");
    }
});

app.post('/data', async (req, res) => {
    const playerName=dataStore[0].name
    const score = req.body.score;
    
    try {
        // Find the player's document based on their name
        const player = await LogInCollection.findOne({ name: playerName });

        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }
        console.log(score)
        // Update the player's score
        player.scored = score;
        

        // Save the updated player document
        await player.save();
        dataStore.pop();
        res.status(200).json({ message: 'Score updated successfully' });
    } catch (err) {
        console.error('Error updating score:', err);
        res.status(500).json({ error: 'Could not update score' });
    }
});




app.listen(port, () => {
    console.log('port connected');
})