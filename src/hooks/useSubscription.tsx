import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SubscriptionPlan, UserSubscription, UsageStats, SUBSCRIPTION_PLANS } from '../types/subscription';
import { useAuth } from './useAuth';

interface SubscriptionContextType {
  currentPlan: SubscriptionPlan;
  subscription: UserSubscription | null;
  usageStats: UsageStats;
  canUseFeature: (feature: keyof SubscriptionPlan['limitations']) => boolean;
  getRemainingUsage: (feature: keyof SubscriptionPlan['limitations']) => number | null;
  trackUsage: (feature: keyof UsageStats) => void;
  upgradePlan: (planId: string) => void;
  resetDailyUsage: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const { hasUnlimitedAccess, isAuthenticated } = useAuth();
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>(SUBSCRIPTION_PLANS[0]); // Default to free
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats>({
    lessonsCompleted: 0,
    speedTestsTaken: 0,
    practiceTimeMinutes: 0,
    assessmentAttempts: 0,
    aiQueriesUsed: 0,
    lastResetDate: new Date()
  });

  // Load subscription data from localStorage on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('userSubscriptionPlan');
    const savedUsage = localStorage.getItem('userUsageStats');
    
    if (savedPlan) {
      const planId = JSON.parse(savedPlan);
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
      if (plan) {
        setCurrentPlan(plan);
      }
    }
    
    if (savedUsage) {
      const usage = JSON.parse(savedUsage);
      setUsageStats({
        ...usage,
        lastResetDate: new Date(usage.lastResetDate)
      });
    }

    // Check if we need to reset daily usage
    checkAndResetDailyUsage();
  }, []);

  // Save to localStorage when plan or usage changes
  useEffect(() => {
    localStorage.setItem('userSubscriptionPlan', JSON.stringify(currentPlan.id));
  }, [currentPlan]);

  useEffect(() => {
    localStorage.setItem('userUsageStats', JSON.stringify(usageStats));
  }, [usageStats]);

  const checkAndResetDailyUsage = () => {
    const now = new Date();
    const lastReset = new Date(usageStats.lastResetDate);
    
    // Check if it's a new day
    if (now.toDateString() !== lastReset.toDateString()) {
      resetDailyUsage();
    }
  };

  const resetDailyUsage = () => {
    setUsageStats(prev => ({
      ...prev,
      lessonsCompleted: 0,
      speedTestsTaken: 0,
      practiceTimeMinutes: 0,
      assessmentAttempts: 0,
      aiQueriesUsed: 0,
      lastResetDate: new Date()
    }));
  };

  const canUseFeature = (feature: keyof SubscriptionPlan['limitations']): boolean => {
    // Admin and localhost users have unlimited access
    if (hasUnlimitedAccess()) return true;
    
    // Non-authenticated users have no access (except localhost)
    if (!isAuthenticated) return false;
    
    const limit = currentPlan.limitations[feature];
    
    if (limit === null) return true; // Unlimited
    if (limit === false) return false; // Not allowed
    if (limit === true) return true; // Allowed
    
    // For numeric limits, check against current usage
    switch (feature) {
      case 'dailyLessons':
        return usageStats.lessonsCompleted < limit;
      case 'speedTestsPerDay':
        return usageStats.speedTestsTaken < limit;
      case 'practiceTimePerDay':
        return usageStats.practiceTimeMinutes < limit;
      case 'assessmentAttempts':
        return usageStats.assessmentAttempts < limit;
      case 'aiAssistantQueries':
        return usageStats.aiQueriesUsed < limit;
      default:
        return true;
    }
  };

  const getRemainingUsage = (feature: keyof SubscriptionPlan['limitations']): number | null => {
    // Admin and localhost users have unlimited access
    if (hasUnlimitedAccess()) return null; // Unlimited
    
    // Non-authenticated users have no access
    if (!isAuthenticated) return 0;
    
    const limit = currentPlan.limitations[feature];
    
    if (limit === null) return null; // Unlimited
    if (typeof limit !== 'number') return null;
    
    switch (feature) {
      case 'dailyLessons':
        return Math.max(0, limit - usageStats.lessonsCompleted);
      case 'speedTestsPerDay':
        return Math.max(0, limit - usageStats.speedTestsTaken);
      case 'practiceTimePerDay':
        return Math.max(0, limit - usageStats.practiceTimeMinutes);
      case 'assessmentAttempts':
        return Math.max(0, limit - usageStats.assessmentAttempts);
      case 'aiAssistantQueries':
        return Math.max(0, limit - usageStats.aiQueriesUsed);
      default:
        return null;
    }
  };

  const trackUsage = (feature: keyof UsageStats) => {
    setUsageStats(prev => {
      switch (feature) {
        case 'lessonsCompleted':
          return { ...prev, lessonsCompleted: prev.lessonsCompleted + 1 };
        case 'speedTestsTaken':
          return { ...prev, speedTestsTaken: prev.speedTestsTaken + 1 };
        case 'practiceTimeMinutes':
          return { ...prev, practiceTimeMinutes: prev.practiceTimeMinutes + 1 };
        case 'assessmentAttempts':
          return { ...prev, assessmentAttempts: prev.assessmentAttempts + 1 };
        case 'aiQueriesUsed':
          return { ...prev, aiQueriesUsed: prev.aiQueriesUsed + 1 };
        default:
          return prev;
      }
    });
  };

  const upgradePlan = (planId: string) => {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (plan) {
      setCurrentPlan(plan);
      
      // In a real app, this would involve payment processing
      setSubscription({
        plan,
        status: 'active',
        startDate: new Date(),
        endDate: new Date(Date.now() + (plan.period === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000)
      });
    }
  };

  const value: SubscriptionContextType = {
    currentPlan,
    subscription,
    usageStats,
    canUseFeature,
    getRemainingUsage,
    trackUsage,
    upgradePlan,
    resetDailyUsage
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = (): SubscriptionContextType => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};