const Link = ({to, text}) => {
  return (
    <>
        <a className="link-dark link-offset-3 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href={to}>
            {text}
        </a>
    </>
  )
}

export default Link