# ProyectoSeneca

### Running

+ Copy bootstrap dist from css project (other repository) to /public
+ Run bower on the root directory
```sh
$ bower install
```
+ Run with IntelliJ Play2Run __or__ add activator executable to root directory and run
```sh
$ ./activator ~run
```

### API

#### AirTime Info

##### Request

| Route            | Parameters    | Method  |
| :-------------:  |:-------------:| :-----: |
| /api/airtimeInfo | none          | Get     |

##### Response
```json
{"program":{
    "starts":"2016-02-06 20:40:00",
    "ends":"2016-02-06 21:20:00",
    "name":"Nuevo Programa",
    "url":"http://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg"
},"song":{
    "name":"Media Veronica",
    "author":"Andres Calamaro",
    "url":"http://img2-ak.lst.fm/i/u/300x300/3a27fbec00c84fe68c2197df62e32e19.png"
}}
```

Program URL and Song URL are images.