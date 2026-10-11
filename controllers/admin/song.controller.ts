import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";


export const index = async (req : Request , res : Response )=>{
    const songs = await Song.find({
        deleted : false
    })

    res.render("admin/pages/song/index",{
        titlePage : "Quản lý bài hát",
        songs : songs
    })
}

export const create = async (req : Request , res : Response )=>{
    const topics = await Topic.find({
        deleted: false
    });
    const singers = await Singer.find({
        deleted: false
    });
    res.render("admin/pages/song/create",{
        titlePage : "Quản lý bài hát",
        topics : topics,
        singers : singers
    })
}
export const createPost = async (req : Request , res : Response )=>{
    let avatar = "", audio = "";
    if(req.body.avatar){
        avatar = req.body.avatar[0].url;
    }

    if(req.body.audio){
        audio = req.body.audio[0].url;
    }
    const dataSong = {
        title: req.body.title,
        description: req.body.description,
        lyrics : req.body.lyrics , 
        // audio : String ,
        singerId : req.body.singerId,
        topicId : req.body.topicId,
        status: req.body.status,
        avatar: avatar,
        audio : audio
        
    }
    const song = new Song(dataSong)
    await song.save()
    
    
    res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}

export const edit = async (req : Request , res : Response )=>{
    const idSong = req.params.idSong
    const song : any = await Song.findOne({
        _id : idSong,
        deleted : false
    });
    const topic = await Topic.findOne({
        _id : song.topicId,
        deleted : false
    }).select("title");
    (song as any)["topic"] = topic;
    const singer = await Singer.findOne({
        _id : song.singerId ,
        deleted : false
    }).select("fullName");
    (song as any)["singer"] = singer;

    const topics = await Topic.find({
        deleted : false
    }).select("title");

    const singers = await Singer.find({
        deleted : false
    }).select("fullName");
    res.render("admin/pages/song/edit",{
        titlePage : "Chỉnh sửa bài hát",
        song : song,
        topics : topics,
        singers : singers
    })
}

export const editPatch = async (req : Request , res : Response )=>{
    const idSong = req.params.idSong;

    let avatar = "", audio = "";
    
    const dataSong = {
        title: req.body.title,
        description: req.body.description,
        lyrics : req.body.lyrics , 
        // audio : String ,
        singerId : req.body.singerId,
        topicId : req.body.topicId,
        status: req.body.status
    }
    if(req.body.avatar){
        (dataSong as any)["avatar"] = req.body.avatar[0].url;
    }

    if(req.body.audio){
        (dataSong as any)["audio"] = req.body.audio[0].url;
    }
    await Song.updateOne({
        _id : idSong
    },dataSong)
    res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}