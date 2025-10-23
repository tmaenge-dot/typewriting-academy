import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Container
} from '@mui/material';
import {
  CheckCircle,
  Star,
  CreditCard,
  Security,
  Support
} from '@mui/icons-material';
import { useSubscription } from '../../hooks/useSubscription';
import { SUBSCRIPTION_PLANS } from '../../types/subscription';
import PaymentDialog from '../../components/PaymentDialog/PaymentDialog';

const Pricing: React.FC = () => {
  const { currentPlan, upgradePlan } = useSubscription();
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof SUBSCRIPTION_PLANS[0] | null>(null);

  const handleSelectPlan = (planId: string) => {
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) return;

    if (planId === 'free') {
      // Free plan is always available
      upgradePlan(planId);
    } else {
      // Open payment dialog for paid plans
      setSelectedPlan(plan);
      setPaymentDialogOpen(true);
    }
  };

  const handlePaymentComplete = (planId: string) => {
    upgradePlan(planId);
    setPaymentDialogOpen(false);
    // Show success message or redirect
    alert('Payment successful! Your plan has been upgraded.');
  };

  const formatPrice = (price: number, period: string) => {
    if (price === 0) return 'Free';
    return `$${price}/${period === 'yearly' ? 'year' : 'month'}`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #1976d2, #42a5f5, #9c27b0, #ff9800)',
            backgroundSize: '200% 200%',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'gradient 3s ease infinite',
            mb: 2,
            '@keyframes gradient': {
              '0%': {
                backgroundPosition: '0% 50%'
              },
              '50%': {
                backgroundPosition: '100% 50%'
              },
              '100%': {
                backgroundPosition: '0% 50%'
              }
            }
          }}
        >
          🎯 Choose Your Learning Plan
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Unlock your typing potential with our comprehensive training program. 
          Start free and upgrade when you're ready for more.
        </Typography>
      </Box>

      {/* Current Plan Status */}
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4, 
          mb: 4, 
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
          border: '3px solid #1976d2',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: 'shimmer 2s infinite',
            '@keyframes shimmer': {
              '0%': { left: '-100%' },
              '100%': { left: '100%' }
            }
          }
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}>
              🎉 Current Plan: {currentPlan.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#1565c0', fontWeight: 500 }}>
              {currentPlan.price === 0 ? '✨ Free forever' : `💳 ${formatPrice(currentPlan.price, currentPlan.period)} - Full access`}
            </Typography>
          </Box>
          {currentPlan.popular && (
            <Chip 
              icon={<Star />} 
              label="⭐ Most Popular" 
              sx={{ 
                background: 'linear-gradient(45deg, #ff9800, #ffb74d)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                px: 2,
                py: 1,
                '& .MuiChip-icon': {
                  color: 'white'
                }
              }}
            />
          )}
        </Box>
      </Paper>

      {/* Pricing Cards */}
      <Grid container spacing={4} mb={6}>
        {SUBSCRIPTION_PLANS.map((plan, index) => {
          // Define color schemes for each plan
          const colorSchemes = [
            { 
              // Free - Green theme
              primary: '#4caf50', 
              light: '#e8f5e8', 
              gradient: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
              shadow: '0 8px 32px rgba(76, 175, 80, 0.3)'
            },
            { 
              // Basic - Blue theme
              primary: '#2196f3', 
              light: '#e3f2fd', 
              gradient: 'linear-gradient(135deg, #2196f3 0%, #42a5f5 100%)',
              shadow: '0 8px 32px rgba(33, 150, 243, 0.3)'
            },
            { 
              // Premium - Purple theme
              primary: '#9c27b0', 
              light: '#f3e5f5', 
              gradient: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
              shadow: '0 8px 32px rgba(156, 39, 176, 0.3)'
            },
            { 
              // Premium Yearly - Gold theme
              primary: '#ff9800', 
              light: '#fff3e0', 
              gradient: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
              shadow: '0 8px 32px rgba(255, 152, 0, 0.3)'
            }
          ];
          
          const colors = colorSchemes[index] || colorSchemes[0];
          
          return (
            <Grid item xs={12} md={6} lg={3} key={plan.id}>
              <Card 
                elevation={plan.popular ? 12 : 6}
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  background: plan.popular 
                    ? `linear-gradient(135deg, ${colors.light} 0%, #ffffff 50%, ${colors.light} 100%)`
                    : colors.light,
                  border: plan.popular ? `3px solid ${colors.primary}` : `2px solid ${colors.primary}`,
                  transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.4s ease',
                  boxShadow: plan.popular ? colors.shadow : `0 4px 20px ${colors.primary}20`,
                  '&:hover': {
                    transform: plan.popular ? 'scale(1.08)' : 'scale(1.03)',
                    boxShadow: colors.shadow,
                    '& .plan-header': {
                      background: colors.gradient
                    }
                  }
                }}
              >
                {plan.popular && (
                  <Chip 
                    icon={<Star />}
                    label="Most Popular" 
                    sx={{ 
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 1,
                      background: colors.gradient,
                      color: 'white',
                      fontWeight: 'bold',
                      '& .MuiChip-icon': {
                        color: 'white'
                      }
                    }}
                  />
                )}
                
                <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Colorful Plan Header */}
                  <Box 
                    className="plan-header"
                    sx={{
                      background: colors.primary,
                      color: 'white',
                      p: 3,
                      textAlign: 'center',
                      borderRadius: '8px 8px 0 0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Typography variant="h5" fontWeight="bold" mb={1}>
                      {plan.name}
                    </Typography>
                    <Box my={2}>
                      <Typography 
                        variant="h3" 
                        component="span" 
                        fontWeight="bold"
                        sx={{ 
                          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                        }}
                      >
                        {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      </Typography>
                      {plan.price > 0 && (
                        <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                          /{plan.period === 'yearly' ? 'year' : 'month'}
                        </Typography>
                      )}
                    </Box>
                    {plan.period === 'yearly' && (
                      <Chip 
                        label="Save 17%" 
                        sx={{ 
                          background: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontWeight: 'bold',
                          backdropFilter: 'blur(10px)'
                        }}
                        size="small"
                      />
                    )}
                  </Box>

                  {/* Features List with colored background */}
                  <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'white' }}>
                    <List dense>
                      {plan.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircle 
                              sx={{ 
                                color: colors.primary,
                                fontSize: '1.2rem',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                              }} 
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={feature}
                            primaryTypographyProps={{ 
                              fontSize: '0.9rem',
                              fontWeight: 500,
                              color: 'text.primary'
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Colorful Action Button */}
                  <Box sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={currentPlan.id === plan.id}
                      onClick={() => handleSelectPlan(plan.id)}
                      sx={{ 
                        background: currentPlan.id === plan.id 
                          ? 'rgba(0,0,0,0.12)' 
                          : colors.gradient,
                        color: currentPlan.id === plan.id ? 'text.disabled' : 'white',
                        fontWeight: 'bold',
                        py: 1.5,
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: currentPlan.id === plan.id 
                          ? 'none' 
                          : `0 4px 15px ${colors.primary}40`,
                        '&:hover': {
                          background: currentPlan.id === plan.id 
                            ? 'rgba(0,0,0,0.12)' 
                            : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)`,
                          transform: currentPlan.id === plan.id ? 'none' : 'translateY(-2px)',
                          boxShadow: currentPlan.id === plan.id 
                            ? 'none' 
                            : `0 6px 20px ${colors.primary}60`
                        },
                        '&:disabled': {
                          color: 'text.disabled'
                        }
                      }}
                      startIcon={plan.price > 0 && currentPlan.id !== plan.id ? <CreditCard /> : undefined}
                    >
                      {currentPlan.id === plan.id 
                        ? '✓ Current Plan' 
                        : plan.price === 0 
                          ? '🚀 Get Started Free' 
                          : '⚡ Upgrade Now'
                      }
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Features Comparison */}
      <Paper 
        elevation={4} 
        sx={{ 
          p: 4,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          borderRadius: 3,
          border: '2px solid #dee2e6'
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom 
          fontWeight="bold" 
          textAlign="center"
          sx={{ 
            background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
            backgroundClip: 'text',
            color: 'transparent',
            mb: 4
          }}
        >
          🚀 Why Upgrade?
        </Typography>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} md={4}>
            <Box 
              textAlign="center"
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Security sx={{ fontSize: 60, mb: 2, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                🔓 Unlimited Access
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                Practice as much as you want with no daily limits on lessons, 
                speed tests, or practice time.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box 
              textAlign="center"
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #2196f3 0%, #42a5f5 100%)',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Support sx={{ fontSize: 60, mb: 2, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                🎯 Priority Support
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                Get faster help when you need it with priority email support 
                and dedicated assistance.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box 
              textAlign="center"
              sx={{
                p: 3,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)',
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Star sx={{ fontSize: 60, mb: 2, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
              <Typography variant="h6" gutterBottom fontWeight="bold">
                ⭐ Advanced Features
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                Access advanced analytics, downloadable certificates, 
                and AI-powered personalized learning recommendations.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Money Back Guarantee */}
      <Box 
        textAlign="center" 
        mt={6}
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
          border: '3px solid #ff9800',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: '#e65100',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          🛡️ 30-Day Money-Back Guarantee
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            maxWidth: 600, 
            mx: 'auto',
            color: '#bf360c',
            fontWeight: 500,
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}
        >
          Not satisfied? Get a full refund within 30 days, no questions asked. 
          We're confident you'll love your typing improvement journey! 💪
        </Typography>
      </Box>
      
      {/* Payment Dialog */}
      <PaymentDialog
        open={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        plan={selectedPlan}
        onPaymentComplete={handlePaymentComplete}
      />
    </Container>
  );
};

export default Pricing;