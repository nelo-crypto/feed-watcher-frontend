import React from 'react'

import List from './[page]'
import ObjectRecord from './../../interfaces/Objects/Record'
import {getByText, render, screen} from '@testing-library/react'
import mockRouter from 'next-router-mock'

jest.mock('next/router', () => require('next-router-mock'))

const objectRecords: ObjectRecord[] = [
    {
        id: 1,
        title: 'Title1',
        accessionyear: 'sdfsdffd',
        technique: 'sdfsd',
        mediacount: 0,
        edition: 0,
        totalpageviews: 0,
        groupcount: 0,
        objectnumber: 'sddfg',
        colorcount: 0,
        lastupdate: 'sdfsdfdf',
        rank: 0,
        imagecount: 1,
        description: 'Description of image 1',
        dateoflastpageview: '2001-01-01',
        dateoffirstpageview: '2001-01-01',
        primaryimageurl: 'image.jpg',
        culture: 'German',
        verificationleveldescription: 'Very good1',
        images: [],
    },
    {
        id: 1,
        title: 'Title2',
        accessionyear: 'sdfsdffd',
        technique: 'sdfsd',
        mediacount: 0,
        edition: 0,
        totalpageviews: 0,
        groupcount: 0,
        objectnumber: 'sddfg',
        colorcount: 0,
        lastupdate: 'sdfsdfdf',
        rank: 0,
        imagecount: 1,
        description: 'Description of image 1',
        dateoflastpageview: '2001-01-01',
        dateoffirstpageview: '2001-01-01',
        primaryimageurl: 'image.jpg',
        culture: 'Finnish',
        verificationleveldescription: 'Very good2',
        images: [],
    },
]
const mockResponseData = {
    data: {
        objects: {
            records: objectRecords,
            info: {
                totalrecordsperquery: 10,
                totalrecords: 3,
                pages: 1,
                page: 1,
            }
        }
    }
};

(global as any).fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockResponseData)
}))

describe('List', () => {
    let originalFetch

    beforeEach(() => {
        originalFetch = global.fetch;
        (global as any).fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockResponseData)
        }))
    })

    afterEach(() => {
        global.fetch = originalFetch
    })

    it('should have a table with two object records showing title, culture and verificationleveldescription', async () => {
        mockRouter.isReady = true
        mockRouter.query = {
            page: '1'
        }

        render(<List/>)

        const title1 = await screen.findAllByText(/title1/i)
        expect(title1).toHaveLength(1)

        const title2 = await screen.findAllByText(/title2/i)
        expect(title2).toHaveLength(1)

        const culture1 = await screen.findAllByText(/German/i)
        expect(culture1).toHaveLength(1)

        const culture2 = await screen.findAllByText(/finnish/i)
        expect(culture2).toHaveLength(1)

        const level1 = await screen.findAllByText(/good1/i)
        expect(level1).toHaveLength(1)

        const level2 = await screen.findAllByText(/good2/i)
        expect(level2).toHaveLength(1)
    })
})