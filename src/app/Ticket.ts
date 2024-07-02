import { User } from "./User"

export interface Ticket {
    id: number
    name: string
    assigned: User
    date: Date
    status: string
    
    
}