import Image from './Image'

export default interface Record {
    id: number,
    title?: string,
    accessionyear?: string,
    technique?: string,
    mediacount?: number,
    edition?: number,
    totalpageviews?: number,
    groupcount?: number,
    objectnumber?: string
    colorcount?: number,
    lastupdate?: string,
    rank?: number,
    imagecount?: number,
    description?: string,
    dateoflastpageview?: string,
    dateoffirstpageview?: string,
    primaryimageurl?: string,
    images: Image[]
}
