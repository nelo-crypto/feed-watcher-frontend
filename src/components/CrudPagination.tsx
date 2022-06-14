import {Pagination} from 'react-bootstrap'
import {sprintf} from 'sprintf-js'
import {useRouter} from 'next/router'

interface CrudPaginationProps {
    baseRoute: string,
    numberOfItems: number,
    numberOfItemsPerPage: number,
    currentPage: number,
}

export default function CrudPagination({
                                           baseRoute,
                                           numberOfItems,
                                           numberOfItemsPerPage,
                                           currentPage,
                                       }: CrudPaginationProps) {
    const numberOfPages = Math.ceil(numberOfItems / numberOfItemsPerPage)
    const paginationItems: any[] = []
    const router = useRouter()

    let ellipsis = false

    for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
        const route = sprintf(baseRoute, pageNumber)
        const tail = (pageNumber === 1 || pageNumber === numberOfPages)

        if (!tail && ((pageNumber < (currentPage - 3)) || ((currentPage + 3) < pageNumber))) {
            if (!ellipsis) {
                ellipsis = true
                paginationItems.push(<Pagination.Ellipsis key={pageNumber}/>)
            }

            continue
        }

        ellipsis = false

        paginationItems.push(
            <Pagination.Item key={pageNumber}
                             onClick={(e) => {
                                 e.preventDefault()

                                 router.push(route)
                             }}
                             active={pageNumber === currentPage}>
                {pageNumber}
            </Pagination.Item>,
        )
    }

    return (
        <Pagination>
            <Pagination.First onClick={(e) => {
                e.preventDefault()

                const route: string = sprintf(baseRoute, 1)

                router.push(route)
            }}/>
            <Pagination.Prev onClick={(e) => {
                e.preventDefault()

                const pageNumber = Math.max(1, currentPage - 1)
                const route: string = sprintf(baseRoute, pageNumber)

                router.push(route)
            }}/>
            {paginationItems}
            <Pagination.Next onClick={(e) => {
                e.preventDefault()

                const pageNumber = Math.min(numberOfPages, currentPage + 1)
                const route: string = sprintf(baseRoute, pageNumber)

                router.push(route)
            }}/>
            <Pagination.Last onClick={(e) => {
                e.preventDefault()

                const route: string = sprintf(baseRoute, numberOfPages)

                router.push(route)
            }}/>
        </Pagination>
    )
}
