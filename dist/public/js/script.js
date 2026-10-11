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

    ap.on('ended',function(){
        const link = `/songs/listen/${dataSong._id}`
        
        const option = {
            method : "PATCH"
        }
        fetch(link , option)
         .then(res => res.json())
         .then(data=>{
            console.log(data.listen)
         })
    })
    //Animation play-state end
}

//Aplayer End

//Button-like 
const buttonLike = document.querySelector("[button-like]")
if(buttonLike){
    buttonLike.addEventListener("click",() =>{
        const idSong = buttonLike.getAttribute("button-like")
        const isActive = buttonLike.classList.contains("active")
        
        
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

//Button-favoriteSong
const listbuttonFavorite = document.querySelectorAll("[button-favorite]")
if(listbuttonFavorite){
    listbuttonFavorite.forEach((buttonFavorite)=>{
        buttonFavorite.addEventListener("click",()=>{
        const idSong = buttonFavorite.getAttribute("button-favorite")
        const isActive = buttonFavorite.classList.contains("active")

        const typeFavorite = isActive ? "unfavorite" : "favorite"
        const link = `/songs/favorite/${typeFavorite}/${idSong}`

        const option = {
            method : "PATCH"
        }
        fetch(link , option)
         .then(res => res.json())
         .then(data =>{
            if(data.code == 200){
                buttonFavorite.classList.toggle("active")
            }
         })
    })
    })
    
}
//Button-favoriteSong end

//Search Suggest 
const boxSearch = document.querySelector(".box-search")
if(boxSearch){
    boxSearch.addEventListener("keyup",(e)=>{
        const keyword = e.target.value;
        const boxSuggest = boxSearch.querySelector(".inner-suggest")
        const link = `/search/suggest?keyword=${keyword}`
        
        
        fetch(link)
         .then(res => res.json())
         .then(data =>{
            const songs = data.songs
            if(songs.length > 0){
                boxSuggest.classList.add("show")
                const htmls = songs.map(song =>{
                    return `
                    <div class="inner-list">
                        <a href="/songs/detail/${song.slug}" class="inner-item">
                            <div class="inner-image">
                            <img src=${song.avatar}>
                            </div>
                            <div class="inner-info">
                            <div class="inner-title">${song.title}</div>
                            <div class="inner-singer">
                                <i class="fa-solid fa-microphone-lines"></i>${song.infoSinger.fullName}
                            </div>
                            </div>
                        </a>
                        </div>
                    `
                })

                const boxList = boxSuggest.querySelector(".inner-list");
                boxList.innerHTML = htmls.join("")
                    
            }else{
                boxSuggest.classList.remove("show")
            }
            
         })
    })
}
//Search Suggest end



