import { StackProps } from "aws-cdk-lib";

export interface IPost {
    title: string;
    description: string;
    author: string;
    publicationDate: string;
  }

//ses

export interface IAppointmentDetails {
    id: string;
    title: string;
    orderDate: string;
    scheduleDate: string;
    customer:string;
    therapist:string;

}
export interface IProduct {
     id: string;
    title: string;
    quantity: number;
    price: number;
    
}
export interface IDetails {
    old: string; 
    subTotal: number; 
    shippingCost: number;
    totalCost: number;
    shipping: string;
    billing?: string;
}

export interface IEmailEvent extends IAppointmentDetails {
    receiver: string;
    //order: IProduct[];
}

export interface IConfirmation extends IDetails {
    orderDate: string;
    products: IProduct[];
}

export interface IAppointment extends IAppointmentDetails {

}

export interface IAwsSesSenderStackProps extends StackProps{
    roleName:string;
    managedPolicyName:string;
    policyStatementActions: string[];
    functionName: string;
    functionEntry: string;
}

//ses for reminder
export interface IAppointmentReminderDetails {
    id: string;
    title: string;
    orderDate: string;
    scheduleDate: string;
    customer:string;
    therapist:string;

}

export interface IEmailReminderEvent extends IAppointmentReminderDetails {
    receiver: "whoisyoutueber@gmail.com";
}

export interface IAppointmentReminder extends IAppointmentReminderDetails {

}

export interface IAwsSesSenderReminderStackProps extends StackProps{
    roleName:string;
    managedPolicyName:string;
    policyStatementActions: string[];
    functionName: string;
    functionEntry: string;
}
