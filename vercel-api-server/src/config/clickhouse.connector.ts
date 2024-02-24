import { createClient }  from '@clickhouse/client';

const clickHouseClient  =  createClient({
    host: String(process.env.CLICKHOUSE_HOST),
    database: String(process.env.CLICKHOUSE_DATABASE),
    username: String(process.env.CLICKHOUSE_USER),
    password: String(process.env.CLICKHOUSE_PASSWORD)

})

export default clickHouseClient;