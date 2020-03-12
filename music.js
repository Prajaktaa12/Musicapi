//TO CREATE EXPRESS
let express=require("express");

//TO ACCESS APPLICATION
let app=express();

//@HAPI/JOI FOR DATA VALIDATION
let Joi = require("@hapi/joi");

//TO ACCESS JSON
app.use(express.json())

//TO INITIALISE THE PORT
let port = process.env.PORT || 4500;

//ARRAY OF SONGS
let song_list = [{
    id: 1,
    song_name: "Its you",
    singer: "Ali Gatie",
    album: "You"
},
{
    id: 2,
    song_name: "Moonlight",
    singer: "Ali Gatie",
    album: "Moonlight"
},
{
    id: 3,
    song_name: "Roxanne",
    singer: "Arizona Zervas",
    album: "Roxanne"
},
{
    id: 4,
    song_name: "Cradles",
    singer: "Sub Urban",
    album: "Cradles"
}
];

//TO GET ALL SONGS LIST 
app.get("/api/songs/all_list", (req, res) => {
    res.send(song_list);
});

//TO GET SONGS BY THERE GIVEN ID
app.get("/api/songs/song_by_id/:id", (req, res) => {
    let songs=song_list.find((item) => item.id === parseInt(req.params.id));
    if (!songs) { return res.status(404).send({ message: "invalid id " }) };
    res.send(songs);
});

//TO CREATE NEW DATA/SONG
app.post("/api/songs/create_song", (req, res) => {
        let schema = Joi.object({
            song_name:Joi.string().min(3).max(100).required(),
            singer:Joi.string().min(3).max(100).required(),
            album:Joi.string().min(3).max(100).required()
    });

//VALIDATION WHILE CREATING SONGS
        let result=ValidationError(req.body);
        let { error } = result;
        if(error) {return res.send(error.details[0].message)}
        let songs = {
            id: song_list.length + 1,
            song_name:req.body.song_name,
            singer:req.body.singer,
            album:req.body.album
        };
        song_list.push(songs);
        res.send(song_list);
    });

//TO UPDATE SONGS LIST
    app.put("/api/songs/update_song/:id", (req, res) => {
        let songs = song_list.find(data => data.id === parseInt(req.params.id));
        if (!songs) { return res.status(404).send({ message: "Invalid user id" })
            let schema=joi.object({
            song_name:Joi.string().min(3).max(100).required(),
            singer:Joi.string().min(3).max(100).required(),
            album:Joi.string().min(3).max(100).required()
               
            });

//VALIDATION WHILE UPLOADING SONG
        let result=ValidationError(req.body);
        let{error}=result;
        if(error) {return res.send(error.details[0].message)}
    };
    
        songs.song_name=req.body.song_name;
        songs.singer=req.body.singer;
        songs.album=req.body.album;
        res.send(songs);
    });
       
//TO REMOVE SONG
    app.delete("/api/songs/remove_song/:id", (req, res) => {
        let songs = song_list.find(data => data.id === parseInt(req.params.id));
        if (!songs) { return res.status(404).send({ message: "Invalid id" }) };
        let index = song_list.indexOf(songs);
        console.log(index);
        song_list.splice(index, 1);
        res.send(song_list);
        
    });

//ERROR VALIDATION
    function ValidationError(error) {
        let schema = Joi.object({
            song_name:Joi.string().min(3).max(100).required(),
            singer:Joi.string().min(3).max(100).required(),
            album:Joi.string().min(3).max(100).required()
    
        });
       return schema.validate(error);
    }
    
//TO ACCESS PORT 
app.listen(port, () => console.log(`port is working on ${port}`));
