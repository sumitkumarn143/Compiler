const express = require("express");
const app = express();
const bodyp = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
const path = require("path");
compiler.init(options);


app.use(bodyp.json());

app.use("/codemirror/codemirror-5.65.16", express.static(path.join(__dirname, "codemirror/codemirror-5.65.16")));

// Adjust the path to serve index.html
app.get("/", function (req, res) {
    // Use path.join to construct a platform-independent path
    const indexPath = path.join(__dirname, "index.html");
    res.sendFile(indexPath);
});

app.post("/compile", async function (req, res) {
    try {
        const { code, input, lang } = req.body;

        let envData;

        if (lang === "c++") {
            if(!input){
            if (windows)
                envData = { OS : "windows" , cmd : "g++" , options: { timeout: 10000 } }; // (uses g++ command to compile )
            else
                envData = { OS : "linux" , cmd : "gcc" , options: { timeout: 10000 } };
            compiler.compileCPP(envData, code, function (data) {
                if (data.error) {
                    console.error("Compilation Error:", data.error);
                    var setError="Compilation Error:"+data.error
                    res.send({ value: setError});
                } else {
                    res.send({ value: data.output });
                }
                compiler.flush(function(){
                    console.log("Deleted");
                })  
            });
            }
            else{
                if (windows)
                    envData = { OS : "windows" , cmd : "g++" , options: { timeout: 10000 } }; // (uses g++ command to compile )
                else
                    envData = { OS : "linux" , cmd : "gcc" , options: { timeout: 10000 } };
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if (data.error) {
                        console.error("Compilation Error:", data.error);
                        var setError="Compilation Error:"+data.error
                        res.send({ value: setError});
                    } else {
                        res.send({ value: data.output });
                    }
                    compiler.flush(function(){
                        console.log("Deleted");
                    })  
            });
            }
        } else if (lang === "java") {
            if(!input){
                if(windows)
                    envData = { OS: "windows", options: { timeout: 10000 } };
                else
                    envData = { OS: "linux", options: { timeout: 10000 } };

            compiler.compileJava(envData, code, function (data) {
                if (data.error) {
                    console.error("Compilation Error:", data.error);
                    var setError="Compilation Error:"+data.error
                    res.send({ value: setError});
                } else {
                    res.send({ value: data.output });
                }
                compiler.flush(function(){
                    console.log("Deleted");
                })  
            });
            }
            else{
                if(windows)
                    envData = { OS: "windows", options: { timeout: 10000 } };
                else
                    envData = { OS: "linux", options: { timeout: 10000 } };
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if (data.error) {
                        console.error("Compilation Error:", data.error);
                        var setError="Compilation Error:"+data.error
                        res.send({ value: setError});
                    } else {
                        res.send({ value: data.output });
                    }
                    compiler.flush(function(){
                        console.log("Deleted");
                    })  
    });
            }
        } else if (lang === "python") {
            if(!input){
                if(windows)
                    envData = { OS: "windows", options: { timeout: 10000 } };
                else
                    envData = { OS: "windows", options: { timeout: 10000 } };

            // Compile Python code
            compiler.compilePython(envData, code, function (data) {
                if (data.error) {
                    console.error("Compilation Error:", data.error);
                    var setError="Compilation Error:"+data.error
                    res.send({ value: setError});
                } else {
                    res.send({ value: data.output });
                }

                compiler.flush(function(){
                    console.log("Deleted");
                }) 
            });
            }
            else{
                if(windows)
                    envData = { OS: "windows", options: { timeout: 10000 } };
                else
                    envData = { OS: "windows", options: { timeout: 10000 } };
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if (data.error) {
                        console.error("Compilation Error:", data.error);
                        var setError="Compilation Error:"+data.error
                        res.send({ value: setError});
                    } else {
                        res.send({ value: data.output });
                    }   
                    compiler.flush(function(){
                        console.log("Deleted");
                    })    
    });
            }
        } else {
            res.send({ value: "Invalid language! Please Select any of Languages" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ value: "Internal Server Error" });
    }
});



app.listen(8000);
