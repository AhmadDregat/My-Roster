const express = require('express')
const app = express()
const urllib = require('urllib')

const path = require('path')
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
let Players = []

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

urllib.request(`http://data.nba.net/10s/prod/v1/2018/players.json`, function(err, res) { //
    let playerObj = JSON.parse(res)

    app.get('/teams/:teamName', function(request, response) {
        Players.splice(0, Players.length) //

        let param = request.params.teamName
        Players.push(playerObj.league.standard.filter(team => team.teamId == teamToIDs[param] && team.isActive))
        response.send(Players[0]) ///
    })
})

const port = 3002
app.listen(port, function() {
    console.log(`Node server created at port ${port}`)
        // console.log(path.join(__dirname, 'dist'));
})