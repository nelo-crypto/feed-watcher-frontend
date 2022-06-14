import Layout from '../components/Layout'
import {Col, Row} from 'react-bootstrap'

export default function Index() {
    return (
        <Layout pageTitle={'Home'}>
            <Row>
                <Col sm="12">Home</Col>
            </Row>
        </Layout>
    )
}
