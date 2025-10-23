export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  limitations: {
    dailyLessons: number | null; // null = unlimited
    speedTestsPerDay: number | null;
    practiceTimePerDay: number | null; // in minutes, null = unlimited
    assessmentAttempts: number | null;
    aiAssistantQueries: number | null;
    accessToAdvancedFeatures: boolean;
    downloadCertificates: boolean;
    prioritySupport: boolean;
  };
  popular?: boolean;
}

export interface UserSubscription {
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: Date;
  endDate: Date;
  trialEndsAt?: Date;
}

export interface UsageStats {
  lessonsCompleted: number;
  speedTestsTaken: number;
  practiceTimeMinutes: number;
  assessmentAttempts: number;
  aiQueriesUsed: number;
  lastResetDate: Date;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'monthly',
    features: [
      '3 lessons per day',
      '2 speed tests per day',
      '30 minutes practice time',
      'Basic progress tracking',
      'Community support'
    ],
    limitations: {
      dailyLessons: 3,
      speedTestsPerDay: 2,
      practiceTimePerDay: 30,
      assessmentAttempts: 1,
      aiAssistantQueries: 5,
      accessToAdvancedFeatures: false,
      downloadCertificates: false,
      prioritySupport: false
    }
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    period: 'monthly',
    features: [
      '15 lessons per day',
      '10 speed tests per day',
      '2 hours practice time',
      'Advanced progress tracking',
      'AI Assistant (50 queries)',
      'Email support'
    ],
    limitations: {
      dailyLessons: 15,
      speedTestsPerDay: 10,
      practiceTimePerDay: 120,
      assessmentAttempts: 5,
      aiAssistantQueries: 50,
      accessToAdvancedFeatures: true,
      downloadCertificates: false,
      prioritySupport: false
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    period: 'monthly',
    popular: true,
    features: [
      'Unlimited lessons',
      'Unlimited speed tests',
      'Unlimited practice time',
      'Advanced analytics',
      'AI Assistant (unlimited)',
      'Download certificates',
      'Priority support',
      'Advanced exam practice'
    ],
    limitations: {
      dailyLessons: null,
      speedTestsPerDay: null,
      practiceTimePerDay: null,
      assessmentAttempts: null,
      aiAssistantQueries: null,
      accessToAdvancedFeatures: true,
      downloadCertificates: true,
      prioritySupport: true
    }
  },
  {
    id: 'premium-yearly',
    name: 'Premium Yearly',
    price: 199.99,
    period: 'yearly',
    features: [
      'All Premium features',
      '2 months free',
      'Priority support',
      'Early access to new features'
    ],
    limitations: {
      dailyLessons: null,
      speedTestsPerDay: null,
      practiceTimePerDay: null,
      assessmentAttempts: null,
      aiAssistantQueries: null,
      accessToAdvancedFeatures: true,
      downloadCertificates: true,
      prioritySupport: true
    }
  }
];