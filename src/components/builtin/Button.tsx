const Button = ({ props }: { props: any }) => {
    console.log('log===Button===props===>>>', props)
    return (
        <button style={props.style}>
            {props.text || '按钮'}
        </button>
    )
}

export default Button