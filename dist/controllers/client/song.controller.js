"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugTopic = req.params.slugTopic;
    const topic = yield topic_model_1.default.findOne({ slug: slugTopic, deleted: false });
    const listSong = yield song_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false
    }).select("title slug avatar like singerId");
    for (const song of listSong) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false
        }).select("fullName");
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/list", {
        titlePage: "Danh sách bài hát",
        listSong: listSong
    });
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slugSong = req.params.slugSong;
    const song = yield song_model_1.default.findOne({
        slug: slugSong,
        deleted: false,
        status: "active"
    }).lean();
    const infoSinger = yield singer_model_1.default.findOne({
        _id: song.singerId,
        deleted: false,
        status: "active"
    }).select("fullName");
    song["infoSinger"] = infoSinger;
    const infoTopic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        deleted: false,
        status: "active"
    }).select("title");
    song["infoTopic"] = infoTopic;
    const favoriteSong = yield favorite_song_model_1.default.findOne({
        songId: song._id
    });
    song["isFavorite"] = favoriteSong ? true : false;
    console.log(song.isFavorite);
    res.render("client/pages/songs/detail", {
        titlePage: song.title,
        song: song
    });
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typeLike = req.params.typeLike;
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong
    }).select("like");
    const newLike = typeLike == "like" ? song.like + 1 : song.like - 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        like: newLike
    });
    res.json({
        code: 200,
        message: "Thanh cong",
        like: newLike
    });
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            let existFavoriteSong = yield favorite_song_model_1.default.findOne({
                songId: idSong
            });
            if (!existFavoriteSong) {
                const record = new favorite_song_model_1.default({
                    songId: idSong
                });
                yield record.save();
            }
            break;
        case "unfavorite":
            yield favorite_song_model_1.default.deleteOne({ songId: idSong });
            break;
        default:
            break;
    }
    res.json({
        code: 200,
        message: "Thanh cong",
    });
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong
    }).select("listen");
    console.log(song);
    const newListen = song.listen + 1;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        listen: newListen
    });
    res.json({
        code: 200,
        message: "Thanh cong",
        listen: newListen
    });
});
exports.listen = listen;
