import React from "react";
import { Rating, RatingProps } from "react-simple-star-rating";

const toolTipArray = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];

const RatingReview = (props: RatingProps) => {
    return (
        <Rating
            transition
            tooltipArray={toolTipArray}
            SVGstyle={{ display: "inline" }}
            className="flex"
            {...props}
        />
    );
};

export default RatingReview;
