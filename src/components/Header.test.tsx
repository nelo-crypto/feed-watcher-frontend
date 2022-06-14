import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'

describe('Pagination', () => {
    test('Have title element with correct value', () => {
        render(<Header pageTitle={'Title example'}/>)

        const pageTitle: HTMLElement = screen.getByText(/title/i)

        expect(pageTitle).toBeInTheDocument()
        expect(pageTitle).toHaveTextContent('Title example')
    })
})
