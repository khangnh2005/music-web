
import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

export const index = async (req : Request ,res : Response) =>{
  const slugTopic = req.params.slugTopic
  const topic : any = await Topic.findOne({slug : slugTopic , deleted : false})
  const listSong = await Song.find({
    topicId : topic.id,
    status : "active",
    deleted : false
  }).select("title slug avatar like singerId").lean();

  for (const song of listSong) {
    const infoSinger  = await Singer.findOne({
      _id : song.singerId ,
      status : "active",
      deleted : false
    }).select("fullName");

    (song as any)["infoSinger"] = infoSinger
   
    console.log(song);
  }
  
  res.render("client/pages/songs/list",{
    titlePage : "Danh sách bài hát",
    listSong : listSong
  });
}
