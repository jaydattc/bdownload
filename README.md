# bdownload

A batch downloader cli made in NodeJS

## Features
1. Download using HTTP or curl (default is curl)
2. Batch downloading
3. Output folder selection

## Installation
>npm i -g bdownload

## Usage
```
Usage
  $ dl <url>
  $ dl <url> [-o|--out] <dir>
  $ dl <url-with-numbers-replaced-with-$> [-b|--batch] <number-of-files>
  $ dl <url> --curl
Options
  -o, --out <dir>                   destination directory
  -b, --batch <number_of_files>     number of files, batch download, put '$' in URI where number is supposed to be.
  --http                            download via http protocol
  --curl                            download via curl
Example
  $ dl http://myurl.com/myfile.zip
  $ dl http://somesite.com/files/my-file-$$$.mov -b 5
  $ dl http://somesite.com/files/my-movies-$$$.mov -b 5 -o my-downloads/movies/
  $ dl http://somesite.com/files/my-file-$$.mov -b 5 --curl
```

## License
MIT © [Jaydattsinh Champavat](https://github.com/jaydattc)
