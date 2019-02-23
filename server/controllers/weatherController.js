const axios = require('axios')

module.exports = {
    weatherForecast: (req, res) => {
        let city = req.body.city
        axios({
            url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=399dbaaa8e8e3ea28dc270ae7880035c&units=metric`,
            method: 'get'
        })
        .then(({data}) => {
            res.status(200).json(data.list)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({err: err})
        })
    }
}