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

//Button-like 
const buttonLike = document.querySelector("[button-like]")
if(buttonLike){
    buttonLike.addEventListener("click",() =>{
        const idSong = buttonLike.getAttribute("button-like")
        const isActive = buttonLike.classList.contains("active")
        console.log(isActive) 
        
        const typeLike = isActive ? "dislike" : "like"
        const link = `/songs/like/${typeLike}/${idSong}`
        
        const option = {
            method : "PATCH"
        }
        fetch(link , option)
         .then(res => res.json())
         .then(data=>{
            const span = buttonLike.querySelector("span")
            span.innerHTML = `${data.like}`
            buttonLike.classList.toggle("active")
            
         })
    })
}
//Button-like end



