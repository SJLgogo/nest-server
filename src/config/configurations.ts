export const loadConfig = () => {
    const { env } = process
    return {
        mysql:{
            host:env.TYPEORM_HOST,
            port:env.TYPEORM_PORT,
            username:env.TYPEORM_USERNAME,
            password:env.TYPEORM_PASSWORD,
            database:env.TYPEORM_DATABASE,
        },
        redis: {
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
        },
    }
}