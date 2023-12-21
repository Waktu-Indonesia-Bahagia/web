const BoxFeature = ({source, text, description}) => {
  return (
    <>
        <div className="box-ftr">
            <div className="top">
                <img src={source} alt="Feature" />
                <h3>{text}</h3>
            </div>

            <div className="bottom">
                <p>{description}</p>
            </div>
        </div>
    </>
  )
}

export default BoxFeature