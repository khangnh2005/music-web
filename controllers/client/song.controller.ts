
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

export const detail = async (req : Request ,res : Response) =>{
  const slugSong = req.params.slugSong;
  const song : any = await Song.findOne({
    slug : slugSong , 
    deleted : false ,
    status : "active"
  }).lean();
  
  const infoSinger = await Singer.findOne({
    _id : song.singerId,
    deleted : false ,
    status : "active"
  }).select("fullName");
  (song as any)["infoSinger"] = infoSinger

  const infoTopic = await Topic.findOne({
    _id : song.topicId,
    deleted : false ,
    status : "active"
  }).select("title");
  
  (song as any)["infoTopic"] = infoTopic
  res.render("client/pages/songs/detail" , {
    titlePage : song.title,
    song : song
  })
}

export const like = async (req : Request ,res : Response) =>{
  const typeLike = req.params.typeLike
  const idSong  = req.params.idSong;
  const song : any = await Song.findOne({
    _id : idSong
  }).select("like");
  

  const newLike =  typeLike == "like" ? song.like + 1 : song.like - 1  
  await Song.updateOne({
    _id : idSong
  },{
    like : newLike
  })
  
  res.json({
    code : 200,
    message : "Thanh cong",
    like : newLike
  })
  
  
}


