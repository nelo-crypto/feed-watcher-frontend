import Layout from '../components/Layout'
import {Col, Row} from 'react-bootstrap'

export default function Index() {
    return (
        <Layout pageTitle={'Home'}>
            <Row>
                <Col sm="12">
                    <h1>Home</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    <p>Welcome to Feed Viewer, a frontend client built with ReactJS and NextJS.</p>
                    <p>Feeds:</p>
                    <ul>
                        <li><a href="/objects/1">Best standard prints</a></li>
                    </ul>
                </Col>
            </Row>
        </Layout>
    )
}
