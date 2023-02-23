import { Oval } from 'react-loader-spinner';

const LoadingSpinner = () => {
	return (
		<Oval strokeWidth="5"
			strokeWidthSecondary="5"
			secondaryColor="#000"
			height="25"
			width="25"
			color="#CECECE"
			ariaLabel="loading"
			wrapperStyle/>
	)
}

export default LoadingSpinner;