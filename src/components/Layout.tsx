import Header from './Header'
import {Col, Container, Row} from 'react-bootstrap'

type LayoutProps = {
    children: React.ReactNode,
    pageTitle?: string,
}

export default function Layout({children, pageTitle}: LayoutProps) {
    return (
        <>
            <Header pageTitle={pageTitle}/>
            <main>
                <Container>
                    <Row className="mt-4">
                        <Col sm="12">
                            {children}
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}
