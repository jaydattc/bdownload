#!/usr/bin/env node

const fs = require("fs");
const url = require("url");
const spawn = require("child_process").spawn;
const program = require("commander");

program
  .option("<url>", "file url")
  .option(
    "-b , --batch <number_of_files>",
    "number of files, batch download, put '$' in URI where number is supposed to be.\nfor example - \"bdowload http://download-my-file.com/my-file-$$$.jpg\" -b 12"
  )
  .option("-o, --out <dir>", "output directory")
  .option("--http", "download via http protocol")
  .option("--curl", "download via curl")
  .parse(process.argv);

const fileUrl = program.number_of_files ? Array.of(program.number_of_files) : ;
const DOWNLOAD_DIR = program.out ? program.out : '';

const downloadFileWithCurl = function(file_url) {
  const file_name = url
    .parse(fileUrl)
    .pathname.split("/")
    .pop();

  const file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

  const curl = spawn("curl", [fileUrl]);

  curl.stdout.on("data", function(data) {
    console.log("downloading...\t"+file_name)
    file.write(data);
  });

  curl.stdout.on("end", function(data) {
    file.end();
    console.log(file_name + " downloaded to " + DOWNLOAD_DIR);
  });
  curl.on("exit", function(code) {
    if (code != 0) {
      console.log("Failed: " + code);
    }
  });
};
