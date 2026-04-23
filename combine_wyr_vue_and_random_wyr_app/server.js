const express = require('express')
// The path module provides utilities for working with file and directory paths. 
// We will use it to serve static files from the "public" directory.
const path =require('path')

const indexRouter = require('./routes/index')

const app = express()

// Serve static files from the "client/dist" directory. 
// This is where our Vue app will be built to.
const staticFilePath = path.join(__dirname, 'client', 'dist')
// This middleware will serve the static files from the specified directory when requests come in.
const staticFiles = express.static(staticFilePath)
// This means that when a request comes in for a file (like index.html, or any JS/CSS files), 
// it will look in the "client/dist" directory to find and serve those files.
app.use('/', staticFiles)

app.use('/', indexRouter)

const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Server running on port ', server.address().port)
})