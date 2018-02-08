import { request, GraphQLClient } from 'graphql-request';

const getPrototypoUser = userEmail => `
        query {
            User (
                email: "${userEmail}"
            ) {
                id
            }
        }
    `;

const authenticateUser = (email, password) => `
    mutation {
        authenticateEmailUser(
            email:"${email}"
            password:"${password}"
        )
        {
            token
        }
    }
`;

const getUserProjects = graphQLID => `
    query {
        User(
            id: "${graphQLID}"
        )
        {
            library {
                name
                id
                template
                variants {
                    values
                    name
                    id
                }
            }
        }
    }
`;

const GRAPHQL_PROTOTYPO_API = 'https://api.graph.cool/simple/v1/prototypo';

const prototypoProjects = {
  getProjects(email, password) {
    const userPresetsPromise = new Promise((resolve, reject) => {
      request(GRAPHQL_PROTOTYPO_API, getPrototypoUser(email))
        .then((data) => {
          const userID = data.User.id;

          request(GRAPHQL_PROTOTYPO_API, authenticateUser(email, password))
            .then((res) => {
              const token = res.authenticateEmailUser.token;
              const client = new GraphQLClient(GRAPHQL_PROTOTYPO_API, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

              client.request(
                getUserProjects(userID)
              )
                .then((fonts) => {
                  resolve(fonts.User.library);
                })
                .catch(error => {
                  reject(error);
                });
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });

    return userPresetsPromise;
  }
};

export default prototypoProjects;
