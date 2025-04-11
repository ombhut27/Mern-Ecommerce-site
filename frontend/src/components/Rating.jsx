import PropTypes from 'prop-types';

const Rating = ({ rating, onRatingChange }) => {

    const handleClick = (index) => {
        let newRating = index + 0.5;


        if (rating === newRating) {
            newRating = Math.floor(newRating) + 1; 
        }


        if (newRating > 5) {
            newRating = 5;
        }

        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <div className="flex items-center cursor-pointer">

            {Array(5).fill().map((_, index) => {

                const isFilled = index < Math.floor(rating);  
                const isHalf = rating % 1 > 0 && index === Math.floor(rating);  

                return (
                    <i
                        key={index}
                        className={`ri-star${isFilled ? '-fill' : isHalf ? '-half-fill' : '-line'} text-yellow-500`}
                        onClick={() => handleClick(index)}  
                    ></i>
                );
            })}
        </div>
    );
};


Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    onRatingChange: PropTypes.func.isRequired,
};

export default Rating;



