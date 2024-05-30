const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }
const path = require("path");
compiler.init(options)
app.use(bodyP.json());
app.use("/codemirror5-5.65.9", express.static(path.join(__dirname, "Compiler/codemirror5-5.65.9")))
app.use(express.static(__dirname));

app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted")
    })
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/develop", function (req, res) {
    res.sendFile(path.join(__dirname, "develop.html"));
})
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    console.log("FTTBF");
    try {

        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error })
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error });
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ error: data.error })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
})

app.listen(8000, console.log(`http://localhost:8000`))