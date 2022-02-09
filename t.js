const axios = require('axios').default;

const input = "hello"
                
                axios.post('https://zepr.dev/a/u', {
                    url: input
                })
                .then(function (response) {
                    alert(response);
                })
                .catch(function (error) {
                    alert(error);
                });