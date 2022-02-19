const axios = require('axios');

axios.get('https://zepr.dev/a/p', {
    data: {
        id: "GQQFihyeh"
    }
})
.then(function (response) {
    console.log(response.data);
})
.catch(function (error) {
    console.log(error);
});