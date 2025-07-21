export interface Aceptation {
    data: Data;
    meta: null;
}

export interface Data {
    id:                           number;
    name:                         string;
    email:                        string;
    contact_name:                 string;
    phone_number:                 string;
    active:                       boolean;
    logo_url:                     null;
    legal_name:                   string;
    legal_id_type:                string;
    legal_id:                     string;
    public_key:                   string;
    accepted_currencies:          string[];
    fraud_javascript_key:         null;
    fraud_groups:                 any[];
    accepted_payment_methods:     string[];
    payment_methods:              PaymentMethod[];
    presigned_acceptance:         Presigned;
    presigned_personal_data_auth: Presigned;
    click_to_pay_dpa_id:          null;
    mcc:                          null;
    acquirer_id:                  null;
}

export interface PaymentMethod {
    name:               string;
    payment_processors: PaymentProcessor[];
}

export interface PaymentProcessor {
    name: string;
}

export interface Presigned {
    acceptance_token: string;
    permalink:        string;
    type:             string;
}

