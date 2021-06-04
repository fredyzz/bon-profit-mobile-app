const _Environments = {
    ENDPOINTS:  {
        LOGIN_URL:'<Your login url>',
        USER_URL: '<Your user url>',
    }
  
}

function getEnvironment() {
    return _Environments
}

export const env = getEnvironment()