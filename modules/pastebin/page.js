module.exports = { page };

function page(paste) {
    var out = `
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

            <style>
                body{
                    background-color: rgb(30, 30, 30);
                    color: rgb(196, 196, 196);
                }
            </style>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous" async></script>
            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            
            <script defer>
                function paste() {
                    const input = document.getElementById("input").value;

                    axios.post('https://zepr.dev/a/p', {
                        `;
                        if (paste) {
                            out += `pid: '${paste.pasteId}',`;
                        }
                        out += `    
                        data: input
                    })
                    .then(function (response) {
                        window.location.replace(response.data.url)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    
                }
            </script>

            <title>/p</title>
        </head>
        <body onload="load()">
            <div style="text-align: center;">
                <button type="button" class="btn btn-primary" onclick="paste()">Save</button><br>
            </div>

            <div class="form-group">
                <code><textarea style="
                    background-color: rgb(30, 30, 30);
                    color: rgb(196, 196, 196);
                    border: 0;
                    outline: none;
                    resize: none;
                    `;
                    if (paste) {
                        out += `height = ${paste.data.split('\n').length * 1.5} + 'em';`;
                    }
                    out += `
                    "
                    oninput='this.style.height = "";this.style.height = this.scrollHeight + "px";'
                    `;
                if (paste) {
                    out += `id="input" autofocus="true" wrap="soft" class="form-control shadow-none" type="text" placeholder="type here" rows="${paste.data.split('\n').length}">${paste.data}</textarea></code>`; 
                } else {
                    out += `id="input" autofocus="true" wrap="soft" class="form-control shadow-none" type="text" placeholder="type here"></textarea></code>`;
                }
                out += `
            </div>
        </body>
    </html>
    `
    return out;
}