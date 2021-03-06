import {useEffect, useState} from 'react'
import {Alert, Col, Row, Spinner} from 'react-bootstrap'
import {useRouter} from 'next/router'
import Layout from '../../components/Layout'
import ObjectsResponse from '../../interfaces/Objects/Response'
import ObjectRecord from '../../interfaces/Objects/Record'
import ObjectImage from '../../interfaces/Objects/Image'
import API from '../../enums/Api'
import CrudPagination from '../../components/CrudPagination'
import {sprintf} from 'sprintf-js'

const OBJECT_QUERY = `
{
  objects(classification: "Prints", size: 10, page: %d, sort: "rank", sortorder: "desc", hasimage: 1, verificationlevel: 4) {
    records {
      id
      title
      rank
      culture
      verificationleveldescription
      images {
        baseimageurl
        alttext
      }
    }
    info {
      prev
      next
      totalrecords
      totalrecordsperquery
      page
    }
  }
}
`

export default function List() {
    const router = useRouter()
    const [objectsResponse, setObjectsResponse] = useState<ObjectsResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!router.isReady) return
        if (router.query.page === undefined) return

        const pageParam: string = (typeof router.query.page == 'string') ? router.query.page : router.query.page[0]
        const page: number = parseInt(pageParam)

        setLoading(true)
        fetch(API.GRAPHQL_ENDPOINT, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: sprintf(OBJECT_QUERY, page)})
            }
        )
            .then((res) => res.json())
            .then((res: { data }) => {
                setObjectsResponse(res.data.objects)
                setLoading(false)
            })
            .catch((response) => {
                setError(response.toString())
                setLoading(false)
            })
    }, [router])

    const paginationRow = () => {
        if (objectsResponse === null) return

        return (
            <Row>
                <Col sm="12">
                    <CrudPagination
                        baseRoute={'/objects/%d'}
                        numberOfItemsPerPage={objectsResponse.info.totalrecordsperquery}
                        numberOfItems={objectsResponse.info.totalrecords}
                        currentPage={objectsResponse.info.page}/>
                </Col>
            </Row>
        )
    }

    const errorRow = () => {
        if (error === null) return

        return (
            <Alert variant="danger">
                {error}
            </Alert>
        )
    }

    const showLoadingAnimation = () => {
        if (!isLoading) return

        return (
            <Row>
                <Col sm="12">
                    <Spinner animation="border"
                             role="status">
                    </Spinner>
                    Loading..
                </Col>
            </Row>
        )
    }

    return (
        <Layout pageTitle="Best standard prints">
            <Row>
                <Col sm="12">
                    <h1>Best standard prints</h1>
                </Col>
            </Row>
            {showLoadingAnimation()}
            {errorRow()}
            {paginationRow()}
            <Row>
                <Col sm="12">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Print information</th>
                            <th scope="col">Rank</th>
                            <th scope="col">Images (first one/two)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {objectsResponse !== null ? objectsResponse.records.map((record: ObjectRecord, recordIndex) => {
                                return (
                                    <tr key={recordIndex}>
                                        <td>{record.id}</td>
                                        <td>
                                            <p><b>Title:</b> {record.title ? record.title : 'N/A'}</p>
                                            <p><b>Culture:</b> {record.culture ? record.culture : 'N/A'}</p>
                                            <p><b>Verification
                                                description:</b> {record.verificationleveldescription ? record.verificationleveldescription : 'N/A'}
                                            </p>
                                        </td>
                                        <td>{record.rank}</td>
                                        <td>{record.images.filter((image, idx) => idx < 3).map((image: ObjectImage, imageIndex: number) => {
                                            return (
                                                <img src={image.baseimageurl}
                                                     key={imageIndex}
                                                     width={100}
                                                     alt={image.alttext}/>
                                            )
                                        })}</td>
                                    </tr>
                                )
                            }
                        ) : null}
                        </tbody>
                    </table>
                </Col>
            </Row>
            {paginationRow()}
        </Layout>
    )
}