export const request = async (method, url, data) => {
    let promise = null;

    if (method == 'GET') {
        promise = fetch(url);
    } else {
        promise = fetch(url, {
            method,
            headers: {
                'content-type': 'application/json',
                'X-Authenticated': getToken()
            },
            body: JSON.stringify(data)
        });
    }

    return promise.then(responseHandler);
};

async function responseHandler(response) {
    let jsonData = await response.json();

    if (response.ok) {
        return Object.values(jsonData);
    } else {
        throw jsonData;
    }
}

function getToken() {
    try {
        let authData = localStorage.getItem('auth')

        if (!authData) {
            throw { message: 'You must be authenticated' };
        }

        let auth = JSON.parse(authData);

        return auth.accessToken;
    } catch (error) {
        console.log(error);
    }
}

export const get = request.bind(null, 'GET');
export const put = request.bind(null, 'PUT'); 