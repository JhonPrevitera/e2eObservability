import { init as initApm } from '@elastic/apm-rum'

const apm = initApm({
    serviceName: 'my-service-name',

    serverUrl: 'https://769b94d4ec4345f3be3a1881af2d19d3.apm.us-central1.gcp.cloud.es.io:443',

    serviceVersion: '',

    environment: 'development',
})

export default apm
