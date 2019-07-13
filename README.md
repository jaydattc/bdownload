# bdownload

A batch downloader cli made in node
```
Usage 
  $ bdownload <url> 
  $ bdownload <url> [-o|--out] <dir> 
  $ bdownload <url-with-numbers-replaced-with-$> [-b|--batch] <number-of-files> 
  $ bdownload <url> --curl 
Options 
  -o, --out <dir>                   output directory 
  -b , --batch <number_of_files>    number of files, batch download, put '$' in URI where number is supposed to be. 
  --http                            download via http protocol
  --curl                            download via curl
```
