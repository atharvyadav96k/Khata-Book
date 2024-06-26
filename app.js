const { log } = require('console');
const express = require('express')
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.get('/', function (req, res) {
    fs.readdir('./files', (err, files) => {
        console.log(files)
        res.render('index', { files })
    })
});
app.get('/note/new', function (req, res) {
    const date = new Date();
    const fileName = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.txt`;
    console.log(fileName)
    fs.access("./files/"+fileName, (err)=>{
        if(err){
            res.render('newkhata')
        }else{
            res.redirect(`/note/edit/${fileName}`)
        }
    })
})
app.get('/note/view/:fileName', function (req, res){
    fs.access('./files/'+req.params.fileName, (err)=>{
        if(err){
            res.send("Can't view file");
        }else{
            fs.readFile("./files/"+req.params.fileName, (err, data)=>{
                if(err){
                    res.send(err)
                }else{
                    res.render('viewKhata', {data})
                }
            })
        }
    })
})
app.post('/addNote', function (req, res) {
    const date = new Date();
    const fileName = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.txt`
    fs.access("./files/" + fileName, (err) => {
        if (err) {
            fs.writeFile("./files/" + fileName, req.body.data, (err) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.redirect('/');
                }
            })
        } else {
            res.send('Khata already exists');
        }
    })
})
app.get('/note/edit/:fileName', function (req, res) {
    console.log(req.params.fileName)
    fs.access("./files/"+req.params.fileName, (err) => {
        if (err) {
            res.send("file note exists");
        } else {
            fs.readFile("./files/" + req.params.fileName, "utf-8", (err, data) => {
                if (err) console.log(err)
                res.render('editKhata', { data: data, fileName: req.params.fileName })
            })
        }

    })
})
app.post('/note/edit/:fileName', function (req, res) {
    fs.access("./files/" + req.params.fileName, (err) => {
        if (err) {
            res.send("something went wrong");
        } else {
            fs.writeFile("./files/" + req.params.fileName, req.body.data, (err) => {
                if (err) res.send(err)
                res.redirect('/')
            })
        }

    })
})
app.get('/note/delete/:fileName', function (req, res) {
    fs.access("./files/"+req.params.fileName, (err)=>{
        if(err){
            res.send("File note exists")
        }else{
            fs.unlink("./files/"+req.params.fileName, (err)=>{
                if(err){
                    res.send("Something went wrong try again");
                }else{
                    res.redirect('/');
                }
            })
        }
    })
})
app.listen(3000);