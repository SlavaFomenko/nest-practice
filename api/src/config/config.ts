const env = process.env;
export const config=()=>({
    database:{
        arango:{
            url:env.ARANGO_DB_URL,
            name:env.ARANGO_DB_NAME,
            auth:{
                username:env.ARANGO_DB_USERNAME,
                password:env.ARANGO_DB_PASSWORD,
            }
        }
    }
})