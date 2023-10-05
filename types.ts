

import { ConfigInput } from 'src/modules/form/types';  

/**
 * @description: The config of signin
 */
export interface ConfigSignin {
    redirectToPathname: string | Array<string>,
    eventAfterSignin: Function, 
};

/**
 * @description: The config of signup
 */
export interface ConfigSignup {
    redirectToPathname: string | Array<string>,
    eventAfterSignup: Function,
    inputList: Array<ConfigInput>,
};

/**
 * @description: The config of forget password
 */
export interface ConfigForgetPassword {
    redirectToPathname: string | Array<string>,
    eventAfterForgetPassword: Function,
};
