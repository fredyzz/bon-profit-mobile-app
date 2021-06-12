const _Environments = {
    ENDPOINTS:  {
        LOGIN_URL:'<Your login url>',
        SIGN_UP_URL: '<Your signup url>',
        USER_URL: '<Your user url>',
        RESTAURANTS_URL: '<Your restaurants url>',
        ORDERS_URL: '<Your orders url>'
    },
    CONSTANTS: {
        STORAGE_KEY: '<Your storage key>'
    }
  
}

function getEnvironment() {
    return _Environments
}

export const env = getEnvironment()