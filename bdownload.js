#!/usr/bin/env node
"use strict";

const fs = require("fs");
const url = require("url");
const http = require("http");
const spawn = require("child_process").spawn;
const meow = require("meow");
const log = console.log;
const { blue, red, green, yellow } = require("chalk");

const cli = meow(
  `
${green("Usage")} 
  ${red.bold("$")} ${yellow("bdownload")} <url> 
  ${red.bold("$")} ${yellow("bdownload")} <url> ${blue("[-o|--out]")} <dir>
  ${red.bold("$")} ${yellow(
    "bdownload"
  )} <url-with-numbers-replaced-with-$> ${blue(
    "[-b|--batch]"
  )} <number-of-files> 
  ${red.bold("$")} ${yellow("bdownload")} <url> ${blue("--curl")}
${green("Options")} 
  ${blue("-o, --out <dir>")}                   destination directory
  ${blue(
    "-b, --batch <number_of_files>"
  )}     number of files, batch download, put '$' in URI where number is supposed to be. 
  ${blue("--http")}                            download via http protocol
  ${blue("--curl")}                            download via curl
${green("Example")}
  ${red.bold("$")} ${yellow("bdownload")} http://myurl.com/myfile.zip
  ${red.bold("$")} ${yellow(
    "bdownload"
  )} http://notpiracysource.ru/files/my-file-$$$.mov -b 5
  ${red.bold("$")} ${yellow(
    "bdownload"
  )} http://notpiracysource.ru/files/my-movies-$$$.mov -b 5 -o my-downloads/movies/
  ${red.bold("$")} ${yellow(
    "bdownload"
  )} http://notpiracysource.ru/files/my-file-$$$.mov -b 5 --curl
  `,
  {
    boolean: ["http", "curl"],
    string: ["batch", "out"],
    alias: {
      b: "batch",
      o: "out"
    }
  }
);

if (cli.input.length == 0) {
  log(red("No url specified..."));
  process.exit(1);
}

let digits;
if (
  cli.flags.b &&
  cli.input[0].match(/(\$)/g).length <= Math.ceil(Math.log10(cli.flags.b))
)
  digits = cli.input[0].includes("$")
    ? cli.input[0].match(/(\$+?)/g).length
    : 0;

log(cli.input[0].match(/(\$)/g).length <= Math.ceil(Math.log10(cli.flags.b)));

const getFileNumberString = index =>
  new Array(digits - index.toString().length).fill("0").join("") +
  (index + 1).toString();

let fileUrls = cli.input;
if (cli.flags.b)
  fileUrls = new Array(parseInt(cli.flags.b))
    .fill("")
    .map((x, index) => cli.input[0].replace(/\$+/, getFileNumberString(index)));

let downloadDir = cli.flags.out ? cli.flags.out : "downloads";

let fileName = i => fileUrls[i].split("/").pop();

var downloadFileWithHttp = (fileUrl, index) => {
  var options = {
    host: url.parse(fileUrl).host,
    port: 80,
    path: url.parse(fileUrl).pathname
  };
  var file = fs.createWriteStream(downloadDir + fileName(index));

  http.get(options, function(res) {
    res
      .on("data", function(data) {
        file.write(data);
      })
      .on("end", function() {
        file.end();
        log(
          fileName(index) + " downloaded to " + downloadDir + " from " + fileUrl
        );
      });
  });
};

const downloadFileWithCurl = (fileUrl, index) => {
  const file = fs.createWriteStream(downloadDir + fileName(index));

  const curl = spawn("curl", [fileUrl]);

  curl.stdout.on("data", function(data) {
    log("downloading...\t" + fileName(index) + " from " + fileUrl);
    file.write(data);
  });

  curl.stdout.on("end", function(data) {
    file.end();
    log(fileName(index) + " downloaded to " + downloadDir);
  });
  curl.on("exit", function(code) {
    if (code != 0) {
      log("Failed: " + code);
    }
  });
};

if (cli.flags.http) {
  fileUrls.forEach((file, index) => downloadFileWithHttp(file, index));
} else if (cli.flags.curl) {
  log(fileUrls);
  fileUrls.forEach((file, index) => {
    console.log(file);
    downloadFileWithCurl(file, index);
  });
}
