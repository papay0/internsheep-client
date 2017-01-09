import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Data } from './fake-data';



const requestsHandlers = [
    {
        method: RequestMethod.Post,
        path: '/api/authenticate',
        auth: false,
        cb: (url, headers, body) => {
            // get params from post request
            let params = JSON.parse(body);
            let user = null;

            if (params.email === 'a' && params.password === 'z') {
                user = Data.testProfile[0];
            }
            if (params.email === 'airbus' && params.password === 'airbus') {
                user = Data.testProfile[1];
            }
            if (user) {
                return new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token', profile : user } });
            } else {
                return new ResponseOptions({ status: 200 });
            }
        }
    },

    {
        method: RequestMethod.Get,
        path: '/api/profile',
        auth: true,
        cb: (url, headers, body) => {
            return new ResponseOptions({ status: 200, body: { profile: Data.testProfile[0] } });
        }
    },

    {
        method: RequestMethod.Get,
        path: '/api/profile-company',
        auth: true,
        cb: (url, headers, body) => {
            return new ResponseOptions({ status: 200, body: { profile: Data.testProfile[1] } });
        }
    },

    {
        method: RequestMethod.Get,
        path: '/api/starredOffers',
        auth: true,
        cb: (url, headers, body) => {
            return new ResponseOptions({ status: 200, body: { offers: Data.testStarredOffers } });
        }
    },

    {
        method: RequestMethod.Get,
        path: '/api/offers',
        auth: true,
        cb: (url, headers, body) => {
            return new ResponseOptions({ status: 200, body: { offers: Data.testOffers } });
        }
    },

    {
        method: RequestMethod.Get,
        path: /\/api\/offers\/([^\/]+)$/,
        auth: true,
        cb: (url, headers, body) => {
            let regex = /\/api\/offers\/([^\/]+)$/;
            let cmpny = regex.exec(url)[1];
            let offers = [];

            for (let i = 0; i < Data.testOffers.length; i++) {
                if (Data.testOffers[i].company.toLowerCase().indexOf(cmpny.toLowerCase()) != -1){
                    offers.push(Data.testOffers[i]);
                    console.log(Data.testOffers[i]);
                }
            }
            //var offers_list = JSON.stringify(offers);

            return new ResponseOptions({ status: 200, body: { offers: offers } });
        }
    },

    {
        method: RequestMethod.Get,
        path: '/api/CVs',
        auth: true,
        cb: (url, headers, body) => {
            return new ResponseOptions({ status: 200, body: { CVs: Data.testCVs } });
        }
    },

    {
        method: RequestMethod.Post,
        path: '/api/upload',
        auth: true,
        cb: (url, headers, body) => {
            console.log('J upload');
            return new ResponseOptions({ status: 200 });
        }
    },

    {
        method: RequestMethod.Get,
        path: /\/api\/offerDetails\/([^\/]+)$/,
        auth: true,
        cb: (url, headers, body) => {
            let regex = /\/api\/offerDetails\/([^\/]+)$/;
            let offerId = regex.exec(url)[1];
            let offer = null;

            console.log(offerId);

            for (let i = 0; i < Data.testDetails.length; i++) {
                if (Data.testDetails[i].id == Number(offerId[0])) {
                    offer = Data.testDetails[i];
                }
                console.log(offer);
            }
            //var offers_list = JSON.stringify(offers);

            return new ResponseOptions({ status: 200, body: { details: offer } });
        }
    },

    {
        method: RequestMethod.Get,
        path: '/api/chat',
        auth: true,
        cb: (url, headers, body) => {
            return new ResponseOptions({ status: 200, body: { messages: Data.testMessages } });
        }
    },

    {
        method: RequestMethod.Get,
        path: /\/api\/user\/([^\/]+)$/,
        auth: true,
        cb: (url, headers, body) => {
            let regex = /\/api\/user\/([^\/]+)$/;
            let userId = regex.exec(url)[1];
            console.log('userId: ' + userId);
            return new ResponseOptions({ status: 200, body: { info: {name: 'Julien'} } });
        }
    }
];




export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend, options) => {
        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                
                for (let i = 0; i < requestsHandlers.length; i++) {
                    let handler = requestsHandlers[i];
                    if (connection.request.method === handler.method) {
                        let goodMatch;
                        if (typeof(handler.path) === 'string') {
                            goodMatch = connection.request.url.endsWith(handler.path);
                        } else {
                            goodMatch = connection.request.url.match(handler.path);
                        }
                        if (goodMatch) {
                            if (!handler.auth || connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                                let response = handler.cb(connection.request.url, connection.request.headers, connection.request.getBody());
                                connection.mockRespond(new Response(
                                    response
                                ));
                            } else {
                                // return 401 unauthorized
                                connection.mockRespond(new Response(
                                    new ResponseOptions({ status: 401 })
                                ));
                            }
                        }
                    }
                }

            }, 500);
        });
        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};
