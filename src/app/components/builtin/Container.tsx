

export const Container = ({ props, children }: { props: any, children?: React.ReactNode }) => {
    console.log('log==props=>>>', props)
    return (
        <div style={{ border: '1px solid red', padding: 10, ...props.style }} className={props.className}>
            {children}
        </div>
    )
}
export default Container