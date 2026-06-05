export interface AuthState{
    upload_status:"idle" | "loading";
    upload_message:string;
    isLoading:boolean;
    redirectionContact : string | null;
    redirectTo:string | null;
    isloggedIn : boolean;
    isinRegistration:boolean;
    status?: "idle" | "loading";
}

export type NavLinks = {
    name:string;
    path:string;
}


//authentication
export interface RegistrationUser{
    name:string;
    email:string;
    password:string;
    phone:string;
    answer:string;
}

export interface RegistrationError{
    name?:string;
    email?:string;
    password?:string;
    phone?:string;
    answer?:string;
}

export interface LoginUser{
    email:string;
    password:string;
}

export interface LoginError{
    email?:string;
    password?:string;
}

export interface ForgetPasswordUser{
    email:string;
    answer:string;
    newPassword:string;
}

export interface ForgetPasswordError{
    email?:string;
    answer?:string;
    newPassword?:string;
}

export interface UpdatePasswordUser{
    user_id:string;
    password:string;
}

export interface UpdatePasswordError{
    user_id?:string;
    password?:string;
}



//product
export interface Product {
    _id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    image?: string;
}
 
export interface ProductForm {
    name: string;
    category: string;
    price: string;
    description: string;
}
 
export interface ProductFormError {
    name?: string;
    category?: string;
    price?: string;
    description?: string;
    image?: string;
}
 
export interface ProductState {
    isLoading: boolean;
    allProducts: Product[];
    singleProduct: Product | null;
    redirectTo: string | null;
}



export interface SweetAlertprops {
    confirm: ()=> void,
    cancel: () => void,
    title: string;
    type?: "warning" | "info" | "error" | "success",
}