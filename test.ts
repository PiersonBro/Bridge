// The first steps toward the code runner backing our project.
// This code's structure is based off of this stackoverflow article: https://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js.
// Here's a good stackoverflow piece on some potential solutions to the problem of running c(++) code on a linux server:
// https://stackoverflow.com/questions/4249063/run-an-untrusted-c-program-in-a-sandbox-in-linux-that-prevents-it-from-opening-f 
// At this point were basically saying that docker solves this problem. Technically, it doesn't but for all intensive purposes it does. 
// In short: here be dragons.

const express = require('express');
const app = express();
const port = 3003;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function compile(file) {
    const {stdout, stderr } = await exec(`clang++ ${file}`);
    return { output: stdout, error: stderr };
}


async function run(path) {
    const {stdout, stderr } = await exec(`./${path}`);
    return { output: stdout, error: stderr };
}


async function execute() {
    try {
        await compile('main.cpp');
        const result = await run('a.out');
        return result.output;
    } catch (err) {
        return err.stderr;
    }
}

app.get('/', async (req, res) => {
    const v = await execute();
    console.log(v);
    res.send(v);
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));