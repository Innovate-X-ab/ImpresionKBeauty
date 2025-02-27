// src/lib/email/monitoring.ts
interface EmailMetrics {
    totalSent: number;
    totalFailed: number;
    queueLength: number;
    averageLatency: number;
  }
  
  export class EmailMonitoring {
    private metrics: EmailMetrics = {
      totalSent: 0,
      totalFailed: 0,
      queueLength: 0,
      averageLatency: 0,
    };
  
    private latencies: number[] = [];
  
    recordSentEmail(latencyMs: number) {
      this.metrics.totalSent++;
      this.latencies.push(latencyMs);
      this.updateAverageLatency();
    }
  
    recordFailedEmail() {
      this.metrics.totalFailed++;
    }
  
    updateQueueLength(length: number) {
      this.metrics.queueLength = length;
    }
  
    private updateAverageLatency() {
      // Keep only last 100 latencies for average
      if (this.latencies.length > 100) {
        this.latencies = this.latencies.slice(-100);
      }
      
      this.metrics.averageLatency = 
        this.latencies.reduce((a, b) => a + b, 0) / this.latencies.length;
    }
  
    getMetrics(): EmailMetrics {
      return { ...this.metrics };
    }
  
    async logMetrics() {
      console.log('Email Service Metrics:', {
        ...this.metrics,
        successRate: `${((this.metrics.totalSent / (this.metrics.totalSent + this.metrics.totalFailed)) * 100).toFixed(2)}%`,
        averageLatencyMs: `${this.metrics.averageLatency.toFixed(2)}ms`,
      });
    }
  }