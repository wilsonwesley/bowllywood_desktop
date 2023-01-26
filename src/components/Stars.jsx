import StarRatings from 'react-star-ratings';
import { useState } from 'react';
// @use 'variables:star-yellow' as star-yellow;
import '../sass/variables.scss';

const Stars = ( {nrating} ) => {
    const [rating, setRating] = useState(0);
    const changeRating = () => {
        setRating({nrating});
        console.log({nrating})
    };

    return (
        <StarRatings
            rating={rating}
            starRatedColor="yellow"
            changeRating={changeRating}
            starHoverColor="yellow"
            numberOfStars={5}
            starDimension="15px"
            starSpacing="1px"
            // gradientPathName= "string"
            // ignoreInlineStyles= "boolean"
            // svgIconPath= "../../public/logos/stars.svg"
        />
    );
}

export default Stars;