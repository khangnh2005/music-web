import { Request, Response } from "express"
import FavoriteSong from "../../models/favorite-song.model"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model";

export const index = async (req : Request , res : Response)=>{
    const favoriteSongs = await FavoriteSong.find({
        //userID
        deleted : false 
    });
    for (const favoriteSong of favoriteSongs) {
        const songDetail : any  = await Song.findOne({
            _id : favoriteSong.songId
        });
        
        const singerDetail  = await Singer.findOne({
            _id : songDetail.singerId
        });
        (favoriteSong as any)["songDetail"] = songDetail;
        (favoriteSong as any)["singerDetail"] = singerDetail;
    }
    
   
        
    res.render("client/pages/favorite-songs/index",{
        titlePage : "Bài hát yêu thích",
        favoriteSongs : favoriteSongs
    })
}