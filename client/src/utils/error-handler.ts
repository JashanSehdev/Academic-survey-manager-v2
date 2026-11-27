
export function getErrorMessage (code : number, resource ?: string) {

    switch (code) {

        case 404 :  return `${resource ?? 'resource'} not found`;

        case 500 :  return 'Internal server Error';

        default  :  return 'something went wrong'
    }

     
}