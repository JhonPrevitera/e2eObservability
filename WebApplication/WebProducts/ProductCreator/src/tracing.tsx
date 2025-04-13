import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { CompositePropagator, W3CBaggagePropagator, W3CTraceContextPropagator } from '@opentelemetry/core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import React, { useEffect } from 'react';

const serviceName = "ProductCreator-front";

const initializeTracer = async () => {
    const provider = new WebTracerProvider({
        resource: new Resource({
            'service.name': serviceName,
        }),
    });

    provider.addSpanProcessor(
        new BatchSpanProcessor(
            new OTLPTraceExporter({
                url: 'http://localhost:4318/v1/traces',
                headers: {},
            })
        )
    );

    provider.register({
        contextManager: new ZoneContextManager(),
        propagator: new CompositePropagator({
            propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()],
        }),
    });

    registerInstrumentations({
        tracerProvider: provider,
        instrumentations: [
            getWebAutoInstrumentations({
                '@opentelemetry/instrumentation-user-interaction': {
                    enabled: false
                },
                '@opentelemetry/instrumentation-document-load': { enabled: false },
                '@opentelemetry/instrumentation-fetch': {
                    propagateTraceHeaderCorsUrls: /.*/,
                    clearTimingResources: true,
                },
                '@opentelemetry/instrumentation-xml-http-request': {
                    applyCustomAttributesOnSpan: () => {},
                    propagateTraceHeaderCorsUrls: /.*/,
                    clearTimingResources: true,
                },
            }),
        ],
    });
};

export default function TraceProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        initializeTracer();
    }, []);

    return <>{children}</>;
}