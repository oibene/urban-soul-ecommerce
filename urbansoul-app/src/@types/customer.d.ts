export interface LoginInterface {
    email?: string;
    password?: string;
}

export interface AccountInterface {
    name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
}

export interface CommentsInterface extends AccountInterface{
    Comment_id: number;
    Customer_id: number;
    Customer_name: string;
    Customer_last_name: string;
    Comment: string;
    Rating: number;
    Comment_date: string;
}

