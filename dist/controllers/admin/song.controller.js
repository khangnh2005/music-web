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
exports.editPatch = exports.edit = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/song/index", {
        titlePage: "Quản lý bài hát",
        songs: songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false
    });
    const singers = yield singer_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/song/create", {
        titlePage: "Quản lý bài hát",
        topics: topics,
        singers: singers
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "", audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0].url;
    }
    if (req.body.audio) {
        audio = req.body.audio[0].url;
    }
    const dataSong = {
        title: req.body.title,
        description: req.body.description,
        lyrics: req.body.lyrics,
        singerId: req.body.singerId,
        topicId: req.body.topicId,
        status: req.body.status,
        avatar: avatar,
        audio: audio
    };
    const song = new song_model_1.default(dataSong);
    yield song.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPost = createPost;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false
    });
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        deleted: false
    }).select("title");
    song["topic"] = topic;
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        deleted: false
    }).select("fullName");
    song["singer"] = singer;
    const topics = yield topic_model_1.default.find({
        deleted: false
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false
    }).select("fullName");
    res.render("admin/pages/song/edit", {
        titlePage: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    let avatar = "", audio = "";
    const dataSong = {
        title: req.body.title,
        description: req.body.description,
        lyrics: req.body.lyrics,
        singerId: req.body.singerId,
        topicId: req.body.topicId,
        status: req.body.status
    };
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0].url;
    }
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio[0].url;
    }
    yield song_model_1.default.updateOne({
        _id: idSong
    }, dataSong);
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/songs`);
});
exports.editPatch = editPatch;
