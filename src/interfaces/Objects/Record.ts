import Image from './Image'

export default interface Record {
    id: number,
    title: string | null,
    accessionyear: string | null,
    technique: string | null,
    mediacount: number,
    edition: number,
    totalpageviews: number,
    groupcount: number,
    objectnumber: string | null,
    colorcount: number,
    lastupdate: string | null,
    rank: number,
    imagecount: number,
    description: string | null,
    dateoflastpageview: string | null,
    dateoffirstpageview: string | null,
    primaryimageurl: string | null,
    culture: string | null,
    verificationleveldescription: string | null,
    images: Image[],
}
