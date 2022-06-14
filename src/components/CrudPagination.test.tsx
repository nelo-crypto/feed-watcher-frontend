import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CrudPagination from './CrudPagination'

describe('Pagination', () => {
    test('Have Previous and Next named elements', () => {
        render(<CrudPagination baseRoute={'/objects/%d'}
                               numberOfItems={5000}
                               currentPage={1}
                               numberOfItemsPerPage={10}/>)

        expect(screen.getByText(/previous/i)).toBeInTheDocument()
        expect(screen.getByText(/next/i)).toBeInTheDocument()
    })
})
