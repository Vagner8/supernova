import { User } from "./db/types"

export function createPoints(user: User) {
    const {_id, name, surname, email, img, phone, address, registration, birth, disabled} = user
    const points = [
        {name, surname},
        {birth, address},
        {registration, email, phone},
        {id: _id, img, disabled}
    ]
    return points
}