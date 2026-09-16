//Aplayer
const aplayer = document.querySelector('#aplayer')
if(aplayer){
    let dataSong = aplayer.getAttribute("data-song")
    dataSong = JSON.parse(dataSong)
    
    const ap = new APlayer({
        container: document.getElementById('aplayer'),
        audio: [{
            
            name: dataSong.title,
            artist: dataSong.infoSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar
        }],
        autoplay : true,
    });

    //Animation play-state
    const avatar = document.querySelector(".inner-avatar")
    ap.on('pause', function () {
        avatar.style.animationPlayState = "paused";
    });
    ap.on('play', function () {
        avatar.style.animationPlayState = "running";
    });
    //Animation play-state end
}

//Aplayer End




