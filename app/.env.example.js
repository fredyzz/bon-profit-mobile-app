const _Environments = {
    ENDPOINTS:  {
        LOGIN_URL:'<Your login url>',
        USER_URL: '<Your user url>',
        RESTAURANTS_URL: '<Your restaurants url>',
        ORDERS_URL: '<Your orders url>'
    }
  
}

function getEnvironment() {
    return _Environments
}

export const env = getEnvironment()