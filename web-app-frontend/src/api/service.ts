import axios from 'axios';

const service = axios.create({
  baseURL: '/web/app/jolt/rest/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface TransformRq {
  input: string;
  specification: string;
}

export interface TransformRs {
  success: boolean;
  body: any;
}

// JOLT Transform
export const transform = (rq: TransformRq) => service.post<TransformRs>('/v1/transform', rq);
