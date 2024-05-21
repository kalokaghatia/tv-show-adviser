import s from"./style.module.css"
import { TVShowAPI } from "./api/tv-show";
import { useEffect, useState } from "react";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail} from "./componentes/TVShowDetail/TVShowDetail"
import { Logo } from "./componentes/Logo/Logo"
import logoImg from "./assets/images/logo.png"
import { TVShowList } from "./componentes/TVShowList/TVShowList";
import { SearchBar } from "./componentes/SearchBar/SearchBar";
export default function App(){

    const [currentTVShow, setCurrentTVShow]= useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopulars() {
        try{    
            const popularTvShowList = await TVShowAPI.fetchPopulars();
            if (popularTvShowList.length>0){
                setCurrentTVShow(popularTvShowList[0])
            }
        }catch(error){
            alert("Qualcosa è andato storto");
        }
    }
    async function fetchReccomendations(tvShowId) {
        try{
            const recommendationListResp = await TVShowAPI.fetchRecomendation(tvShowId);
            if (recommendationListResp.length>0){
                setRecommendationList(recommendationListResp.slice(0,10));
            }
        }catch(error){
            alert("Qualcosa è andato storto");
        }
    }
    async function searchTVShow(title) {
        try{
            const searchResponse = await TVShowAPI.fetchByTitle(title);
            if (searchResponse.length>0){
                setCurrentTVShow(searchResponse[0]);
            }
        }catch(error){
            alert("Qualcosa è andato storto");
        }
    }
    useEffect(()=>{        
        fetchPopulars();
    },[])

    useEffect(()=>{        
        if(currentTVShow){
            fetchReccomendations(currentTVShow.id);
        }
    },[currentTVShow])
    console.log(currentTVShow);
    return (
        <div className={s.main_container} style={{  background: currentTVShow
            ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
               url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
            : "black",
        }}>
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <Logo img={logoImg} title ="WatoWatch" subtitle="Find a show you may like"/>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <SearchBar onSubmit={searchTVShow}/>
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow}/>}
            </div>
            <div className={s.recommended_shows}>
                {currentTVShow && <TVShowList tvShowList={recommendationList}/>}
            </div>            
        </div>
    );
}