import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";


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