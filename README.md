# bdownload

A batch downloader cli made in Node

```
Usage
  $ bdownload <url>
  $ bdownload <url> [-o|--out] <dir>
  $ bdownload <url-with-numbers-replaced-with-$> [-b|--batch] <number-of-files>
  $ bdownload <url> --curl
Options
  -o, --out <dir>                   destination directory
  -b, --batch <number_of_files>     number of files, batch download, put '$' in URI where number is supposed to be.
  --http                            download via http protocol
  --curl                            download via curl
Example
  $ bdownload http://myurl.com/myfile.zip
  $ bdownload http://notapiracysource.ru/files/my-file-$$$.mov -b 5
  $ bdownload http://notapiracysource.ru/files/my-movies-$$$.mov -b 5 -o my-downloads/movies/
  $ bdownload http://notapiracysource.ru/files/my-file-$$$.mov -b 5 --curl
```

currently use 
>node bdownload.js \<command\>
untill i figure out win and linux command-line aliases
