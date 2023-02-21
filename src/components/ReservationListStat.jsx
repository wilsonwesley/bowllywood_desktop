import { Col } from 'react-bootstrap';

const ReservationListStat = ({number, title, subNumber, subTitle, isPercent}) => {

	var fontColor = '';
	if (isPercent)
	{
		if (number >= 70 )
			fontColor = 'negativeColor';
		else if	(number >= 50 && number < 70 )
			fontColor = 'warningColor';
		else if	(number < 50 )
			fontColor = 'positiveColor';

		number += '%';
	}

    return (
        <div className="text-center">
			<span className={`headerNbr ${fontColor} font-weight-bold`} >{number}</span>
			<p className="m-0">{title}</p>
			{
			 	(subNumber && subTitle) ? 
				<p className="smallText">
					<span className="font-weight-bold mr-2">{subNumber}</span>
					<span>{subTitle}</span>
				</p> : ''
			}
        </div>
    )
}

export default ReservationListStat;