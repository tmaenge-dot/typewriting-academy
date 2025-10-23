import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Chip,
  InputAdornment,
  Alert
} from '@mui/material';
import {
  CreditCard,
  Lock,
  CheckCircle
} from '@mui/icons-material';
import { SubscriptionPlan } from '../../types/subscription';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  plan: SubscriptionPlan | null;
  onPaymentComplete: (planId: string) => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ 
  open, 
  onClose, 
  plan, 
  onPaymentComplete 
}) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handlePayment = async () => {
    if (!plan) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would integrate with Stripe, PayPal, etc.
    console.log('Processing payment for plan:', plan.id);
    console.log('Payment details:', formData);
    
    // Simulate successful payment
    onPaymentComplete(plan.id);
    setIsProcessing(false);
    onClose();
    
    // Reset form
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      email: ''
    });
  };

  const formatCardNumber = (value: string) => {
    // Add spaces every 4 digits
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    // Add slash after 2 digits
    return value.replace(/\D/g, '').replace(/(.{2})/, '$1/');
  };

  if (!plan) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={2}>
          <CreditCard color="primary" />
          <Box>
            <Typography variant="h6">Complete Your Purchase</Typography>
            <Typography variant="body2" color="text.secondary">
              Upgrade to {plan.name} - ${plan.price}/{plan.period}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Plan Summary */}
        <Box mb={3} p={2} bgcolor="grey.50" borderRadius={2}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Order Summary
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="body1">{plan.name} Plan</Typography>
              <Typography variant="body2" color="text.secondary">
                {plan.period === 'yearly' ? 'Annual billing' : 'Monthly billing'}
              </Typography>
            </Box>
            <Box textAlign="right">
              <Typography variant="h6" fontWeight="bold">
                ${plan.price}
              </Typography>
              {plan.period === 'yearly' && (
                <Chip label="Save 17%" color="success" size="small" />
              )}
            </Box>
          </Box>
        </Box>

        {/* Security Notice */}
        <Alert 
          icon={<Lock />} 
          severity="info" 
          sx={{ mb: 3 }}
        >
          <Typography variant="body2">
            <strong>Demo Mode:</strong> This is a simulation. No real payment will be processed. 
            In production, this would integrate with secure payment providers like Stripe.
          </Typography>
        </Alert>

        {/* Payment Form */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cardholder Name"
              value={formData.cardholderName}
              onChange={handleInputChange('cardholderName')}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card Number"
              value={formatCardNumber(formData.cardNumber)}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, '');
                if (value.length <= 16) {
                  setFormData(prev => ({ ...prev, cardNumber: value }));
                }
              }}
              placeholder="1234 5678 9012 3456"
              inputProps={{ maxLength: 19 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCard />
                  </InputAdornment>
                )
              }}
              required
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              value={formatExpiryDate(formData.expiryDate)}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 4) {
                  setFormData(prev => ({ ...prev, expiryDate: value }));
                }
              }}
              placeholder="MM/YY"
              inputProps={{ maxLength: 5 }}
              required
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CVV"
              value={formData.cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 3) {
                  setFormData(prev => ({ ...prev, cvv: value }));
                }
              }}
              placeholder="123"
              inputProps={{ maxLength: 3 }}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isProcessing}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handlePayment}
          disabled={isProcessing || !formData.email || !formData.cardholderName || !formData.cardNumber}
          startIcon={isProcessing ? undefined : <CheckCircle />}
          sx={{ minWidth: 120 }}
        >
          {isProcessing ? 'Processing...' : `Pay $${plan.price}`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;