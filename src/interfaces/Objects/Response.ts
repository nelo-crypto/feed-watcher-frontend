import Record from './Record'
import Info from './Info'

export default interface Response {
    records: Record[],
    info: Info
}
