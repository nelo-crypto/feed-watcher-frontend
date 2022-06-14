import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'

describe('Header', () => {
    test('Have title element with the correct value', () => {
        render(<Header pageTitle={'Title example'}/>)

        const pageTitle: HTMLElement = screen.getByText(/title/i)

        expect(pageTitle).toBeInTheDocument()
        expect(pageTitle).toHaveTextContent('Title example')
    })
})
