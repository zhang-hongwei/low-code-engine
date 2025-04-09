import { Button, Container } from '../components/builtin'

export const componentRegistry: Record<
    string,
    React.FC<{ props: any }>
> = {
    button: Button,
    container: Container,
}
