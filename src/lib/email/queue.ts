// src/lib/email/queue.ts
interface EmailService {
  sendEmail(params: { to: string; subject: string; html: string }): Promise<void>;
}

interface QueuedEmail {
    id: string;
    to: string;
    subject: string;
    html: string;
    attempts: number;
    lastAttempt?: Date;
    status: 'pending' | 'processing' | 'failed' | 'sent';
  }
  
  export class EmailQueue {
    private queue: QueuedEmail[] = [];
    private isProcessing: boolean = false;
    private processingInterval: number = 1000; // 1 second
    private maxConcurrent: number = 5;
    private maxRetries: number = 3;
  
    constructor(private emailService: EmailService) {
      // Start processing the queue
      setInterval(() => this.processQueue(), this.processingInterval);
    }
  
    async addToQueue(to: string, subject: string, html: string): Promise<string> {
      const id = Math.random().toString(36).substring(7);
      
      this.queue.push({
        id,
        to,
        subject,
        html,
        attempts: 0,
        status: 'pending'
      });
  
      return id;
    }
  
    private async processQueue() {
      if (this.isProcessing) return;
      
      this.isProcessing = true;
      
      try {
        // Get pending emails that haven't exceeded max retries
        const pendingEmails = this.queue.filter(
          email => 
            email.status === 'pending' && 
            email.attempts < this.maxRetries
        ).slice(0, this.maxConcurrent);
  
        if (pendingEmails.length === 0) {
          this.isProcessing = false;
          return;
        }
  
        await Promise.all(
          pendingEmails.map(async (email) => {
            try {
              email.status = 'processing';
              email.attempts += 1;
              email.lastAttempt = new Date();
  
              await this.emailService.sendEmail({
                to: email.to,
                subject: email.subject,
                html: email.html
              });
  
              email.status = 'sent';
              // Remove from queue if sent successfully
              this.queue = this.queue.filter(e => e.id !== email.id);
  
            } catch (error) {
              console.error(`Failed to send email ${email.id}:`, error);
              email.status = 'failed';
              
              if (email.attempts >= this.maxRetries) {
                // Log failed email for manual review
                console.error(`Email ${email.id} failed after ${this.maxRetries} attempts`);
              } else {
                email.status = 'pending'; // Reset to pending for retry
              }
            }
          })
        );
      } finally {
        this.isProcessing = false;
      }
    }
  
    getStatus(emailId: string) {
      const email = this.queue.find(e => e.id === emailId);
      return email ? {
        status: email.status,
        attempts: email.attempts,
        lastAttempt: email.lastAttempt
      } : null;
    }
  
    clearQueue() {
      this.queue = [];
    }
  }