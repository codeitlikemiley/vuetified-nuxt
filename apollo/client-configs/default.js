import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'isomorphic-fetch'

export default (ctx) => {
    const httpLink = new HttpLink({ uri: process.env.GRAPHQL_URL })

    // auth token
    let token = process.server ? ctx.req.session : window.__NUXT__.state.session

    // middleware
    const middlewareLink = new ApolloLink((operation, forward) => {
        operation.setContext({
            headers: { authorization: `Bearer ${token}` }
        })
        return forward(operation)
    })
    const link = middlewareLink.concat(httpLink)
    return {
        link,
        cache: new InMemoryCache()
    }
}
