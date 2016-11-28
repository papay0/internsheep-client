import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Data } from './fake-data';

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend, options) => {
        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            let testUser = Data.testUser;
            let testProfile = Data.testProfile;
            let testStarredOffers = Data.testStarredOffers;
            let testOffers = Data.testOffers;
            let testCVs = Data.testCVs;

            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // fake authenticate api end point
                if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                    // get parameters from post request
                    let params = JSON.parse(connection.request.getBody());
                    // check user credentials and return fake jwt token if valid

                    let connectionCheck: boolean = false;
                    for (let j = 0; j < testUser.length; j++) {

                        if (params.email === testUser[j].email && params.password === testUser[j].password) {

                            //Call to users here; lets us check if user is company or student
                            let profile = null;
                            for (let i = 0; i < testProfile.length; i++) {
                                if (testProfile[i].email===testUser[j].email){
                                    profile = testProfile[i];
                                    //console.log("Profile id" + profile.id);
                                }
                            } 
                            connectionCheck = true;
                            connection.mockRespond(new Response(
                                //console.log("profile found: " + profile.id);
                                new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token', profile : profile } })



                                ));
                        } 

                    }


                    if(!connectionCheck) {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200 })
                            ));
                    }
                }

                // fake users api end point
                if (connection.request.url.endsWith('/api/profile') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return test users if valid, this security is implemented server side
                    // in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { profile: testProfile[0] } })
                            ));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })
                            ));
                    }
                }

                // starred offers api end point
                if (connection.request.url.endsWith('/api/starredOffers') && connection.request.method === RequestMethod.Get) {
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { offers: testStarredOffers } })
                            ));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })
                            ));
                    }
                }

                // Offers api end point
                if (connection.request.url.endsWith('/api/offers') && connection.request.method === RequestMethod.Get) {
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { offers: testOffers } })
                            ));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })
                            ));
                    }
                }


                if (connection.request.url.indexOf('/api/offers/') != -1 && connection.request.method === RequestMethod.Get) {
                          
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {

                        let regex = new RegExp("\/api\/offers\/([^\/]+)$");
                        let cmpny = regex.exec(connection.request.url)[1];
                        let offers = [];

                        for (let i =0; i < testOffers.length; i++){
                            
                            if (testOffers[i].company.toLowerCase().indexOf(cmpny.toLowerCase()) != -1){
                                offers.push(testOffers[i]);
                                console.log(testOffers[i]);
                            }
                        }
                        //var offers_list = JSON.stringify(offers);

                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { offers: offers } })
                            ));

                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })
                            ));
                    }
                }

                console.log(connection.request.url);

                if (connection.request.url.endsWith('/api/CVs') && connection.request.method === RequestMethod.Get) {
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { CVs: testCVs } })
                        ));

                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })


                        ));
                    }
                }

                if (connection.request.url.endsWith('/api/upload') && connection.request.method === RequestMethod.Post) {
                    console.log('J upload');
                }


            }, 500);

});

return new Http(backend, options);
},
deps: [MockBackend, BaseRequestOptions]
};