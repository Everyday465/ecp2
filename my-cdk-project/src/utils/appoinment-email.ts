import {IAppointment} from '../../types'

export const AppointmentEmail = (input: IAppointment) => {
        return `
        ${input.id}
        ${input.title}
        ${input.orderDate}
        ${input.scheduleDate}
        ${input.customer}
        ${input.therapist}
        `
    

}