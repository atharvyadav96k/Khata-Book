const express = require('express')
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.get('/', function (req, res) {
    fs.readdir('./files', (err, files) => {
        console.log(files)
    })
    res.render('index')
});
app.get('/edit', function (req, res) {

})
app.get('/new/note', function (req, res) {
    res.render('newkhata')
})
app.post('/addNote', function (req, res) {
    const date = new Date();
    const fileName = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.txt`
    fs.access("./files/" + fileName, (err) => {
        if (err) {
            fs.writeFile("./files/"+ fileName, req.body.data, (err) => {
                if (err) {
                    res.send(err);
                }
                else{
                    res.redirect('/')

                }
            })
        } else {
            res.send('Khata already exists');
        }
    })
})
app.post('/note/edit', function (req, res) {

})
app.post('/note/delete', function (req, res) {

})
app.listen(3000);