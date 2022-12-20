import request from '@/utils/request'

export const getActicles = (channel_id, timestamp) => request.get('/v1_0/articles', {
    params: {
        channel_id, timestamp
    }
})