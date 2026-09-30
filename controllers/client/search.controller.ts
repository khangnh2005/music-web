import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { info } from "node:console";
import { convertToString } from "../../helpers/convertToSlug";

export const result = async ( req : Request , res : Response ) => {
    const keyword : string = `${req.query.keyword}`;
    let newSongs : any = [];

    if(keyword){
        const stringSlug = convertToString(keyword)
        const slugRegex = new RegExp (stringSlug , "i");

        // Tạo ra slug không dấu , thêm dấu - ngăn cách 
        const songs  = await Song.find({
            slug : slugRegex
        });
        

        for (const song of songs) {
            const infoSinger = await Singer.findOne({
                _id : song.singerId
            });
            (song as any)["infoSinger"] = infoSinger

        }
        
        newSongs = songs
    }
        

    res.render("client/pages/search/result",{
        titlePage : `Kết quả : ${keyword}`,
        keyword : keyword,
        songs : newSongs
    })

}