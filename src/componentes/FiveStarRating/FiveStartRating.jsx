import { StackFill, StarHalf, Star as StarEmpty, StarFill } from "react-bootstrap-icons";
export function FiveStartRating({rating}){
    const starList = [];
    const starFillCount = Math.floor(rating);
    const hasHalfStart = rating - parseInt(rating)>= 0.5;
    const emptyStarCount = 5 - starFillCount - (hasHalfStart? 1 : 0);
    for(let i = 1; i <= starFillCount; i++){
        starList.push(<StarFill key={"star-fill" + i}/>);
    }
    if(hasHalfStart){
        starList.push(<StarHalf key={"star-half"}/>);
    }
    for(let i = 1; i <= emptyStarCount; i++){
        starList.push(<StarEmpty key={"star-empty" + i}/>);
    }
    return (
        <div>{starList}</div>
    );
}