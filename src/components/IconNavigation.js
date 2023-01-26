const IconNavigation = ({iconArr}) => {

	const IconElement = ({icon, text, route}) => {
		return (
			<div className="d-flex flex-column align-items-center ">
				<i className={icon}></i>
				<p className="mb-0 mt-2">{text}</p>
			</div>
		)
	}

	if (Array.isArray(iconArr)) {

		return (
		<div className="homeNavigation d-flex">
			{
				iconArr.map((iconItem)=>{
					return <IconElement icon={iconItem.icon} text={iconItem.text} />
				})
			}
		</div>
		)
	} else {
		return '';	
	}

}

export default IconNavigation;