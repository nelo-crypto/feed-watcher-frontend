import {Container, Navbar} from 'react-bootstrap'
import {useRouter} from 'next/router'

type HeaderProps = {
    pageTitle?: string,
}

export default function Header({pageTitle}: HeaderProps) {
    const router = useRouter()

    return (
        <header>
            <title>{pageTitle ? pageTitle : 'No title'}</title>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <Navbar bg="light"
                    className="my-3 mt-0 mb-1 bg-body rounded-bottom shadow-sm"
                    expand="lg">
                <Container>
                    <Navbar.Brand href="#"
                                  onClick={(e) => {
                                      e.preventDefault()
                                      router.push('/')
                                  }}>Feed Viewer</Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    )
}