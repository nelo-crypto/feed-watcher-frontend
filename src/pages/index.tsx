import Layout from '../components/Layout'
import {useEffect, useState} from 'react'
import {Alert, Col, Row} from 'react-bootstrap'
import API from '../enums/Api'
import {ObjectResource} from '../interfaces/ObjectResource'
import CrudPagination from '../components/CrudPagination'

const OBJECT_QUERY = `
{
    object(classification: "Prints", size: 10, page: 1, sort: "rank", sortorder: "desc", hasimage: 1, verificationlevel: 4) {
        rank
        images {
            width
            height
            baseimageurl
        }
    }
}
`

export default function Index() {
    const [items, setItems] = useState<ObjectResource[]>([])
    const [error, setError] = useState<string>('')

    useEffect(() => {
        fetch(API.GRAPHQL_ENDPOINT, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: OBJECT_QUERY})
            }
        )
            .then((res) => res.json())
            .then((res: any[]) => {
                console.log('Items', res.data.object)

                setItems(res.data.object)
            })
            .catch((response) => {
                setError(response.toString())
            })
    }, [])

    return (
        <Layout pageTitle={'Home'}>
            <Row>
                <Col sm="12">
                    <h1>Items</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="12">
                    {error ? <Alert variant="danger">
                        {error}
                    </Alert> : null}
                    {items.map((item: ObjectResource) => {
                        return (
                            <p>{JSON.stringify(item)}</p>
                        )
                    })}
                    <CrudPagination  />
                </Col>
            </Row>
        </Layout>
    )
}
