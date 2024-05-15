import {ECSClient} from '@aws-sdk/client-ecs';

export const ecsClient = new ECSClient({
    region: String(process.env.REGION),
    credentials: {
        accessKeyId: String(process.env.AWS_VERCEL_ACCESS_KEY),
        secretAccessKey: String(process.env.AWS_VERCEL_SECRET_ACCESS_KEY)
    }
});

 